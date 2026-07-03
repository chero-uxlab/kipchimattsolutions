import React, { useState } from 'react';
import { 
  X, User, Award, MapPin, Phone, Mail, Search, 
  CheckCircle, Truck, Package, ShoppingBag, AlertCircle, Sparkles
} from 'lucide-react';
import { Customer, Order } from '../types';
import { formatMoney, formatDate } from '../data/catalog';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
  orders: Order[];
  onLoginCustomer: (phone: string) => void;
  onLogoutCustomer: () => void;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  customer,
  orders,
  onLoginCustomer,
  onLogoutCustomer
}: UserProfileModalProps) {
  const [phoneInput, setPhoneInput] = useState('');
  const [orderSearchId, setOrderSearchId] = useState('');
  const [searchError, setSearchError] = useState('');
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  // Badge configuration based on customer points
  const getBadgeDetails = (pts: number) => {
    if (pts >= 750) {
      return {
        label: 'Loyalty Legend',
        color: 'from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 text-white',
        border: 'border-purple-300 dark:border-purple-800',
        textColor: 'text-purple-600 dark:text-purple-400',
        desc: 'Ultimate VIP Status! Enjoy free delivery and premium support priority dispatch.'
      };
    }
    if (pts >= 300) {
      return {
        label: 'Super Shopper',
        color: 'from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 text-white',
        border: 'border-emerald-300 dark:border-emerald-800',
        textColor: 'text-emerald-600 dark:text-emerald-400',
        desc: 'Valued Regular Customer. Unlocked expedited shipping priority dispatch.'
      };
    }
    if (pts >= 100) {
      return {
        label: 'Silver Saver',
        color: 'from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-650 text-white',
        border: 'border-amber-300 dark:border-amber-800',
        textColor: 'text-amber-600 dark:text-amber-400',
        desc: 'Discounts Contender! Collecting points toward epic free gift baskets.'
      };
    }
    return {
      label: 'Bronze Basket',
      color: 'from-gray-500 to-slate-600 dark:from-gray-650 dark:to-slate-700 text-white',
      border: 'border-gray-200 dark:border-gray-800',
      textColor: 'text-gray-500 dark:text-gray-400',
      desc: 'Savings Starter! Placing orders unlocks silver, super shopper & legend status.'
    };
  };

  // Filter orders for the logged-in customer
  const customerOrders = customer
    ? orders.filter(o => o.customer.phone.trim().toLowerCase() === customer.phone.trim().toLowerCase())
    : [];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneInput.trim()) return;
    onLoginCustomer(phoneInput.trim());
    setPhoneInput('');
    setSearchError('');
  };

  const handleTrackOrderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = orderSearchId.trim().toUpperCase();
    if (!cleanId) return;

    // Find order matching ID (fully or last 6 characters)
    const found = orders.find(
      o => o.id.toUpperCase() === cleanId || o.id.slice(-6).toUpperCase() === cleanId
    );

    if (found) {
      setSelectedTrackOrder(found);
      setSearchError('');
    } else {
      setSelectedTrackOrder(null);
      setSearchError('Order not found. Please verify your Order ID.');
    }
  };

  // Get status stage for tracking timeline
  const getTrackingStages = (status: Order['status']) => {
    // Stage 1: Pending, Stage 2: Dispatched (processing), Stage 3: Delivered (completed)
    const stages = [
      {
        key: 'pending',
        label: 'Pending',
        desc: 'Gathering fresh items at Supermarket',
        isActive: true,
        isCompleted: status === 'processing' || status === 'completed',
        icon: Package
      },
      {
        key: 'processing',
        label: 'Dispatched',
        desc: 'On the way with Kikapu Rider',
        isActive: status === 'processing' || status === 'completed',
        isCompleted: status === 'completed',
        icon: Truck
      },
      {
        key: 'completed',
        label: 'Delivered',
        desc: 'Arrived at your doorstep safely',
        isActive: status === 'completed',
        isCompleted: status === 'completed',
        icon: CheckCircle
      }
    ];
    return stages;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-up border border-gray-150 dark:border-gray-800 flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-[#782045]/5 dark:bg-[#782045]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#782045]/10 text-[#782045] flex items-center justify-center">
              <User className="w-5.5 h-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-800 dark:text-gray-100 uppercase tracking-tight">Kikapu Customer Lounge</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Track orders, manage loyalty points, and check out faster</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          {/* PROFILE VIEW OR LOGIN */}
          {customer ? (
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/40 dark:from-gray-800/50 dark:to-gray-900/40 border border-gray-150 dark:border-gray-800 rounded-2xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200/50 dark:border-gray-850 pb-4">
                <div>
                  <h4 className="text-base font-extrabold text-gray-800 dark:text-gray-100">{customer.name}</h4>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-500 dark:text-gray-400 font-semibold">
                    <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-gray-400" /> {customer.phone}</span>
                    {customer.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-gray-400" /> {customer.email}</span>}
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-gray-400" /> {customer.address}, {customer.city}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/10 border border-amber-200 dark:border-amber-900/60 rounded-xl px-4 py-2.5 shadow-sm">
                  <Award className="w-8 h-8 text-amber-500 fill-amber-500" />
                  <div className="text-left">
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 font-black uppercase tracking-wider block">Kipchimatt Club</span>
                    <span className="text-base font-black text-[#782045] dark:text-pink-400">{customer.points || 0} pts</span>
                  </div>
                </div>
              </div>

              {/* LOYALTY CLUB STATUS BADGE BOX */}
              {(() => {
                const pts = customer.points || 0;
                const badge = getBadgeDetails(pts);
                
                let nextTier = null;
                if (pts < 100) {
                  nextTier = { label: 'Silver Saver', req: 100 - pts };
                } else if (pts < 300) {
                  nextTier = { label: 'Super Shopper', req: 300 - pts };
                } else if (pts < 750) {
                  nextTier = { label: 'Loyalty Legend', req: 750 - pts };
                }

                return (
                  <div className="bg-white dark:bg-gray-900 border border-gray-150 dark:border-gray-800 p-4 rounded-xl space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-wider">Your Member Tier:</span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-gradient-to-r ${badge.color} shadow-sm`}>
                          {badge.label}
                        </span>
                      </div>
                      
                      {nextTier && (
                        <span className="text-[10px] text-[#782045] dark:text-pink-400 font-black bg-[#782045]/5 dark:bg-[#782045]/10 px-2 py-0.5 rounded-md">
                          {nextTier.req} pts to {nextTier.label}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-350 font-bold leading-relaxed">
                      {badge.desc}
                    </div>

                    {/* Simple progress bar */}
                    {nextTier && (
                      <div className="space-y-1">
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-[#782045] dark:bg-pink-500 h-full transition-all duration-500"
                            style={{ 
                              width: `${Math.min(100, (pts / (pts + nextTier.req)) * 100)}%` 
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="flex justify-between items-center text-xs">
                <p className="text-gray-500 dark:text-gray-400 font-medium">To edit details or collect more points, enter this phone number at checkout.</p>
                <button 
                  onClick={onLogoutCustomer}
                  className="text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer transition-colors"
                >
                  Logout Account
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="border border-gray-150 dark:border-gray-800 rounded-2xl p-5 space-y-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>Access Account Portal</span>
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Pre-fill details at checkout and count your supermarket loyalty rewards.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-1">Enter Registered Phone Number</label>
                    <input 
                      type="tel"
                      required
                      placeholder="e.g. 0712345678"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                      className="w-full text-xs font-semibold px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-750 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#782045]/40"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-[#782045] hover:bg-[#4a1028] text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer transition-colors"
                  >
                    Retrieve Account
                  </button>
                </form>
              </div>

              <div className="border border-gray-150 dark:border-gray-800 rounded-2xl p-5 bg-gray-50/50 dark:bg-gray-850/50 space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100">Guest Order Lookup</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Have a Kikapu order receipt reference? Enter the ID to see its delivery progress.</p>
                </div>
                <form onSubmit={handleTrackOrderSearch} className="space-y-3">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Receipt / Order ID (e.g. #9A2F8B)"
                      value={orderSearchId}
                      onChange={(e) => setOrderSearchId(e.target.value)}
                      className="w-full text-xs font-semibold pl-4 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-750 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#782045]/40"
                    />
                    <button 
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#782045]"
                    >
                      <Search className="w-4 h-4" />
                    </button>
                  </div>
                  {searchError && (
                    <p className="text-[11px] font-semibold text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{searchError}</span>
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {/* DYNAMIC TIMELINE COMPONENT FOR DETAILED ORDER TRACKING */}
          {selectedTrackOrder && (
            <div className="border border-amber-200 dark:border-amber-900/60 bg-amber-500/5 dark:bg-amber-950/10 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center border-b border-amber-200/50 dark:border-amber-900/40 pb-3">
                <div>
                  <span className="text-[9px] bg-[#782045] text-white font-black uppercase px-2 py-0.5 rounded-full tracking-wider inline-block">Order Live Track</span>
                  <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100 mt-1">Order #{selectedTrackOrder.id.slice(-6).toUpperCase()}</h4>
                </div>
                <button 
                  onClick={() => setSelectedTrackOrder(null)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  Clear Track
                </button>
              </div>

              {selectedTrackOrder.status === 'cancelled' ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-bold">This order has been cancelled</p>
                    <p className="text-[10px] text-red-500 mt-0.5">Please contact customer support at {orders[0]?.customer.county} offices if this was an error.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 pt-2">
                  {/* Order Tracking Timeline Stages */}
                  <div className="grid grid-cols-3 relative">
                    {/* Background Progress Bar Line */}
                    <div className="absolute top-5 left-[16%] right-[16%] h-1 bg-gray-200 dark:bg-gray-800 z-0">
                      <div 
                        className="h-full bg-emerald-600 transition-all duration-500"
                        style={{
                          width: selectedTrackOrder.status === 'pending' ? '0%' : selectedTrackOrder.status === 'processing' ? '50%' : '100%'
                        }}
                      />
                    </div>

                    {getTrackingStages(selectedTrackOrder.status).map((stage, idx) => {
                      const Icon = stage.icon;
                      return (
                        <div key={stage.key} className="flex flex-col items-center text-center z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                            stage.isCompleted 
                              ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                              : stage.isActive 
                              ? 'bg-amber-500 border-amber-500 text-white animate-pulse shadow'
                              : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="mt-2.5">
                            <span className={`text-xs font-bold block ${stage.isActive ? 'text-gray-800 dark:text-gray-100 font-black' : 'text-gray-400'}`}>
                              {stage.label}
                            </span>
                            <span className="text-[9px] text-gray-400 font-semibold block mt-0.5 leading-tight max-w-[120px] mx-auto hidden sm:block">
                              {stage.desc}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-white dark:bg-gray-850 rounded-xl p-3 border border-gray-150 dark:border-gray-800 flex justify-between items-center text-xs text-gray-600 dark:text-gray-400 font-semibold">
                    <span>Payment: <strong className="text-gray-800 dark:text-gray-200 uppercase">{selectedTrackOrder.payment}</strong></span>
                    <span>Grand Total: <strong className="text-[#782045] dark:text-pink-400">{formatMoney(selectedTrackOrder.total)}</strong></span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ORDERS HISTORY LIST FOR CUSTOMER */}
          {customer && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-[#782045]" />
                <span>Your Order History ({customerOrders.length})</span>
              </h4>

              {customerOrders.length === 0 ? (
                <div className="text-center py-10 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                  <Package className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">No orders found for this phone number.</p>
                  <p className="text-[10px] text-gray-400 mt-1">Start shopping and place your first order to collect rewards!</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  {customerOrders.map(order => (
                    <div 
                      key={order.id} 
                      onClick={() => setSelectedTrackOrder(order)}
                      className={`p-4 border rounded-xl transition-all text-left cursor-pointer flex justify-between items-center ${
                        selectedTrackOrder?.id === order.id 
                          ? 'border-amber-400 bg-amber-500/5 dark:border-amber-800' 
                          : 'border-gray-150 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-750 hover:bg-gray-50 dark:hover:bg-gray-850'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs text-gray-800 dark:text-gray-100">Order #{order.id.slice(-6).toUpperCase()}</span>
                          <span className="text-[10px] text-gray-400 font-bold">{formatDate(order.date)}</span>
                        </div>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold truncate max-w-[280px]">
                          {order.items.map(item => `${item.name} x${item.qty}`).join(', ')}
                        </p>
                      </div>

                      <div className="text-right space-y-1.5 flex-shrink-0">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          order.status === 'pending' 
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' 
                            : order.status === 'processing'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400'
                            : order.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : 'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400'
                        }`}>
                          {order.status === 'processing' ? 'Dispatched' : order.status === 'completed' ? 'Delivered' : order.status}
                        </span>
                        <p className="font-extrabold text-xs text-[#782045] dark:text-pink-400">{formatMoney(order.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
