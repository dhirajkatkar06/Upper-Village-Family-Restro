
import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Menu', id: 'menu' },
    { name: 'About', id: 'about' },
    { name: 'Reserve', id: 'reservation' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${
      isScrolled || isMobileMenuOpen ? 'bg-black py-4 border-b border-white/10' : 'bg-transparent py-10'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative z-[101]">
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')}
          className="flex flex-col group cursor-pointer"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#c5a059] group-hover:text-white transition-colors">UPPER VILLAGE</span>
          <span className="text-[10px] tracking-[0.4em] text-stone-500 -mt-1 uppercase group-hover:text-[#c5a059] transition-colors">Family Restaurant</span>
        </a>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12 text-[11px] font-bold tracking-[0.3em] uppercase">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-stone-400 hover:text-[#c5a059] transition-all duration-300 relative group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c5a059] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-stone-400 hover:text-[#c5a059] transition-colors group"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#c5a059] text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <a 
            href="#reservation"
            onClick={(e) => scrollToSection(e, 'reservation')}
            className="px-8 py-3 bg-[#c5a059] text-black hover:bg-white transition-all duration-500 rounded-sm font-bold shadow-lg shadow-[#c5a059]/10"
          >
            Book A Table
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center space-x-4 md:hidden">
          <button 
            onClick={onOpenCart}
            className="relative p-2 text-stone-400 hover:text-[#c5a059]"
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#c5a059] text-black text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
          <button 
            className="text-[#c5a059] p-2 hover:bg-white/5 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-[100] transition-all duration-500 ease-in-out md:hidden flex flex-col items-center justify-center ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-full invisible'
      }`}>
        <div className="flex flex-col items-center space-y-10 text-center">
          {navLinks.map((link, idx) => (
            <a 
              key={link.name} 
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className="text-stone-300 hover:text-[#c5a059] text-3xl font-serif transition-all"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#reservation" 
            onClick={(e) => scrollToSection(e, 'reservation')}
            className="px-12 py-5 bg-[#c5a059] text-black uppercase text-sm tracking-[0.3em] font-bold rounded-sm shadow-2xl"
          >
            Reservations
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
