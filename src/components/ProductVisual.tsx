import React, { useState } from 'react';
import { Heart, Sparkles, Image as ImageIcon, Flame, RotateCw, ZoomIn, Eye, Coffee } from 'lucide-react';
import { CustomizationDetails } from '../types';

interface ProductVisualProps {
  productId?: string;
  category: string;
  name: string;
  className?: string;
  customization?: CustomizationDetails;
  showCustomPreview?: boolean;
  imageUrl?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  category,
  name,
  className = '',
  customization,
  showCustomPreview = false,
  imageUrl,
}) => {
  const isMug = name.toLowerCase().includes('mug') || category.toLowerCase().includes('mug');
  const isFrame = name.toLowerCase().includes('frame') || category.toLowerCase().includes('frame');
  const isHamper = name.toLowerCase().includes('hamper') || category.toLowerCase().includes('hamper');
  const isLamp = name.toLowerCase().includes('lamp') || name.toLowerCase().includes('led');
  const isCushion = name.toLowerCase().includes('cushion') || category.toLowerCase().includes('cushion');
  const isKeychain = name.toLowerCase().includes('keychain') || category.toLowerCase().includes('keychain');
  const isMagic = name.toLowerCase().includes('magic');

  // Heat-reveal state for Magic Mug
  const [isHeated, setIsHeated] = useState(true);

  // If photo is uploaded or custom preview requested
  const photo = customization?.photoUrl;
  const recipientName = customization?.recipientName;
  const customMessage = customization?.customMessage;

  // If we're on a card and there's no custom photo uploaded yet, and not explicitly in 3D custom preview mode:
  // Show the real high-res photography with a subtle interactive overlay!
  if (imageUrl && !showCustomPreview && !photo) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#FBF9F6] select-none ${className}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          loading="lazy"
        />
        {/* Subtle vignette & bottom shadow */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  // 1. PHOTOREALISTIC 3D CERAMIC MUG / CUP (CYLINDRICAL PHOTO PROJECTION)
  if (isMug) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#FDFCFA] via-[#F4EFE6] to-[#E5DDCF] overflow-hidden p-3 select-none ${className}`}>
        {/* Ambient Warm Studio Lighting & Tabletop Horizon Shadow */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#D2C8B8] to-transparent pointer-events-none" />
        <div className="absolute bottom-6 w-56 h-8 bg-[#292525]/25 rounded-[100%] blur-md pointer-events-none" />

        {/* Magic Mug Interactive Heat Switch (if customizable) */}
        {isMagic && (
          <div className="absolute top-2 right-2 z-30">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsHeated(!isHeated);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold shadow-md transition-all cursor-pointer ${
                isHeated
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                  : 'bg-stone-900 text-stone-200 hover:bg-black'
              }`}
              title="Click to simulate pouring hot coffee"
            >
              <Flame className={`w-3 h-3 ${isHeated ? 'animate-pulse text-yellow-200' : 'text-stone-400'}`} />
              <span>{isHeated ? 'Hot Beverage: Revealed' : 'Cold State: Black Mug'}</span>
            </button>
          </div>
        )}

        {/* 3D Realistic Ceramic Mug Assembly */}
        <div className="relative w-56 h-60 flex items-center justify-center">
          {/* Ceramic Mug Handle on Right with realistic thickness and inner shadow */}
          <div
            className="absolute right-2 top-14 w-16 h-32 rounded-r-[2.4rem] border-[15px] border-[#ECE7DE] bg-transparent shadow-[4px_6px_14px_rgba(0,0,0,0.18)] z-0"
            style={{
              clipPath: 'polygon(30% 0%, 100% 0%, 100% 100%, 30% 100%)',
            }}
          />

          {/* Mug Main Ceramic Body */}
          <div
            className="relative w-46 h-54 rounded-b-[2.6rem] rounded-t-md shadow-2xl overflow-hidden z-10 border border-[#D8D0C0] flex flex-col items-center justify-center bg-gradient-to-r from-[#D0C8BB] via-[#FBF9F5] to-[#D8D1C4]"
            style={{
              perspective: '600px',
            }}
          >
            {/* Top Ceramic Rim & Inside Beverage Liquid */}
            <div className="absolute top-0 inset-x-0 h-7 rounded-b-[100%] bg-gradient-to-b from-[#7A4E24] via-[#452A14] to-[#251306] border-b-2 border-stone-200 shadow-inner z-20 flex items-center justify-center overflow-hidden">
              {/* Coffee foam swirl */}
              <div className="w-28 h-2 rounded-full bg-amber-600/30 blur-xs" />
              {/* Animated rising steam particles if heated */}
              {isHeated && (
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-40">
                  <div className="w-2 h-4 bg-white/40 rounded-full blur-xs animate-ping" />
                </div>
              )}
            </div>

            {/* Glossy Rim Light Reflection */}
            <div className="absolute top-6 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent z-20 pointer-events-none" />

            {/* CURVED PRINTED PHOTO AREA (Projects photo around cylinder with authentic glaze) */}
            <div className="relative w-full h-40 mt-5 overflow-hidden flex items-center justify-center">
              {photo ? (
                <div
                  className="relative w-38 h-36 overflow-hidden rounded-md shadow-md transition-all duration-700"
                  style={{
                    transform: 'perspective(400px) rotateY(-4deg)',
                  }}
                >
                  {/* The Customer's Real Uploaded Photo */}
                  <img
                    src={photo}
                    alt="Custom mug preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Cylindrical Curved Light & Shadow Overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-multiply"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(0,0,0,0.38) 0%, rgba(255,255,255,0.4) 18%, rgba(255,255,255,0.08) 45%, rgba(0,0,0,0.12) 75%, rgba(0,0,0,0.48) 100%)',
                    }}
                  />

                  {/* Cylindrical Specular Glaze Shine */}
                  <div
                    className="absolute inset-0 pointer-events-none mix-blend-screen opacity-55"
                    style={{
                      background:
                        'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.95) 35%, transparent 50%)',
                    }}
                  />

                  {/* Heartfelt message overlay if provided */}
                  {customMessage && (
                    <div className="absolute bottom-1 inset-x-1 bg-black/65 backdrop-blur-xs text-white text-[9px] font-medium py-1 px-1.5 rounded text-center truncate">
                      "{customMessage}"
                    </div>
                  )}

                  {/* Magic Heat-reveal black thermal mask */}
                  {isMagic && (
                    <div
                      className={`absolute inset-0 bg-[#1A1816] transition-all duration-700 flex flex-col items-center justify-center text-center p-2 ${
                        isHeated ? 'opacity-0 pointer-events-none' : 'opacity-95'
                      }`}
                    >
                      <Sparkles className="w-5 h-5 text-amber-400 mb-1" />
                      <span className="text-[9px] font-bold text-stone-300">
                        Magic Reveal Coating
                      </span>
                      <span className="text-[8px] text-stone-400 mt-0.5">
                        Pour hot beverage to reveal photo
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                /* Uncustomized Photo Guide Display */
                <div
                  className="relative w-38 h-36 rounded-md border-2 border-dashed border-amber-300/80 bg-amber-50/70 p-2 flex flex-col items-center justify-center text-center shadow-inner"
                  style={{ transform: 'perspective(400px) rotateY(-4deg)' }}
                >
                  <div className="w-10 h-10 rounded-full bg-amber-200/60 flex items-center justify-center text-amber-800 mb-1">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-950 uppercase tracking-tight">
                    {recipientName ? recipientName : 'Your Photo Prints Here'}
                  </span>
                  <span className="text-[8px] text-amber-800/80 mt-0.5">
                    Curved Glossy Ceramic Wrap
                  </span>
                </div>
              )}
            </div>

            {/* Recipient Name printed beneath photo if provided */}
            {recipientName && (
              <div className="z-20 text-[10px] font-serif font-bold text-stone-800 tracking-wider uppercase mt-1">
                {recipientName}
              </div>
            )}

            {/* Vertical Ceramic Cylindrical Light Reflection */}
            <div
              className="absolute inset-y-0 left-6 w-9 pointer-events-none mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)',
              }}
            />

            {/* Bottom Rim Ambient Occlusion */}
            <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Subtitle tag */}
        <div className="z-10 mt-2 text-center">
          <span className="text-[11px] font-semibold text-stone-700">
            {isMagic ? 'Heat-Sensitive Color Reveal Mug' : 'Grade-A 11oz Ceramic Photo Mug'}
          </span>
          <span className="block text-[9px] text-stone-500">Dishwasher & Microwave Safe</span>
        </div>
      </div>
    );
  }

  // 2. PHOTOREALISTIC WOODEN OAK PHOTO FRAME
  if (isFrame) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#FBF9F5] via-[#EDE6DB] to-[#DDD4C4] overflow-hidden p-4 select-none ${className}`}>
        {/* Wall Shadow & Table Reflection */}
        <div className="absolute bottom-5 w-52 h-6 bg-[#292525]/20 rounded-full blur-md pointer-events-none" />

        {/* Handcrafted Solid Wood Frame */}
        <div className="relative w-56 h-64 bg-[#B58750] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] p-4 border-[6px] border-[#8A5E2E] flex flex-col items-center justify-center">
          {/* Wood Grain Texture Lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#472B10_1px,transparent_1px)] [background-size:6px_6px] pointer-events-none" />

          {/* Beveled Matting (Passe-Partout Window) */}
          <div className="relative w-full h-full bg-[#FAF8F5] rounded shadow-inner p-3 flex flex-col items-center justify-center border border-[#D9CEBF] overflow-hidden">
            {/* The Photo Frame Window */}
            <div className="relative w-full h-full rounded shadow-md overflow-hidden bg-stone-100 flex items-center justify-center">
              {photo ? (
                <>
                  <img
                    src={photo}
                    alt="Framed photo preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Glass Glare Sheen Reflection across front */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, transparent 40%, rgba(255,255,255,0.4) 70%, transparent 100%)',
                    }}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-3">
                  <ImageIcon className="w-8 h-8 text-[#8A5E2E]/60 mb-2" />
                  <span className="text-xs font-serif font-bold text-[#573919]">
                    {recipientName || 'Your Cherished Photo'}
                  </span>
                  <span className="text-[9px] text-stone-500 mt-0.5">
                    Anti-Glare HD Photographic Print
                  </span>
                </div>
              )}

              {/* Bottom Inscription Plaque */}
              {(customMessage || recipientName) && (
                <div className="absolute bottom-1 inset-x-2 bg-white/95 backdrop-blur-xs py-1 px-2 rounded border border-amber-200/80 text-center shadow-xs">
                  {recipientName && (
                    <div className="text-[10px] font-bold text-stone-900 truncate">
                      {recipientName}
                    </div>
                  )}
                  {customMessage && (
                    <div className="text-[9px] italic text-stone-600 truncate">
                      "{customMessage}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="z-10 mt-3 text-center">
          <span className="text-[11px] font-semibold text-stone-700">
            Solid Natural Oak Wood Frame
          </span>
          <span className="block text-[9px] text-stone-500">Desktop Easel Stand & Wall Hook</span>
        </div>
      </div>
    );
  }

  // 3. PHOTOREALISTIC 3D ACRYLIC LED NIGHT LAMP
  if (isLamp) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#141210] via-[#1C1917] to-[#292525] overflow-hidden p-4 select-none ${className}`}>
        {/* Ambient Warm Golden Glow Halo */}
        <div className="absolute w-52 h-52 bg-[#F4C62E]/25 rounded-full blur-3xl animate-pulse pointer-events-none" />

        <div className="relative flex flex-col items-center">
          {/* Optical Acrylic Panel with Illumination */}
          <div className="relative w-42 h-46 rounded-t-2xl border-2 border-amber-300/40 bg-gradient-to-b from-amber-200/15 via-amber-300/5 to-transparent flex flex-col items-center justify-center p-3 text-center shadow-[0_0_30px_rgba(244,198,46,0.3)] overflow-hidden">
            {photo ? (
              <div className="relative w-full h-full rounded-t-xl overflow-hidden flex items-center justify-center">
                <img
                  src={photo}
                  alt="Lamp photo preview"
                  className="w-full h-full object-cover filter contrast-125 brightness-110"
                />
                {/* Golden illuminated laser edge glow overlay */}
                <div className="absolute inset-0 border-2 border-amber-300/60 rounded-t-xl shadow-[inset_0_0_15px_rgba(244,198,46,0.5)] pointer-events-none" />
                <div className="absolute bottom-2 inset-x-2 bg-black/75 backdrop-blur-xs py-1 px-2 rounded text-amber-200 text-[9px] font-bold truncate">
                  {recipientName || customMessage || 'Forever Together'}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center">
                <Sparkles className="w-8 h-8 text-[#F4C62E] mb-2 animate-bounce" />
                <span className="text-xs font-serif font-bold text-amber-200">
                  {recipientName || 'Engraved Laser Portrait'}
                </span>
                <span className="text-[9px] text-amber-300/70 mt-1">
                  Warm Ambient Night Glow
                </span>
              </div>
            )}
          </div>

          {/* Solid Beechwood LED Base */}
          <div className="relative w-48 h-10 bg-[#7B4F26] rounded-md shadow-xl border-t border-amber-300/40 flex items-center justify-center">
            {/* LED Glow Seam */}
            <div className="absolute -top-1 w-36 h-2 bg-gradient-to-r from-transparent via-[#F4C62E] to-transparent blur-xs" />
            <span className="text-[9px] text-amber-200/90 font-mono tracking-wider font-semibold">
              BLOSSOM GIFT · GONDIA
            </span>
          </div>
        </div>

        <div className="z-10 mt-3 text-center">
          <span className="text-[11px] font-semibold text-amber-200">
            Warm LED Acrylic Keepsake
          </span>
          <span className="block text-[9px] text-stone-400">USB Powered · Touch On/Off</span>
        </div>
      </div>
    );
  }

  // 4. PHOTOREALISTIC VELVET PHOTO CUSHION
  if (isCushion) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF3EA] to-[#F2E8DA] p-4 overflow-hidden select-none ${className}`}>
        <div className="absolute bottom-5 w-52 h-6 bg-[#292525]/15 rounded-full blur-md" />
        <div className="relative w-52 h-52 bg-[#FFFDF9] rounded-3xl shadow-2xl border-4 border-amber-100 flex items-center justify-center p-3 overflow-hidden">
          {photo ? (
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-inner">
              <img src={photo} alt="Custom cushion preview" className="w-full h-full object-cover" />
              {/* Soft cushion folds and fabric lighting overlay */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }}
              />
              {recipientName && (
                <div className="absolute bottom-2 inset-x-2 bg-white/90 backdrop-blur-xs py-1 px-2 rounded-lg text-center font-serif text-[10px] font-bold text-stone-900 shadow-xs">
                  {recipientName}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-2">
              <ImageIcon className="w-8 h-8 text-amber-700/60 mb-2" />
              <span className="text-xs font-serif font-bold text-stone-800">
                {recipientName || 'Photo Printed Cushion'}
              </span>
              <span className="text-[9px] text-stone-500 mt-1">16x16" Micro-Velvet Touch</span>
            </div>
          )}
        </div>
        <div className="z-10 mt-2 text-center">
          <span className="text-[11px] font-semibold text-stone-800">Soft Micro-Velvet Cushion</span>
          <span className="block text-[9px] text-stone-500">Washable Cover with Filler</span>
        </div>
      </div>
    );
  }

  // 5. PHOTOREALISTIC LUXURY GIFT HAMPER
  if (isHamper) {
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FFF8E8] to-[#F7EFE1] p-4 overflow-hidden select-none ${className}`}>
        {/* Soft Hamper Base Shadow */}
        <div className="absolute bottom-5 w-52 h-6 bg-[#292525]/15 rounded-full blur-md" />

        <div className="relative w-56 h-60 flex flex-col items-center justify-center">
          {/* Handwoven Wicker Basket */}
          <div className="w-48 h-36 bg-[#C9965B] rounded-b-3xl border-4 border-[#A3733A] shadow-xl relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#4A3014_1.5px,transparent_1.5px)] [background-size:8px_8px]" />

            {/* Custom Greeting Card pinned to basket */}
            <div className="z-10 bg-white/95 backdrop-blur-xs p-3 rounded-xl shadow-md border border-amber-200 max-w-[170px] text-center">
              <span className="text-[10px] font-serif font-bold text-amber-950 block">
                BLOSSOM GIFT GOURMET
              </span>
              {recipientName && (
                <div className="text-[11px] font-bold text-[#E95D79] mt-0.5 truncate">
                  For: {recipientName}
                </div>
              )}
              {customMessage && (
                <div className="text-[9px] italic text-stone-600 mt-0.5 line-clamp-2">
                  "{customMessage}"
                </div>
              )}
            </div>
          </div>

          {/* Big Satin Ribbon Bow */}
          <div className="absolute top-8 flex items-center justify-center z-20">
            <div className="w-16 h-8 rounded-full bg-[#E95D79] shadow-lg border-2 border-rose-300" />
            <div className="w-5 h-5 rounded-full bg-[#F4C62E] absolute shadow-md" />
          </div>

          {/* Gourmet Treats protruding */}
          <div className="absolute top-14 left-8 w-12 h-12 rounded-lg bg-[#3D2314] text-amber-100 flex items-center justify-center text-[9px] font-bold shadow-md rotate-[-15deg] border border-amber-900">
            ROCHER
          </div>
          <div className="absolute top-12 right-8 w-12 h-14 rounded-lg bg-amber-50 border-2 border-amber-300 flex items-center justify-center text-[8px] text-amber-950 font-bold shadow-md rotate-[12deg]">
            CANDLE
          </div>
        </div>

        <div className="z-10 mt-2 text-center">
          <span className="text-[11px] font-semibold text-stone-800">
            Hand-Crafted Luxury Hamper
          </span>
          <span className="block text-[9px] text-stone-500">Chocolates, Candle & Custom Card</span>
        </div>
      </div>
    );
  }

  // GENERAL PRODUCT PHOTOGRAPHY (Toys, Wall Clocks, Home Decor, Gifts)
  if (imageUrl) {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#FAF8F5] select-none flex items-center justify-center ${className}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />

        {/* Custom Engraving or Personalization Plaque */}
        {(recipientName || customMessage) && (
          <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-xl border border-stone-200/90 shadow-md text-center">
            {recipientName && (
              <div className="text-[11px] font-bold text-rose-600 truncate">
                Gift for: {recipientName}
              </div>
            )}
            {customMessage && (
              <div className="text-[9px] italic text-stone-600 truncate">
                "{customMessage}"
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // DEFAULT GIFT BOX
  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#FFFDF9] to-[#FFF5E6] p-4 overflow-hidden select-none ${className}`}>
      <div className="relative w-44 h-44 bg-white rounded-2xl shadow-xl border border-amber-100 flex flex-col items-center justify-center p-4 text-center">
        {/* Ribbon bands */}
        <div className="absolute inset-x-0 h-5 bg-[#F4C62E] top-1/2 -translate-y-1/2 opacity-90 shadow-xs" />
        <div className="absolute inset-y-0 w-5 bg-[#F4C62E] left-1/2 -translate-x-1/2 opacity-90 shadow-xs" />

        <div className="z-10 w-14 h-14 rounded-full bg-[#E95D79] text-white flex items-center justify-center shadow-lg">
          <Sparkles className="w-7 h-7 text-white" />
        </div>

        <span className="z-10 mt-3 text-xs font-serif font-bold text-stone-900 tracking-wide">
          {name}
        </span>
      </div>
    </div>
  );
};
