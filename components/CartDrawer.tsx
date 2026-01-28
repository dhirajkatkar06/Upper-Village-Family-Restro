
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, MessageCircle } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const itemDetails = items.map(item => `• ${item.name} x ${item.quantity} (₹${item.price * item.quantity})`).join('%0A');
    const message = `*NEW ORDER - UPPER VILLAGE*%0A%0AHello! I'd like to place an order:%0A${itemDetails}%0A%0A*Total: ₹${subtotal}*%0A%0APlease confirm availability. Thank you!`;
    
    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0d0d0d] border-l border-white/5 z-[70] transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0d0d0d]">
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-[#c5a059]" size={24} />
              <h2 className="font-serif text-2xl text-white">Your Selection</h2>
            </div>
            <button onClick={onClose} className="p-2 text-stone-500 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-stone-900 flex items-center justify-center mb-6 text-stone-600">
                  <ShoppingBag size={32} />
                </div>
                <p className="text-stone-500 font-light italic">Your cart is empty. Savor something special from our menu.</p>
                <button 
                  onClick={onClose}
                  className="mt-8 text-[#c5a059] text-xs font-bold uppercase tracking-widest border-b border-[#c5a059] pb-1"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-6 group">
                  <div className="w-24 h-24 rounded-sm overflow-hidden shrink-0 border border-white/5">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-serif text-lg leading-tight mb-1 group-hover:text-[#c5a059] transition-colors">{item.name}</h3>
                        <p className="text-stone-500 text-xs">{item.category}</p>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-stone-600 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 bg-stone-900 px-3 py-1 rounded-full border border-white/5">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="text-stone-400 hover:text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-white text-sm font-bold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="text-stone-400 hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-[#c5a059] font-bold text-sm">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-8 border-t border-white/5 bg-stone-900/20 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-8">
                <span className="text-stone-500 uppercase tracking-widest text-xs font-bold">Estimated Total</span>
                <span className="text-white text-2xl font-serif">₹{subtotal}</span>
              </div>
              <button 
                className="w-full py-5 bg-[#c5a059] text-black font-bold uppercase tracking-widest hover:bg-white transition-all duration-500 rounded-sm shadow-xl shadow-[#c5a059]/10 flex items-center justify-center gap-3"
                onClick={handlePlaceOrder}
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </button>
              <p className="text-center text-stone-600 text-[9px] uppercase tracking-widest mt-6">
                Direct WhatsApp Order for 24/7 service.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
