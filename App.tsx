
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ChatBot from './components/ChatBot';
import CartDrawer from './components/CartDrawer';
import { RESTAURANT_INFO, MENU_ITEMS } from './constants';
import { MenuItem, CartItem } from './types';
import { Star, MapPin, Clock, Phone, ChevronRight, Facebook, Instagram, Twitter, Calendar, Users, Send, ShoppingBag, MessageCircle } from 'lucide-react';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [vegOnly, setVegOnly] = useState(false);
  
  // Reservation state
  const [resForm, setResForm] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2',
    requests: ''
  });

  // Calculate categories and counts
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(MENU_ITEMS.map(item => item.category)))];
    return cats.map(cat => {
      const count = MENU_ITEMS.filter(item => {
        const catMatch = cat === 'All' || item.category === cat;
        const vegMatch = !vegOnly || item.isVeg;
        return catMatch && vegMatch;
      }).length;
      return { name: cat, count };
    });
  }, [vegOnly]);

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const vegMatch = !vegOnly || item.isVeg;
      return categoryMatch && vegMatch;
    });
  }, [activeCategory, vegOnly]);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*RESERVATION REQUEST - UPPER VILLAGE*%0A%0A• *Name:* ${resForm.name}%0A• *Phone:* ${resForm.phone}%0A• *Date:* ${resForm.date}%0A• *Guests:* ${resForm.guests}%0A• *Requests:* ${resForm.requests || 'None'}%0A%0APlease confirm our booking. Thank you!`;
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0a0a0a] selection:bg-[#c5a059] selection:text-black overflow-x-hidden">
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000" 
              className="w-full h-full object-cover scale-105"
              alt="Hero Background"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-[#0a0a0a]" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20 animate-fade-in">
            <div className="inline-block px-4 py-1 border border-[#c5a059]/30 rounded-full mb-8 bg-black/40 backdrop-blur-sm">
              <span className="text-[#c5a059] text-[10px] tracking-[0.6em] uppercase font-bold text-shadow-sm">The Gold Standard of Dining</span>
            </div>
            <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl mb-10 leading-tight tracking-tight text-white drop-shadow-2xl">
              {RESTAURANT_INFO.name}
            </h1>
            <p className="text-stone-300 text-lg md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed font-light">
              Savor the spirit of Maharashtra in a sanctuary of luxury. <br className="hidden md:block" /> Open 24/7 for the moments that matter.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a 
                href="#menu" 
                onClick={(e) => scrollToSection(e, 'menu')}
                className="px-14 py-5 bg-[#c5a059] text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-all duration-500 w-full sm:w-auto text-xs shadow-2xl shadow-[#c5a059]/20 rounded-sm"
              >
                View The Menu
              </a>
              <a 
                href="#reservation" 
                onClick={(e) => scrollToSection(e, 'reservation')}
                className="px-14 py-5 border border-white/20 text-white font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500 w-full sm:w-auto text-xs backdrop-blur-sm rounded-sm"
              >
                Book A Table
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-40">
            <span className="text-[9px] uppercase tracking-[0.5em] mb-4 text-[#c5a059]">Scroll Down</span>
            <div className="w-[1px] h-24 bg-gradient-to-b from-[#c5a059] to-transparent" />
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-stone-900/30 py-24 border-y border-white/5 relative z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            {[
              { label: 'Google Rating', val: RESTAURANT_INFO.rating },
              { label: 'Service Hours', val: '24 / 7' },
              { label: 'Daily Guests', val: '200+' },
              { label: 'Specialities', val: '25+' }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-5xl font-serif text-[#c5a059] mb-3 group-hover:scale-110 transition-transform duration-700 ease-out">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-stone-500 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Menu Highlights Section */}
        <section id="menu" className="py-24 md:py-40 bg-black relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-10">
              <div className="max-w-xl">
                <h3 className="text-[#c5a059] text-xs tracking-[0.6em] uppercase mb-6 font-bold italic">Curated Selection</h3>
                <h2 className="font-serif text-5xl md:text-7xl leading-tight text-white">Masterpieces from <br/>Our Kitchen</h2>
              </div>
              <p className="text-stone-500 max-w-sm text-sm md:text-lg border-l border-[#c5a059]/20 pl-8 py-4 leading-relaxed font-light">
                Every dish is crafted with heritage ingredients and a contemporary touch of elegance.
              </p>
            </div>

            {/* Filter UI - Improved Mobile Alignment */}
            <div className="w-full mb-20">
              <div className="flex flex-nowrap md:flex-wrap items-center md:justify-center gap-4 overflow-x-auto pb-6 md:pb-0 scrollbar-none no-scrollbar snap-x snap-mandatory">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex-shrink-0 snap-start px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all duration-500 flex items-center gap-2 ${
                      activeCategory === cat.name 
                      ? 'bg-[#c5a059] border-[#c5a059] text-black shadow-lg shadow-[#c5a059]/20' 
                      : 'border-white/10 text-stone-500 hover:border-[#c5a059]/40 hover:text-white'
                    }`}
                  >
                    {cat.name}
                    {cat.count > 0 && <span className={`text-[8px] opacity-60 ${activeCategory === cat.name ? 'text-black' : 'text-stone-400'}`}>({cat.count})</span>}
                  </button>
                ))}
                <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />
                <button
                  onClick={() => setVegOnly(!vegOnly)}
                  className={`flex-shrink-0 snap-start flex items-center gap-3 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border transition-all duration-500 ${
                    vegOnly 
                    ? 'border-green-500/50 text-green-500 bg-green-500/5' 
                    : 'border-white/10 text-stone-500 hover:border-green-500/30'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${vegOnly ? 'bg-green-500 animate-pulse' : 'bg-stone-600'}`} />
                  Pure Veg Only
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[600px]">
              {filteredItems.map((item) => (
                <div key={item.id} className="group flex flex-col relative bg-[#0d0d0d] border border-white/5 overflow-hidden rounded-sm hover:border-[#c5a059]/40 transition-all duration-700 shadow-2xl h-full animate-fade-in">
                  <div className="h-[300px] sm:h-[350px] md:h-[400px] overflow-hidden relative shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] grayscale-[20%] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6">
                      <span className="text-base uppercase tracking-widest text-[#c5a059] font-bold">₹{item.price}</span>
                    </div>
                    {item.isVeg && (
                      <div className="absolute top-6 right-6 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-4 py-2 border border-green-500/30 rounded-full">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[9px] text-green-500 font-bold uppercase tracking-[0.2em]">Pure Veg</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h4 className="font-serif text-2xl mb-3 group-hover:text-[#c5a059] transition-colors text-white">{item.name}</h4>
                    <div className="min-h-[4.5rem] mb-6">
                      <p className="text-stone-500 text-sm leading-relaxed font-light line-clamp-3">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="mt-auto space-y-6">
                      <div className="flex items-center justify-between border-t border-white/5 pt-6">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-stone-500 font-bold">{item.category}</span>
                        <ChevronRight size={18} className="text-[#c5a059] opacity-40 group-hover:opacity-100 transition-all" />
                      </div>
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-full flex items-center justify-center gap-3 py-4 border border-[#c5a059]/20 text-[#c5a059] text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-[#c5a059] hover:text-black transition-all duration-500 rounded-sm group/btn bg-[#c5a059]/5"
                      >
                        <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" />
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reservation Section */}
        <section id="reservation" className="py-24 md:py-40 bg-black relative z-10 overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div>
                <h3 className="text-[#c5a059] text-xs tracking-[0.7em] uppercase mb-8 font-bold italic">Private Dining</h3>
                <h2 className="font-serif text-4xl md:text-8xl mb-8 leading-tight text-white">Reserved for Excellence</h2>
                <p className="text-stone-400 text-lg leading-relaxed mb-12 font-light max-w-lg">
                  Ensure your evening is flawless. Secure a table for your family and experience hospitality that flows 24/7.
                </p>
                <div className="space-y-8">
                  <div className="flex items-center gap-6 text-stone-300">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                      <Users size={20} className="text-[#c5a059]" />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">Large Parties</h4>
                      <p className="text-stone-500 text-sm">Accommodating groups up to 40 guests.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-stone-300">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center shrink-0">
                      <Calendar size={20} className="text-[#c5a059]" />
                    </div>
                    <div>
                      <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-1">WhatsApp Booking</h4>
                      <p className="text-stone-500 text-sm">Direct line for personalized table arrangements.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0a0a0a] border border-white/5 p-8 sm:p-12 lg:p-16 rounded-sm shadow-3xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 blur-3xl rounded-full -mr-16 -mt-16" />
                <form className="space-y-8 relative z-10" onSubmit={handleReservation}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-bold">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={resForm.name}
                        onChange={(e) => setResForm({...resForm, name: e.target.value})}
                        placeholder="John Doe" 
                        className="w-full bg-black border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors rounded-sm text-sm" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-bold">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        value={resForm.phone}
                        onChange={(e) => setResForm({...resForm, phone: e.target.value})}
                        placeholder="+91 00000 00000" 
                        className="w-full bg-black border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors rounded-sm text-sm" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-bold">Preferred Date</label>
                      <input 
                        required
                        type="date" 
                        value={resForm.date}
                        onChange={(e) => setResForm({...resForm, date: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors rounded-sm text-sm [color-scheme:dark]" 
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-bold">No. of Guests</label>
                      <select 
                        value={resForm.guests}
                        onChange={(e) => setResForm({...resForm, guests: e.target.value})}
                        className="w-full bg-black border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors rounded-sm text-sm"
                      >
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n.toString()}>{n} {n===1?'Guest':'Guests'}</option>)}
                        <option value="9+">9+ (Group)</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-stone-500 text-[10px] uppercase tracking-[0.3em] font-bold">Special Requests</label>
                    <textarea 
                      value={resForm.requests}
                      onChange={(e) => setResForm({...resForm, requests: e.target.value})}
                      placeholder="Tell us about any allergies or special occasions..." 
                      rows={3} 
                      className="w-full bg-black border border-white/10 px-4 py-4 text-white focus:outline-none focus:border-[#c5a059] transition-colors rounded-sm text-sm resize-none"
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-[#c5a059] text-black font-bold uppercase tracking-[0.3em] hover:bg-white transition-all duration-500 rounded-sm flex items-center justify-center gap-4 group">
                    <MessageCircle size={20} className="shrink-0 transition-transform group-hover:scale-110" />
                    <span className="text-xs md:text-sm">Reserve via WhatsApp</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-40 bg-[#0a0a0a] relative overflow-hidden z-10">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl relative z-10 border border-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1200" 
                  className="w-full h-full object-cover grayscale-[30%]"
                  alt="Restaurant Interior"
                />
              </div>
              <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-stone-900 border border-white/5 p-12 z-20 hidden lg:block shadow-2xl">
                <div className="flex items-center gap-1 text-[#c5a059] mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} strokeWidth={1} />)}
                </div>
                <p className="text-stone-400 italic text-lg mb-10 leading-relaxed font-light">"The pinnacle of hospitality in Bhiwandi. A true family sanctuary with unmatched flavors."</p>
                <div className="h-px w-14 bg-[#c5a059] mb-5" />
                <p className="text-white text-xs font-bold uppercase tracking-[0.4em]">Prakash Gupta</p>
                <p className="text-stone-600 text-[10px] uppercase mt-1 tracking-widest">Elite Critic</p>
              </div>
            </div>
            
            <div className="lg:pl-16 text-center lg:text-left">
              <h3 className="text-[#c5a059] text-xs tracking-[0.7em] uppercase mb-8 font-bold">The Narrative</h3>
              <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-tight text-white drop-shadow-sm">Legacy of Taste</h2>
              <p className="text-stone-400 text-xl leading-relaxed mb-12 font-light">
                Upper Village is more than a restaurant; it is a legacy established to celebrate the rich culinary tapestry of Maharashtra while embracing the diverse tastes of modern families.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 border-t border-white/5 pt-16 text-left">
                <div className="flex items-start gap-6">
                  <MapPin className="text-[#c5a059] shrink-0" size={28} strokeWidth={1.2} />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-3">Heritage Site</h4>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">{RESTAURANT_INFO.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <Clock className="text-[#c5a059] shrink-0" size={28} strokeWidth={1.2} />
                  <div>
                    <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-3">Eternal Hours</h4>
                    <p className="text-stone-500 text-sm leading-relaxed font-light">Always Open. <br/>24/7 Exceptional Service.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="pt-24 md:pt-40 pb-20 bg-black border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-32">
            <div className="lg:col-span-5 text-center lg:text-left">
              <div className="flex flex-col mb-12">
                <span className="font-serif text-5xl font-bold tracking-tight text-[#c5a059]">UPPER VILLAGE</span>
                <span className="text-xs tracking-[0.5em] text-stone-600 uppercase mt-2">Culinary Heritage</span>
              </div>
              <p className="text-stone-500 text-xl font-light leading-relaxed mb-12 max-w-md mx-auto lg:mx-0">
                We invite you to experience a new standard of village-style dining. From intimate dinners to grand celebrations, we are here to serve you at any hour.
              </p>
              <div className="flex items-center justify-center lg:justify-start gap-10">
                <a href="#" className="text-stone-600 hover:text-[#c5a059] transition-all transform hover:scale-110"><Facebook size={24} /></a>
                <a href="instagram.com/hoteluppervillage?igsh=dTk4Y2N2eXc3ajhi" className="text-stone-600 hover:text-[#c5a059] transition-all transform hover:scale-110"><Instagram size={24} /></a>
                <a href="#" className="text-stone-600 hover:text-[#c5a059] transition-all transform hover:scale-110"><Twitter size={24} /></a>
              </div>
            </div>
            
            <div className="lg:col-span-2 hidden lg:block">
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.4em] mb-10">Navigation</h4>
              <ul className="space-y-5 text-stone-500 text-sm font-medium">
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-[#c5a059] transition-colors">Origins</a></li>
                <li><a href="#menu" onClick={(e) => scrollToSection(e, 'menu')} className="hover:text-[#c5a059] transition-colors">The Menu</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-[#c5a059] transition-colors">Our Story</a></li>
                <li><a href="#reservation" onClick={(e) => scrollToSection(e, 'reservation')} className="hover:text-[#c5a059] transition-colors">Reservation</a></li>
              </ul>
            </div>
            
            <div className="lg:col-span-5">
              <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.4em] mb-10 text-center lg:text-left">Reservations & Location</h4>
              <div className="bg-[#0a0a0a] border border-white/5 p-12 flex flex-col sm:flex-row gap-10 items-center rounded-sm shadow-2xl">
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-4 mb-8">
                    <Phone size={20} className="text-[#c5a059]" />
                    <span className="text-white text-2xl font-serif">{RESTAURANT_INFO.phone}</span>
                  </div>
                  <p className="text-stone-500 text-sm leading-relaxed font-light">
                    Lodha Upper Thane, Gate 3, Bhiwandi, <br/>Maharashtra, 421308
                  </p>
                </div>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(RESTAURANT_INFO.address)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-10 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#c5a059] transition-all shrink-0 rounded-sm shadow-xl w-full sm:w-auto text-center"
                >
                  Locate Us
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-stone-700 text-[10px] uppercase tracking-[0.3em] font-medium text-center md:text-left">
              &copy; 2024 Upper Village Family Restaurant. Crafting Memories 24/7.
            </p>
            <div className="flex space-x-12 text-stone-700 text-[10px] uppercase tracking-[0.3em] font-medium">
              <a href="#" className="hover:text-stone-400 transition-colors">Privacy</a>
              <a href="#" className="hover:text-stone-400 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating UI */}
      <ChatBot />
    </div>
  );
};

export default App;
