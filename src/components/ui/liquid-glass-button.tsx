"use client"

/* eslint-disable react-refresh/only-export-components */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

// ─── Shared base ─────────────────────────────────────────────────────────────
const BASE = [
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full",
  "text-sm font-medium select-none",
  "relative isolate overflow-hidden transform-gpu will-change-transform",
  "transition-all duration-200 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  "disabled:pointer-events-none disabled:opacity-40",
  "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
].join(" ")

// ─── Glass visual layers (applied as inline CSS box-shadow for precision) ────
// Top gloss:   inset 0 1px 0 rgba(255,255,255,N)
// Bottom rim:  inset 0 -1px 0 rgba(0,0,0,N)
// Outer lift:  0 Xpx Ypx rgba(0,0,0,N)

const buttonVariants = cva(BASE, {
  variants: {
    variant: {
      // ── glass ── standard white liquid glass pill (primary public CTA use)
      glass: [
        "bg-white/50 text-primary",
        "backdrop-blur-2xl",
        "border border-white/55",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.80),inset_0_-1px_0_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.08)]",
        "hover:-translate-y-[1.5px] hover:bg-white/65 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.90),inset_0_-1px_0_rgba(0,0,0,0.07),0_10px_28px_rgba(0,0,0,0.12)]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.70),inset_0_-1px_0_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.06)]",
      ].join(" "),

      // ── glassStrong ── stronger white glass for featured/primary CTAs
      glassStrong: [
        "bg-white/70 text-primary",
        "backdrop-blur-2xl",
        "border border-white/70",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.10)]",
        "hover:-translate-y-[1.5px] hover:bg-white/85 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.09),0_14px_36px_rgba(0,0,0,0.14)]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.80),inset_0_-1px_0_rgba(0,0,0,0.06),0_2px_8px_rgba(0,0,0,0.07)]",
      ].join(" "),

      // ── glassDark ── white glass with explicit dark text (alias for light bg)
      glassDark: [
        "bg-white/55 text-primary",
        "backdrop-blur-2xl",
        "border border-black/[0.09]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-1px_0_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.07)]",
        "hover:-translate-y-[1.5px] hover:bg-white/72 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.08),0_10px_28px_rgba(0,0,0,0.10)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── ghostGlass ── very subtle transparent pill
      ghostGlass: [
        "bg-white/[0.12] text-primary",
        "backdrop-blur-md",
        "border border-black/[0.08]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]",
        "hover:bg-white/[0.22] hover:-translate-y-[1px]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── glassOnDark ── white glass for use on dark/primary backgrounds
      glassOnDark: [
        "bg-white/[0.14] text-white",
        "backdrop-blur-2xl",
        "border border-white/20",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.30),0_8px_28px_rgba(0,0,0,0.22)]",
        "hover:-translate-y-[1.5px] hover:bg-white/[0.22] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(0,0,0,0.32),0_14px_40px_rgba(0,0,0,0.28)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── liquidDark ── kept for backward compat (FinalCTA dark section)
      liquidDark: [
        "bg-[rgba(20,20,22,0.78)] text-white",
        "backdrop-blur-2xl",
        "border border-white/[0.12]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-1px_0_rgba(0,0,0,0.35),0_8px_32px_rgba(0,0,0,0.22)]",
        "hover:-translate-y-[1.5px] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(0,0,0,0.35),0_14px_40px_rgba(0,0,0,0.28)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── Legacy variants ──
      liquidLight: [
        "bg-[rgba(255,255,255,0.62)] text-primary",
        "backdrop-blur-2xl border border-black/[0.08]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-1px_0_rgba(0,0,0,0.06),0_4px_18px_rgba(0,0,0,0.07)]",
        "hover:-translate-y-[1.5px] hover:bg-[rgba(255,255,255,0.80)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),
      liquidBlue: [
        "bg-[rgba(0,102,204,0.82)] text-white",
        "backdrop-blur-2xl border border-[rgba(0,102,204,0.3)]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(0,0,0,0.25),0_6px_24px_rgba(0,102,204,0.30)]",
        "hover:-translate-y-[1.5px] hover:bg-[rgba(0,102,204,0.92)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),
      liquidGhost: [
        "bg-white/[0.08] text-primary backdrop-blur-md",
        "border border-black/[0.09]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.60)]",
        "hover:bg-white/[0.18] hover:-translate-y-[1px]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),
      cool: [
        "bg-gradient-to-b from-primary to-primary/85 text-white",
        "border border-white/10 shadow-md shadow-primary/20 ring-1 ring-inset ring-white/20",
        "hover:brightness-110 active:brightness-90 transition-[filter] duration-200",
      ].join(" "),
      default: "bg-primary text-white hover:bg-primary/90",
      destructive: "bg-red-600 text-white hover:bg-red-600/90",
      outline: "border border-border bg-background hover:bg-accent/5 hover:text-accent",
      secondary: "bg-surface text-primary hover:bg-surface/80 border border-border/50",
      ghost: "hover:bg-primary/5 hover:text-primary",
      link: "text-primary underline-offset-4 hover:underline",
    },
    size: {
      default: "h-9 px-5 py-2 text-sm",
      sm:      "h-8 px-4 text-xs",
      lg:      "h-11 px-7 text-sm",
      xl:      "h-12 px-9 text-sm",
      xxl:     "h-14 px-11 text-[0.8125rem]",
      icon:    "h-9 w-9",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
})

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// ─── Legacy LiquidButton ─────────────────────────────────────────────────────
const liquidbuttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: [
          "bg-white/50 text-primary backdrop-blur-2xl",
          "border border-white/55",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.80),inset_0_-1px_0_rgba(0,0,0,0.06),0_6px_20px_rgba(0,0,0,0.08)]",
          "hover:-translate-y-[1.5px] hover:bg-white/65",
          "active:translate-y-0 active:scale-[0.98]",
        ].join(" "),
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-7",
        xl: "h-12 px-8",
        xxl: "h-14 px-10",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "xxl" },
  }
)

const LiquidButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp ref={ref} className={cn(liquidbuttonVariants({ variant, size, className }))} {...props} />
})
LiquidButton.displayName = "LiquidButton"

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton }
