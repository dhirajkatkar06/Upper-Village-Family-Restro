
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  isSpicy?: boolean;
  isVeg?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
