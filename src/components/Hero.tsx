import React, { useState, useEffect, useRef } from 'react';
import {
  Truck,
  Gift,
  ShieldCheck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { storeService } from '../services/storeService';
import { HeroSlide } from '../types';

interface HeroProps {
  onShopClick: () => void;
  onCustomClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onCustomClick }) => {
  const [slides, setSlides] = useState<HeroSlide[]>(() => storeService.getHeroSlides());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Map to hold video element refs by slide ID
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Sync slides with store updates (e.g. when modified in Admin Portal)
  useEffect(() => {
    const handleUpdate = () => {
      setSlides(storeService.getHeroSlides());
    };
    window.addEventListener('store_data_updated', handleUpdate);
    return () => window.removeEventListener('store_data_updated', handleUpdate);
  }, []);

  const activeSlides = [...slides]
    .filter((s) => s.isActive)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const currentSlide = activeSlides[currentIndex] || activeSlides[0] || slides[0];

  // Auto-slide timer: slides every 7s for images, 10s for videos (unless hovered)
  useEffect(() => {
    if (activeSlides.length <= 1 || isHovered) return;

    const duration = currentSlide?.type === 'video' ? 10000 : 7000;
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, isHovered, activeSlides.length, currentSlide?.type]);

  // Handle video play / pause when active slide changes
  useEffect(() => {
    activeSlides.forEach((slide, idx) => {
      const vid = videoRefs.current[slide.id];
      if (!vid) return;

      if (idx === currentIndex) {
        vid.currentTime = 0;
        vid.muted = isMuted;
        vid
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      } else {
        vid.pause();
      }
    });
  }, [currentIndex, isMuted, activeSlides]);

  const handleNext = () => {
    if (activeSlides.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    if (activeSlides.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const handleWhatsAppClick = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    window.open(
      'https://wa.me/918208589775?text=Hello%20Blossom%20Gift%20Gondia%2C%20I%20would%20like%20to%20order%20gifts%20from%20the%20website!',
      '_blank'
    );
  };

  // Mobile Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[currentSlide?.id];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const toggleVideoMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRefs.current[currentSlide?.id];
    if (!vid) return;

    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  };

  return (
    <section
      className="relative w-full max-w-full overflow-hidden bg-gradient-to-r from-[#fc9db4] via-[#fdb7c8] to-[#f48da1] border-b border-pink-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Floating subtle ambient heart particles */}
      <div className="absolute top-6 left-12 text-white/40 text-xl animate-float pointer-events-none select-none">
        ♥
      </div>
      <div
        className="absolute top-16 right-1/4 text-white/30 text-2xl animate-float pointer-events-none select-none"
        style={{ animationDelay: '1.2s' }}
      >
        ♥
      </div>
      <div
        className="absolute bottom-12 left-1/3 text-white/35 text-base animate-float pointer-events-none select-none"
        style={{ animationDelay: '2.4s' }}
      >
        ♥
      </div>
      <div
        className="absolute top-1/2 right-10 text-white/40 text-3xl animate-float pointer-events-none select-none"
        style={{ animationDelay: '3.1s' }}
      >
        ♥
      </div>

      {/* Main Panoramic Slider Track with Unified Consistent Aspect Ratio */}
      <div className="w-full max-w-[1536px] mx-auto relative select-none overflow-hidden">
        {/* SLIDING FLEX TRACK */}
        <div
          className="flex transition-transform duration-500 ease-out w-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {activeSlides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className="w-full shrink-0 relative aspect-[16/9] sm:aspect-[1536/480] md:aspect-[1536/413] overflow-hidden bg-stone-900"
            >
              {slide.type === 'video' ? (
                /* ======================================================== */
                /* VIDEO SLIDE: Clean, Unobstructed 10s Cinematic Ad       */
                /* ======================================================== */
                <div
                  onClick={onShopClick}
                  className="w-full h-full relative cursor-pointer group"
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[slide.id] = el;
                    }}
                    src={slide.mediaUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Clean Mode vs Custom Overlay */}
                  {slide.showOverlay ? (
                    <>
                      {/* Gradient Backdrop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-stone-900/20 pointer-events-none" />

                      {/* Overlaid Title & Buttons (Only if showOverlay === true) */}
                      <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-8 md:p-12 z-10 text-left pointer-events-none">
                        {slide.kicker && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold border border-white/30 shadow-xs self-start">
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>{slide.kicker}</span>
                          </div>
                        )}

                        <div className="max-w-xl pointer-events-auto">
                          {slide.title && (
                            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                              {slide.title}
                            </h2>
                          )}
                          {(slide.description || slide.subtitle) && (
                            <p className="text-xs sm:text-sm md:text-base text-pink-100/90 font-medium mt-1 mb-3 line-clamp-2 drop-shadow-xs">
                              {slide.description || slide.subtitle}
                            </p>
                          )}

                          <div className="flex items-center gap-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onShopClick();
                              }}
                              className="inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#E8436E] hover:bg-[#d4335c] text-white font-bold text-xs sm:text-sm shadow-xl shadow-pink-900/40 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <span>{slide.ctaText || 'Shop Now'}</span>
                              <ArrowRight className="w-4 h-4" />
                            </button>

                            <button
                              onClick={handleWhatsAppClick}
                              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4 fill-white" />
                              <span className="hidden sm:inline">Order on WhatsApp</span>
                              <span className="sm:hidden">WhatsApp</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Clean Mode: Minimal subtle bottom prompt */
                    <div className="absolute bottom-3 left-4 z-10 pointer-events-none opacity-90 transition-opacity group-hover:opacity-100">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 backdrop-blur-md text-white text-[11px] font-semibold border border-white/20 shadow-xs">
                        <Gift className="w-3.5 h-3.5 text-pink-300" />
                        <span>Tap to explore gifts in Gondia</span>
                      </span>
                    </div>
                  )}

                  {/* Sleek Floating Sound & Play Controls (Top Right) */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 z-30">
                    <button
                      onClick={toggleVideoMute}
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      className="px-2.5 sm:px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-md text-[11px] font-medium"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                          <span className="hidden sm:inline">Unmute</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
                          <span className="hidden sm:inline">Sound On</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={toggleVideoPlayback}
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer border border-white/20 shadow-md"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* ======================================================== */
                /* IMAGE BANNER SLIDE: Seamless Matching Aspect Artwork     */
                /* ======================================================== */
                <div
                  onClick={onShopClick}
                  className="w-full h-full relative cursor-pointer"
                >
                  <picture>
                    <source
                      media="(max-width: 640px)"
                      srcSet={slide.mobileMediaUrl || '/hero_banner_mobile.png'}
                    />
                    <img
                      src={slide.mediaUrl || '/hero_banner_clean.png'}
                      alt={slide.title || 'Blossom Gift Banner'}
                      className="w-full h-full object-cover block"
                      draggable={false}
                    />
                  </picture>

                  {/* Desktop 'Shop Now' Interactive Hotspot (Preserves Flagship Coordinates) */}
                  <div
                    className="absolute max-sm:hidden"
                    style={{
                      left: '5.6%',
                      top: '68.5%',
                      width: '12.3%',
                      height: '11.9%',
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShopClick();
                      }}
                      aria-label="Shop Now for Personalized Gifts"
                      className="w-full h-full rounded-full cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 group relative flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-white/80"
                    >
                      <span className="absolute inset-0 bg-white/0 group-hover:bg-white/25 transition-all rounded-full pointer-events-none" />
                      <span className="absolute -inset-1 rounded-full bg-pink-400/0 group-hover:bg-pink-400/30 blur-xs transition-all pointer-events-none" />
                    </button>
                  </div>

                  {/* Desktop Trust Feature Hotspots */}
                  <a
                    href="#contact"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      left: '4.8%',
                      top: '82.5%',
                      width: '8.8%',
                      height: '14.5%',
                    }}
                    className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
                    title="Local Doorstep Delivery across Gondia (M.S.)"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onCustomClick) onCustomClick();
                      else onShopClick();
                    }}
                    style={{
                      left: '14.2%',
                      top: '82.5%',
                      width: '8.5%',
                      height: '14.5%',
                    }}
                    className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
                    title="Customized Gifts personalized with love"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShopClick();
                    }}
                    style={{
                      left: '23.3%',
                      top: '82.5%',
                      width: '8.5%',
                      height: '14.5%',
                    }}
                    className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
                    title="100% Best Quality Products guaranteed"
                  />

                  <button
                    onClick={handleWhatsAppClick}
                    style={{
                      left: '32.4%',
                      top: '82.5%',
                      width: '8.8%',
                      height: '14.5%',
                    }}
                    className="absolute cursor-pointer rounded-lg hover:bg-white/15 transition-all max-sm:hidden"
                    title="Chat & Order on WhatsApp (+91 8208589775)"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* CAROUSEL CONTROLS (Arrows & Indicator Dots)               */}
        {/* ======================================================== */}
        {activeSlides.length > 1 && (
          <>
            {/* Left Prev Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all transform hover:scale-110 active:scale-95 cursor-pointer shadow-md z-20"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Next Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all transform hover:scale-110 active:scale-95 cursor-pointer shadow-md z-20"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Bottom Indicator Dots */}
            <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/35 backdrop-blur-xs px-3 py-1 rounded-full">
              {activeSlides.map((slide, idx) => (
                <button
                  key={slide.id || idx}
                  onClick={() => setCurrentIndex(idx)}
                  className="h-3 flex items-center justify-center p-0.5 cursor-pointer focus:outline-none"
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span
                    className={`transition-all duration-300 rounded-full block ${
                      currentIndex === idx
                        ? 'w-6 h-2 bg-[#E8436E] ring-2 ring-white/60'
                        : 'w-2 h-2 bg-white/70 hover:bg-white'
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mobile-Friendly Trust Badges Strip (strictly confined within 100% width) */}
      <div className="sm:hidden bg-white/80 backdrop-blur-xs border-t border-pink-200/80 px-3 py-2.5 grid grid-cols-2 gap-2 text-left w-full max-w-full">
        <a
          href="#contact"
          className="flex items-center gap-2 p-2 rounded-xl bg-white border border-pink-100 shadow-2xs min-w-0"
        >
          <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#E8436E] flex items-center justify-center shrink-0">
            <Truck className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight truncate">Local Delivery</h4>
            <p className="text-[9px] text-stone-500 truncate">in Gondia</p>
          </div>
        </a>

        <button
          onClick={() => {
            if (onCustomClick) onCustomClick();
            else onShopClick();
          }}
          className="flex items-center gap-2 p-2 rounded-xl bg-white border border-pink-100 shadow-2xs text-left min-w-0 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#E8436E] flex items-center justify-center shrink-0">
            <Gift className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight truncate">Customized Gifts</h4>
            <p className="text-[9px] text-stone-500 truncate">With Love</p>
          </div>
        </button>

        <button
          onClick={onShopClick}
          className="flex items-center gap-2 p-2 rounded-xl bg-white border border-pink-100 shadow-2xs text-left min-w-0 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-pink-100 text-[#E8436E] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight truncate">Best Quality</h4>
            <p className="text-[9px] text-stone-500 truncate">100% Assured</p>
          </div>
        </button>

        <button
          onClick={handleWhatsAppClick}
          className="flex items-center gap-2 p-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 shadow-2xs text-left min-w-0 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-lg bg-[#25D366] text-white flex items-center justify-center shrink-0">
            <MessageCircle className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <h4 className="text-[11px] font-bold text-stone-900 leading-tight truncate">WhatsApp Order</h4>
            <p className="text-[9px] text-[#128C7E] font-medium truncate">+91 8208589775</p>
          </div>
        </button>
      </div>
    </section>
  );
};
