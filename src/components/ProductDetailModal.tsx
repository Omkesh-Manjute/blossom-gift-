import React, { useState, useMemo } from 'react';
import {
  X,
  Upload,
  Sparkles,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
  Clock,
  Heart,
  Package,
  Flame,
  Image as ImageIcon,
  RotateCcw,
  Star,
  CheckCircle2,
} from 'lucide-react';
import { Product, ProductVariant, GiftWrapOption } from '../types';
import { ProductVisual } from './ProductVisual';
import { useCart } from '../context/CartContext';
import { InteractiveHoverButton } from './ui/interactive-hover-button';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

// Curated demo sample photos for instant real-life testing
const SAMPLE_PHOTOS = [
  {
    label: '❤️ Romantic Couple',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '🎂 Birthday Smiles',
    url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '👨‍👩‍👦 Family Memory',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&auto=format&fit=crop&q=80',
  },
  {
    label: '🐾 Cute Puppy',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80',
  },
];

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);

  // Group variants by attribute name (e.g., 'Color', 'Size', 'Model Year')
  const variantGroups = useMemo(() => {
    if (!product?.variants || product.variants.length === 0) return {};
    const groups: Record<string, ProductVariant[]> = {};
    for (const v of product.variants) {
      const g = v.name?.trim() || 'Option';
      if (!groups[g]) groups[g] = [];
      groups[g].push(v);
    }
    return groups;
  }, [product?.variants]);

  // Track selection for each attribute group
  const [selectedVariantsMap, setSelectedVariantsMap] = useState<Record<string, ProductVariant>>(() => {
    if (!product?.variants || product.variants.length === 0) return {};
    const initial: Record<string, ProductVariant> = {};
    for (const v of product.variants) {
      const g = v.name?.trim() || 'Option';
      if (!initial[g]) {
        initial[g] = v;
      }
    }
    return initial;
  });

  // Calculate sum of priceDelta from all chosen variants
  const totalVariantsDelta = useMemo(() => {
    return Object.values(selectedVariantsMap).reduce((sum, v) => sum + (v.priceDelta || 0), 0);
  }, [selectedVariantsMap]);

  // View mode: '3d-mockup' (live projection) vs 'real-photo' (store gallery)
  const [viewMode, setViewMode] = useState<'3d-mockup' | 'real-photo'>(
    product?.isCustomizable ? '3d-mockup' : 'real-photo'
  );

  // Customization states
  const [recipientName, setRecipientName] = useState('');
  const [customMessage, setCustomMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(
    product?.isCustomizable ? SAMPLE_PHOTOS[0].url : undefined
  );
  const [photoFileName, setPhotoFileName] = useState<string | undefined>(
    product?.isCustomizable ? 'couple_sample.jpg' : undefined
  );
  const [giftWrap, setGiftWrap] = useState<GiftWrapOption>('none');
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (!product) return null;

  const isOutOfStock = product.stock <= 0;
  const isMug = product.name.toLowerCase().includes('mug') || product.category.toLowerCase().includes('mug');

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError('Image size exceeds 10MB. Please choose a smaller photo.');
      return;
    }

    setFormError(null);
    setIsPhotoLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      setPhotoUrl(event.target?.result as string);
      setPhotoFileName(file.name);
      setIsPhotoLoading(false);
      setViewMode('3d-mockup'); // Switch to 3D mockup immediately
    };
    reader.onerror = () => {
      setFormError('Failed to read photo file. Please try again.');
      setIsPhotoLoading(false);
    };
    reader.readAsDataURL(file);
  };

  // Gift wrap extra fee
  const giftWrapFee =
    giftWrap === 'luxury_satin_box' ? 49 : giftWrap === 'classic_wrap' ? 25 : 0;
  const basePrice = product.price + totalVariantsDelta;
  const unitPrice = basePrice + giftWrapFee;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    if (product.isCustomizable && product.customizationType === 'photo_and_text' && !photoUrl) {
      setFormError('Please upload a photo for your personalized gift before proceeding.');
      return;
    }

    const selectedVariantsList = Object.values(selectedVariantsMap);

    addToCart(
      product,
      quantity,
      selectedVariantsList,
      product.isCustomizable
        ? {
            recipientName: recipientName.trim(),
            customMessage: customMessage.trim(),
            photoUrl,
            photoFileName,
            giftWrap,
          }
        : undefined
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-stone-200 text-left flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/95 border border-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Visual Preview & Live 3D Customizer Generator */}
        <div className="md:w-1/2 bg-[#FAF7F2] p-5 sm:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-200">
          <div>
            {/* View Mode Switcher: 3D Live Simulation vs Studio Photo */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 bg-stone-200/70 p-1 rounded-xl text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setViewMode('3d-mockup')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    viewMode === '3d-mockup'
                      ? 'bg-white text-[#124282] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>3D Live Wrapped Mockup</span>
                </button>
                {product.images && product.images.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setViewMode('real-photo')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                      viewMode === 'real-photo'
                        ? 'bg-white text-[#124282] shadow-xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-stone-500" />
                    <span>Real Finished Product</span>
                  </button>
                )}
              </div>

              {product.isCustomizable && (
                <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md font-semibold hidden sm:inline">
                  ● Live 100% Real Time
                </span>
              )}
            </div>

            {/* Main Visual Display Window */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-sm border border-stone-200/80 bg-white">
              {viewMode === 'real-photo' && product.images?.[0] ? (
                <div className="w-full h-full relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded">
                    Studio Photo · Finished Gift
                  </div>
                </div>
              ) : (
                <ProductVisual
                  productId={product.id}
                  category={product.category}
                  name={product.name}
                  imageUrl={product.images?.[0]}
                  showCustomPreview={true}
                  customization={{
                    photoUrl,
                    recipientName,
                    customMessage,
                    giftWrap,
                  }}
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Quick Sample Photo Swatch Tester (Crucial for Instant Verification!) */}
            {product.isCustomizable && product.customizationType === 'photo_and_text' && (
              <div className="mt-3.5 p-3 rounded-2xl bg-white border border-amber-200/70 shadow-xs">
                <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#E8436E]" />
                    <span>Test Instant Photo Projection:</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">Click to test wrap</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {SAMPLE_PHOTOS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setPhotoUrl(sample.url);
                        setPhotoFileName(`sample_${idx + 1}.jpg`);
                        setViewMode('3d-mockup');
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-semibold border transition-all truncate text-left cursor-pointer flex items-center gap-1 ${
                        photoUrl === sample.url
                          ? 'border-[#E8436E] bg-rose-50 text-[#E8436E] font-bold shadow-xs'
                          : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <span className="truncate">{sample.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Delivery & Prep Footnote */}
          <div className="mt-4 pt-3 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Prep Time: <strong>{product.preparationHours} Hours</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-stone-400" />
              <span>Gondia Doorstep Delivery</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Configuration, Customization & Add to Cart */}
        <div className="md:w-1/2 p-5 sm:p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Header / Badges */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8436E] bg-pink-50 px-2 py-0.5 rounded-md">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-stone-400 font-normal">({product.reviewsCount} Gondia reviews)</span>
              </div>
            </div>

            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-stone-900 leading-tight">
              {product.name}
            </h2>

            {/* Price section with dynamic delta breakdown */}
            <div className="flex flex-wrap items-baseline gap-2.5 mt-2 mb-4">
              <span className="font-mono text-2xl font-black text-[#124282] tabular-nums">
                ₹{unitPrice}
              </span>
              {product.comparePrice && (
                <span className="font-mono text-sm line-through text-stone-400 tabular-nums">
                  ₹{product.comparePrice + totalVariantsDelta}
                </span>
              )}
              {totalVariantsDelta !== 0 && (
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded-full">
                  {totalVariantsDelta > 0 ? `+₹${totalVariantsDelta}` : `-₹${Math.abs(totalVariantsDelta)}`} options delta
                </span>
              )}
              {product.comparePrice && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Save ₹{product.comparePrice - product.price}
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Error banner */}
            {formError && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
                {formError}
              </div>
            )}

            {/* MULTI-VARIANT ATTRIBUTE PICKERS (e.g. Color, Size, Model Year) */}
            {Object.keys(variantGroups).length > 0 && (
              <div className="space-y-4 mb-5 p-3.5 bg-stone-50/80 border border-stone-200/80 rounded-2xl">
                <div className="flex items-center justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Select Configuration & Variants</span>
                  </span>
                  {totalVariantsDelta !== 0 && (
                    <span className="text-[11px] font-mono font-bold text-blue-600">
                      Total Delta: {totalVariantsDelta > 0 ? `+₹${totalVariantsDelta}` : `-₹${Math.abs(totalVariantsDelta)}`}
                    </span>
                  )}
                </div>

                {Object.entries(variantGroups).map(([groupName, groupVariants]) => {
                  const currentSelected = selectedVariantsMap[groupName];
                  return (
                    <div key={groupName} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <label className="font-bold text-stone-800">
                          {groupName}:
                        </label>
                        {currentSelected && (
                          <span className="text-[11px] font-semibold text-stone-500">
                            Selected: <strong className="text-stone-800">{currentSelected.value}</strong>
                            {currentSelected.priceDelta !== 0 && (
                              <span className="ml-1 text-blue-600 font-mono">
                                ({currentSelected.priceDelta > 0 ? `+₹${currentSelected.priceDelta}` : `-₹${Math.abs(currentSelected.priceDelta)}`})
                              </span>
                            )}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {groupVariants.map((v) => {
                          const isSelected = currentSelected?.id === v.id;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() =>
                                setSelectedVariantsMap((prev) => ({
                                  ...prev,
                                  [groupName]: v,
                                }))
                              }
                              className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                                isSelected
                                  ? 'border-[#124282] bg-blue-50 text-[#124282] font-bold shadow-xs ring-2 ring-blue-500/20'
                                  : 'border-stone-200 hover:border-stone-300 bg-white text-stone-700'
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className="truncate">{v.value}</span>
                                {isSelected && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#124282] shrink-0" />
                                )}
                              </div>
                              <div className="mt-1 flex items-center justify-between text-[10px]">
                                {v.priceDelta !== 0 ? (
                                  <span className={`font-mono font-semibold ${isSelected ? 'text-blue-700' : 'text-stone-500'}`}>
                                    {v.priceDelta > 0 ? `+₹${v.priceDelta}` : `-₹${Math.abs(v.priceDelta)}`}
                                  </span>
                                ) : (
                                  <span className="text-stone-400 font-medium">Included (+₹0)</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CUSTOMIZATION WORKFLOW: PHOTO UPLOAD & RECIPIENT MESSAGE */}
            {product.isCustomizable && (
              <div className="space-y-4 pt-3 border-t border-stone-200 mb-5">
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#124282] uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>Personalization Details (Guaranteed Print Clarity)</span>
                </div>

                {/* 1. Photo Upload Field */}
                {product.customizationType === 'photo_and_text' && (
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1.5">
                      Upload Your High-Resolution Photo *
                    </label>
                    <div className="relative border-2 border-dashed border-stone-300 hover:border-[#124282] rounded-2xl p-4 text-center bg-stone-50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className="flex flex-col items-center">
                        <Upload className="w-6 h-6 text-[#124282] mb-1.5" />
                        <span className="text-xs font-bold text-stone-800">
                          {photoFileName ? `Selected: ${photoFileName}` : 'Click to Upload or Drag Photo'}
                        </span>
                        <span className="text-[10px] text-stone-500 mt-0.5">
                          Supports JPG, PNG up to 10MB · Cured with sublimation heat
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Recipient Name Input */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Recipient Name / Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Priya, Mom, Dr. Sharma, Happy Couple"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    maxLength={35}
                    className="w-full bg-[#FAF8F9] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#124282] focus:bg-white transition-all shadow-inner"
                  />
                </div>

                {/* 3. Custom Heartfelt Message */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Custom Message or Inscription
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g., Happy 3rd Anniversary! Always and forever."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    maxLength={100}
                    className="w-full bg-[#FAF8F9] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#124282] focus:bg-white transition-all shadow-inner resize-none"
                  />
                  <span className="block text-right text-[10px] text-stone-400 mt-0.5">
                    {100 - customMessage.length} characters left
                  </span>
                </div>

                {/* 4. Gift Wrap Selector */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1.5">
                    Boutique Gift Wrapping:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setGiftWrap('none')}
                      className={`p-2 rounded-xl border text-[11px] text-center transition-all cursor-pointer ${
                        giftWrap === 'none'
                          ? 'border-[#124282] bg-blue-50/50 font-bold text-[#124282]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Standard Box (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiftWrap('classic_wrap')}
                      className={`p-2 rounded-xl border text-[11px] text-center transition-all cursor-pointer ${
                        giftWrap === 'classic_wrap'
                          ? 'border-[#124282] bg-blue-50/50 font-bold text-[#124282]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Floral Wrap (+₹25)
                    </button>
                    <button
                      type="button"
                      onClick={() => setGiftWrap('luxury_satin_box')}
                      className={`p-2 rounded-xl border text-[11px] text-center transition-all cursor-pointer ${
                        giftWrap === 'luxury_satin_box'
                          ? 'border-[#124282] bg-blue-50/50 font-bold text-[#124282]'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      Luxury Satin (+₹49)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ACTION BAR: Quantity & Add to Cart */}
          <div className="pt-4 border-t border-stone-200 mt-4">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold text-sm cursor-pointer"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-mono font-bold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-stone-600 hover:bg-stone-100 font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || isPhotoLoading}
                className="flex-1 bg-[#124282] hover:bg-[#0e3568] disabled:bg-stone-300 text-white font-bold py-3 px-5 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#F4C62E]" />
                <span>
                  {isOutOfStock
                    ? 'Out of Stock'
                    : `Add to Cart · Total ₹${totalPrice}`}
                </span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-4 text-[10px] text-stone-500">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Cash on Delivery Available</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#124282]" />
                <span>Quality Tested in Gondia</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
