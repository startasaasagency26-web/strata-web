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
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-focusOffset",
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
      // ── glass ── standard elevated glass pill (primary public CTA use)
      glass: [
        "bg-surface/50 text-text",
        "backdrop-blur-2xl",
        "border border-border",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.20),inset_0_-1px_0_rgb(var(--scrim)/0.06),0_6px_20px_rgb(var(--scrim)/0.08)]",
        "hover:-translate-y-[1.5px] hover:bg-surface hover:shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.26),inset_0_-1px_0_rgb(var(--scrim)/0.07),0_10px_28px_rgb(var(--scrim)/0.12)]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.18),inset_0_-1px_0_rgb(var(--scrim)/0.05),0_2px_8px_rgb(var(--scrim)/0.06)]",
      ].join(" "),

      // ── glassStrong ── stronger glass for featured/primary CTAs
      glassStrong: [
        "bg-surface text-text",
        "backdrop-blur-2xl",
        "border border-borderStrong",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.28),inset_0_-1px_0_rgb(var(--scrim)/0.08),0_8px_24px_rgb(var(--scrim)/0.10)]",
        "hover:-translate-y-[1.5px] hover:bg-surface2 hover:shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.34),inset_0_-1px_0_rgb(var(--scrim)/0.09),0_14px_36px_rgb(var(--scrim)/0.14)]",
        "active:translate-y-0 active:scale-[0.98] active:shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.22),inset_0_-1px_0_rgb(var(--scrim)/0.06),0_2px_8px_rgb(var(--scrim)/0.07)]",
      ].join(" "),

      // ── glassDark ── surface glass with explicit text colour
      glassDark: [
        "bg-surface text-text",
        "backdrop-blur-2xl",
        "border border-border",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.24),inset_0_-1px_0_rgb(var(--scrim)/0.06),0_4px_16px_rgb(var(--scrim)/0.07)]",
        "hover:-translate-y-[1.5px] hover:bg-surface2 hover:shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.28),inset_0_-1px_0_rgb(var(--scrim)/0.08),0_10px_28px_rgb(var(--scrim)/0.10)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── ghostGlass ── very subtle transparent pill
      ghostGlass: [
        "bg-surface2 text-text",
        "backdrop-blur-md",
        "border border-border",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.16)]",
        "hover:bg-surface3 hover:-translate-y-[1px]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── glassOnDark ── raised glass for dark backgrounds
      glassOnDark: [
        "bg-surface3 text-text",
        "backdrop-blur-2xl",
        "border border-borderStrong",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.22),inset_0_-1px_0_rgb(var(--scrim)/0.30),0_8px_28px_rgb(var(--scrim)/0.22)]",
        "hover:-translate-y-[1.5px] hover:bg-border hover:shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.28),inset_0_-1px_0_rgb(var(--scrim)/0.32),0_14px_40px_rgb(var(--scrim)/0.28)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── liquidDark ── kept for backward compat (FinalCTA dark section)
      liquidDark: [
        "bg-surface2/80 text-text",
        "backdrop-blur-2xl",
        "border border-borderStrong",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.18),inset_0_-1px_0_rgb(var(--scrim)/0.35),0_8px_32px_rgb(var(--scrim)/0.22)]",
        "hover:-translate-y-[1.5px] hover:bg-surface3 hover:shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.22),inset_0_-1px_0_rgb(var(--scrim)/0.35),0_14px_40px_rgb(var(--scrim)/0.28)]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),

      // ── Legacy variants ──
      liquidLight: [
        "bg-surface text-text",
        "backdrop-blur-2xl border border-border",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.28),inset_0_-1px_0_rgb(var(--scrim)/0.06),0_4px_18px_rgb(var(--scrim)/0.07)]",
        "hover:-translate-y-[1.5px] hover:bg-surface2",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),
      liquidBlue: [
        "bg-gold text-void",
        "backdrop-blur-2xl border border-goldActive",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.28),inset_0_-1px_0_rgb(var(--scrim)/0.25),0_6px_24px_rgb(var(--gold)/0.30)]",
        "hover:-translate-y-[1.5px] hover:bg-goldHover",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),
      liquidGhost: [
        "bg-surface2 text-text backdrop-blur-md",
        "border border-border",
        "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.18)]",
        "hover:bg-surface3 hover:-translate-y-[1px]",
        "active:translate-y-0 active:scale-[0.98]",
      ].join(" "),
      cool: [
        "bg-gradient-to-b from-goldHover to-gold text-void",
        "border border-goldActive shadow-md shadow-gold/20 ring-1 ring-inset ring-champagne/20",
        "hover:bg-goldHover active:bg-goldActive transition-colors duration-200",
      ].join(" "),
      default: "bg-gold text-void hover:bg-goldHover active:bg-goldActive",
      destructive: "bg-danger text-void hover:bg-danger/90",
      outline: "border border-border bg-canvas hover:bg-gold/10 hover:text-gold",
      secondary: "bg-surface text-text hover:bg-surface2 border border-border",
      ghost: "hover:bg-gold/10 hover:text-gold",
      link: "text-gold underline-offset-4 hover:text-goldHover hover:underline",
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
          "bg-surface text-text backdrop-blur-2xl",
          "border border-border",
          "shadow-[inset_0_1px_0_rgb(var(--glass-tint)/0.24),inset_0_-1px_0_rgb(var(--scrim)/0.06),0_6px_20px_rgb(var(--scrim)/0.08)]",
          "hover:-translate-y-[1.5px] hover:bg-surface2",
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
