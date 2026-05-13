"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";
import { cn } from "../lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline" | "ghost" | "danger" | "accent";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-primary-500 text-white hover:bg-primary-600 shadow-glow-primary",
      outline: "border border-primary-500 text-primary-400 hover:bg-primary-500/10",
      ghost: "text-text-secondary hover:bg-bg-elevated hover:text-text-primary",
      danger: "border border-error/40 text-error hover:bg-error/10 hover:border-error",
      accent: "bg-accent-cyan text-bg-base hover:brightness-110 shadow-glow-cyan",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2 text-sm",
      lg: "px-6 py-3 text-base",
      icon: "p-2",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";