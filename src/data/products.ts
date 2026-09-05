import { Product, CategoryInfo } from '../types';

export const CATEGORIES_DATA: CategoryInfo[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    description: 'Next-generation smartphones, ultra-portable laptops, and audiophile audio gear.',
    subcategories: ['Mobiles', 'Laptops', 'Headphones'],
    icon: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    itemCount: 9,
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    description: 'Elevate your wardrobe with contemporary styles, premium fabrics, and designer footwear.',
    subcategories: ["Men's Clothing", "Women's Clothing", 'Shoes'],
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    itemCount: 9,
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200'
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    description: 'Artisan furniture, smart kitchen culinary gear, and timeless modern decor.',
    subcategories: ['Furniture', 'Kitchen Appliances', 'Home Decor'],
    icon: 'Armchair',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop',
    itemCount: 9,
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    description: 'Clinically proven botanical skincare, salon-grade haircare, and signature fragrances.',
    subcategories: ['Skincare', 'Haircare', 'Perfumes'],
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    itemCount: 8,
    color: 'from-rose-500/10 to-pink-500/10 border-rose-200'
  }
];

export const DUMMY_PRODUCTS: Product[] = [
  // 1. Electronics - Mobiles
  {
    id: 'prod-1',
    name: 'Apple iPhone 16 Pro Max 256GB - Desert Titanium',
    category: 'Electronics',
    subcategory: 'Mobiles',
    price: 1199.99,
    discountPrice: 1099.99,
    rating: 4.9,
    reviewsCount: 342,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    description: 'Featuring Grade 5 Titanium design, Ceramic Shield, A18 Pro chip with 6-core GPU, 48MP Fusion camera system with 5x Telephoto optical zoom, and Action button.',
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isRecommended: true,
    tags: ['5G', 'Pro Camera', 'Titanium', 'Bestseller'],
    specs: {
      'Display': '6.9-inch Super Retina XDR OLED',
      'Processor': 'A18 Pro Bionic',
      'Battery Life': 'Up to 33 hours video',
      'Storage': '256GB NVMe'
    },
    createdAt: '2026-08-01'
  },
  {
    id: 'prod-2',
    name: 'Samsung Galaxy S25 Ultra 512GB AI Edition',
    category: 'Electronics',
    subcategory: 'Mobiles',
    price: 1299.99,
    discountPrice: 1189.99,
    rating: 4.8,
    reviewsCount: 289,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
    description: 'Built-in S Pen, Titanium frame, 200MP Quad Tele System with AI zoom processing, Snapdragon 8 Elite, and all-day intelligent battery.',
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    isRecommended: true,
    tags: ['Galaxy AI', 'S-Pen', '200MP', 'Flagship'],
    specs: {
      'Display': '6.8-inch Dynamic AMOLED 2X 120Hz',
      'RAM / Storage': '16GB / 512GB',
      'Camera': '200MP + 50MP + 50MP + 12MP',
      'Charging': '45W Super Fast 2.0'
    },
    createdAt: '2026-07-20'
  },
  {
    id: 'prod-3',
    name: 'Google Pixel 9 Pro XL with Gemini Nano',
    category: 'Electronics',
    subcategory: 'Mobiles',
    price: 1099.00,
    discountPrice: 949.00,
    rating: 4.7,
    reviewsCount: 175,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
    description: 'The premier Google AI phone with custom Tensor G4 silicon, Super Actua display, Pro camera controls, and 7 years of OS updates.',
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    isRecommended: true,
    tags: ['Google AI', 'Clean Android', 'Night Sight'],
    specs: {
      'Display': '6.8-inch LTPO OLED 1-120Hz',
      'Chipset': 'Google Tensor G4 with Titan M2',
      'Cameras': '50MP Octa PD + 48MP Quad PD'
    },
    createdAt: '2026-06-15'
  },

  // 2. Electronics - Laptops
  {
    id: 'prod-4',
    name: 'MacBook Pro 16" Liquid Retina XDR - M4 Max',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 3499.00,
    discountPrice: 3249.00,
    rating: 4.95,
    reviewsCount: 198,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    description: 'Astonishing 16-core CPU and 40-core GPU powerhouse for 3D renderers, developers, and video editors with 1000 nits sustained SDR brightness.',
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isRecommended: true,
    tags: ['M4 Max', 'Liquid Retina', 'Studio Pro'],
    specs: {
      'Memory': '48GB Unified Memory',
      'SSD': '1TB NVMe Gen 4',
      'Display': '16.2-inch XDR 120Hz ProMotion',
      'Ports': '3x Thunderbolt 5, HDMI, SDXC'
    },
    createdAt: '2026-08-10'
  },
  {
    id: 'prod-5',
    name: 'Dell XPS 15 4K OLED Touch Laptop (Intel Core Ultra 9)',
    category: 'Electronics',
    subcategory: 'Laptops',
    price: 2199.99,
    discountPrice: 1999.99,
    rating: 4.6,
    reviewsCount: 112,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800&auto=format&fit=crop',
    description: 'Precision CNC machined aluminum chassis with carbon fiber palm rest, vibrant 3.5K InfinityEdge OLED display, and NVIDIA RTX 4070.',
    inStock: true,
    stockCount: 12,
    isFeatured: false,
    isRecommended: false,
    tags: ['OLED', 'Creator', 'RTX 4070'],
    specs: {
      'Graphics': 'NVIDIA GeForce RTX 4070 8GB',
      'RAM': '32GB DDR5 5600MHz',
      'Weight': '1.86 kg'
    },
    createdAt: '2026-05-18'
  },
  {
    id: 'prod-6',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    category: 'Electronics',
    subcategory: 'Headphones',
    price: 399.99,
    discountPrice: 329.99,
    rating: 4.85,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
    description: 'Industry-leading noise cancellation optimized with two processors and 8 microphones. Hi-Res Audio wireless with LDAC and crystal-clear call quality.',
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    isRecommended: true,
    tags: ['ANC', 'Hi-Res', '30hr Battery', 'Bestseller'],
    specs: {
      'Battery': '30 Hours with ANC on',
      'Codecs': 'LDAC, AAC, SBC',
      'Weight': '250g'
    },
    createdAt: '2026-07-02'
  },
  {
    id: 'prod-7',
    name: 'Apple AirPods Max Wireless Over-Ear - Space Gray',
    category: 'Electronics',
    subcategory: 'Headphones',
    price: 549.00,
    discountPrice: 479.00,
    rating: 4.8,
    reviewsCount: 410,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop',
    description: 'High-fidelity audio with active noise cancellation, transparency mode, personalized spatial audio with dynamic head tracking, and breathable knit mesh canopy.',
    inStock: true,
    stockCount: 15,
    isFeatured: false,
    isRecommended: true,
    tags: ['Spatial Audio', 'Premium Aluminum', 'Lossless'],
    specs: {
      'Chip': 'Apple H1 chip in each ear cup',
      'Battery': '20 hours listening time',
      'Case': 'Smart Case included'
    },
    createdAt: '2026-04-10'
  },

  // 3. Fashion - Men's & Women's Clothing & Shoes
  {
    id: 'prod-8',
    name: 'Italian Merino Wool Tailored Overcoat',
    category: 'Fashion',
    subcategory: "Men's Clothing",
    price: 495.00,
    discountPrice: 389.00,
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
    description: 'Crafted from 100% pure extrafine Italian merino wool. Classic notched lapel, horn buttons, deep interior pockets, and satin cupro lining.',
    inStock: true,
    stockCount: 9,
    isFeatured: true,
    isRecommended: true,
    tags: ['Pure Wool', 'Italian Craft', 'Formal'],
    specs: {
      'Material': '100% Extrafine Merino Wool',
      'Lining': '100% Cupro Satin',
      'Care': 'Dry clean only'
    },
    createdAt: '2026-08-04'
  },
  {
    id: 'prod-9',
    name: 'Slim-Fit Structured Linen Blazer - Sand Khaki',
    category: 'Fashion',
    subcategory: "Men's Clothing",
    price: 245.00,
    discountPrice: 195.00,
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
    description: 'Breathable unlined construction in organic European flax linen. Perfect for summer weddings, business casual, and resort evenings.',
    inStock: true,
    stockCount: 16,
    isFeatured: false,
    isRecommended: false,
    tags: ['Linen', 'Breathable', 'Modern Fit'],
    specs: {
      'Material': '100% Normandy Linen',
      'Fit': 'Contemporary Slim'
    },
    createdAt: '2026-07-12'
  },
  {
    id: 'prod-10',
    name: 'Mulberry Silk Slip Evening Midi Dress - Emerald',
    category: 'Fashion',
    subcategory: "Women's Clothing",
    price: 320.00,
    discountPrice: 260.00,
    rating: 4.9,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop',
    description: 'Pure 22-momme grade 6A mulberry silk with bias-cut silhouette that drapes effortlessly across the curves. Delicate adjustable straps.',
    inStock: true,
    stockCount: 11,
    isFeatured: true,
    isRecommended: true,
    tags: ['100% Silk', 'Midi Dress', 'Luxury Occasion'],
    specs: {
      'Fabric': 'Grade 6A Mulberry Silk',
      'Weight': '22 momme'
    },
    createdAt: '2026-08-08'
  },
  {
    id: 'prod-11',
    name: 'Mongolian Cashmere Turtleneck Sweater - Oatmeal',
    category: 'Fashion',
    subcategory: "Women's Clothing",
    price: 265.00,
    discountPrice: 220.00,
    rating: 4.8,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop',
    description: 'Sumptuously soft 2-ply Grade A Mongolian cashmere. Ribbed cuffs, seamless knit collar, and an elevated relaxed silhouette.',
    inStock: true,
    stockCount: 20,
    isFeatured: false,
    isRecommended: true,
    tags: ['Cashmere', 'Warmth', 'Winter Essential'],
    specs: {
      'Origin': 'Inner Mongolia',
      'Gauge': '12-gauge knit'
    },
    createdAt: '2026-06-25'
  },
  {
    id: 'prod-12',
    name: 'Nike Air Max Pulse Lifestyle Sneakers',
    category: 'Fashion',
    subcategory: 'Shoes',
    price: 160.00,
    discountPrice: 135.00,
    rating: 4.75,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    description: 'Pulling inspiration from the London music scene, point-loaded Air cushioning distributes weight evenly to target points for responsive bounce.',
    inStock: true,
    stockCount: 28,
    isFeatured: true,
    isRecommended: false,
    tags: ['Air Max', 'Streetwear', 'High Comfort'],
    specs: {
      'Upper': 'Textile with Leather Overlays',
      'Sole': 'Foam Midsole & Rubber Waffle'
    },
    createdAt: '2026-07-28'
  },
  {
    id: 'prod-13',
    name: 'Artisan Goodyear-Welted Leather Oxford Shoes',
    category: 'Fashion',
    subcategory: 'Shoes',
    price: 340.00,
    discountPrice: 295.00,
    rating: 4.9,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=800&auto=format&fit=crop',
    description: 'Handcrafted in Spain from full-grain French calfskin with Goodyear-welted double leather soles for a lifetime of resoleable elegance.',
    inStock: true,
    stockCount: 7,
    isFeatured: false,
    isRecommended: true,
    tags: ['Full Grain', 'Goodyear Welt', 'Formal Shoes'],
    specs: {
      'Leather': 'French Box Calf',
      'Construction': 'Goodyear Welted 360°'
    },
    createdAt: '2026-05-30'
  },

  // 4. Home & Kitchen - Furniture, Appliances, Decor
  {
    id: 'prod-14',
    name: 'Mid-Century Velvet Lounge Accent Armchair',
    category: 'Home & Kitchen',
    subcategory: 'Furniture',
    price: 580.00,
    discountPrice: 489.00,
    rating: 4.8,
    reviewsCount: 104,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop',
    description: 'Stately jewel-toned emerald velvet upholstery with brushed brass tapered steel legs and high-density pocket spring cushion core.',
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isRecommended: true,
    tags: ['Velvet', 'Mid-Century', 'Statement Chair'],
    specs: {
      'Dimensions': '32"W x 34"D x 33"H',
      'Frame': 'Kiln-Dried Solid Birch',
      'Weight Capacity': '350 lbs'
    },
    createdAt: '2026-08-02'
  },
  {
    id: 'prod-15',
    name: 'Breville Barista Touch Impress Espresso Machine',
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    price: 1499.95,
    discountPrice: 1299.00,
    rating: 4.95,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=800&auto=format&fit=crop',
    description: 'Automated touchscreen cafe experience with real-time feedback assisted tamping, Baratza European precision burrs, and Auto MilQ microfoam.',
    inStock: true,
    stockCount: 10,
    isFeatured: true,
    isRecommended: true,
    tags: ['Espresso', 'Barista Grade', 'Touchscreen'],
    specs: {
      'Water Tank': '2 Liters with filter',
      'Heating': 'ThermoJet 3-second ready system',
      'Pressure': '15 Bar Italian Pump'
    },
    createdAt: '2026-07-15'
  },
  {
    id: 'prod-16',
    name: 'Ninja Foodi Smart XL 6-in-1 DualZone Air Fryer',
    category: 'Home & Kitchen',
    subcategory: 'Kitchen Appliances',
    price: 249.99,
    discountPrice: 199.99,
    rating: 4.85,
    reviewsCount: 450,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop',
    description: 'Dual 5-quart independent baskets with Match Cook and Smart Finish technology to prepare two separate dishes simultaneously.',
    inStock: true,
    stockCount: 24,
    isFeatured: false,
    isRecommended: false,
    tags: ['DualZone', 'Air Fryer', 'Non-stick'],
    specs: {
      'Capacity': '10 Quarts Total',
      'Functions': 'Air Fry, Roast, Reheat, Dehydrate, Bake, Broil'
    },
    createdAt: '2026-06-11'
  },
  {
    id: 'prod-17',
    name: 'Nordic Minimalist Matte Ceramic Sculptural Vase Set',
    category: 'Home & Kitchen',
    subcategory: 'Home Decor',
    price: 85.00,
    discountPrice: 68.00,
    rating: 4.7,
    reviewsCount: 82,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=800&auto=format&fit=crop',
    description: 'Set of 3 hand-thrown ceramic vessels in contrasting matte terracotta, ivory, and slate basalt finishes with geometric donut silhouettes.',
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    isRecommended: false,
    tags: ['Ceramic', 'Nordic', 'Table Decor'],
    specs: {
      'Quantity': '3 Piece Set',
      'Finish': 'Matte Sandy Glaze'
    },
    createdAt: '2026-07-05'
  },

  // 5. Beauty - Skincare, Haircare, Perfumes
  {
    id: 'prod-18',
    name: 'Multi-Peptide & Hyaluronic Youth Glow Serum 50ml',
    category: 'Beauty',
    subcategory: 'Skincare',
    price: 92.00,
    discountPrice: 78.00,
    rating: 4.9,
    reviewsCount: 520,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    description: 'High-potency formulation blending 5 biomimetic signal peptides, multi-weight hyaluronic complexes, and centella asiatica for plump skin barrier repair.',
    inStock: true,
    stockCount: 55,
    isFeatured: true,
    isRecommended: true,
    tags: ['Clean Beauty', 'Dermatologist Tested', 'Anti-Aging'],
    specs: {
      'Volume': '50 ml / 1.7 fl oz',
      'Skin Type': 'All skin types including sensitive'
    },
    createdAt: '2026-08-12'
  },
  {
    id: 'prod-19',
    name: 'Dyson Supersonic Nural Intelligent Hair Dryer',
    category: 'Beauty',
    subcategory: 'Haircare',
    price: 499.99,
    discountPrice: 449.99,
    rating: 4.85,
    reviewsCount: 278,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
    description: 'Scalp Protect mode automatically adjusts heat to protect scalp health and enhance natural shine. Fast drying with no extreme heat damage.',
    inStock: true,
    stockCount: 14,
    isFeatured: true,
    isRecommended: true,
    tags: ['Smart Sensor', 'Ionic', 'Zero Heat Damage'],
    specs: {
      'Attachments': '5 Magnetic Styling Nozzles',
      'Motor': 'Dyson V9 Digital Motor 110,000 rpm'
    },
    createdAt: '2026-07-22'
  },
  {
    id: 'prod-20',
    name: 'Maison Velvet Oud & Ambergris Eau de Parfum 100ml',
    category: 'Beauty',
    subcategory: 'Perfumes',
    price: 285.00,
    discountPrice: 245.00,
    rating: 4.95,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
    description: 'An intoxicating oriental masterpiece blending smoky Cambodian agarwood, crystal ambergris, damask rose petal, and sweet Madagascar vanilla bourbon.',
    inStock: true,
    stockCount: 18,
    isFeatured: true,
    isRecommended: true,
    tags: ['Niche Fragrance', 'Long Lasting', 'Unisex Luxury'],
    specs: {
      'Concentration': 'Eau de Parfum (25% Oil)',
      'Top Notes': 'Saffron, Bergamot, Pink Pepper',
      'Base Notes': 'Smoky Oud, White Amber, Leather'
    },
    createdAt: '2026-08-05'
  }
];
