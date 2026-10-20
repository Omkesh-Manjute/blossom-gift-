import { Product, Order, OrderStatus, StoreSettings, CartItem } from '../types';

const STORAGE_KEYS = {
  PRODUCTS: 'blossom_gift_products_v5', // v5 with multi-variant options (Color, Size, Model Year) & price deltas
  ORDERS: 'blossom_gift_orders_v2',
  SETTINGS: 'blossom_gift_settings_v2',
};

export const INITIAL_SETTINGS: StoreSettings = {
  businessName: 'BLOSSOM GIFT',
  tagline: 'Personalized Gifts, Toys & Handcrafted Moments',
  address: 'Gupta Complex, Near N.M.D. College, Gondia, Maharashtra - 441614',
  city: 'Gondia',
  state: 'Maharashtra',
  pincode: '441614',
  phones: ['+91 8208589775', '+91 9673155741'],
  whatsapp: '918208589775',
  email: 'blossomgiftgondia@gmail.com',
  currency: 'INR',
  currencySymbol: '₹',
  deliveryFee: 50,
  freeDeliveryThreshold: 499,
  codEnabled: true,
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    name: 'Personalized Ceramic Magic Photo Mug',
    slug: 'personalized-magic-photo-mug',
    description: 'Heat-sensitive glossy ceramic mug that reveals your high-resolution custom photo and romantic or birthday message when hot beverage is poured. Grade-A ceramic.',
    price: 299,
    comparePrice: 499,
    stock: 45,
    category: 'Customized Mugs',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Best Seller', 'Heat Sensitive', 'Personalized', 'Deal of the Day'],
    status: 'active',
    preparationHours: 12,
    rating: 4.9,
    reviewsCount: 184,
    variants: [
      { id: 'v1', name: 'Color Style', value: 'Magic Black Heat Reveal', priceDelta: 0 },
      { id: 'v2', name: 'Color Style', value: 'Pearl White Classic', priceDelta: -30 },
      { id: 'v3', name: 'Color Style', value: 'Heart Handle Pink', priceDelta: 40 },
    ],
  },
  {
    id: 'prod-02',
    name: 'Handcrafted Oak Personalized Photo Frame',
    slug: 'handcrafted-oak-photo-frame',
    description: 'Handcrafted solid oak wood frame with premium anti-glare glass matting. Includes high-clarity archival photographic print of your photo and custom laser inscription.',
    price: 599,
    comparePrice: 899,
    stock: 28,
    category: 'Photo Frames',
    occasions: ['Anniversary', 'Wedding', 'Birthday'],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Handcrafted', 'Solid Wood', 'Anniversary Favorite'],
    status: 'active',
    preparationHours: 24,
    rating: 4.8,
    reviewsCount: 126,
    variants: [
      { id: 'vf1', name: 'Size', value: '8x10 Inch Desktop Stand', priceDelta: 0 },
      { id: 'vf2', name: 'Size', value: '12x18 Inch Wall Hanging', priceDelta: 250 },
    ],
  },
  {
    id: 'prod-03',
    name: 'Royal Blossom Luxury Gourmet Hamper',
    slug: 'royal-blossom-luxury-hamper',
    description: 'Deluxe hand-woven basket featuring Ferrero Rocher & Lindt chocolates, artisanal soy wax scented jar candle, customized golden foil card, and fragrant potpourri.',
    price: 1299,
    comparePrice: 1799,
    stock: 14,
    category: 'Gift Hampers',
    occasions: ['Festivals', 'Wedding', 'Birthday'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Luxury Basket', 'Gourmet', 'Gift Ready', 'Premium'],
    status: 'active',
    preparationHours: 18,
    rating: 5.0,
    reviewsCount: 92,
  },
  {
    id: 'prod-04',
    name: 'Custom Engraved 3D Acrylic LED Lamp',
    slug: 'custom-engraved-led-lamp',
    description: 'Warm golden LED night lamp engraved with your custom portrait outline and names on optical-grade acrylic with polished solid beechwood base. USB powered.',
    price: 799,
    comparePrice: 1199,
    stock: 22,
    category: 'LED Lamps',
    occasions: ['Anniversary', "Valentine's Day", 'Birthday'],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543157148-f81513253798?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Warm Light', 'Optical Acrylic', 'Romantic', 'Trending'],
    status: 'active',
    preparationHours: 24,
    rating: 4.9,
    reviewsCount: 145,
  },
  {
    id: 'prod-05',
    name: 'Handmade 4-Layer Explosion Gift Box',
    slug: 'handmade-explosion-gift-box',
    description: 'Intricately crafted multi-layered surprise explosion box holding up to 16 photo pockets, personal love notes, and a centerpiece jewelry or watch holder.',
    price: 649,
    comparePrice: 999,
    stock: 18,
    category: 'Explosion Boxes',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Surprise Box', 'Handmade Craft', '16 Photo Slots'],
    status: 'active',
    preparationHours: 36,
    rating: 4.7,
    reviewsCount: 88,
  },
  {
    id: 'prod-06',
    name: 'Gold Foil Custom Letterpress Greeting Card',
    slug: 'gold-foil-greeting-card',
    description: 'Heavyweight 350 GSM cotton card with metallic gold hot-foil embossing, calligraphy recipient name, and your heartfelt custom message printed inside with wax-sealed envelope.',
    price: 149,
    comparePrice: 249,
    stock: 85,
    category: 'Greeting Cards',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day", 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Letterpress', 'Gold Foil', 'Keepsake', 'Wax Seal'],
    status: 'active',
    preparationHours: 6,
    rating: 4.9,
    reviewsCount: 210,
  },
  {
    id: 'prod-07',
    name: 'Cute Fluffy Teddy & Imported Chocolates Combo',
    slug: 'cute-teddy-chocolate-combo',
    description: 'Fluffy 12-inch super-soft cuddle teddy bear with heart embroidery, Cadbury Celebrations pack, and customized ribbon note. Perfect for birthday surprises.',
    price: 449,
    comparePrice: 699,
    stock: 35,
    category: 'Toys',
    occasions: ['Birthday', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1559454403-b8fb88521f11?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Plush Soft', 'Sweet Treat', 'Instant Smile', 'Cute'],
    status: 'active',
    preparationHours: 6,
    rating: 4.8,
    reviewsCount: 115,
  },
  {
    id: 'prod-08',
    name: 'Crystal Cut Holographic Photo Keychain',
    slug: 'crystal-holographic-photo-keychain',
    description: 'Beveled K9 optical crystal keychain laser-engraved with your photo inside. Features rotatable LED illumination in crystal cap. Lifetime clarity guarantee.',
    price: 199,
    comparePrice: 349,
    stock: 55,
    category: 'Accessories',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['K9 Crystal', 'LED Light', 'Compact Gift', 'Pocket Size'],
    status: 'active',
    preparationHours: 12,
    rating: 4.6,
    reviewsCount: 68,
  },
  {
    id: 'prod-09',
    name: 'Personalized Velvet Touch Memory Cushion',
    slug: 'personalized-velvet-photo-cushion',
    description: 'Ultra-soft micro-velvet square cushion (16x16 inch) printed with vivid photographic sublimation of your favorite memories. Includes plush siliconized fiber filler.',
    price: 499,
    comparePrice: 799,
    stock: 30,
    category: 'Customized Gifts',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Soft Velvet', 'Washable Cover', 'Sublimation Print'],
    status: 'active',
    preparationHours: 18,
    rating: 4.9,
    reviewsCount: 78,
  },
  {
    id: 'prod-10',
    name: 'Heart-Handle Classic White Ceramic Couple Mug',
    slug: 'heart-handle-couple-mug',
    description: 'Romantic dual photo ceramic mug with sculpted heart-shaped handle. Specially coated for dishwasher-safe brilliant color retention for anniversary celebrations.',
    price: 349,
    comparePrice: 549,
    stock: 40,
    category: 'Customized Mugs',
    occasions: ['Anniversary', "Valentine's Day", 'Wedding'],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Heart Handle', 'Ceramic 11oz', 'Couple Gift'],
    status: 'active',
    preparationHours: 12,
    rating: 4.9,
    reviewsCount: 134,
  },
  {
    id: 'prod-11',
    name: 'Ferrero Rocher & Red Rose Luxury Velvet Bouquet',
    slug: 'ferrero-red-rose-luxury-bouquet',
    description: '16 golden Ferrero Rocher chocolates paired with premium long-stem Dutch red roses, wrapped in matte blush florist paper with golden satin ribbons.',
    price: 899,
    comparePrice: 1299,
    stock: 15,
    category: 'Combos',
    occasions: ['Birthday', 'Anniversary', "Valentine's Day"],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Fresh Flowers', 'Ferrero Chocolates', 'Same Day Gondia'],
    status: 'active',
    preparationHours: 4,
    rating: 5.0,
    reviewsCount: 88,
  },
  {
    id: 'prod-12',
    name: 'Handcrafted Laser-Engraved Wooden Desk Clock',
    slug: 'laser-engraved-wooden-desk-clock',
    description: 'Polished teakwood desktop timepiece with precision quartz silent movement. Custom laser-engraved with anniversary dates, company logo, or personalized family motto.',
    price: 699,
    comparePrice: 1099,
    stock: 20,
    category: 'Customized Gifts',
    occasions: ['Anniversary', 'Wedding', 'Festivals'],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Solid Teakwood', 'Silent Quartz', 'Executive Keepsake'],
    status: 'active',
    preparationHours: 24,
    rating: 4.7,
    reviewsCount: 52,
  },
  // --- TOYS / RC CARS ---
  {
    id: 'prod-13',
    name: 'Vintage Diecast Metal Classic Roadster Toy Car',
    slug: 'vintage-diecast-metal-classic-roadster',
    description: 'Heavyweight zinc alloy 1:32 scale vintage roadster featuring pull-back motor action, opening gull-wing doors, detailed engine interior, and real rubber tires. Ideal collector toy for kids and adults.',
    price: 449,
    comparePrice: 699,
    stock: 25,
    category: 'Toys/RC Cars',
    occasions: ['Birthday', 'Best Sellers'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Toys/RC Cars', 'Diecast Metal', 'Pullback Motor', 'Collector Edition', 'Kids Favorite', 'Vintage Roadster'],
    status: 'active',
    preparationHours: 6,
    rating: 4.9,
    reviewsCount: 76,
    variants: [
      { id: 'rc1-c1', name: 'Color', value: 'Matte Vintage Red', priceDelta: 0 },
      { id: 'rc1-c2', name: 'Color', value: 'Midnight Onyx Black', priceDelta: 30 },
      { id: 'rc1-c3', name: 'Color', value: 'Speed Canary Yellow', priceDelta: 30 },
      { id: 'rc1-y1', name: 'Model Year', value: '1967 Classic Edition', priceDelta: 0 },
      { id: 'rc1-y2', name: 'Model Year', value: '1970 Collector Chrome Edition', priceDelta: 120 },
    ],
  },
  {
    id: 'prod-14',
    name: 'High-Speed 4WD RC Off-Road Monster Stunt Car',
    slug: 'high-speed-4wd-rc-monster-stunt-car',
    description: '2.4GHz remote-controlled 4WD all-terrain monster crawler with 360-degree stunt spins, shock absorber suspension, dual rechargeable battery packs, and anti-crash bumper guard.',
    price: 899,
    comparePrice: 1399,
    stock: 18,
    category: 'Toys/RC Cars',
    occasions: ['Birthday', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Toys/RC Cars', 'RC Remote Control', '4WD Off-Road', 'Rechargeable', 'Stunt Action', 'High Speed Buggy'],
    status: 'active',
    preparationHours: 4,
    rating: 4.8,
    reviewsCount: 64,
    variants: [
      { id: 'rc2-y1', name: 'Model Year', value: '2024 Turbo Crawler', priceDelta: 0 },
      { id: 'rc2-y2', name: 'Model Year', value: '2025 Brushless High-Torque Pro', priceDelta: 250 },
      { id: 'rc2-c1', name: 'Color', value: 'Toxic Neon Green', priceDelta: 0 },
      { id: 'rc2-c2', name: 'Color', value: 'Blaze Lava Orange', priceDelta: 40 },
      { id: 'rc2-c3', name: 'Color', value: 'Stealth Camo Black', priceDelta: 70 },
    ],
  },
  {
    id: 'prod-15',
    name: 'Diecast Sports Supercar with Acrylic Display Case',
    slug: 'diecast-sports-supercar-acrylic-case',
    description: 'Precision scale replica sports supercar featuring functioning LED headlights, realistic revving engine sound effects on press, and a crystal-clear acrylic dustproof showcase display box.',
    price: 649,
    comparePrice: 999,
    stock: 22,
    category: 'Toys/RC Cars',
    occasions: ['Birthday', 'Anniversary'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Toys/RC Cars', 'LED Lights & Sound', 'Collector Showcase', 'Diecast Alloy', 'Display Case', 'Supercar'],
    status: 'active',
    preparationHours: 12,
    rating: 4.9,
    reviewsCount: 58,
    variants: [
      { id: 'rc-sc1', name: 'Color', value: 'Apex Rosso Corsa Red', priceDelta: 0 },
      { id: 'rc-sc2', name: 'Color', value: 'Giallo Modena Yellow', priceDelta: 30 },
      { id: 'rc-sc3', name: 'Color', value: 'Nero Daytona Gloss Black', priceDelta: 50 },
      { id: 'rc-sc4', name: 'Display Case', value: 'Standard Acrylic Cover', priceDelta: 0 },
      { id: 'rc-sc5', name: 'Display Case', value: 'Illuminated LED Base Case', priceDelta: 150 },
    ],
  },
  {
    id: 'prod-16',
    name: 'Handmade Natural Wooden Train & Track Set',
    slug: 'handmade-natural-wooden-train-set',
    description: 'Safe non-toxic organic beechwood magnetic engine and 3 passenger carriages with smooth rounded edges. Eco-friendly Montessori developmental toy for imaginative toddler play.',
    price: 399,
    comparePrice: 599,
    stock: 30,
    category: 'Toys/RC Cars',
    occasions: ['Birthday'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Toys/RC Cars', 'Non-Toxic Beechwood', 'Magnetic Link', 'Montessori Toy', 'Eco-Friendly', 'Toddler Toys'],
    status: 'active',
    preparationHours: 6,
    rating: 4.7,
    reviewsCount: 42,
    variants: [
      { id: 'wt1', name: 'Edition', value: 'Natural Raw Beechwood', priceDelta: 0 },
      { id: 'wt2', name: 'Edition', value: 'Vibrant Pastel Painted', priceDelta: 60 },
      { id: 'wt3', name: 'Track Extension', value: 'Basic 12-Piece Oval', priceDelta: 0 },
      { id: 'wt4', name: 'Track Extension', value: 'Deluxe 24-Piece Bridge Pack', priceDelta: 180 },
    ],
  },
  {
    id: 'prod-26',
    name: 'Gesture-Sensing 360° Stunt RC Twist Climbing Car',
    slug: 'gesture-sensing-stunt-rc-twist-car',
    description: 'Futuristic dual-control stunt vehicle operated through a gesture-sensing smart wristband or 2.4GHz remote. Bionic spine deformation allows it to conquer rugs, gravel, and grass with 360° tumbling flips and colorful LED side flares.',
    price: 1199,
    comparePrice: 1799,
    stock: 16,
    category: 'Toys/RC Cars',
    occasions: ['Birthday', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Toys/RC Cars', 'Gesture Sensor Watch', 'Stunt Car', 'Bionic Spine', 'Mecanum Drift', 'Rechargeable Battery'],
    status: 'active',
    preparationHours: 6,
    rating: 4.9,
    reviewsCount: 51,
    variants: [
      { id: 'rc3-y1', name: 'Model Year', value: '2024 Dual-Motor Standard', priceDelta: 0 },
      { id: 'rc3-y2', name: 'Model Year', value: '2025 Extreme Bionic Edition', priceDelta: 200 },
      { id: 'rc3-c1', name: 'Color', value: 'Cyber Matrix Cyan', priceDelta: 0 },
      { id: 'rc3-c2', name: 'Color', value: 'Plasma Ruby Red', priceDelta: 50 },
      { id: 'rc3-c3', name: 'Color', value: 'Galactic Emerald Green', priceDelta: 50 },
    ],
  },
  {
    id: 'prod-27',
    name: '1:16 High-Speed Turbo Drift RC Racing Car with Extra Tires',
    slug: 'high-speed-turbo-drift-rc-racing-car',
    description: '28 km/h drift racer equipped with 2 sets of interchangeable wheels (high-grip racing rubber & slick drift wheels), working front LED headlights, and 2.4GHz proportional pistol-grip throttle for precision drifting.',
    price: 999,
    comparePrice: 1549,
    stock: 20,
    category: 'Toys/RC Cars',
    occasions: ['Birthday', 'Best Sellers'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Toys/RC Cars', 'Turbo Drift', '28 km/h Speed', 'Drift Tires Included', 'LED Headlights', 'Pistol Remote'],
    status: 'active',
    preparationHours: 4,
    rating: 4.8,
    reviewsCount: 39,
    variants: [
      { id: 'rc4-y1', name: 'Model Year', value: '2024 Street Drift Spec', priceDelta: 0 },
      { id: 'rc4-y2', name: 'Model Year', value: '2025 Track Championship Spec', priceDelta: 300 },
      { id: 'rc4-c1', name: 'Color', value: 'Fast & Furious Hyper Blue', priceDelta: 0 },
      { id: 'rc4-c2', name: 'Color', value: 'Midnight Carbon Ghost', priceDelta: 100 },
      { id: 'rc4-c3', name: 'Color', value: 'Sunset Tokyo Drift Orange', priceDelta: 70 },
    ],
  },

  // --- WALL WATCHES ---
  {
    id: 'prod-17',
    name: 'Nordic Minimalist 3D Wooden Silent Wall Watch',
    slug: 'nordic-minimalist-wooden-silent-wall-watch',
    description: 'Elegant circular Scandinavian wall watch handcrafted with natural walnut & birch wood layers. Ultra-silent Japanese quartz sweep movement with zero ticking noise and rose gold brushed aluminum hands.',
    price: 749,
    comparePrice: 1199,
    stock: 24,
    category: 'Wall Watches',
    occasions: ['Anniversary', 'Wedding', 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Wall Watches', 'Silent Sweep Quartz', 'Natural Walnut', 'Nordic Decor', '14-Inch Diameter', 'Living Room Watch'],
    status: 'active',
    preparationHours: 18,
    rating: 4.8,
    reviewsCount: 94,
    variants: [
      { id: 'ww1-c1', name: 'Color', value: 'Natural Walnut', priceDelta: 0 },
      { id: 'ww1-c2', name: 'Color', value: 'Birch White Oak', priceDelta: 50 },
      { id: 'ww1-c3', name: 'Color', value: 'Smoked Ebony Black', priceDelta: 90 },
      { id: 'ww1-s1', name: 'Size', value: '12-Inch Compact', priceDelta: 0 },
      { id: 'ww1-s2', name: 'Size', value: '14-Inch Standard', priceDelta: 150 },
      { id: 'ww1-s3', name: 'Size', value: '16-Inch Grand Salon', priceDelta: 320 },
    ],
  },
  {
    id: 'prod-18',
    name: 'Personalized Family Photo Dial Wall Watch',
    slug: 'personalized-family-photo-dial-wall-watch',
    description: '14-inch customized wall watch displaying your cherished family memories at each hour marker. Scratch-resistant acrylic face with gold finish hands and precision silent quartz timekeeping.',
    price: 849,
    comparePrice: 1299,
    stock: 19,
    category: 'Wall Watches',
    occasions: ['Anniversary', 'Birthday', 'Wedding'],
    isCustomizable: true,
    customizationType: 'photo_and_text',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Wall Watches', 'Custom Photo Dial', '14-Inch Big Dial', 'Silent Movement', 'Family Keepsake', 'Personalized Gift'],
    status: 'active',
    preparationHours: 24,
    rating: 4.9,
    reviewsCount: 112,
    variants: [
      { id: 'ww2-c1', name: 'Color', value: 'Antique Champagne Gold', priceDelta: 0 },
      { id: 'ww2-c2', name: 'Color', value: 'Royal Rose Gold', priceDelta: 80 },
      { id: 'ww2-c3', name: 'Color', value: 'Matte Midnight Black', priceDelta: 50 },
      { id: 'ww2-s1', name: 'Size', value: '12-Inch Standard', priceDelta: 0 },
      { id: 'ww2-s2', name: 'Size', value: '14-Inch Large', priceDelta: 180 },
      { id: 'ww2-s3', name: 'Size', value: '16-Inch Executive Big Dial', priceDelta: 380 },
    ],
  },
  {
    id: 'prod-19',
    name: 'Vintage Industrial Roman Numerals Metal Gear Wall Watch',
    slug: 'vintage-industrial-metal-gear-wall-watch',
    description: 'Rustic 16-inch oversized wrought iron skeleton wall watch with antique bronze finish, cutout Roman numerals, and moving decorative mechanical gears. Statement piece for living rooms and offices.',
    price: 1199,
    comparePrice: 1799,
    stock: 12,
    category: 'Wall Watches',
    occasions: ['Wedding', 'Festivals', 'Anniversary'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Wall Watches', 'Wrought Iron', 'Industrial Rustic', '16-Inch Oversized', 'Antique Bronze', 'Mechanical Gears'],
    status: 'active',
    preparationHours: 12,
    rating: 4.8,
    reviewsCount: 67,
    variants: [
      { id: 'ww3-c1', name: 'Color', value: 'Rustic Antique Bronze', priceDelta: 0 },
      { id: 'ww3-c2', name: 'Color', value: 'Cast Iron Matte Black', priceDelta: 70 },
      { id: 'ww3-c3', name: 'Color', value: 'Aged Copper Patina', priceDelta: 120 },
      { id: 'ww3-s1', name: 'Size', value: '16-Inch Classic', priceDelta: 0 },
      { id: 'ww3-s2', name: 'Size', value: '20-Inch Oversized Statement', priceDelta: 350 },
    ],
  },
  {
    id: 'prod-20',
    name: 'Luxury Double-Sided Railway Station Hanging Wall Watch',
    slug: 'luxury-double-sided-railway-station-wall-watch',
    description: '360-degree dual-dial antique station wall timepiece suspended from an ornamental wrought-iron scroll bracket. Features vintage parchment dials, glass lens casing, and ultra-quiet twin quartz movements.',
    price: 1299,
    comparePrice: 1999,
    stock: 14,
    category: 'Wall Watches',
    occasions: ['Anniversary', 'Wedding', 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Wall Watches', 'Double Sided Watch', 'Railway Station Style', 'Wrought Iron Bracket', 'Dual Quartz', 'Vintage Timepiece'],
    status: 'active',
    preparationHours: 18,
    rating: 5.0,
    reviewsCount: 83,
    variants: [
      { id: 'ww-rs1', name: 'Bracket Finish', value: 'Victorian Wrought Black', priceDelta: 0 },
      { id: 'ww-rs2', name: 'Bracket Finish', value: 'Antique Brushed Brass', priceDelta: 120 },
      { id: 'ww-rs3', name: 'Size', value: '10-Inch Station Dial', priceDelta: 0 },
      { id: 'ww-rs4', name: 'Size', value: '14-Inch Grand Junction Dial', priceDelta: 280 },
    ],
  },
  {
    id: 'prod-28',
    name: 'Modern Sunburst Crystal Jewel Gold Metal Wall Watch',
    slug: 'modern-sunburst-crystal-gold-metal-wall-watch',
    description: 'Spectacular 20-inch oversized statement wall watch radiating hand-set multifaceted crystal glass jewels on electroplated golden steel rays. High-torque silent movement with crystal clear numeric dial.',
    price: 1349,
    comparePrice: 2199,
    stock: 15,
    category: 'Wall Watches',
    occasions: ['Anniversary', 'Wedding', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Wall Watches', 'Crystal Sunburst', 'Gold Electroplate', '20-Inch Statement', 'Glam Luxury', 'Silent Movement'],
    status: 'active',
    preparationHours: 16,
    rating: 4.9,
    reviewsCount: 62,
    variants: [
      { id: 'ww4-c1', name: 'Color', value: 'Electroplated 24K Gold', priceDelta: 0 },
      { id: 'ww4-c2', name: 'Color', value: 'Platinum Mirror Silver', priceDelta: 90 },
      { id: 'ww4-s1', name: 'Size', value: '18-Inch Wall Accent', priceDelta: 0 },
      { id: 'ww4-s2', name: 'Size', value: '24-Inch Statement Grand', priceDelta: 450 },
    ],
  },
  {
    id: 'prod-29',
    name: 'Contemporary Marble Texture & Brass Trim Silent Wall Watch',
    slug: 'contemporary-marble-brass-silent-wall-watch',
    description: 'Luxurious 12-inch minimalist wall watch crafted with natural grey vein white marble composite dial, embossed satin brass hour indices, and tapered golden second hand. Absolutely silent sweep action.',
    price: 849,
    comparePrice: 1299,
    stock: 20,
    category: 'Wall Watches',
    occasions: ['Birthday', 'Anniversary', 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Wall Watches', 'White Marble Texture', 'Brass Accents', 'Scandinavian Modern', 'Sweep Second Hand', 'Bedroom Watch'],
    status: 'active',
    preparationHours: 12,
    rating: 4.8,
    reviewsCount: 45,
    variants: [
      { id: 'ww5-c1', name: 'Color', value: 'Carrara White Marble & Brass', priceDelta: 0 },
      { id: 'ww5-c2', name: 'Color', value: 'Nero Marquina Black & Gold', priceDelta: 110 },
      { id: 'ww5-c3', name: 'Color', value: 'Emerald Green Jade & Rose Gold', priceDelta: 160 },
      { id: 'ww5-s1', name: 'Size', value: '12-Inch Diameter', priceDelta: 0 },
      { id: 'ww5-s2', name: 'Size', value: '15-Inch Diameter', priceDelta: 220 },
    ],
  },

  // --- DECORATIVE ITEMS & HOME ACCENTS ---
  {
    id: 'prod-21',
    name: 'Handcrafted Brass Peacock Urli Bowl for Floating Flowers',
    slug: 'brass-peacock-urli-bowl-floating-flowers',
    description: 'Traditional 10-inch polished brass urli with intricate peacock carvings and rim diya holders. Perfect aesthetic centerpiece for Diwali, home entrance, or pooja room with rose petals and floating candles.',
    price: 799,
    comparePrice: 1199,
    stock: 20,
    category: 'Decorative Items',
    occasions: ['Festivals', 'Wedding'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Decorative Items', 'Pure Brass', 'Traditional Urli', 'Floating Flowers', 'Pooja Decor', 'Festive Urli'],
    status: 'active',
    preparationHours: 12,
    rating: 4.9,
    reviewsCount: 95,
  },
  {
    id: 'prod-22',
    name: 'Nordic Fluted Ceramic Donut Vase with Dried Pampas Grass',
    slug: 'nordic-ceramic-donut-vase-pampas-grass',
    description: 'Modern aesthetic hollow round donut ceramic flower vase with matte textured finish. Comes complete with a bouquet of fluffy natural dried pampas grass and bunny tails for chic tabletop decor.',
    price: 549,
    comparePrice: 849,
    stock: 28,
    category: 'Decorative Items',
    occasions: ['Birthday', 'Anniversary', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Decorative Items', 'Nordic Donut Vase', 'Pampas Grass Bouquet', 'Boho Aesthetic', 'Tabletop Decor', 'Modern Pottery'],
    status: 'active',
    preparationHours: 6,
    rating: 4.8,
    reviewsCount: 71,
  },
  {
    id: 'prod-23',
    name: '3D Laser-Engraved Crystal Galaxy Solar System Globe Lamp',
    slug: '3d-crystal-galaxy-solar-system-globe-lamp',
    description: '80mm solid optical K9 crystal sphere with internal 3D laser-engraved planetary solar system, seated on an illuminated beechwood base with warm glowing LED ambient night light.',
    price: 699,
    comparePrice: 1099,
    stock: 25,
    category: 'Decorative Items',
    occasions: ['Birthday', 'Festivals'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Decorative Items', 'K9 Crystal Sphere', 'Solar System 3D', 'Warm Glow Base', 'Ambient Lighting', 'Galaxy Lamp'],
    status: 'active',
    preparationHours: 12,
    rating: 4.9,
    reviewsCount: 88,
  },
  {
    id: 'prod-24',
    name: 'Artisanal Botanical Scented Soy Candle Hamper (Set of 4)',
    slug: 'artisanal-botanical-scented-soy-candle-hamper',
    description: '100% natural soy wax candles infused with pure therapeutic essential oils in frosted amber glass jars: French Lavender, Madagascan Vanilla, English Rose, and Mysore Sandalwood.',
    price: 499,
    comparePrice: 799,
    stock: 35,
    category: 'Decorative Items',
    occasions: ['Festivals', 'Birthday', 'Anniversary'],
    isCustomizable: true,
    customizationType: 'text_only',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Decorative Items', '100% Soy Wax', 'Essential Oils', 'Set of 4 Jars', 'Aromatherapy Gift', 'Scented Candles'],
    status: 'active',
    preparationHours: 6,
    rating: 4.9,
    reviewsCount: 104,
  },
  {
    id: 'prod-25',
    name: 'Handmade Macramé Boho Wall Hanging Shelf with Pine Base',
    slug: 'handmade-macrame-boho-wall-hanging-shelf',
    description: 'Hand-knotted 100% natural cotton macramé cord wall tapestry supporting a solid pine floating shelf. Ideal for displaying small potted succulents, crystals, or scented candles.',
    price: 599,
    comparePrice: 899,
    stock: 16,
    category: 'Decorative Items',
    occasions: ['Anniversary', 'Festivals'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Decorative Items', 'Hand-knotted Macrame', 'Pine Wood Shelf', 'Boho Wall Art', 'Aesthetic Home', 'Hanging Shelf'],
    status: 'active',
    preparationHours: 12,
    rating: 4.8,
    reviewsCount: 49,
  },
  {
    id: 'prod-30',
    name: 'Golden Ginkgo Biloba Botanical Metal Wall Art Sculpture',
    slug: 'golden-ginkgo-biloba-metal-wall-art-sculpture',
    description: 'Exquisite 24-inch handcrafted metallic wall sculpture depicting overlapping Ginkgo leaves with lustrous champagne gold and warm bronze anti-rust baked enamel finishes. Instantly elevates living room and hallway walls.',
    price: 1149,
    comparePrice: 1799,
    stock: 14,
    category: 'Decorative Items',
    occasions: ['Wedding', 'Festivals', 'Anniversary'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Decorative Items', 'Metal Wall Sculpture', 'Golden Ginkgo Leaf', '24-Inch Wall Art', 'Luxury Living Room', 'Handmade Metal'],
    status: 'active',
    preparationHours: 14,
    rating: 4.9,
    reviewsCount: 56,
  },
  {
    id: 'prod-31',
    name: 'Serene Meditating Buddha Figurine with Lotus Tealight Holder',
    slug: 'serene-meditating-buddha-figurine-tealight-holder',
    description: 'Graceful 9-inch meditating Dhyana Buddha idol cast in premium high-density polyresin with antique stone finish and golden highlights. Features an integrated lotus tealight bowl for soothing spiritual serenity and positive vibes.',
    price: 599,
    comparePrice: 949,
    stock: 25,
    category: 'Decorative Items',
    occasions: ['Festivals', 'Birthday', 'Wedding'],
    isCustomizable: false,
    customizationType: 'none',
    images: [
      'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
    ],
    tags: ['Decorative Items', 'Meditating Buddha', 'Lotus Tealight Holder', 'Spiritual Decor', 'Zen Corner', 'Pooja & Gifting'],
    status: 'active',
    preparationHours: 8,
    rating: 4.9,
    reviewsCount: 68,
  },
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'BG-2026-4091',
    customerName: 'Rahul Verma',
    customerPhone: '9823415678',
    customerEmail: 'rahul.verma@example.com',
    deliveryAddress: 'Plot 42, Ramnagar, Near Civil Hospital',
    city: 'Gondia',
    state: 'Maharashtra',
    pincode: '441601',
    deliveryNotes: 'Please ring bell twice. Call before arrival.',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending COD',
    items: [
      {
        cartItemId: 'item-101-1',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        giftWrapFee: 49,
        unitPrice: 299,
        totalPrice: 348,
        customization: {
          recipientName: 'Priya',
          customMessage: 'Happy 3rd Anniversary Love!',
          photoUrl: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80',
          photoFileName: 'anniversary_couple_photo.jpg',
          giftWrap: 'luxury_satin_box',
        },
      },
    ],
    subtotal: 348,
    deliveryFee: 50,
    discount: 0,
    totalAmount: 398,
    status: 'Preparing / Customized',
    statusHistory: [
      {
        id: 'sh-1',
        status: 'Order Placed',
        notes: 'Order submitted via Cash on Delivery',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
        changedBy: 'Customer',
      },
      {
        id: 'sh-2',
        status: 'Confirmed',
        notes: 'Order confirmed with customer via phone call',
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
        changedBy: 'Admin (Omkesh)',
      },
      {
        id: 'sh-3',
        status: 'Preparing / Customized',
        notes: 'Custom ceramic photo print in heat curing oven',
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
        changedBy: 'Admin (Omkesh)',
      },
    ],
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: 'ord-102',
    orderNumber: 'BG-2026-3812',
    customerName: 'Sneha Kulkarni',
    customerPhone: '9422187654',
    customerEmail: 'sneha.k@example.com',
    deliveryAddress: 'Flat 302, Sai Kripa Heights, Ring Road',
    city: 'Gondia',
    state: 'Maharashtra',
    pincode: '441614',
    deliveryNotes: 'Leave with security guard if not available',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Paid on Delivery',
    items: [
      {
        cartItemId: 'item-102-1',
        product: INITIAL_PRODUCTS[2],
        quantity: 1,
        giftWrapFee: 0,
        unitPrice: 1299,
        totalPrice: 1299,
        customization: {
          recipientName: 'Mrunal & Aniket',
          customMessage: 'Wishing you a lifetime of joy and happiness!',
          giftWrap: 'none',
        },
      },
    ],
    subtotal: 1299,
    deliveryFee: 0,
    discount: 0,
    totalAmount: 1299,
    status: 'Delivered / Completed',
    statusHistory: [
      {
        id: 'sh-4',
        status: 'Order Placed',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        changedBy: 'Customer',
      },
      {
        id: 'sh-5',
        status: 'Delivered / Completed',
        notes: 'Cash collected ₹1299. Handed to customer.',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        changedBy: 'Delivery Agent',
      },
    ],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

class StoreService {
  private getStorage<T>(key: string, fallback: T): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return fallback;
      return JSON.parse(data) as T;
    } catch {
      return fallback;
    }
  }

  private setStorage<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      window.dispatchEvent(new Event('store_data_updated'));
    } catch (e) {
      console.error('Storage write error', e);
    }
  }

  getProducts(): Product[] {
    const list = this.getStorage<Product[]>(STORAGE_KEYS.PRODUCTS, []);
    if (!list || list.length === 0) {
      this.setStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
      return INITIAL_PRODUCTS;
    }
    // Auto-merge any newly added initial products and update categories/tags
    let hasNew = false;
    const merged = [...list];
    for (const initP of INITIAL_PRODUCTS) {
      const idx = merged.findIndex((p) => p.id === initP.id);
      if (idx === -1) {
        merged.push(initP);
        hasNew = true;
      } else {
        // Keep user stock/price edits if any, but ensure updated categories/tags/images/variants are synced
        if (
          merged[idx].category !== initP.category ||
          merged[idx].images?.[0] !== initP.images?.[0] ||
          (!merged[idx].variants && initP.variants) ||
          (initP.variants && merged[idx].variants && merged[idx].variants!.length < initP.variants.length)
        ) {
          merged[idx] = {
            ...merged[idx],
            category: initP.category,
            tags: initP.tags,
            images: initP.images,
            name: initP.name,
            description: initP.description,
            variants: initP.variants || merged[idx].variants,
          };
          hasNew = true;
        }
      }
    }
    if (hasNew) {
      this.setStorage(STORAGE_KEYS.PRODUCTS, merged);
      return merged;
    }
    return list;
  }

  getProductById(id: string): Product | undefined {
    return this.getProducts().find((p) => p.id === id);
  }

  saveProduct(product: Product): void {
    const products = this.getProducts();
    const idx = products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      products[idx] = product;
    } else {
      products.unshift(product);
    }
    this.setStorage(STORAGE_KEYS.PRODUCTS, products);
  }

  deleteProduct(id: string): void {
    const products = this.getProducts().filter((p) => p.id !== id);
    this.setStorage(STORAGE_KEYS.PRODUCTS, products);
  }

  getOrders(): Order[] {
    const orders = this.getStorage<Order[]>(STORAGE_KEYS.ORDERS, []);
    if (!orders || orders.length === 0) {
      this.setStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
      return INITIAL_ORDERS;
    }
    return orders;
  }

  findOrder(orderNumber: string, phone: string): Order | undefined {
    const cleanNum = orderNumber.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\D/g, '');
    return this.getOrders().find((o) => {
      const matchesNum = o.orderNumber.toUpperCase() === cleanNum;
      const orderPhone = o.customerPhone.replace(/\D/g, '');
      const matchesPhone = orderPhone.endsWith(cleanPhone) || cleanPhone.endsWith(orderPhone);
      return matchesNum && matchesPhone;
    });
  }

  createOrder(payload: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    deliveryAddress: string;
    city: string;
    state: string;
    pincode: string;
    deliveryNotes?: string;
    items: CartItem[];
  }): Order {
    const settings = this.getSettings();
    const subtotal = payload.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const deliveryFee = subtotal >= settings.freeDeliveryThreshold ? 0 : settings.deliveryFee;
    const totalAmount = subtotal + deliveryFee;

    const orderNumber = `BG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: payload.customerName.trim(),
      customerPhone: payload.customerPhone.trim(),
      customerEmail: payload.customerEmail?.trim(),
      deliveryAddress: payload.deliveryAddress.trim(),
      city: payload.city.trim() || 'Gondia',
      state: payload.state.trim() || 'Maharashtra',
      pincode: payload.pincode.trim(),
      deliveryNotes: payload.deliveryNotes?.trim(),
      paymentMethod: 'Cash on Delivery',
      paymentStatus: 'Pending COD',
      items: payload.items,
      subtotal,
      deliveryFee,
      discount: 0,
      totalAmount,
      status: 'Order Placed',
      statusHistory: [
        {
          id: `sh-${Date.now()}`,
          status: 'Order Placed',
          notes: 'Customer placed order with Cash on Delivery',
          timestamp: now,
          changedBy: 'Customer',
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    // Save order
    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.setStorage(STORAGE_KEYS.ORDERS, orders);

    // Decrement product inventory
    const products = this.getProducts();
    for (const item of payload.items) {
      const p = products.find((prod) => prod.id === item.product.id);
      if (p) {
        p.stock = Math.max(0, p.stock - item.quantity);
      }
    }
    this.setStorage(STORAGE_KEYS.PRODUCTS, products);

    return newOrder;
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus, notes?: string): void {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    order.status = newStatus;
    order.updatedAt = new Date().toISOString();
    if (newStatus === 'Delivered / Completed') {
      order.paymentStatus = 'Paid on Delivery';
    }

    order.statusHistory.push({
      id: `sh-${Date.now()}`,
      status: newStatus,
      notes: notes || `Status updated to ${newStatus}`,
      timestamp: new Date().toISOString(),
      changedBy: 'Store Staff',
    });

    this.setStorage(STORAGE_KEYS.ORDERS, orders);
  }

  getSettings(): StoreSettings {
    return this.getStorage<StoreSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }

  saveSettings(settings: StoreSettings): void {
    this.setStorage(STORAGE_KEYS.SETTINGS, settings);
  }

  resetStoreDemo(): void {
    this.setStorage(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
    this.setStorage(STORAGE_KEYS.ORDERS, INITIAL_ORDERS);
    this.setStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }
}

export const storeService = new StoreService();
