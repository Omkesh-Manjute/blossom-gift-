import React from 'react';

interface AnimatedRaysProps {
  className?: string;
  intensity?: 'subtle' | 'vibrant';
  rayCount?: number;
}

export const AnimatedRays: React.FC<AnimatedRaysProps> = ({
  className = '',
  intensity = 'subtle',
  rayCount = 12,
}) => {
  const opacity = intensity === 'vibrant' ? 'opacity-35' : 'opacity-20';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
    >
      {/* Central ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#F4C62E]/25 via-[#E95D79]/15 to-transparent blur-3xl animate-pulse-glow" />

      {/* Rotating ray lines & cones */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] ${opacity} animate-ray-rotate`}>
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full text-[#F4C62E]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="rayGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F4C62E" stopOpacity="0.8" />
              <stop offset="35%" stopColor="#E95D79" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#FFF8E8" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#FFF8E8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {Array.from({ length: rayCount }).map((_, i) => {
            const angle = (360 / rayCount) * i;
            return (
              <path
                key={i}
                d={`M 400 400 L ${400 + 400 * Math.cos(((angle - 7) * Math.PI) / 180)} ${400 + 400 * Math.sin(((angle - 7) * Math.PI) / 180)} A 400 400 0 0 1 ${400 + 400 * Math.cos(((angle + 7) * Math.PI) / 180)} ${400 + 400 * Math.sin(((angle + 7) * Math.PI) / 180)} Z`}
                fill="url(#rayGradient)"
              />
            );
          })}
        </svg>
      </div>

      {/* Secondary reverse counter-balance shimmer */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] opacity-10"
        style={{ animation: 'rayRotate 60s linear infinite reverse' }}
      >
        <svg
          viewBox="0 0 700 700"
          className="w-full h-full text-[#E95D79]"
          fill="none"
        >
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (360 / 8) * i + 22.5;
            return (
              <circle
                key={i}
                cx={350 + 260 * Math.cos((angle * Math.PI) / 180)}
                cy={350 + 260 * Math.sin((angle * Math.PI) / 180)}
                r="3"
                fill="#E95D79"
                className="animate-pulse"
              />
            );
          })}
        </svg>
      </div>
    </div>
  );
};
