export type ProductCategory = 'Electronics' | 'Fashion' | 'Home & Kitchen' | 'Beauty';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isRecommended?: boolean;
  tags: string[];
  specs?: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export type OrderStatus = 'Delivered' | 'Pending' | 'Shipped' | 'Cancelled';

export interface TrackingStep {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  totalAmount: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: {
    type: 'Card' | 'PayPal' | 'ApplePay' | 'COD';
    last4?: string;
  };
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  trackingSteps: TrackingStep[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  memberSince: string;
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  description: string;
  subcategories: string[];
  icon: string;
  image: string;
  itemCount: number;
  color: string;
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';

export interface FilterState {
  searchQuery: string;
  category: string;
  subcategory: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: SortOption;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'discount' | 'system' | 'stock';
  link?: string;
}
