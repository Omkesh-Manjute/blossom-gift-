import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface InteractiveHoverButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
}

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-xl border border-stone-800 bg-[#292525] p-2.5 px-6 text-center font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-[#F4C62E] transition-all duration-300 group-hover:scale-[120]"></div>
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-xs sm:text-sm">
          {children}
        </span>
      </div>
      <div className="absolute top-0 left-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-[#292525] font-bold text-xs sm:text-sm">
        <span>{children}</span>
        <ArrowRight className="w-4 h-4 text-[#292525]" />
      </div>
    </button>
  );
}

export default InteractiveHoverButton;
