import { Product, Order, OrderStatus, StoreSettings, CartItem, Customer, Category, Coupon, Review, HeroSlide } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'blossom_gift_products_v10',
  ORDERS: 'blossom_gift_orders_v10',
  SETTINGS: 'blossom_gift_settings_v10',
  CUSTOMERS: 'blossom_gift_customers_v10',
  COUPONS: 'blossom_gift_coupons_v10',
  REVIEWS: 'blossom_gift_reviews_v10',
  HERO_SLIDES: 'blossom_gift_hero_slides_v2',
};

export const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    type: 'image',
    mediaUrl: '/hero_banner_clean.png',
    mobileMediaUrl: '/hero_banner_mobile.png',
    title: 'Personalized Gifts',
    subtitle: 'for Your Loved Ones',
    kicker: '✨ MAKE EVERY MOMENT SPECIAL ✨',
    description: 'Explore unique and customized gifts, greeting cards, toys and more - for every occasion.',
    ctaText: 'Shop Now',
    ctaLink: '#catalog-section',
    badge: 'Flagship Design',
    isActive: true,
    order: 1,
  },
  {
    id: 'slide-2',
    type: 'video',
    mediaUrl: '/videos/video_1.mp4',
    title: 'Handcrafted Magic in Gondia',
    subtitle: 'Special 10s Gift Unboxing',
    kicker: '🎥 10-SECOND CINEMATIC PREVIEW',
    description: 'Custom photo mugs, glowing wooden LED frames, and luxury hampers packed with love in Gondia.',
    ctaText: 'Shop Gifts Now',
    ctaLink: '#catalog-section',
    badge: '10s Video',
    isActive: true,
    order: 2,
  },
];

export const INITIAL_SETTINGS: StoreSettings = {
  businessName: 'BLOSSOM GIFT',
  tagline: 'Gift, Greet & Toys Whole Sale & Retail',
  address: 'Gupta Complex, Near N.M.D. College, Gondia (M.S.)',
  city: 'Gondia',
  state: 'Maharashtra',
  pincode: '441614',
  phones: ['8208589775', '9673155741'],
  whatsapp: '918208589775',
  email: 'blossomgift@gmail.com',
  currency: 'INR',
  currencySymbol: '₹',
  deliveryFee: 50,
  freeDeliveryThreshold: 499,
  codEnabled: true,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Rose Teddy Bear',
    slug: 'rose-teddy-bear',
    description: 'Exquisite handcrafted red rose teddy bear made of soft synthetic everlasting foam roses with luxury black satin ribbon. The ultimate romantic gesture for birthdays, anniversaries, and special moments.',
    price: 699,
    comparePrice: 899,
    stock: 45,
    category: 'Toys & Soft Toys',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/extracted/rose_teddy_bear.png'],
    tags: ['Best Seller', 'Handcrafted', 'Everlasting Roses', 'Romance'],
    badge: 'Best Seller',
    status: 'active',
    preparationHours: 12,
    rating: 4.9,
    reviewsCount: 186,
    salesCount: 86,
    variants: [
      { id: 'v-rose-1', name: 'Color', value: 'Classic Crimson Red', priceDelta: 0 },
      { id: 'v-rose-2', name: 'Color', value: 'Blush Pink', priceDelta: 50 },
      { id: 'v-rose-3', name: 'Gift Box', value: 'With Clear Display Gift Box', priceDelta: 150 },
    ],
  },
  {
    id: 'prod-02',
    name: 'Personalized Photo Mug',
    slug: 'personalized-photo-mug',
    description: 'Premium grade-A ceramic glossy white mug with high-resolution photo print and custom text. Heat-durable, dishwasher-safe, with brilliant permanent color vibrancy.',
    price: 299,
    comparePrice: 399,
    stock: 72,
    category: 'Photo Mugs',
    occasions: ['Birthday', 'Anniversary', 'Wedding', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: ['/extracted/personalized_photo_mug.png'],
    tags: ['-20%', 'Personalized', 'Ceramic 11oz', 'Best Quality'],
    badge: '-20%',
    status: 'active',
    preparationHours: 6,
    rating: 4.9,
    reviewsCount: 240,
    salesCount: 72,
    variants: [
      { id: 'v-mug-1', name: 'Type', value: 'Classic White Glossy', priceDelta: 0 },
      { id: 'v-mug-2', name: 'Type', value: 'Magic Heat-Reveal Black', priceDelta: 100 },
      { id: 'v-mug-3', name: 'Type', value: 'Heart Shaped Handle', priceDelta: 50 },
    ],
  },
  {
    id: 'prod-03',
    name: 'LED Photo Frame',
    slug: 'led-photo-frame',
    description: 'Ultra-clear illuminated couple photo frame crafted from fine polished wood with warm golden fairy-light bulbs and decorative hearts. Crystal-clear photo display that brings romantic memories to life.',
    price: 899,
    comparePrice: 1199,
    stock: 28,
    category: 'Customized Gifts',
    occasions: ['Anniversary', 'Birthday', 'Wedding'],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: ['/products/led_photo_frame_hd.png'],
    tags: ['Warm LED', 'Solid Wood', 'Personalized', 'Keepsake'],
    badge: 'Popular Glow',
    status: 'active',
    preparationHours: 24,
    rating: 4.9,
    reviewsCount: 178,
    salesCount: 42,
    variants: [
      { id: 'v-frame-1', name: 'Size', value: 'Square 8x8 Inch', priceDelta: 0 },
      { id: 'v-frame-2', name: 'Size', value: 'Grand 12x12 Inch', priceDelta: 300 },
    ],
  },
  {
    id: 'prod-04',
    name: 'Greeting Cards',
    slug: 'greeting-cards',
    description: 'Artisanal handmade Happy Birthday & celebration greeting cards with embossed gold-foil details, floral illustrations, and elegant envelope with wax stamp.',
    price: 49,
    comparePrice: 79,
    stock: 120,
    category: 'Greeting Cards',
    occasions: ['Birthday', 'Anniversary', 'Wedding', 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/extracted/greeting_cards.png'],
    tags: ['Handmade', 'Floral Design', 'Gold Foil', 'Letterpress'],
    status: 'active',
    preparationHours: 2,
    rating: 4.9,
    reviewsCount: 310,
    salesCount: 64,
  },
  {
    id: 'prod-05',
    name: 'Gift Hampers',
    slug: 'gift-hampers',
    description: 'Luxurious gift hamper box filled with premium chocolates, assorted dry fruits, scented candle, and personalized congratulatory greeting card with festive satin ribbon.',
    price: 999,
    comparePrice: 1299,
    stock: 22,
    category: 'Gift Hampers',
    occasions: ['Festivals', 'Wedding', 'Birthday', 'Anniversary'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/extracted/gift_hampers.png'],
    tags: ['Popular', 'Luxury Hamper', 'Gourmet Chocolates', 'Dry Fruits'],
    badge: 'Popular',
    status: 'active',
    preparationHours: 12,
    rating: 5.0,
    reviewsCount: 98,
    salesCount: 48,
    variants: [
      { id: 'v-hamper-1', name: 'Size', value: 'Classic Deluxe Hamper', priceDelta: 0 },
      { id: 'v-hamper-2', name: 'Size', value: 'Grand Royal Hamper', priceDelta: 500 },
    ],
  },
  {
    id: 'prod-06',
    name: 'Personalized Keychain',
    slug: 'personalized-keychain',
    description: 'Charming laser-cut acrylic heart keychain with crystal resin petals and personalized cursive calligraphy name. Lightweight, durable, and scratch-resistant.',
    price: 199,
    comparePrice: 299,
    stock: 65,
    category: 'Customized Gifts',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/extracted/personalized_keychain.png'],
    tags: ['Acrylic Heart', 'Custom Name', 'Keychain', 'Cute Gift'],
    status: 'active',
    preparationHours: 8,
    rating: 4.7,
    reviewsCount: 165,
    salesCount: 46,
  },
  {
    id: 'prod-07',
    name: 'High-Speed 4WD Stunt RC Racing Car',
    slug: 'high-speed-rc-drift-car',
    description: 'High-torque 4WD remote control racing car with rubber drift tires, working LED headlamps, 2.4GHz remote controller, and rechargeable USB battery pack. Reaches up to 25 km/h.',
    price: 899,
    comparePrice: 1499,
    stock: 24,
    category: 'Toys & Soft Toys',
    occasions: ['Birthday', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/rc_car_toy.jpg'],
    tags: ['RC Car', 'High Speed', 'Kids Favorite', 'Rechargeable'],
    badge: 'Trending Toy',
    status: 'active',
    preparationHours: 1,
    rating: 4.9,
    reviewsCount: 112,
    salesCount: 55,
    variants: [
      { id: 'v-rc-1', name: 'Color', value: 'Inferno Red', priceDelta: 0 },
      { id: 'v-rc-2', name: 'Color', value: 'Cyber Cyan', priceDelta: 50 },
    ],
  },
  {
    id: 'prod-08',
    name: 'Luxury Coral Velvet Gifting Handbag',
    slug: 'luxury-coral-velvet-gifting-bag',
    description: 'Elegant structured luxury handbag with silver twist-lock clasp, top handle, detachable cross-body shoulder strap, and spacious satin-lined compartments.',
    price: 1199,
    comparePrice: 1899,
    stock: 18,
    category: 'Bags & Clutches',
    occasions: ['Anniversary', 'Birthday', 'Wedding'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/gift_tote_bag.jpg'],
    tags: ['Luxury Bag', 'Fashion', 'Handbag', 'Designer'],
    badge: 'Luxury',
    status: 'active',
    preparationHours: 4,
    rating: 4.8,
    reviewsCount: 84,
    salesCount: 39,
  },
  {
    id: 'prod-09',
    name: 'Fluffy Cuddle Teddy Bear (Brown 16-Inch)',
    slug: 'fluffy-cuddle-teddy-brown',
    description: 'Ultra-soft 16-inch plush cuddle teddy bear with adorable button eyes and satin bow tie. 100% hypoallergenic siliconized cotton filling.',
    price: 799,
    comparePrice: 1099,
    stock: 28,
    category: 'Toys & Soft Toys',
    occasions: ['Birthday', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/brown_teddy_bear.jpg'],
    tags: ['Plush Toy', 'Super Soft', 'Kids & Loved Ones'],
    badge: 'Super Soft',
    status: 'active',
    preparationHours: 2,
    rating: 4.9,
    reviewsCount: 135,
    salesCount: 62,
  },
  {
    id: 'prod-10',
    name: 'Custom White Ceramic Coffee Mug',
    slug: 'custom-white-ceramic-mug',
    description: 'Bright white 11oz ceramic sublimation coffee mug with photo and typography text. Microwave safe and dishwasher proof.',
    price: 249,
    comparePrice: 349,
    stock: 45,
    category: 'Photo Mugs',
    occasions: ['Birthday', 'Anniversary'],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: ['/products/white_photo_mug.jpg'],
    tags: ['White Ceramic', '11oz', 'Sublimation'],
    status: 'active',
    preparationHours: 4,
    rating: 4.7,
    reviewsCount: 92,
    salesCount: 44,
  },
  {
    id: 'prod-11',
    name: 'Royal Hardboard Magnetic Gift Box',
    slug: 'royal-hardboard-gift-box',
    description: 'Rigid luxury presentation packaging box with magnetic snap flap, pre-tied satin ribbon, and soft velvet cushion bed.',
    price: 399,
    comparePrice: 599,
    stock: 35,
    category: 'Gift Hampers',
    occasions: ['Festivals', 'Wedding'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/premium_gift_box.jpg'],
    tags: ['Rigid Hardboard', 'Magnetic Flap', 'Gift Ready'],
    badge: 'Premium Box',
    status: 'active',
    preparationHours: 1,
    rating: 4.9,
    reviewsCount: 65,
    salesCount: 50,
  },
  {
    id: 'prod-12',
    name: '3D Musical Pop-Up Birthday Greeting Card',
    slug: '3d-musical-popup-birthday-card',
    description: 'Intricately laser-cut 3D pop-up celebration greeting card with warm LED candle light and happy birthday melody upon opening.',
    price: 149,
    comparePrice: 249,
    stock: 80,
    category: 'Greeting Cards',
    occasions: ['Birthday'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/birthday_popup_card.jpg'],
    tags: ['3D Pop-Up', 'Musical', 'Laser Cut'],
    badge: '3D Pop-Up',
    status: 'active',
    preparationHours: 2,
    rating: 4.8,
    reviewsCount: 94,
    salesCount: 58,
  },
  {
    id: 'prod-13',
    name: 'Vintage Roman Dial Solid Wood Wall Clock (16-Inch)',
    slug: 'vintage-roman-dial-wall-clock',
    description: 'Handcrafted solid teakwood 16-inch grand wall clock with embossed Roman numerals, champagne gold hands, and silent sweep quartz movement (no ticking sound).',
    price: 1499,
    comparePrice: 2299,
    stock: 15,
    category: 'Wall Watches',
    occasions: ['Anniversary', 'Wedding', 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/wall_watch_clock.jpg'],
    tags: ['Wall Clock', 'Solid Wood', 'Silent Sweep', 'Home Decor'],
    badge: 'Silent Sweep',
    status: 'active',
    preparationHours: 6,
    rating: 4.9,
    reviewsCount: 78,
    salesCount: 29,
  },
  {
    id: 'prod-14',
    name: 'Royal Champagne Brass Silent Sweep Wall Clock',
    slug: 'royal-champagne-brass-wall-clock',
    description: 'Luxury brushed metallic brass finish round wall clock with anti-reflective glass and precision Japanese quartz movement. Perfect living room centerpiece.',
    price: 1899,
    comparePrice: 2699,
    stock: 12,
    category: 'Wall Watches',
    occasions: ['Wedding', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=900&auto=format&fit=crop&q=90'],
    tags: ['Brass Finish', 'Luxury Clock', 'Living Room'],
    badge: 'Royal Decor',
    status: 'active',
    preparationHours: 6,
    rating: 5.0,
    reviewsCount: 52,
    salesCount: 22,
  },
  {
    id: 'prod-vy-1',
    name: 'Bags for Every Occasion',
    slug: 'bags-for-every-occasion',
    description: 'Accessorize with our fashionable bags. Whether it is for work, casual outings, or celebratory parties, find the perfect design to complement your style.',
    price: 799,
    comparePrice: 1299,
    stock: 25,
    category: 'Bags & Clutches',
    occasions: ['Birthday', 'Anniversary', 'Wedding'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/vyaparify/bags_occasion.jpg'],
    tags: ['Fashion Bags', 'Premium Material', 'Gondia Store', 'Trending'],
    badge: 'Store Special',
    status: 'active',
    preparationHours: 2,
    rating: 4.8,
    reviewsCount: 64,
    salesCount: 38,
  },
  {
    id: 'prod-vy-2',
    name: 'Trendy Compact Sling Bags',
    slug: 'trendy-compact-sling-bags',
    description: 'Keep your essentials close at hand with our versatile sling bags. Lightweight, chic, and practical for on-the-go lifestyle.',
    price: 499,
    comparePrice: 799,
    stock: 30,
    category: 'Bags & Clutches',
    occasions: ['Birthday', 'Casual Gifting'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/vyaparify/sling_bags.jpg'],
    tags: ['Sling Bag', 'Lightweight', 'Everyday Use'],
    badge: 'Popular',
    status: 'active',
    preparationHours: 2,
    rating: 4.7,
    reviewsCount: 48,
    salesCount: 42,
  },
  {
    id: 'prod-vy-3',
    name: 'Explore Our Wide Range of Toys',
    slug: 'explore-wide-range-of-toys',
    description: 'Ignite your child’s imagination with our extensive collection of action toys, racing cars, educational games, and cute models.',
    price: 699,
    comparePrice: 999,
    stock: 40,
    category: 'Toys & Soft Toys',
    occasions: ['Birthday', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/vyaparify/toys_range.jpg'],
    tags: ['Kids Toys', 'Action Figures', 'Safe Materials', 'Gondia Store'],
    badge: 'Kids Favorite',
    status: 'active',
    preparationHours: 1,
    rating: 4.9,
    reviewsCount: 92,
    salesCount: 65,
  },
  {
    id: 'prod-vy-4',
    name: 'Assorted Gourmet Gift Chocolates',
    slug: 'assorted-gourmet-gift-chocolates',
    description: 'Satisfy sweet cravings with delectable imported and handcrafted chocolates. Rich dark and creamy milk pralines packaged for gifting.',
    price: 349,
    comparePrice: 499,
    stock: 50,
    category: 'Gift Hampers',
    occasions: ['Birthday', 'Anniversary', 'Valentine\'s Day', 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/vyaparify/chocolate.jpg'],
    tags: ['Chocolates', 'Gourmet', 'Gift Hamper', 'Sweet Surprise'],
    badge: 'Sweet Treat',
    status: 'active',
    preparationHours: 1,
    rating: 4.9,
    reviewsCount: 110,
    salesCount: 78,
  },
  {
    id: 'prod-vy-5',
    name: 'Elegant Neck Pendants for Every Neckline',
    slug: 'neck-pendants-for-every-neckline',
    description: 'Add a touch of sparkling elegance to any outfit with our hand-picked pendant necklaces. Fine craftsmanship with brilliant polish.',
    price: 299,
    comparePrice: 499,
    stock: 35,
    category: 'Accessories',
    occasions: ['Birthday', 'Anniversary', 'Valentine\'s Day'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/vyaparify/neck_pendants.jpg'],
    tags: ['Pendants', 'Fashion Jewellery', 'Gift for Her'],
    badge: 'Trending',
    status: 'active',
    preparationHours: 2,
    rating: 4.8,
    reviewsCount: 56,
    salesCount: 34,
  },
  {
    id: 'prod-vy-6',
    name: 'Sparkling Charm Bracelets for All Occasions',
    slug: 'bracelets-for-all-occasions',
    description: 'Accessorize with our stunning bracelets. From delicate minimalist designs to bold statement charms, find the piece that shines.',
    price: 249,
    comparePrice: 399,
    stock: 45,
    category: 'Accessories',
    occasions: ['Birthday', 'Valentine\'s Day', 'Friendship Day'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/vyaparify/bracelets.jpg'],
    tags: ['Bracelets', 'Charm', 'Fashion Jewellery'],
    status: 'active',
    preparationHours: 2,
    rating: 4.7,
    reviewsCount: 42,
    salesCount: 29,
  },
  {
    id: 'prod-vy-7',
    name: 'Fashionable UV Goggles for Every Look',
    slug: 'fashionable-goggles-for-every-look',
    description: 'Make a bold style statement with our modern UV-protected sunglasses. Ergonomic frame, scratch-resistant lenses, and trendsetting aesthetics.',
    price: 399,
    comparePrice: 699,
    stock: 30,
    category: 'Accessories',
    occasions: ['Birthday', 'Casual Gifting'],
    isCustomizable: false,
    customizationType: 'none',
    images: ['/products/vyaparify/goggles.jpg'],
    tags: ['Goggles', 'Sunglasses', 'UV Protection', 'Fashion'],
    badge: 'Hot Style',
    status: 'active',
    preparationHours: 1,
    rating: 4.8,
    reviewsCount: 68,
    salesCount: 45,
  },
  {
    id: 'prod-vy-8',
    name: 'Fashionable Wallets for Him and Her',
    slug: 'fashionable-wallets-him-her',
    description: 'Stay stylishly organized with our premium leatherette wallets. Designed with multiple card slots, coin pocket, and secure closure.',
    price: 349,
    comparePrice: 599,
    stock: 40,
    category: 'Bags & Clutches',
    occasions: ['Birthday', 'Anniversary'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/vyaparify/wallets.jpg'],
    tags: ['Wallets', 'Leatherette', 'Gift for Him', 'Gift for Her'],
    status: 'active',
    preparationHours: 2,
    rating: 4.8,
    reviewsCount: 52,
    salesCount: 37,
  },
  {
    id: 'prod-vy-9',
    name: 'Romantic Couple Watches (Special Bond Edition)',
    slug: 'romantic-couple-watches-bond-edition',
    description: 'Celebrate your sacred bond with matching his & hers luxury couple watches. Water-resistant stainless steel case with precision quartz movement.',
    price: 1199,
    comparePrice: 1899,
    stock: 20,
    category: 'Customized Gifts',
    occasions: ['Anniversary', 'Wedding', 'Valentine\'s Day'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/vyaparify/couple_watches.jpg'],
    tags: ['Couple Watches', 'Matching Watches', 'Romantic Gift', 'Luxury'],
    badge: 'Best for Couples',
    status: 'active',
    preparationHours: 4,
    rating: 5.0,
    reviewsCount: 88,
    salesCount: 52,
  },
  {
    id: 'prod-vy-10',
    name: 'Cuddle Teddy Bear Comfort Gift',
    slug: 'cuddle-teddy-bear-comfort-gift',
    description: 'Perfect for gifting or adding comfort to any space. Ultra-soft hugging plush fur with lovable expression, safe for children and sweethearts.',
    price: 449,
    comparePrice: 699,
    stock: 35,
    category: 'Toys & Soft Toys',
    occasions: ['Birthday', 'Valentine\'s Day'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: ['/products/vyaparify/teddy_bear.jpg'],
    tags: ['Teddy Bear', 'Soft Toy', 'Hugging Plush'],
    badge: 'Cute Hugs',
    status: 'active',
    preparationHours: 1,
    rating: 4.9,
    reviewsCount: 104,
    salesCount: 71,
  },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Priya Sharma',
    phone: '9876543210',
    email: 'priyasharma@gmail.com',
    city: 'Gondia',
    date: '17 Oct 2026',
    totalOrders: 3,
    totalSpent: 2197,
    avatarColor: 'bg-purple-500',
    initial: 'P',
  },
  {
    id: 'cust-2',
    name: 'Rahul Verma',
    phone: '8765432109',
    email: 'rahulverma@gmail.com',
    city: 'Gondia',
    date: '17 Oct 2026',
    totalOrders: 2,
    totalSpent: 2598,
    avatarColor: 'bg-rose-500',
    initial: 'R',
  },
  {
    id: 'cust-3',
    name: 'Neha Gupta',
    phone: '7654321098',
    email: 'nehagupta@gmail.com',
    city: 'Gondia',
    date: '16 Oct 2026',
    totalOrders: 1,
    totalSpent: 499,
    avatarColor: 'bg-coral-500',
    initial: 'N',
  },
  {
    id: 'cust-4',
    name: 'Amit Sahu',
    phone: '9876123456',
    email: 'amitsahu@gmail.com',
    city: 'Gondia',
    date: '16 Oct 2026',
    totalOrders: 2,
    totalSpent: 1898,
    avatarColor: 'bg-amber-500',
    initial: 'A',
  },
  {
    id: 'cust-5',
    name: 'Sneha Patil',
    phone: '9123456789',
    email: 'snehapatil@gmail.com',
    city: 'Gondia',
    date: '15 Oct 2026',
    totalOrders: 1,
    totalSpent: 799,
    avatarColor: 'bg-pink-500',
    initial: 'S',
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'order-1250',
    orderNumber: 'BG1250',
    customerName: 'Priya Sharma',
    customerPhone: '9876543210',
    customerEmail: 'priya@gmail.com',
    deliveryAddress: 'Flat 302, Rail Toly',
    city: 'Gondia',
    state: 'Maharashtra',
    pincode: '441614',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending COD',
    subtotal: 649,
    deliveryFee: 50,
    discount: 0,
    totalAmount: 699,
    status: 'Pending',
    createdAt: '2026-10-17T10:30:00Z',
    updatedAt: '2026-10-17T10:30:00Z',
    statusHistory: [
      {
        id: 'sh-1',
        status: 'Pending',
        timestamp: '2026-10-17T10:30:00Z',
        changedBy: 'System',
        notes: 'Order placed by customer via Storefront',
      },
    ],
    items: [
      {
        cartItemId: 'item-1a',
        product: INITIAL_PRODUCTS[1], // Personalized Photo Mug
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 299,
        totalPrice: 299,
        customization: {
          recipientName: 'Priya',
          customMessage: 'Happy Birthday to my bestie!',
          giftWrap: 'none',
        },
      },
      {
        cartItemId: 'item-1b',
        product: INITIAL_PRODUCTS[0], // Rose Teddy Bear
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 350,
        totalPrice: 350,
      },
    ],
  },
  {
    id: 'order-1249',
    orderNumber: 'BG1249',
    customerName: 'Rahul Verma',
    customerPhone: '8765432109',
    deliveryAddress: 'Civil Lines, Near Circuit House',
    city: 'Gondia',
    state: 'Maharashtra',
    pincode: '441601',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending COD',
    subtotal: 1249,
    deliveryFee: 50,
    discount: 0,
    totalAmount: 1299,
    status: 'Confirmed',
    createdAt: '2026-10-17T09:15:00Z',
    updatedAt: '2026-10-17T09:40:00Z',
    statusHistory: [
      {
        id: 'sh-2',
        status: 'Confirmed',
        timestamp: '2026-10-17T09:40:00Z',
        changedBy: 'Admin',
        notes: 'Order confirmed with customer on phone',
      },
    ],
    items: [
      {
        cartItemId: 'item-2a',
        product: INITIAL_PRODUCTS[4], // Gift Hampers
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 999,
        totalPrice: 999,
      },
      {
        cartItemId: 'item-2b',
        product: INITIAL_PRODUCTS[3], // Greeting Cards
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 49,
        totalPrice: 49,
      },
    ],
  },
  {
    id: 'order-1248',
    orderNumber: 'BG1248',
    customerName: 'Neha Gupta',
    customerPhone: '7654321098',
    deliveryAddress: 'Sindhi Colony, Ring Road',
    city: 'Gondia',
    state: 'Maharashtra',
    pincode: '441614',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending COD',
    subtotal: 449,
    deliveryFee: 50,
    discount: 0,
    totalAmount: 499,
    status: 'Preparing',
    createdAt: '2026-10-16T16:20:00Z',
    updatedAt: '2026-10-16T17:10:00Z',
    statusHistory: [
      {
        id: 'sh-3',
        status: 'Preparing',
        timestamp: '2026-10-16T17:10:00Z',
        changedBy: 'Print Hub',
        notes: 'Sublimation printing in progress',
      },
    ],
    items: [
      {
        cartItemId: 'item-3a',
        product: INITIAL_PRODUCTS[1], // Personalized Photo Mug
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 299,
        totalPrice: 299,
      },
    ],
  },
  {
    id: 'order-1247',
    orderNumber: 'BG1247',
    customerName: 'Amit Sahu',
    customerPhone: '9876123456',
    deliveryAddress: 'Gandhi Ward, Main Market',
    city: 'Gondia',
    state: 'Maharashtra',
    pincode: '441601',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending COD',
    subtotal: 949,
    deliveryFee: 50,
    discount: 0,
    totalAmount: 999,
    status: 'Ready',
    createdAt: '2026-10-16T12:00:00Z',
    updatedAt: '2026-10-16T15:30:00Z',
    statusHistory: [
      {
        id: 'sh-4',
        status: 'Ready',
        timestamp: '2026-10-16T15:30:00Z',
        changedBy: 'Admin',
        notes: 'Packed with luxury gift wrap and sealed',
      },
    ],
    items: [
      {
        cartItemId: 'item-4a',
        product: INITIAL_PRODUCTS[2], // LED Photo Frame
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 899,
        totalPrice: 899,
      },
    ],
  },
  {
    id: 'order-1246',
    orderNumber: 'BG1246',
    customerName: 'Sneha Patil',
    customerPhone: '9123456789',
    deliveryAddress: 'Ramnagar, Near Hanuman Mandir',
    city: 'Gondia',
    state: 'Maharashtra',
    pincode: '441614',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid on Delivery',
    subtotal: 749,
    deliveryFee: 50,
    discount: 0,
    totalAmount: 799,
    status: 'Delivered',
    createdAt: '2026-10-15T14:10:00Z',
    updatedAt: '2026-10-15T18:45:00Z',
    statusHistory: [
      {
        id: 'sh-5',
        status: 'Delivered',
        timestamp: '2026-10-15T18:45:00Z',
        changedBy: 'Delivery Rider',
        notes: 'Delivered to recipient, cash collected',
      },
    ],
    items: [
      {
        cartItemId: 'item-5a',
        product: INITIAL_PRODUCTS[6], // Teddy Bear (Brown)
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 749,
        totalPrice: 749,
      },
    ],
  },
];

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Birthday Gifts', slug: 'birthday-gifts', iconName: 'Cake', colorBg: '#FCE7F3', colorText: '#BE185D', itemCount: 42, description: 'Celebrate birthdays with heartfelt gifts' },
  { id: 'cat-2', name: 'Anniversary Gifts', slug: 'anniversary-gifts', iconName: 'Heart', colorBg: '#FFE4E6', colorText: '#E11D48', itemCount: 36, description: 'Romantic couple gifts and mementos' },
  { id: 'cat-3', name: 'Wedding Gifts', slug: 'wedding-gifts', iconName: 'Users', colorBg: '#FEF3C7', colorText: '#D97706', itemCount: 28, description: 'Grand presents for newly married couples' },
  { id: 'cat-4', name: 'Toys & Soft Toys', slug: 'toys-soft-toys', iconName: 'Smile', colorBg: '#D1FAE5', colorText: '#059669', itemCount: 54, description: 'Teddy bears, plush toys and RC cars' },
  { id: 'cat-5', name: 'Greeting Cards', slug: 'greeting-cards', iconName: 'Mail', colorBg: '#F3E8FF', colorText: '#7C3AED', itemCount: 65, description: 'Handcrafted floral and pop-up cards' },
  { id: 'cat-6', name: 'Photo Mugs', slug: 'photo-mugs', iconName: 'Coffee', colorBg: '#E0F2FE', colorText: '#0284C7', itemCount: 32, description: 'Magic heat reveal and custom ceramic mugs' },
  { id: 'cat-7', name: 'Gift Hampers', slug: 'gift-hampers', iconName: 'Gift', colorBg: '#FEE2E2', colorText: '#DC2626', itemCount: 24, description: 'Gourmet chocolates and festive hampers' },
  { id: 'cat-8', name: 'Customized Gifts', slug: 'customized-gifts', iconName: 'Sparkles', colorBg: '#FEF9C3', colorText: '#CA8A04', itemCount: 48, description: 'LED lamps, laser keychains and frames' },
  { id: 'cat-9', name: 'Bags & Clutches', slug: 'bags-clutches', iconName: 'ShoppingBag', colorBg: '#FFE4E6', colorText: '#E11D48', itemCount: 32, description: 'Designer handbags, sling bags and wallets' },
  { id: 'cat-10', name: 'Wall Watches', slug: 'wall-watches', iconName: 'Clock', colorBg: '#FEF3C7', colorText: '#B45309', itemCount: 18, description: 'Antique wooden and metallic silent wall clocks' },
  { id: 'cat-11', name: 'Accessories', slug: 'accessories', iconName: 'Sparkles', colorBg: '#F3E8FF', colorText: '#9333EA', itemCount: 26, description: 'Bracelets, neck pendants, and fashionable goggles' },
];

export const INITIAL_COUPONS: Coupon[] = [
  { id: 'c-1', code: 'BLOSSOM10', discountPercent: 10, minOrder: 499, expiryDate: '2026-12-31', usageLimit: 500, usedCount: 142, isActive: true },
  { id: 'c-2', code: 'FESTIVE50', discountPercent: 15, discountAmount: 50, minOrder: 999, expiryDate: '2026-11-15', usageLimit: 200, usedCount: 89, isActive: true },
  { id: 'c-3', code: 'GONDIAFIRST', discountPercent: 20, minOrder: 399, expiryDate: '2026-10-31', usageLimit: 1000, usedCount: 312, isActive: true },
];

export const INITIAL_REVIEWS: Review[] = [
  { id: 'rev-1', customerName: 'Pooja Tiwari', rating: 5, comment: 'The Magic Photo Mug was unbelievable! When my sister poured hot tea, her picture appeared. Gondia delivery was within 8 hours!', productName: 'Personalized Photo Mug', date: '16 Oct 2026', status: 'Approved' },
  { id: 'rev-2', customerName: 'Vikas Meshram', rating: 5, comment: 'Ordered the Rose Teddy Bear for our anniversary. The packaging and flowers were super fresh and beautiful.', productName: 'Rose Teddy Bear', date: '15 Oct 2026', status: 'Approved' },
  { id: 'rev-3', customerName: 'Anjali Agrawal', rating: 5, comment: 'The LED Photo Frame looks so royal in our living room! Thanks Blossom Gift Gondia.', productName: 'LED Photo Frame', date: '14 Oct 2026', status: 'Approved' },
];

export interface CreateOrderParams {
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city?: string;
  state?: string;
  pincode?: string;
  deliveryNotes?: string;
  items: CartItem[];
  subtotal?: number;
  deliveryFee?: number;
  discount?: number;
  totalAmount?: number;
  paymentMethod?: 'Cash on Delivery' | 'UPI / Online' | 'Prepaid';
  paymentStatus?: 'Pending COD' | 'Paid on Delivery' | 'Paid Online';
  status?: OrderStatus;
}

class StoreService {
  private products: Product[] = [];
  private orders: Order[] = [];
  private settings: StoreSettings = INITIAL_SETTINGS;
  private customers: Customer[] = [];
  private coupons: Coupon[] = [];
  private reviews: Review[] = [];
  private heroSlides: HeroSlide[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      const p = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      this.products = p ? JSON.parse(p) : INITIAL_PRODUCTS;

      const o = localStorage.getItem(STORAGE_KEYS.ORDERS);
      this.orders = o ? JSON.parse(o) : INITIAL_ORDERS;

      const s = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      this.settings = s ? JSON.parse(s) : INITIAL_SETTINGS;

      const c = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      this.customers = c ? JSON.parse(c) : INITIAL_CUSTOMERS;

      const cp = localStorage.getItem(STORAGE_KEYS.COUPONS);
      this.coupons = cp ? JSON.parse(cp) : INITIAL_COUPONS;

      const r = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      this.reviews = r ? JSON.parse(r) : INITIAL_REVIEWS;

      const hs = localStorage.getItem(STORAGE_KEYS.HERO_SLIDES);
      this.heroSlides = hs ? JSON.parse(hs) : INITIAL_HERO_SLIDES;
    } catch {
      this.products = INITIAL_PRODUCTS;
      this.orders = INITIAL_ORDERS;
      this.settings = INITIAL_SETTINGS;
      this.customers = INITIAL_CUSTOMERS;
      this.coupons = INITIAL_COUPONS;
      this.reviews = INITIAL_REVIEWS;
      this.heroSlides = INITIAL_HERO_SLIDES;
    }
  }

  private persist() {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(this.products));
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(this.settings));
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(this.customers));
      localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(this.coupons));
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(this.reviews));
      localStorage.setItem(STORAGE_KEYS.HERO_SLIDES, JSON.stringify(this.heroSlides));
      window.dispatchEvent(new Event('store_data_updated'));
    } catch (e) {
      console.error('Failed to persist store data', e);
    }
  }

  // PRODUCTS
  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  saveProduct(product: Product): Product {
    const idx = this.products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      this.products[idx] = product;
    } else {
      this.products.unshift(product);
    }
    this.persist();
    return product;
  }

  deleteProduct(id: string) {
    this.products = this.products.filter((p) => p.id !== id);
    this.persist();
  }

  // ORDERS
  getOrders(): Order[] {
    return this.orders;
  }

  getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  findOrder(orderNumber: string, phone?: string): Order | undefined {
    const cleanNum = orderNumber.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    const cleanPhone = phone ? phone.trim().replace(/[^0-9]/g, '').slice(-10) : '';

    return this.orders.find((o) => {
      const oNum = o.orderNumber.toLowerCase().replace(/[^a-z0-9]/g, '');
      const numMatch = oNum === cleanNum || o.id === orderNumber.trim();
      if (!numMatch) return false;
      if (cleanPhone) {
        const oPhone = o.customerPhone.replace(/[^0-9]/g, '').slice(-10);
        return oPhone === cleanPhone;
      }
      return true;
    });
  }

  createOrder(orderData: CreateOrderParams): Order {
    const subtotal = orderData.subtotal ?? orderData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryFee = orderData.deliveryFee ?? (subtotal >= this.settings.freeDeliveryThreshold ? 0 : this.settings.deliveryFee);
    const discount = orderData.discount ?? 0;
    const totalAmount = orderData.totalAmount ?? (subtotal + deliveryFee - discount);
    const status: OrderStatus = orderData.status ?? 'Pending';
    const orderNumber = `BG${Math.floor(1251 + Math.random() * 8000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      deliveryAddress: orderData.deliveryAddress,
      city: orderData.city || 'Gondia',
      state: orderData.state || 'Maharashtra',
      pincode: orderData.pincode || '441614',
      deliveryNotes: orderData.deliveryNotes,
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery',
      paymentStatus: orderData.paymentStatus || 'Pending COD',
      items: orderData.items,
      subtotal,
      deliveryFee,
      discount,
      totalAmount,
      status,
      statusHistory: [
        {
          id: `sh-${Date.now()}`,
          status,
          timestamp: new Date().toISOString(),
          changedBy: 'Customer',
          notes: 'Order received via Storefront',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);

    // Add or update customer
    const existingCust = this.customers.find((c) => c.phone === orderData.customerPhone);
    if (existingCust) {
      existingCust.totalOrders += 1;
      existingCust.totalSpent += newOrder.totalAmount;
    } else {
      this.customers.unshift({
        id: `cust-${Date.now()}`,
        name: orderData.customerName,
        phone: orderData.customerPhone,
        email: orderData.customerEmail || '',
        city: newOrder.city,
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        totalOrders: 1,
        totalSpent: newOrder.totalAmount,
        avatarColor: 'bg-rose-500',
        initial: orderData.customerName.charAt(0).toUpperCase() || 'C',
      });
    }

    this.persist();
    return newOrder;
  }

  updateOrderStatus(orderId: string, status: OrderStatus, notes?: string): Order | undefined {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (order) {
      order.status = status;
      order.updatedAt = new Date().toISOString();
      order.statusHistory.unshift({
        id: `sh-${Date.now()}`,
        status,
        notes: notes || `Status updated to ${status}`,
        timestamp: new Date().toISOString(),
        changedBy: 'Admin',
      });
      this.persist();
    }
    return order;
  }

  // CUSTOMERS
  getCustomers(): Customer[] {
    return this.customers;
  }

  // COUPONS
  getCoupons(): Coupon[] {
    return this.coupons;
  }

  saveCoupon(coupon: Coupon) {
    const idx = this.coupons.findIndex((c) => c.id === coupon.id);
    if (idx >= 0) {
      this.coupons[idx] = coupon;
    } else {
      this.coupons.unshift(coupon);
    }
    this.persist();
  }

  // REVIEWS
  getReviews(): Review[] {
    return this.reviews;
  }

  // SETTINGS
  getSettings(): StoreSettings {
    return this.settings;
  }

  saveSettings(newSettings: StoreSettings) {
    this.settings = newSettings;
    this.persist();
  }

  // HERO SLIDES (IMAGE & VIDEO)
  getHeroSlides(): HeroSlide[] {
    const list = this.heroSlides && this.heroSlides.length > 0 ? this.heroSlides : INITIAL_HERO_SLIDES;
    return [...list].sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  saveHeroSlides(slides: HeroSlide[]) {
    this.heroSlides = [...slides].sort((a, b) => (a.order || 0) - (b.order || 0));
    this.persist();
  }

  addHeroSlide(slide: Omit<HeroSlide, 'id'>): HeroSlide {
    const list = this.getHeroSlides();
    const newSlide: HeroSlide = {
      ...slide,
      id: `slide-${Date.now()}`,
      order: slide.order || list.length + 1,
    };
    this.heroSlides.push(newSlide);
    this.persist();
    return newSlide;
  }

  updateHeroSlide(id: string, updates: Partial<HeroSlide>) {
    const idx = this.heroSlides.findIndex((s) => s.id === id);
    if (idx >= 0) {
      this.heroSlides[idx] = { ...this.heroSlides[idx], ...updates };
      this.persist();
    }
  }

  deleteHeroSlide(id: string) {
    this.heroSlides = this.heroSlides.filter((s) => s.id !== id);
    // Re-index remaining slides order 1, 2, 3...
    this.heroSlides.sort((a, b) => (a.order || 0) - (b.order || 0)).forEach((s, idx) => {
      s.order = idx + 1;
    });
    this.persist();
  }

  moveHeroSlide(id: string, direction: 'up' | 'down') {
    const list = [...this.getHeroSlides()];
    const index = list.findIndex((s) => s.id === id);
    if (index < 0) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    // Swap positions
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // Re-assign normalized sequential order numbers (1, 2, 3...)
    list.forEach((slide, idx) => {
      slide.order = idx + 1;
    });

    this.heroSlides = list;
    this.persist();
  }

  resetToDefault() {
    this.products = INITIAL_PRODUCTS;
    this.orders = INITIAL_ORDERS;
    this.settings = INITIAL_SETTINGS;
    this.customers = INITIAL_CUSTOMERS;
    this.coupons = INITIAL_COUPONS;
    this.reviews = INITIAL_REVIEWS;
    this.heroSlides = INITIAL_HERO_SLIDES;
    this.persist();
  }
}

export const storeService = new StoreService();
