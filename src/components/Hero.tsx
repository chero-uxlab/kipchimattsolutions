import { useState, useEffect } from 'react';
import { 
  ChevronLeft, ChevronRight, ShoppingBag, Carrot, Tags, 
  Truck, ShieldCheck, RefreshCw, Headset, Leaf, Star, Sparkles 
} from 'lucide-react';

interface HeroProps {
  onExploreCategory: (cat: string) => void;
  onScrollToDeals: () => void;
  onScrollToBrands: () => void;
}

export default function Hero({ onExploreCategory, onScrollToDeals, onScrollToBrands }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Kipchimatt Supermarket',
      desc: "Fresh groceries, household essentials & more delivered to your doorstep in under 90 minutes across Kenya's key locations.",
      btnText: 'Start Shopping',
      action: onScrollToDeals,
      bgClass: 'bg-gradient-to-r from-[#782045] to-[#4a1028]',
      icon: <ShoppingBag className="w-24 h-24 text-white/10 absolute right-16 bottom-16 -rotate-12 hidden sm:block" />
    },
    {
      id: 2,
      title: 'Mambo Fresh, Every Day',
      desc: 'Farm-fresh fruits, organic veggies, premium dairy, and butchery cuts sourced locally and delivered same-day in pristine condition.',
      btnText: 'Shop Fresh Food',
      action: () => onExploreCategory('fresh food'),
      bgClass: 'bg-gradient-to-r from-emerald-700 to-teal-900',
      icon: <Carrot className="w-24 h-24 text-white/10 absolute right-16 bottom-16 -rotate-12 hidden sm:block" />
    },
    {
      id: 3,
      title: 'Kikapu Chapchap Deals',
      desc: 'Basket-loads of incredible savings, refreshed every morning. Enjoy up to 40% off across every supermarket aisle today.',
      btnText: "See Today's Deals",
      action: onScrollToDeals,
      bgClass: 'bg-gradient-to-r from-amber-700 to-orange-900',
      icon: <Tags className="w-24 h-24 text-white/10 absolute right-16 bottom-16 -rotate-12 hidden sm:block" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="py-6 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[280px] sm:h-[320px] md:h-[350px]">
          <div 
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide) => (
              <div 
                key={slide.id}
                className={`min-w-full h-full flex items-center justify-between p-8 sm:p-12 text-white relative select-none ${slide.bgClass}`}
              >
                <div className="z-10 max-w-lg">
                  <span className="bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-3 inline-block">
                    Kikapu Chapchap
                  </span>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                    {slide.title}
                  </h1>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-medium">
                    {slide.desc}
                  </p>
                  <button 
                    onClick={slide.action}
                    className="flex items-center gap-2 bg-white text-[#782045] font-bold text-xs sm:text-sm py-2.5 px-6 rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{slide.btnText}</span>
                  </button>
                </div>
                {slide.icon}
              </div>
            ))}
          </div>

          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center cursor-pointer transition-colors z-20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center cursor-pointer transition-colors z-20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/45 w-2'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Promo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-gradient-to-br from-amber-50 to-orange-100 border border-amber-200/50 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between shadow-sm group">
            <div className="z-10">
              <span className="text-[10px] font-extrabold text-amber-700 tracking-wider uppercase mb-1 block">Mega Savings</span>
              <h3 className="font-extrabold text-gray-800 text-base mb-1">Today's Hot Deals</h3>
              <p className="text-gray-500 text-xs mb-4">Save up to 40% off on premium food pantry and home items.</p>
            </div>
            <button 
              onClick={onScrollToDeals}
              className="w-fit bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-extrabold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
            >
              Shop Now
            </button>
            <Tags className="w-20 h-20 text-amber-600/10 absolute -right-4 -bottom-4 -rotate-12 group-hover:scale-110 transition-transform" />
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200/50 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between shadow-sm group">
            <div className="z-10">
              <span className="text-[10px] font-extrabold text-emerald-700 tracking-wider uppercase mb-1 block">100% Organic</span>
              <h3 className="font-extrabold text-gray-800 text-base mb-1">Fresh from the Farm</h3>
              <p className="text-gray-500 text-xs mb-4">Fresh handpicked vegetables, fruits, butchery cuts & dairy delivered daily.</p>
            </div>
            <button 
              onClick={() => onExploreCategory('fresh food')}
              className="w-fit bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-extrabold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
            >
              Explore Fresh Food
            </button>
            <Leaf className="w-20 h-20 text-emerald-600/10 absolute -right-4 -bottom-4 -rotate-12 group-hover:scale-110 transition-transform" />
          </div>

          <div className="bg-gradient-to-br from-fuchsia-50 to-purple-100 border border-fuchsia-200/50 rounded-xl p-6 relative overflow-hidden flex flex-col justify-between shadow-sm group">
            <div className="z-10">
              <span className="text-[10px] font-extrabold text-fuchsia-700 tracking-wider uppercase mb-1 block">Best Brands</span>
              <h3 className="font-extrabold text-gray-800 text-base mb-1">Explore by Brand</h3>
              <p className="text-gray-500 text-xs mb-4">Choose from your absolute favorite domestic and global brands.</p>
            </div>
            <button 
              onClick={onScrollToBrands}
              className="w-fit bg-fuchsia-600 hover:bg-fuchsia-700 text-white text-[11px] font-extrabold px-4 py-2 rounded-lg cursor-pointer transition-colors shadow-sm"
            >
              Discover Brands
            </button>
            <Star className="w-20 h-20 text-fuchsia-600/10 absolute -right-4 -bottom-4 -rotate-12 group-hover:scale-110 transition-transform" />
          </div>
        </div>

        {/* Features Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center gap-3.5 shadow-sm hover:border-[#782045]/20 hover:shadow transition-all">
            <div className="w-12 h-12 rounded-lg bg-[#782045]/5 text-[#782045] flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">90-Min Delivery</h4>
              <p className="text-gray-500 text-xs mt-0.5">Prompt & active across key counties</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center gap-3.5 shadow-sm hover:border-[#782045]/20 hover:shadow transition-all">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Secure Payments</h4>
              <p className="text-gray-500 text-xs mt-0.5">M-Pesa, card & cash-on-delivery</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center gap-3.5 shadow-sm hover:border-[#782045]/20 hover:shadow transition-all">
            <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">Easy Returns</h4>
              <p className="text-gray-500 text-xs mt-0.5">Hassle-free 7-day return policy</p>
            </div>
          </div>

          <div className="bg-white border border-gray-150 rounded-xl p-4 flex items-center gap-3.5 shadow-sm hover:border-[#782045]/20 hover:shadow transition-all">
            <div className="w-12 h-12 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
              <Headset className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm">24/7 Care Support</h4>
              <p className="text-gray-500 text-xs mt-0.5">Friendly agents always on standby</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
