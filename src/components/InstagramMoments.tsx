import React, { useState } from 'react';
import {
  Youtube,
  Instagram,
  Play,
  Heart,
  ExternalLink,
  Eye,
  X,
  Store,
} from 'lucide-react';

interface VideoMoment {
  id: string;
  title: string;
  creator: string;
  views: string;
  likes: string;
  thumbnail: string;
  videoUrl: string;
  badge: string;
  tag: string;
}

const OFFICIAL_CHANNELS = {
  name: '@theblossomgiftshop',
  instaUrl: 'https://www.instagram.com/theblossomgiftshop?mdxt=MW9oY2hzdmpncDFzYQ==',
  youtubeUrl: 'https://www.youtube.com/@blossomgiftcentergondiam.h925',
  vyaparifyUrl: 'https://id.vyaparify.com/blossom-gift-centre?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
  tagline: 'Blossom Gift Centre Gondia (M.S.)',
};

const VIDEO_MOMENTS: VideoMoment[] = [
  {
    id: 'vid-1',
    title: 'Surprise Unboxing: Luxury Photo Mug & Everlasting Rose Teddy in Gondia!',
    creator: '@theblossomgiftshop',
    views: '45.2K',
    likes: '4.8K',
    thumbnail: '/extracted/rose_teddy_bear.png',
    videoUrl: 'https://www.youtube.com/@blossomgiftcentergondiam.h925',
    badge: 'Trending Reel',
    tag: '#UnboxingSurprise',
  },
  {
    id: 'vid-2',
    title: 'Testing High-Speed 4WD Stunt Drift RC Car: Extreme Speed Test & Stunts!',
    creator: '@theblossomgiftshop',
    views: '89.4K',
    likes: '9.2K',
    thumbnail: '/products/vyaparify/toys_range.jpg',
    videoUrl: 'https://www.youtube.com/@blossomgiftcentergondiam.h925',
    badge: 'Toy Review',
    tag: '#RCCarDrift',
  },
  {
    id: 'vid-3',
    title: 'Custom LED Couple Light Photo Frame: The Most Romantic Anniversary Gift!',
    creator: '@theblossomgiftshop',
    views: '62.1K',
    likes: '6.5K',
    thumbnail: '/products/led_photo_frame_hd.png',
    videoUrl: 'https://www.youtube.com/@blossomgiftcentergondiam.h925',
    badge: 'Viral Gift',
    tag: '#CoupleLEDFrame',
  },
  {
    id: 'vid-4',
    title: 'What Fits in the Luxury Coral Gifting Bag? Premium Unboxing & Style Check!',
    creator: '@theblossomgiftshop',
    views: '38.7K',
    likes: '3.9K',
    thumbnail: '/products/vyaparify/bags_occasion.jpg',
    videoUrl: 'https://www.youtube.com/@blossomgiftcentergondiam.h925',
    badge: 'Fashion Gift',
    tag: '#LuxuryHandbag',
  },
  {
    id: 'vid-5',
    title: 'Deluxe Ferrero & Scented Candle Hamper Unboxing: Worth the Hype?',
    creator: '@theblossomgiftshop',
    views: '54.3K',
    likes: '5.1K',
    thumbnail: '/products/vyaparify/chocolate.jpg',
    videoUrl: 'https://www.youtube.com/@blossomgiftcentergondiam.h925',
    badge: 'Gourmet Hamper',
    tag: '#ChocolateHamper',
  },
  {
    id: 'vid-6',
    title: '3D Pop-Up Musical Greeting Card & Fluffy Cuddle Teddy Reaction!',
    creator: '@theblossomgiftshop',
    views: '29.8K',
    likes: '3.4K',
    thumbnail: '/products/vyaparify/teddy_bear.jpg',
    videoUrl: 'https://www.youtube.com/@blossomgiftcentergondiam.h925',
    badge: 'Sweet Reaction',
    tag: '#PopUpCard',
  },
];

export const InstagramMoments: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoMoment | null>(null);

  return (
    <section className="py-12 bg-white border-t border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Creator Profile Link & Callout */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center md:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-50 to-pink-50 text-[#E8436E] border border-pink-200/80 text-xs font-bold mb-2 shadow-2xs">
              <Instagram className="w-3.5 h-3.5 text-[#E8436E]" />
              <span>OFFICIAL INSTAGRAM & YOUTUBE · @theblossomgiftshop</span>
            </div>
            <h3 className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
              Watch Real Unboxings & Moments
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 max-w-xl">
              See live unboxings, customer smile reactions, and hands-on reviews by{' '}
              <strong className="text-stone-800">Blossom Gift Centre Gondia</strong>!
            </p>
          </div>

          {/* Social Channel Links & Follow Button */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5 shrink-0">
            {/* Instagram Link (Requested Primary) */}
            <a
              href={OFFICIAL_CHANNELS.instaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-md shadow-pink-200 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* YouTube Channel Link */}
            <a
              href={OFFICIAL_CHANNELS.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FF0000] hover:bg-[#cc0000] text-white text-xs font-bold shadow-md shadow-red-200 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>YouTube Channel</span>
            </a>

            {/* Vyaparify Bio Store Link */}
            <a
              href={OFFICIAL_CHANNELS.vyaparifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all border border-stone-200"
            >
              <Store className="w-3.5 h-3.5 text-stone-600" />
              <span>Store Bio</span>
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {VIDEO_MOMENTS.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveVideo(item)}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-stone-200/80 bg-stone-900 cursor-pointer flex flex-col justify-between aspect-3/4 transform transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              {/* Media Thumbnail */}
              <img
                src={item.thumbnail}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                loading="lazy"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/30 pointer-events-none" />

              {/* Top Tag & Views */}
              <div className="relative z-10 p-2.5 flex items-center justify-between text-[10px] font-bold">
                <span className="bg-[#E8436E] text-white px-2 py-0.5 rounded-full shadow-xs">
                  {item.badge}
                </span>
                <span className="text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Eye className="w-3 h-3 text-pink-400" />
                  <span>{item.views}</span>
                </span>
              </div>

              {/* Center Play Button with Pulse animation */}
              <div className="relative z-10 my-auto flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 group-hover:bg-[#E8436E] text-stone-900 group-hover:text-white flex items-center justify-center shadow-lg transition-all transform group-hover:scale-115">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Bottom Caption & Channel Tag */}
              <div className="relative z-10 p-3 text-left">
                <span className="text-[10px] text-pink-300 font-bold block mb-0.5">
                  {item.creator}
                </span>
                <h4 className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-2 pt-1 border-t border-white/15 text-[10px] text-white/80">
                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                    <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    <span>{item.likes}</span>
                  </span>
                  <span className="text-white/60">· {item.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-stone-950 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-800 text-left relative flex flex-col">
            {/* Header */}
            <div className="p-4 bg-stone-900 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center">
                  <Instagram className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{activeVideo.title}</h4>
                  <a
                    href={OFFICIAL_CHANNELS.instaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-pink-400 hover:underline font-bold"
                  >
                    {activeVideo.creator} · Follow on Instagram ↗
                  </a>
                </div>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Display */}
            <div className="aspect-video w-full bg-black relative flex items-center justify-center">
              <img
                src={activeVideo.thumbnail}
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                <a
                  href={OFFICIAL_CHANNELS.instaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 hover:opacity-90 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110 mb-3 cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-white ml-1" />
                </a>
                <p className="text-sm font-bold text-white mb-3 max-w-md">
                  Watch full unboxing on @theblossomgiftshop
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <a
                    href={OFFICIAL_CHANNELS.instaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white font-bold text-xs hover:opacity-90 flex items-center gap-1.5 shadow-lg"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Watch on Instagram</span>
                  </a>
                  <a
                    href={OFFICIAL_CHANNELS.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-full bg-[#FF0000] text-white font-bold text-xs hover:bg-red-700 flex items-center gap-1.5 shadow-lg"
                  >
                    <Youtube className="w-4 h-4 fill-white" />
                    <span>YouTube Channel</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Footer Details */}
            <div className="p-4 bg-stone-900 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-bold text-rose-400">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>{activeVideo.likes} Likes</span>
                </span>
                <span className="text-stone-400 font-mono">👁️ {activeVideo.views} Views</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveVideo(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
