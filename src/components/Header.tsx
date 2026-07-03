import React, { useState } from 'react';
import { 
  Phone, MapPin, Truck, Lock, Menu, Search, User, Heart, ShoppingCart, 
  X, LayoutGrid, LogOut, Store, ArrowRight, Mic, MicOff, Sun, Moon
} from 'lucide-react';
import { StoreSettings, CategoryMeta } from '../types';
import { categoryMeta, formatMoney } from '../data/catalog';

interface HeaderProps {
  settings: StoreSettings;
  currentView: 'shop' | 'admin';
  onViewChange: (view: 'shop' | 'admin') => void;
  onSearch: (query: string) => void;
  onCategorySelect: (cat: string) => void;
  onToggleCart: () => void;
  onToggleWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
  deliveryLocation: string;
  onDeliveryLocationChange: (county: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleUserProfile: () => void;
}

export default function Header({
  settings,
  currentView,
  onViewChange,
  onSearch,
  onCategorySelect,
  onToggleCart,
  onToggleWishlist,
  cartCount,
  wishlistCount,
  deliveryLocation,
  onDeliveryLocationChange,
  isLoggedIn,
  onLogout,
  isDark,
  onToggleTheme,
  onToggleUserProfile
}: HeaderProps) {
  const [searchVal, setSearchVal] = useState('');
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const startVoiceListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice search is not fully supported in this browser. Please try Google Chrome or Edge.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchVal(transcript);
        onSearch(transcript);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchVal);
  };

  const selectCategory = (catKey: string) => {
    onCategorySelect(catKey);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#4a1028] text-white/90 text-xs py-2 px-4 shadow-sm z-50 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-white/70" />
              <span>{settings.storePhone}</span>
            </span>
            <span className="h-3 w-px bg-white/25 hidden sm:inline" />
            <div className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-white hover:bg-white/15 transition-colors cursor-pointer">
              <MapPin className="w-3.5 h-3.5 text-white/85" />
              <span className="text-[11px] font-semibold">Deliver to:</span>
              <select 
                value={deliveryLocation}
                onChange={(e) => onDeliveryLocationChange(e.target.value)}
                className="bg-transparent border-none text-white font-bold outline-none cursor-pointer text-[11px] pr-1"
                style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
              >
                <option value="Nairobi" className="text-gray-800">Nairobi</option>
                <option value="Kiambu" className="text-gray-800">Kiambu</option>
                <option value="Kajiado" className="text-gray-800">Kajiado</option>
                <option value="Machakos" className="text-gray-800">Machakos</option>
                <option value="Mombasa" className="text-gray-800">Mombasa</option>
                <option value="Nakuru" className="text-gray-800">Nakuru</option>
                <option value="Kisumu" className="text-gray-800">Kisumu</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 font-medium text-center sm:text-left">
            <Truck className="w-4 h-4 text-white/80" />
            <span>Free delivery on orders over {formatMoney(settings.freeDeliveryThreshold)} | 90 Mins Delivery</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Google Translate Select Container */}
            <div id="google_translate_element" className="inline-block" />
            
            <span className="h-3 w-px bg-white/25" />

            {currentView === 'shop' ? (
              <button 
                onClick={() => onViewChange('admin')}
                className="flex items-center gap-1 hover:text-white transition-colors font-semibold"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Admin Portal</span>
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => onViewChange('shop')}
                  className="flex items-center gap-1 hover:text-white transition-colors font-semibold"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>View Storefront</span>
                </button>
                {isLoggedIn && (
                  <>
                    <span className="h-3 w-px bg-white/25" />
                    <button 
                      onClick={onLogout}
                      className="flex items-center gap-1 hover:text-red-300 transition-colors font-semibold text-red-200"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Logout</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-[#782045] py-3 px-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Hamburger Menu (Mobile) */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-white hover:opacity-85 cursor-pointer p-1"
            aria-label="Toggle Navigation"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Brand Logo & Title */}
          <div 
            onClick={() => onViewChange('shop')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 shadow-sm border border-white/20">
              <Store className="w-6 h-6 text-[#782045]" />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl tracking-tight leading-none">Kipchimatt</span>
              <span className="text-white/60 text-[9px] uppercase tracking-widest font-bold">Supermarket</span>
            </div>
          </div>

          {/* Shop Categories Mega Dropdown Trigger */}
          <button 
            onClick={() => setMegaMenuOpen(true)}
            className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full text-sm cursor-pointer transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>Categories</span>
          </button>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg relative">
            <input 
              type="text" 
              placeholder="Search groceries, essentials, household, liquor..." 
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full py-2.5 pl-5 pr-20 rounded-full border-none bg-white text-gray-800 placeholder-gray-400 font-medium text-sm shadow-inner focus:outline-none focus:ring-3 focus:ring-white/30 transition-all"
            />
            <button 
              type="button"
              onClick={startVoiceListening}
              className={`absolute right-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all ${isListening ? 'bg-red-500 text-white animate-pulse shadow-md ring-4 ring-red-100' : 'text-gray-400 hover:text-[#782045] hover:bg-gray-100'}`}
              title="Search hands-free with voice"
            >
              {isListening ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
            <button 
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#9c2b5b] hover:bg-[#4a1028] text-white flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Right Hand Actions */}
          <div className="flex items-center gap-4 text-white">
            {currentView === 'shop' && (
              <>
                <button 
                  onClick={onToggleUserProfile}
                  className="hidden sm:flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer text-center"
                >
                  <User className="w-5 h-5" />
                  <span className="text-[10px] font-bold">Account</span>
                </button>

                <button 
                  onClick={onToggleTheme}
                  className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer text-center"
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-gray-200" />}
                  <span className="text-[10px] font-bold hidden md:inline">Theme</span>
                </button>

                <button 
                  onClick={onToggleWishlist}
                  className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer text-center relative"
                  aria-label="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-[10px] font-bold hidden md:inline">Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-1 bg-amber-600 text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button 
                  onClick={onToggleCart}
                  className="flex flex-col items-center gap-0.5 hover:opacity-80 transition-opacity cursor-pointer text-center relative"
                  aria-label="Cart"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-[10px] font-bold hidden md:inline">Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white text-[9px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center shadow-sm animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Quick Category Navigation Bar */}
      {currentView === 'shop' && (
        <nav className="bg-white border-b border-gray-200 sticky top-[64px] z-30 shadow-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-1.5 overflow-x-auto py-2 scrollbar-none">
            {categoryMeta.slice(0, 9).map((cat) => (
              <button
                key={cat.key}
                onClick={() => selectCategory(cat.key)}
                className="px-4 py-1.5 rounded-full border border-transparent font-semibold text-xs text-gray-600 hover:bg-[#782045]/5 hover:text-[#782045] whitespace-nowrap transition-all cursor-pointer"
              >
                {cat.label}
              </button>
            ))}
          </div>
        </nav>
      )}

      {/* Mega Menu Overlay & Sidebar */}
      {megaMenuOpen && (
        <>
          <div 
            onClick={() => setMegaMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-50 transition-opacity duration-300"
          />
          <nav className="fixed top-0 left-0 w-[340px] max-w-[85%] h-full bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
            <div className="bg-[#782045] text-white p-5 flex items-center justify-between sticky top-0">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <LayoutGrid className="w-5 h-5" />
                <span>Shop by Category</span>
              </h3>
              <button 
                onClick={() => setMegaMenuOpen(false)}
                className="text-white hover:opacity-75 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3">
              {categoryMeta.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => selectCategory(cat.key)}
                  className="w-full flex items-center justify-between text-left px-5 py-3.5 border-b border-gray-50 hover:bg-[#782045]/5 group cursor-pointer transition-colors"
                >
                  <span className="font-semibold text-gray-700 group-hover:text-[#782045] text-sm">
                    {cat.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#782045] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </nav>
        </>
      )}

      {/* Mobile Navigation Sidebar */}
      {mobileMenuOpen && (
        <>
          <div 
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-50 transition-opacity"
          />
          <nav className="fixed top-0 left-0 w-[280px] max-w-[80%] h-full bg-white shadow-2xl z-50 flex flex-col">
            <div className="bg-[#782045] text-white p-5 flex items-center gap-3 relative">
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1 border border-white/20">
                <Store className="w-5 h-5 text-[#782045]" />
              </div>
              <h2 className="font-extrabold text-base tracking-tight">Kipchimatt</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-5 right-4 text-white hover:opacity-80 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-3 flex flex-col font-semibold text-sm text-gray-700">
              <button 
                onClick={() => { selectCategory('all'); onViewChange('shop'); }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#782045]/5 flex items-center gap-3 text-gray-800"
              >
                <Store className="w-5 h-5 text-[#782045]" />
                <span>Store Home</span>
              </button>
              <button 
                onClick={() => { setMegaMenuOpen(true); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#782045]/5 flex items-center gap-3 text-gray-800"
              >
                <LayoutGrid className="w-5 h-5 text-[#782045]" />
                <span>All Categories</span>
              </button>
              
              <div className="h-px bg-gray-100 my-2 mx-5" />
              
              <button 
                onClick={() => { onToggleWishlist(); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#782045]/5 flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><Heart className="w-5 h-5 text-[#782045]" /><span>Wishlist</span></span>
                {wishlistCount > 0 && <span className="bg-[#782045] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold">{wishlistCount}</span>}
              </button>
              <button 
                onClick={() => { onToggleCart(); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#782045]/5 flex items-center justify-between"
              >
                <span className="flex items-center gap-3"><ShoppingCart className="w-5 h-5 text-[#782045]" /><span>Cart</span></span>
                {cartCount > 0 && <span className="bg-[#782045] text-white text-[10px] px-2.5 py-0.5 rounded-full font-bold animate-pulse">{cartCount}</span>}
              </button>

              <button 
                onClick={() => { onToggleUserProfile(); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#782045]/5 flex items-center gap-3 text-gray-800"
              >
                <User className="w-5 h-5 text-[#782045]" />
                <span>My Profile / Track Order</span>
              </button>

              <button 
                onClick={() => { onToggleTheme(); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#782045]/5 flex items-center gap-3 text-gray-800"
              >
                {isDark ? <Sun className="w-5 h-5 text-[#782045]" /> : <Moon className="w-5 h-5 text-[#782045]" />}
                <span>{isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
              </button>

              <div className="h-px bg-gray-100 my-2 mx-5" />

              <button 
                onClick={() => { onViewChange('admin'); setMobileMenuOpen(false); }}
                className="w-full text-left px-5 py-3.5 hover:bg-[#782045]/5 flex items-center gap-3"
              >
                <Lock className="w-5 h-5 text-[#782045]" />
                <span>Admin Panel</span>
              </button>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
