export type OccasionType = 
  | 'Birthday'
  | 'Anniversary'
  | 'Valentine\'s Day'
  | 'Wedding'
  | 'Festivals'
  | 'Best Sellers';

export type CustomizationType = 'photo_and_text' | 'text_only' | 'none';

export type GiftWrapOption = 'none' | 'classic_wrap' | 'luxury_satin_box';

export interface ProductVariant {
  id: string;
  name: string; // Attribute name / Group (e.g. 'Color', 'Size', 'Model Year', 'Dial Finish', 'Trim')
  value: string; // Option label (e.g. 'Royal Rose Gold', '16-Inch Large', '2025 Brushless Pro')
  priceDelta: number; // Price difference (+₹150, +₹300, 0)
  sku?: string;
  inStock?: boolean;
  colorHex?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  comparePrice?: number;
  stock: number;
  category: string;
  occasions: OccasionType[];
  isCustomizable: boolean;
  customizationType: CustomizationType;
  images: string[];
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  preparationHours: number;
  rating: number;
  reviewsCount: number;
  variants?: ProductVariant[];
}

export interface CustomizationDetails {
  recipientName?: string;
  customMessage?: string;
  photoUrl?: string;
  photoFileName?: string;
  giftWrap: GiftWrapOption;
  occasionTag?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
  selectedVariants?: ProductVariant[];
  customization?: CustomizationDetails;
  giftWrapFee: number;
  unitPrice: number;
  totalPrice: number;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Preparing / Customized'
  | 'Ready for Pickup / Shipped'
  | 'Delivered / Completed'
  | 'Cancelled';

export interface OrderStatusHistoryItem {
  id: string;
  status: OrderStatus;
  notes?: string;
  timestamp: string;
  changedBy: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryAddress: string;
  city: string;
  state: string;
  pincode: string;
  deliveryNotes?: string;
  paymentMethod: 'Cash on Delivery';
  paymentStatus: 'Pending COD' | 'Paid on Delivery';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  totalAmount: number;
  status: OrderStatus;
  statusHistory: OrderStatusHistoryItem[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  businessName: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phones: string[];
  whatsapp: string;
  email: string;
  currency: string;
  currencySymbol: string;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  codEnabled: boolean;
}
