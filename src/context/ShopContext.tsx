import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Product,
  CartItem,
  Order,
  UserProfile,
  FilterState,
  NotificationItem
} from '../types';
import { DUMMY_PRODUCTS } from '../data/products';
import { INITIAL_ORDERS, INITIAL_USER_PROFILE, INITIAL_NOTIFICATIONS } from '../data/mockOrders';

export interface ToastItem {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  subcategory: 'All',
  minPrice: 0,
  maxPrice: 4000,
  minRating: 0,
  inStockOnly: false,
  sortBy: 'popular'
};

interface ShopContextType {
  // Products & Categories
  products: Product[];
  recommendedProducts: Product[];
  recentlyViewed: Product[];
  markAsRecentlyViewed: (product: Product) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { color?: string; size?: string }) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  moveToCartFromWishlist: (product: Product) => void;
  moveAllWishlistToCart: () => void;
  wishlistCount: number;

  // Orders
  orders: Order[];
  totalOrdersCount: number;
  pendingOrdersCount: number;
  placeOrder: (shippingDetails?: Partial<Order['shippingAddress']>, paymentType?: 'Card' | 'PayPal' | 'ApplePay' | 'COD') => Order | null;
  cancelOrder: (orderId: string) => void;

  // User Profile
  userProfile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;

  // Filters & Search
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  updateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  filteredProducts: Product[];

  // Notifications
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;

  // Toasts
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states with localStorage fallback for persistence
  const [products] = useState<Product[]>(DUMMY_PRODUCTS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ecom_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    // Default initial cart items
    return [
      { product: DUMMY_PRODUCTS[5], quantity: 1 }, // Sony Headphones
      { product: DUMMY_PRODUCTS[17], quantity: 2 } // Peptide Serum
    ];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ecom_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      DUMMY_PRODUCTS[3], // MacBook Pro M4
      DUMMY_PRODUCTS[9], // Silk Dress
      DUMMY_PRODUCTS[13] // Mid-century Velvet Chair
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ecom_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ecom_profile');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_USER_PROFILE;
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    return [
      DUMMY_PRODUCTS[0], // iPhone 16 Pro Max
      DUMMY_PRODUCTS[1], // Samsung S25 Ultra
      DUMMY_PRODUCTS[7], // Merino Wool Overcoat
      DUMMY_PRODUCTS[14] // Breville Espresso
    ];
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ecom_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('ecom_wishlist', JSON.stringify(wishlist));
    } catch {}
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ecom_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('ecom_profile', JSON.stringify(userProfile));
    } catch {}
  }, [userProfile]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1, options?: { color?: string; size?: string }) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: options?.color, selectedSize: options?.size }];
      }
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to your cart!`, 'success');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((c) => c.product.id === productId);
    setCart((prev) => prev.filter((c) => c.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name.slice(0, 25)}..." from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => {
      const currentPrice = item.product.discountPrice ?? item.product.price;
      return acc + currentPrice * item.quantity;
    }, 0);
  }, [cart]);

  // Wishlist Operations
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast(`Removed from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name.slice(0, 25)}..." to wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    showToast(`Removed item from wishlist`, 'info');
  };

  const moveToCartFromWishlist = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const moveAllWishlistToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((prod) => {
      addToCart(prod, 1);
    });
    setWishlist([]);
    showToast(`Moved ${wishlist.length} items from wishlist to cart!`, 'success');
  };

  const wishlistCount = wishlist.length;

  // Orders Operations
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = useMemo(() => {
    return orders.filter((o) => o.status === 'Pending' || o.status === 'Shipped').length;
  }, [orders]);

  const placeOrder = (
    shippingDetails?: Partial<Order['shippingAddress']>,
    paymentType: 'Card' | 'PayPal' | 'ApplePay' | 'COD' = 'Card'
  ): Order | null => {
    if (cart.length === 0) {
      showToast('Your cart is empty!', 'warning');
      return null;
    }

    const subtotal = cartSubtotal;
    const discount = subtotal > 500 ? 50 : subtotal > 200 ? 20 : 0;
    const shipping = subtotal > 150 ? 0 : 15;
    const tax = Number(((subtotal - discount) * 0.0825).toFixed(2));
    const totalAmount = Number((subtotal - discount + shipping + tax).toFixed(2));

    const newOrder: Order = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
      items: cart.map((item) => ({
        product: item.product,
        quantity: item.quantity,
        price: item.product.discountPrice ?? item.product.price
      })),
      subtotal,
      discount,
      shipping,
      tax,
      totalAmount,
      shippingAddress: {
        fullName: userProfile.name,
        street: shippingDetails?.street || userProfile.address.street,
        city: shippingDetails?.city || userProfile.address.city,
        state: shippingDetails?.state || userProfile.address.state,
        zipCode: shippingDetails?.zipCode || userProfile.address.zipCode,
        country: shippingDetails?.country || userProfile.address.country
      },
      paymentMethod: {
        type: paymentType,
        last4: paymentType === 'Card' ? '4242' : undefined
      },
      trackingNumber: `TRK-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      carrier: 'FedEx Priority',
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingSteps: [
        {
          title: 'Order Placed',
          description: 'Payment verified and order submitted to seller.',
          date: 'Just now',
          completed: true,
          current: true
        },
        {
          title: 'Processing',
          description: 'Packing and preparing for courier pickup.',
          date: 'Pending',
          completed: false
        },
        {
          title: 'Shipped',
          description: 'Package in transit with FedEx.',
          date: 'Pending',
          completed: false
        },
        {
          title: 'Delivered',
          description: 'Package delivered at your shipping address.',
          date: 'Pending',
          completed: false
        }
      ]
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();

    // Add notification
    const orderNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Order ${newOrder.id} Placed!`,
      message: `Your order of ${newOrder.items.length} item(s) totalling $${newOrder.totalAmount.toFixed(2)} is being processed.`,
      time: 'Just now',
      read: false,
      type: 'order',
      link: '/orders'
    };
    setNotifications((prev) => [orderNotif, ...prev]);

    showToast(`Order ${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'Cancelled' } : ord))
    );
    showToast(`Order ${orderId} has been cancelled.`, 'info');
  };

  // Profile Update
  const updateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({
      ...prev,
      ...updated,
      address: {
        ...prev.address,
        ...(updated.address || {})
      }
    }));
    showToast('Profile updated successfully!', 'success');
  };

  // Recently Viewed & Recommendations
  const markAsRecentlyViewed = (product: Product) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  const recommendedProducts = useMemo(() => {
    return products.filter((p) => p.isRecommended || p.isFeatured).slice(0, 8);
  }, [products]);

  // Notifications Operations
  const unreadNotificationCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read', 'info');
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Filter & Search Logic
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilterState((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTERS);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Search query
        if (filterState.searchQuery.trim()) {
          const q = filterState.searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesCat = product.category.toLowerCase().includes(q);
          const matchesSub = product.subcategory.toLowerCase().includes(q);
          const matchesDesc = product.description.toLowerCase().includes(q);
          const matchesTags = product.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchesName && !matchesCat && !matchesSub && !matchesDesc && !matchesTags) {
            return false;
          }
        }

        // Category filter
        if (filterState.category && filterState.category !== 'All') {
          if (product.category !== filterState.category) return false;
        }

        // Subcategory filter
        if (filterState.subcategory && filterState.subcategory !== 'All') {
          if (product.subcategory !== filterState.subcategory) return false;
        }

        // Price range
        const price = product.discountPrice ?? product.price;
        if (price < filterState.minPrice || price > filterState.maxPrice) {
          return false;
        }

        // Rating filter
        if (filterState.minRating > 0 && product.rating < filterState.minRating) {
          return false;
        }

        // In Stock only
        if (filterState.inStockOnly && !product.inStock) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;

        if (filterState.sortBy === 'price-asc') return priceA - priceB;
        if (filterState.sortBy === 'price-desc') return priceB - priceA;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        if (filterState.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // Popular: based on reviews count
        return b.reviewsCount - a.reviewsCount;
      });
  }, [products, filterState]);

  return (
    <ShopContext.Provider
      value={{
        products,
        recommendedProducts,
        recentlyViewed,
        markAsRecentlyViewed,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCartFromWishlist,
        moveAllWishlistToCart,
        wishlistCount,
        orders,
        totalOrdersCount,
        pendingOrdersCount,
        placeOrder,
        cancelOrder,
        userProfile,
        updateProfile,
        filterState,
        setFilterState,
        updateFilter,
        resetFilters,
        filteredProducts,
        notifications,
        unreadNotificationCount,
        markAllNotificationsRead,
        dismissNotification,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
