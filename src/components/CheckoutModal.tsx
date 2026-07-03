import React, { useState, useEffect } from 'react';
import { X, CreditCard, Receipt, FileText, CheckCircle, Award, Printer, ShoppingBag, Mic, Volume2, Compass, MapPin, Sparkles, Check } from 'lucide-react';
import { CartItem, StoreSettings, Customer, Order } from '../types';
import { formatMoney } from '../data/catalog';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  settings: StoreSettings;
  deliveryLocation: string;
  onPlaceOrder: (customer: Customer, paymentMethod: string, notes?: string) => Order | null;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  settings,
  deliveryLocation,
  onPlaceOrder
}: CheckoutModalProps) {
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState(deliveryLocation);
  const [payment, setPayment] = useState('mpesa');

  // New States: Special Instructions Delivery Notes
  const [notes, setNotes] = useState('');

  // New States: Interactive delivery grid map coordinates
  const [pinX, setPinX] = useState(3);
  const [pinY, setPinY] = useState(2);

  // New States: Voice Recognition Assistant
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'success' | 'error'>('idle');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  
  // Placed Order state for checkout success
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // Dynamic delivery window time estimation
  const getDeliveryEstimate = (countyName: string) => {
    if (!countyName) return { window: 'N/A', clockRange: 'N/A', trafficText: 'N/A' };
    
    let minMinutes = 30;
    let maxMinutes = 45;
    
    switch(countyName.toLowerCase()) {
      case 'nairobi':
        minMinutes = 30;
        maxMinutes = 45;
        break;
      case 'kiambu':
        minMinutes = 45;
        maxMinutes = 60;
        break;
      case 'kajiado':
        minMinutes = 60;
        maxMinutes = 90;
        break;
      case 'machakos':
        minMinutes = 75;
        maxMinutes = 110;
        break;
      case 'nakuru':
        minMinutes = 120;
        maxMinutes = 180;
        break;
      case 'kisumu':
      case 'mombasa':
        minMinutes = 180;
        maxMinutes = 240;
        break;
      default:
        minMinutes = 60;
        maxMinutes = 120;
    }
    
    // Modify based on hours
    const currentHour = new Date().getHours();
    let trafficText = 'Smooth traffic conditions';
    if (currentHour >= 7 && currentHour <= 9) {
      minMinutes += 15;
      maxMinutes += 25;
      trafficText = 'Peak morning rush-hour traffic';
    } else if (currentHour >= 16 && currentHour <= 19) {
      minMinutes += 20;
      maxMinutes += 30;
      trafficText = 'Heavy evening commute congestion';
    } else if (currentHour >= 22 || currentHour < 6) {
      minMinutes += 10;
      maxMinutes += 20;
      trafficText = 'Late night / off-peak dispatch adjustments';
    }

    const now = new Date();
    const startTime = new Date(now.getTime() + minMinutes * 60 * 1000);
    const endTime = new Date(now.getTime() + maxMinutes * 60 * 1000);
    
    const formatClock = (d: Date) => {
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return {
      window: `${minMinutes}-${maxMinutes} mins`,
      clockRange: `${formatClock(startTime)} - ${formatClock(endTime)}`,
      trafficText
    };
  };

  // Auto pre-fill customer if they enter a phone number that is already in database
  useEffect(() => {
    const cleanPhone = phone.trim();
    if (cleanPhone.length >= 7) {
      const customersJson = localStorage.getItem('kipchimatt_customers');
      if (customersJson) {
        const customers: Record<string, Customer> = JSON.parse(customersJson);
        const match = customers[cleanPhone.toLowerCase()];
        if (match) {
          setName(match.name);
          setEmail(match.email || '');
          setAddress(match.address);
          setCity(match.city);
          setCounty(match.county);
        }
      }
    }
  }, [phone]);

  // Reset placedOrder state when modal is closed or opened
  useEffect(() => {
    if (!isOpen) {
      setPlacedOrder(null);
      setNotes('');
      setVoiceActive(false);
      setVoiceStatus('idle');
      setVoiceTranscript('');
    }
  }, [isOpen]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const deliveryFee = subtotal >= settings.freeDeliveryThreshold || subtotal === 0 ? 0 : settings.deliveryFee;
  const total = subtotal + deliveryFee;

  // Real Speech Recognition handler
  const startSpeechRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus('error');
      setVoiceTranscript("Speech Recognition is not supported by your browser's current container.");
      return;
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'en-US';
      rec.interimResults = false;

      setVoiceStatus('listening');
      setVoiceTranscript("Listening... say 'Place Order' or 'Confirm Purchase'.");

      rec.onresult = (event: any) => {
        const text = event.results[0][0].transcript.toLowerCase();
        setVoiceTranscript(`Received: "${text}"`);
        if (text.includes('place') || text.includes('confirm') || text.includes('finalize') || text.includes('buy') || text.includes('finish') || text.includes('purchase')) {
          setVoiceStatus('success');
          setVoiceTranscript("Voice command matched! Placing your Kipchimatt order...");
          setTimeout(() => {
            handleSubmit();
          }, 1500);
        } else {
          setVoiceStatus('idle');
        }
      };

      rec.onerror = () => {
        setVoiceStatus('error');
        setVoiceTranscript("Mic blocked in iframe preview. Try Simulated Voice Command badges below!");
      };

      rec.onend = () => {
        // Automatically turn off listening if not success/error state
      };

      rec.start();
    } catch (e) {
      setVoiceStatus('error');
      setVoiceTranscript("Failed to start voice listener.");
    }
  };

  // Simulated Voice Commands (100% testable in any sandboxed browser)
  const triggerSimulatedCommand = (command: 'place_order' | 'fill_mock' | 'clear') => {
    setVoiceActive(true);
    setVoiceStatus('listening');
    setVoiceTranscript("Simulating voice input...");

    setTimeout(() => {
      if (command === 'place_order') {
        setVoiceTranscript(`Spoken voice command detected: "Place Order Now"`);
        setVoiceStatus('success');
        setTimeout(() => {
          handleSubmit();
        }, 1200);
      } else if (command === 'fill_mock') {
        setVoiceTranscript(`Spoken voice command detected: "Fill demo details"`);
        setVoiceStatus('success');
        setName("John Kamau");
        setPhone("0712345678");
        setEmail("john.kamau@gmail.com");
        setAddress("Apt 4B, Silver Oak Residence, Westlands");
        setCity("Nairobi");
        setCounty("Nairobi");
        setNotes("Rider should ring bell at the gate.");
        setPinX(5);
        setPinY(3);
        setTimeout(() => {
          setVoiceStatus('idle');
          setVoiceTranscript("Demo details populated successfully via voice command!");
        }, 1200);
      } else if (command === 'clear') {
        setVoiceTranscript(`Spoken voice command detected: "Clear form fields"`);
        setVoiceStatus('success');
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setCity("");
        setNotes("");
        setTimeout(() => {
          setVoiceStatus('idle');
          setVoiceTranscript("Form cleared!");
        }, 1200);
      }
    }, 1000);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !county) {
      return;
    }

    const customerData: Customer = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
      city: city.trim(),
      county: county
    };

    // Combine notes with precision GPS Pin Reference
    const finalNotes = `${notes.trim()} (GPS Drop-off: Lon 36.8${(pinX + 1) * 2}°, Lat -1.2${(pinY + 1) * 2}°)`.trim();

    const orderObj = onPlaceOrder(customerData, payment, finalNotes);
    if (orderObj) {
      setPlacedOrder(orderObj);
    }
  };

  if (!isOpen) return null;

  if (placedOrder) {
    const handlePrint = () => {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to print your receipt!');
        return;
      }
      const earnedPoints = Math.floor(placedOrder.subtotal / 100);
      const itemsHtml = placedOrder.items.map(item => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px dashed #eee;">${item.name} x${item.qty}</td>
          <td style="padding: 8px 0; border-bottom: 1px dashed #eee; text-align: right;">Ksh ${item.price * item.qty}</td>
        </tr>
      `).join('');

      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt #${placedOrder.id.slice(-6).toUpperCase()} - Kipchimatt Supermarket</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
              body {
                font-family: 'Courier Prime', 'Courier', monospace;
                max-width: 400px;
                margin: 0 auto;
                padding: 20px;
                color: #333;
                font-size: 14px;
                line-height: 1.4;
              }
              .header {
                text-align: center;
                margin-bottom: 20px;
                border-bottom: 2px dashed #000;
                padding-bottom: 15px;
              }
              .title {
                font-size: 18px;
                font-weight: bold;
                margin: 0;
                text-transform: uppercase;
              }
              .subtitle {
                font-size: 11px;
                color: #666;
                margin: 5px 0 0 0;
              }
              .info-table, .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 15px;
              }
              .info-table td {
                padding: 3px 0;
                font-size: 12px;
              }
              .items-table th {
                border-bottom: 1px solid #000;
                padding: 5px 0;
                text-align: left;
                font-size: 12px;
              }
              .totals {
                border-top: 2px dashed #000;
                padding-top: 10px;
                margin-top: 10px;
              }
              .total-row {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
                padding: 3px 0;
              }
              .grand-total {
                font-size: 16px;
                font-weight: bold;
                border-top: 1px solid #000;
                padding-top: 5px;
                margin-top: 5px;
              }
              .loyalty-box {
                border: 1px dashed #000;
                padding: 10px;
                text-align: center;
                margin: 20px 0;
                font-size: 12px;
              }
              .footer {
                text-align: center;
                font-size: 11px;
                margin-top: 30px;
                color: #666;
              }
              @media print {
                body { margin: 0; padding: 10px; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <p class="title">${settings.storeName}</p>
              <p class="subtitle">Phone: ${settings.storePhone} | Email: ${settings.storeEmail}</p>
              <p class="subtitle">Date: ${new Date(placedOrder.date).toLocaleString('en-KE')}</p>
            </div>

            <table class="info-table">
              <tr>
                <td><strong>Order ID:</strong></td>
                <td style="text-align: right;">#${placedOrder.id}</td>
              </tr>
              <tr>
                <td><strong>Customer:</strong></td>
                <td style="text-align: right;">${placedOrder.customer.name}</td>
              </tr>
              <tr>
                <td><strong>Phone:</strong></td>
                <td style="text-align: right;">${placedOrder.customer.phone}</td>
              </tr>
              <tr>
                <td><strong>Delivery to:</strong></td>
                <td style="text-align: right;">${placedOrder.customer.address}, ${placedOrder.customer.city}</td>
              </tr>
              <tr>
                <td><strong>Payment:</strong></td>
                <td style="text-align: right; text-transform: uppercase;">${placedOrder.payment}</td>
              </tr>
            </table>

            <table class="items-table">
              <thead>
                <tr>
                  <th style="border-bottom: 2px dashed #000;">Item</th>
                  <th style="border-bottom: 2px dashed #000; text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="totals">
              <div class="total-row">
                <span>Subtotal:</span>
                <span>Ksh ${placedOrder.subtotal.toLocaleString('en-KE')}</span>
              </div>
              <div class="total-row">
                <span>Delivery Fee:</span>
                <span>${placedOrder.deliveryFee === 0 ? 'FREE' : 'Ksh ' + placedOrder.deliveryFee.toLocaleString('en-KE')}</span>
              </div>
              <div class="total-row grand-total">
                <span>GRAND TOTAL:</span>
                <span>Ksh ${placedOrder.total.toLocaleString('en-KE')}</span>
              </div>
            </div>

            <div class="loyalty-box">
              <p style="margin: 0; font-weight: bold; text-transform: uppercase;">Kipchimatt Loyalty Club</p>
              <p style="margin: 4px 0 0 0;">Points Earned: +${earnedPoints}</p>
              <p style="margin: 2px 0 0 0; font-weight: bold;">New Balance: ${placedOrder.customer.points || 0} pts</p>
            </div>

            <div class="footer">
              <p>Thank you for shopping at Kipchimatt!</p>
              <p>We deliver freshness in 90 Mins.</p>
              <p style="font-size: 9px; margin-top: 15px;">Powered by Kipchimatt Kikapu POS</p>
            </div>

            <div style="text-align: center; margin-top: 20px;" class="no-print">
              <button onclick="window.print();" style="padding: 10px 20px; background: #782045; color: white; border: none; border-radius: 5px; font-family: sans-serif; font-weight: bold; cursor: pointer;">
                Print Receipt
              </button>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };

    const earnedPoints = Math.floor(placedOrder.subtotal / 100);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-up border border-gray-150 p-6 flex flex-col items-center text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner animate-bounce mt-4">
            <CheckCircle className="w-10 h-10" />
          </div>
          
          <div className="space-y-1">
            <h3 className="text-xl font-black text-[#782045]">Asante Sana!</h3>
            <p className="text-sm font-bold text-gray-800">Your order has been placed successfully!</p>
            <p className="text-xs text-gray-500 font-semibold">Order Reference: #{placedOrder.id.slice(-6).toUpperCase()}</p>
          </div>

          {/* Loyalty Points Gained Display */}
          <div className="w-full bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-100">
                <Award className="w-6 h-6 fill-current" />
              </div>
              <div className="text-left text-xs">
                <span className="text-[9px] bg-amber-600 text-white font-black uppercase px-2 py-0.5 rounded-full tracking-wider inline-block mb-0.5 shadow-sm">
                  Loyalty Points Gained
                </span>
                <p className="font-extrabold text-gray-800">+{earnedPoints} Points Earned!</p>
              </div>
            </div>
            <div className="text-right text-xs">
              <span className="text-[9px] text-gray-400 font-bold block uppercase tracking-wider">New Balance</span>
              <span className="text-sm font-black text-[#782045]">{placedOrder.customer.points || 0} pts</span>
            </div>
          </div>

          {/* Order Brief Summary */}
          <div className="w-full bg-gray-50 border border-gray-150 rounded-2xl p-4 text-xs text-left space-y-3 font-semibold text-gray-600">
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="font-bold text-gray-400 uppercase tracking-wide text-[10px]">Recipient</span>
              <span className="text-gray-800 font-extrabold">{placedOrder.customer.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="font-bold text-gray-400 uppercase tracking-wide text-[10px]">Delivery to</span>
              <span className="text-gray-800 font-extrabold text-right max-w-[220px] line-clamp-1">{placedOrder.customer.address}, {placedOrder.customer.city}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-2">
              <span className="font-bold text-gray-400 uppercase tracking-wide text-[10px]">Payment Method</span>
              <span className="text-gray-800 font-extrabold uppercase">{placedOrder.payment}</span>
            </div>
            <div className="flex justify-between pt-1 font-bold">
              <span>Grand Total Paid</span>
              <span className="text-sm font-black text-[#782045]">{formatMoney(placedOrder.total)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4 text-[#782045]" />
              <span>Print Thermal Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-[#782045] hover:bg-[#4a1028] text-white font-bold text-xs py-3.5 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-slide-up">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-white sticky top-0 z-10">
          <h3 className="font-extrabold text-[#782045] text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#782045]" />
            <span>Secure Checkout</span>
          </h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Order Summary box */}
          <div className="bg-gray-50 border border-gray-150 rounded-xl p-4.5 space-y-3 text-xs">
            <h4 className="font-extrabold text-[#782045] flex items-center gap-1.5 text-xs">
              <Receipt className="w-4 h-4" />
              <span>Order Summary</span>
            </h4>
            
            <div className="max-h-[150px] overflow-y-auto space-y-2.5 pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-center text-gray-600 font-medium">
                  <span className="line-clamp-1">{item.name} <strong className="text-gray-800 font-extrabold">x{item.qty}</strong></span>
                  <span className="font-bold whitespace-nowrap">{formatMoney(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200/60 pt-3 space-y-1.5 font-bold text-gray-500">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : formatMoney(deliveryFee)}</span>
              </div>
              <div className="flex justify-between items-center text-[#782045] font-black text-sm pt-2.5 border-t border-gray-250">
                <span>Total Amount Due</span>
                <span>{formatMoney(total)}</span>
              </div>
            </div>

            {county && (
              <div className="mt-4 bg-[#782045]/5 dark:bg-[#782045]/10 border border-[#782045]/15 p-3 rounded-xl space-y-1 text-left">
                <div className="flex items-center gap-1.5 text-[#782045] font-extrabold text-[10px] uppercase tracking-wider">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#782045] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#782045]"></span>
                  </span>
                  <span>Estimated Arrival Time</span>
                </div>
                <div>
                  <div className="text-gray-800 dark:text-gray-100 font-black text-xs">
                    Expect delivery in <span className="text-emerald-600 dark:text-emerald-400 font-black underline">{getDeliveryEstimate(county).window}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 dark:text-gray-400 font-bold mt-0.5">
                    Estimated window: <strong className="text-gray-700 dark:text-gray-200">{getDeliveryEstimate(county).clockRange}</strong>
                  </div>
                  <div className="text-[9px] text-gray-400 dark:text-gray-500 italic font-medium">
                    ({getDeliveryEstimate(county).trafficText} to {county} County)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery & Billing form */}
          <form id="checkout-billing-form" onSubmit={(e) => handleSubmit(e)} className="space-y-5 text-xs font-semibold text-gray-700">
            <h4 className="font-extrabold text-gray-800 text-xs border-b border-gray-100 pb-1.5 mb-2 flex items-center gap-1.5 uppercase tracking-wide">
              <FileText className="w-4 h-4 text-[#782045]" />
              <span>Recipient & Delivery Address</span>
            </h4>

            {/* VOICE COMMAND CONTROL PANEL */}
            <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-100 text-[#782045] rounded-xl">
                    <Mic className={`w-4 h-4 ${voiceStatus === 'listening' ? 'animate-pulse text-red-500' : ''}`} />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-gray-800 text-xs">Voice Command Assistant</h5>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Checkout spoken shortcuts</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const nextVal = !voiceActive;
                    setVoiceActive(nextVal);
                    if (nextVal) {
                      startSpeechRecognition();
                    } else {
                      setVoiceStatus('idle');
                      setVoiceTranscript('');
                    }
                  }}
                  className={`px-3 py-1.5 rounded-xl font-extrabold text-[10px] uppercase transition-all tracking-wide cursor-pointer border ${
                    voiceActive 
                      ? 'bg-[#782045] text-white border-transparent' 
                      : 'bg-white hover:bg-gray-50 text-[#782045] border-gray-200'
                  }`}
                >
                  {voiceActive ? 'Disable Assistant' : 'Enable Assistant'}
                </button>
              </div>

              {voiceActive && (
                <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2.5 text-xs animate-scale-up">
                  <div className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-150">
                    <span className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Microphone Status</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase flex items-center gap-1 ${
                      voiceStatus === 'listening' ? 'bg-red-50 text-red-600 animate-pulse' :
                      voiceStatus === 'success' ? 'bg-emerald-50 text-emerald-600' :
                      voiceStatus === 'error' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        voiceStatus === 'listening' ? 'bg-red-500' :
                        voiceStatus === 'success' ? 'bg-emerald-500' :
                        voiceStatus === 'error' ? 'bg-amber-500' : 'bg-gray-400'
                      }`} />
                      {voiceStatus}
                    </span>
                  </div>

                  {/* Audio Visualizer Waves */}
                  {voiceStatus === 'listening' && (
                    <div className="flex items-center gap-1 justify-center py-2 bg-slate-50 rounded-lg">
                      <div className="w-1 h-3 bg-[#782045] rounded animate-bounce [animation-delay:0.1s]" />
                      <div className="w-1 h-5 bg-[#782045] rounded animate-bounce [animation-delay:0.3s]" />
                      <div className="w-1 h-7 bg-[#782045] rounded animate-bounce [animation-delay:0.5s]" />
                      <div className="w-1 h-4 bg-[#782045] rounded animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1 h-2 bg-[#782045] rounded animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}

                  {voiceTranscript && (
                    <p className="p-2.5 bg-amber-50/50 border border-amber-200/50 rounded-lg text-amber-900 font-mono text-[10px] leading-normal font-medium whitespace-pre-line">
                      {voiceTranscript}
                    </p>
                  )}

                  {/* Simulated Voice Buttons */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1">Simulated Voice Triggers (Iframe Safe)</span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => triggerSimulatedCommand('fill_mock')}
                        className="bg-sky-50 hover:bg-sky-100 text-sky-700 font-black text-[10px] px-2.5 py-1.5 rounded-lg border border-sky-100 transition-colors cursor-pointer"
                      >
                        🗣️ "Fill demo details"
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerSimulatedCommand('place_order')}
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-[10px] px-2.5 py-1.5 rounded-lg border border-emerald-100 transition-colors cursor-pointer"
                      >
                        🗣️ "Confirm purchase now"
                      </button>
                      <button
                        type="button"
                        onClick={() => triggerSimulatedCommand('clear')}
                        className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-[10px] px-2.5 py-1.5 rounded-lg border border-rose-100 transition-colors cursor-pointer"
                      >
                        🗣️ "Clear form fields"
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">Full Name *</label>
              <input 
                type="text" 
                required 
                placeholder="e.g., John Kamau"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] font-medium transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="07XX XXX XXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">Email Address (Optional)</label>
                <input 
                  type="email" 
                  placeholder="john.kamau@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] font-medium transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">Physical Delivery Address *</label>
              <textarea 
                rows={2}
                required 
                placeholder="Street name, Estate name, Apartment / Building & House No."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] font-medium transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">City / Town *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Nairobi"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] font-medium transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">County *</label>
                <select 
                  required
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] bg-white transition-colors"
                >
                  <option value="">Select County</option>
                  <option value="Nairobi">Nairobi</option>
                  <option value="Kiambu">Kiambu</option>
                  <option value="Kajiado">Kajiado</option>
                  <option value="Machakos">Machakos</option>
                  <option value="Mombasa">Mombasa</option>
                  <option value="Nakuru">Nakuru</option>
                  <option value="Kisumu">Kisumu</option>
                </select>
              </div>
            </div>

            {/* Special Instructions / Order Notes */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">Special Delivery Instructions & Order Notes (Optional)</label>
              <textarea 
                rows={2}
                placeholder="Provide gate codes, landmark cues, instructions for the rider, or special grocery packaging instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] font-medium transition-colors"
              />
            </div>

            {/* Interactive GPS Coordinate Grid Location Selector */}
            <div className="space-y-2 border border-slate-100 p-4 rounded-2xl bg-slate-50/50">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-gray-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-[#782045]" />
                <span>Precision GPS Pin Drop-Off Map</span>
              </label>
              <p className="text-[10px] text-gray-500 font-semibold leading-relaxed">
                Click a grid square below to precisely mark your drop-off coordinates for our supermarket riders.
              </p>
              
              <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 space-y-3">
                {/* 5x8 Visual Map Selector Grid */}
                <div className="grid grid-cols-8 gap-1 aspect-video w-full bg-slate-950 rounded-lg p-2.5 relative overflow-hidden">
                  <div className="absolute inset-0 border border-emerald-500/5 rounded-full pointer-events-none scale-75 animate-pulse" />
                  <div className="absolute inset-0 border border-emerald-500/10 rounded-full pointer-events-none scale-50" />
                  
                  {Array.from({ length: 5 }).map((_, r) => (
                    Array.from({ length: 8 }).map((_, c) => {
                      const isSelected = pinX === c && pinY === r;
                      return (
                        <button
                          key={`${r}-${c}`}
                          type="button"
                          onClick={() => {
                            setPinX(c);
                            setPinY(r);
                          }}
                          className={`aspect-square rounded flex items-center justify-center transition-all cursor-pointer relative hover:scale-110 border ${
                            isSelected 
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-lg shadow-emerald-500/20 z-10' 
                              : 'bg-slate-800/30 hover:bg-slate-700/50 border-slate-700/10'
                          }`}
                          title={`Lon: 36.8${(c + 1) * 2}°, Lat: -1.2${(r + 1) * 2}°`}
                        >
                          {isSelected && (
                            <span className="absolute w-2 h-2 rounded-full bg-white animate-ping" />
                          )}
                          <span className="text-[8px] scale-75 text-slate-500 pointer-events-none select-none font-mono">
                            {isSelected ? '🎯' : `${c + 1},${r + 1}`}
                          </span>
                        </button>
                      );
                    })
                  ))}
                </div>
                
                {/* Current Coordinates indicators */}
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-400 bg-slate-950 px-3 py-2 rounded-lg border border-slate-800/60">
                  <span className="flex items-center gap-1 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Coordinates Dropped
                  </span>
                  <span>
                    Lon: 36.8{(pinX + 1) * 2}°, Lat: -1.2{(pinY + 1) * 2}°
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider mb-1.5">Preferred Payment Method *</label>
              <select 
                required
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 outline-none focus:border-[#782045] bg-white transition-colors animate-none"
              >
                <option value="mpesa">M-Pesa (Pay-on-Delivery / On-site prompt)</option>
                <option value="card">Credit or Debit Card</option>
                <option value="cash">Cash-on-Delivery (Pay Cash to Rider)</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#782045] hover:bg-[#4a1028] text-white font-bold text-sm py-4 rounded-full flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md mt-6"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Confirm & Place Order ({formatMoney(total)})</span>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
