import React from 'react';
import { cn } from '../../lib/utils';

export interface GlowBorderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const GlowBorderCard: React.FC<GlowBorderCardProps> = ({
  children,
  className,
  glowColor = 'rgba(244, 198, 46, 0.4)',
  ...props
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-2xl transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Animated glowing backdrop */}
      <div
        className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[#F4C62E] via-[#E95D79] to-[#F59E0B] opacity-0 blur-md transition-all duration-500 group-hover:opacity-60 -z-10"
      />
      
      {/* Card Content container */}
      <div className="relative h-full w-full rounded-2xl bg-white/95 backdrop-blur-md overflow-hidden border border-stone-200/80 shadow-xs transition-all duration-300 group-hover:shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default GlowBorderCard;
