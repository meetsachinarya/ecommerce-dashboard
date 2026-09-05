import { Order, UserProfile, NotificationItem } from '../types';
import { DUMMY_PRODUCTS } from './products';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 (555) 234-5678',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
  bio: 'Tech enthusiast, design lover & frequent shopper. Exploring timeless essentials and modern tech.',
  address: {
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'San Francisco',
    state: 'California',
    zipCode: '94107',
    country: 'United States'
  },
  memberSince: 'March 2024'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-89421',
    date: '2026-08-25',
    status: 'Pending',
    items: [
      {
        product: DUMMY_PRODUCTS[0], // iPhone 16 Pro Max
        quantity: 1,
        price: 1099.99
      },
      {
        product: DUMMY_PRODUCTS[5], // Sony Headphones
        quantity: 1,
        price: 329.99
      }
    ],
    subtotal: 1429.98,
    discount: 50.00,
    shipping: 0.00,
    tax: 110.40,
    totalAmount: 1490.38,
    shippingAddress: {
      fullName: 'Alex Morgan',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States'
    },
    paymentMethod: {
      type: 'Card',
      last4: '4242'
    },
    trackingNumber: 'TRK-9908123441',
    carrier: 'FedEx Express',
    estimatedDelivery: '2026-08-30',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        description: 'Your order has been verified and received by our fulfillment center.',
        date: '2026-08-25 10:14 AM',
        completed: true
      },
      {
        title: 'Processing & Quality Check',
        description: 'Items are being picked, checked, and packaged with care.',
        date: '2026-08-26 02:30 PM',
        completed: true,
        current: true
      },
      {
        title: 'Shipped & In Transit',
        description: 'Package will be handed over to FedEx courier.',
        date: 'Pending',
        completed: false
      },
      {
        title: 'Out for Delivery',
        description: 'Courier is en route to your shipping address.',
        date: 'Pending',
        completed: false
      },
      {
        title: 'Delivered',
        description: 'Package delivered at your doorstep or front desk.',
        date: 'Pending',
        completed: false
      }
    ]
  },
  {
    id: 'ORD-88102',
    date: '2026-08-18',
    status: 'Shipped',
    items: [
      {
        product: DUMMY_PRODUCTS[7], // Merino Wool Overcoat
        quantity: 1,
        price: 389.00
      },
      {
        product: DUMMY_PRODUCTS[11], // Nike Sneakers
        quantity: 1,
        price: 135.00
      }
    ],
    subtotal: 524.00,
    discount: 25.00,
    shipping: 15.00,
    tax: 41.12,
    totalAmount: 555.12,
    shippingAddress: {
      fullName: 'Alex Morgan',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States'
    },
    paymentMethod: {
      type: 'ApplePay'
    },
    trackingNumber: 'TRK-7719208419',
    carrier: 'UPS Priority',
    estimatedDelivery: '2026-08-29',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        description: 'Order confirmed and payment verified.',
        date: '2026-08-18 09:00 AM',
        completed: true
      },
      {
        title: 'Processing',
        description: 'Packaged and prepared at Oakland hub.',
        date: '2026-08-19 11:20 AM',
        completed: true
      },
      {
        title: 'Shipped & In Transit',
        description: 'Departed sorting facility en route to San Francisco destination.',
        date: '2026-08-27 08:45 AM',
        completed: true,
        current: true
      },
      {
        title: 'Out for Delivery',
        description: 'Scheduled for tomorrow morning.',
        date: 'Estimated Aug 29',
        completed: false
      },
      {
        title: 'Delivered',
        description: 'Signature required.',
        date: 'Pending',
        completed: false
      }
    ]
  },
  {
    id: 'ORD-76519',
    date: '2026-07-29',
    status: 'Delivered',
    items: [
      {
        product: DUMMY_PRODUCTS[14], // Breville Espresso
        quantity: 1,
        price: 1299.00
      },
      {
        product: DUMMY_PRODUCTS[17], // Multi-peptide serum
        quantity: 2,
        price: 78.00
      }
    ],
    subtotal: 1455.00,
    discount: 100.00,
    shipping: 0.00,
    tax: 108.40,
    totalAmount: 1463.40,
    shippingAddress: {
      fullName: 'Alex Morgan',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States'
    },
    paymentMethod: {
      type: 'Card',
      last4: '8831'
    },
    trackingNumber: 'TRK-6610293812',
    carrier: 'DHL Express',
    estimatedDelivery: '2026-08-02',
    trackingSteps: [
      {
        title: 'Order Confirmed',
        description: 'Payment authorized.',
        date: '2026-07-29 03:15 PM',
        completed: true
      },
      {
        title: 'Processing',
        description: 'Packed at Seattle warehouse.',
        date: '2026-07-30 08:00 AM',
        completed: true
      },
      {
        title: 'Shipped',
        description: 'In transit via DHL flight.',
        date: '2026-07-31 06:30 PM',
        completed: true
      },
      {
        title: 'Out for Delivery',
        description: 'Driver on local route.',
        date: '2026-08-02 09:10 AM',
        completed: true
      },
      {
        title: 'Delivered',
        description: 'Signed and delivered at front porch.',
        date: '2026-08-02 01:45 PM',
        completed: true
      }
    ]
  },
  {
    id: 'ORD-65201',
    date: '2026-06-14',
    status: 'Cancelled',
    items: [
      {
        product: DUMMY_PRODUCTS[19], // Maison Oud Perfume
        quantity: 1,
        price: 245.00
      }
    ],
    subtotal: 245.00,
    discount: 0.00,
    shipping: 10.00,
    tax: 20.40,
    totalAmount: 275.40,
    shippingAddress: {
      fullName: 'Alex Morgan',
      street: '742 Evergreen Terrace, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94107',
      country: 'United States'
    },
    paymentMethod: {
      type: 'PayPal'
    },
    trackingNumber: 'TRK-CANCELLED',
    carrier: 'USPS',
    estimatedDelivery: 'Cancelled by customer',
    trackingSteps: [
      {
        title: 'Order Requested',
        description: 'Order placed by user.',
        date: '2026-06-14 11:10 AM',
        completed: true
      },
      {
        title: 'Cancelled',
        description: 'Order cancelled upon customer request. Full refund issued.',
        date: '2026-06-14 11:35 AM',
        completed: true
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Order ORD-89421 Processing',
    message: 'Your Apple iPhone 16 Pro Max order is being packed and prepared for dispatch.',
    time: '2 hours ago',
    read: false,
    type: 'order',
    link: '/orders'
  },
  {
    id: 'notif-2',
    title: 'Weekend Flash Sale! Up to 25% Off',
    message: 'Exclusive 25% discount available now on select Audio and Skincare items.',
    time: '5 hours ago',
    read: false,
    type: 'discount',
    link: '/products'
  },
  {
    id: 'notif-3',
    title: 'Order ORD-88102 Shipped',
    message: 'Your package with UPS Priority tracking TRK-7719208419 is on its way.',
    time: '1 day ago',
    read: true,
    type: 'order',
    link: '/orders'
  },
  {
    id: 'notif-4',
    title: 'Wishlist Price Drop Alert',
    message: 'MacBook Pro M4 Max price dropped from $3,499.00 to $3,249.00!',
    time: '2 days ago',
    read: true,
    type: 'stock',
    link: '/wishlist'
  }
];
