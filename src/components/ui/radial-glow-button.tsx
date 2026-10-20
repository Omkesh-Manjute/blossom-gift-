"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface RadialGlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export function RadialGlowButton({
  children = "Explore Gifts",
  className,
  ...props
}: RadialGlowButtonProps) {
  return (
    <div className="relative inline-block">
      <style>{`
        @keyframes rg-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes rg-shimmer {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.6; }
        }
        .blossom-glow-btn {
          position: relative;
          background: linear-gradient(135deg, #292525 0%, #1c1917 100%);
          color: #ffffff;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .blossom-glow-btn::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: conic-gradient(from 0deg, #F4C62E, #E95D79, #F59E0B, #E95D79, #F4C62E);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
          animation: rg-spin 6s linear infinite;
        }
        .blossom-glow-btn:hover::before {
          opacity: 1;
        }
        .blossom-glow-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 20px -4px rgba(244, 198, 46, 0.35);
        }
      `}</style>
      
      <button
        className={cn(
          "blossom-glow-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide border border-amber-200/20 cursor-pointer flex items-center justify-center gap-2",
          className
        )}
        type="button"
        {...props}
      >
        <span className="relative z-10 flex items-center gap-1.5">{children}</span>
      </button>
    </div>
  );
}

export default RadialGlowButton;
