
import { MenuItem, Testimonial } from './types';

export const RESTAURANT_INFO = {
  name: "Upper Village Family Restaurant",
  nameHindi: "अपर विलेज फैमिली रेस्टोरेंट",
  address: "Lodha Upper Thane Gate, 03, Thane - Dombivli Link Rd, Surai, Anjur, Bhiwandi, Maharashtra 421308",
  phone: "+919823100000",
  whatsapp: "919823100000", // Format for WA.me link
  rating: 3.2,
  reviewCount: 16,
  priceRange: "₹400–600 per person",
  hours: "Open 24 hours",
  features: ["Dine-in", "Kerbside pickup", "Delivery"],
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: '1',
    name: 'Special Chicken Dum Biryani',
    price: 350,
    category: 'Main Course',
    description: 'Aromatic basmati rice cooked with tender chicken pieces and house secret spices.',
    image: '/images/Special_Chicken_Dum_Biryani.jpg',
    isSpicy: true,
    isVeg: false
  },
  {
    id: '2',
    name: 'Paneer Tikka Masala',
    price: 280,
    category: 'Main Course',
    description: 'Char-grilled paneer cubes in a rich, creamy tomato-based gravy.',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=800',
    isVeg: true
  },
  {
    id: '3',
    name: 'Butter Garlic Naan',
    price: 60,
    category: 'Breads',
    description: 'Soft clay-oven baked bread topped with fresh garlic and melted butter.',
    image: '/images/Buuter_garlic_naan.jpg',
    isVeg: true
  },
  {
    id: '4',
    name: 'Tandoori Platter (Mixed)',
    price: 550,
    category: 'Starters',
    description: 'A grand assortment of kebabs, chicken tikka, and prawns grilled to perfection.',
    image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=800',
    isSpicy: true,
    isVeg: false
  },
  {
    id: '5',
    name: 'Veg Maratha',
    price: 240,
    category: 'Main Course',
    description: 'Spicy vegetable dumplings served in a robust Maharashtrian gravy.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800',
    isSpicy: true,
    isVeg: true
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: '1', name: 'Rahul Sharma', rating: 4, comment: 'Great place for family dinners. The Biryani is exceptional!', date: '2 weeks ago' },
  { id: '2', name: 'Priya Varma', rating: 3, comment: 'Good service, but parking was a bit tight. Food quality is decent for the price.', date: '1 month ago' },
  { id: '3', name: 'Amit Patil', rating: 5, comment: 'Amazing 24/7 service. Very convenient for late-night cravings after work.', date: '3 weeks ago' }
];
