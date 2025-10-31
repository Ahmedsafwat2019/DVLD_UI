// components/ui/FloatingInput.tsx
"use client";
import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingInput = ({
  label,
  error,
  className,
  id,
  ...props
}: FloatingInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        placeholder=" " // keep empty space for label animation
        {...props}
        className={cn(
          `peer block w-full rounded-lg border border-gray-300 bg-transparent px-3 pt-5 pb-2 text-base text-gray-900 placeholder-transparent
           focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none`,
          error && "border-red-500 focus:ring-red-200",
          className
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          `absolute right-3 top-2.5 text-gray-500 text-sm transition-all duration-200 
           peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-gray-400 
           peer-placeholder-shown:text-base peer-placeholder-shown:right-3
           peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-600`,
          error && "text-red-500 peer-focus:text-red-600"
        )}
      >
        {label}
      </label>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
