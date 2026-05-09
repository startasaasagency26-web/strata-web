"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

// ─── Standard Button (preserved for backward compat) ─────────────────────────

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        destructive: "bg-red-600 text-white hover:bg-red-600/90",
        // Liquid Dark — primary CTA on light backgrounds
        liquidDark: [
          "relative overflow-hidden transform-gpu",
          "bg-primary/90 text-white",
          "border border-white/10",
          "shadow-[0_4px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.12)]",
          "backdrop-blur-md",
          "transition-all duration-200 ease-out",
          "hover:brightness-110 hover:-translate-y-px hover:shadow-[0_8px_32px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.18)]",
          "active:scale-[0.98] active:translate-y-0 active:brightness-95",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        ].join(" "),
        // Liquid Light — secondary CTA on light backgrounds
        liquidLight: [
          "relative overflow-hidden transform-gpu",
          "bg-white/80 text-primary",
          "border border-black/10",
          "shadow-[0_2px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]",
          "backdrop-blur-md",
          "transition-all duration-200 ease-out",
          "hover:bg-white hover:shadow-[0_6px_20px_rgba(0,0,0,0.10),inset_0_1px_0_rgba(255,255,255,1)]",
          "active:scale-[0.98] active:brightness-95",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        ].join(" "),
        // Liquid Blue — accent CTA, use sparingly
        liquidBlue: [
          "relative overflow-hidden transform-gpu",
          "bg-accent/90 text-white",
          "border border-accent/20",
          "shadow-[0_4px_20px_rgba(0,102,204,0.25),inset_0_1px_0_rgba(255,255,255,0.18)]",
          "backdrop-blur-md",
          "transition-all duration-200 ease-out",
          "hover:brightness-110 hover:-translate-y-px hover:shadow-[0_8px_28px_rgba(0,102,204,0.35)]",
          "active:scale-[0.98] active:translate-y-0",
          "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        ].join(" "),
        // Cool — kept for backward compat (Navbar used this)
        cool: [
          "dark:shadow-inner bg-gradient-to-t border border-b-2 border-zinc-950/40",
          "from-primary to-primary/85 shadow-md shadow-primary/20 ring-1 ring-inset ring-white/25",
          "transition-[filter] duration-200 hover:brightness-110 active:brightness-90",
          "dark:border-x-0 text-white dark:border-t-0 dark:border-primary/50 dark:ring-white/5",
        ].join(" "),
        outline: "border border-border bg-background hover:bg-accent/10 hover:text-accent",
        secondary: "bg-surface text-primary hover:bg-surface/80 border border-border/50",
        ghost: "hover:bg-primary/5 hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-11 rounded-full px-7",
        xl: "h-13 rounded-full px-9 text-sm",
        xxl: "h-14 rounded-full px-10 text-sm",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

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

// ─── Metal Button (premium multi-layer metallic style) ────────────────────────

type ColorVariant =
  | "default"
  | "primary"
  | "success"
  | "error"
  | "gold"
  | "bronze"

interface MetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ColorVariant
  asChild?: boolean
}

const colorVariants: Record<
  ColorVariant,
  {
    outer: string
    inner: string
    button: string
    textColor: string
    textShadow: string
  }
> = {
  default: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#FAFAFA] via-[#3E3E3E] to-[#E5E5E5]",
    button: "bg-gradient-to-b from-[#B9B9B9] to-[#969696]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(80_80_80_/_100%)]",
  },
  primary: {
    outer: "bg-gradient-to-b from-[#000] to-[#A0A0A0]",
    inner: "bg-gradient-to-b from-[#1D1D1F] via-[#3D3D3F] to-[#2D2D2F]",
    button: "bg-gradient-to-b from-[#3D3D3F] to-[#1D1D1F]",
    textColor: "text-white",
    textShadow: "[text-shadow:_0_-1px_0_rgb(0_0_0_/_100%)]",
  },
  success: {
    outer: "bg-gradient-to-b from-[#005A43] to-[#7CCB9B]",
    inner: "bg-gradient-to-b from-[#E5F8F0] via-[#00352F] to-[#D1F0E6]",
    button: "bg-gradient-to-b from-[#9ADBC8] to-[#3E8F7C]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(6_78_59_/_100%)]",
  },
  error: {
    outer: "bg-gradient-to-b from-[#5A0000] to-[#FFAEB0]",
    inner: "bg-gradient-to-b from-[#FFDEDE] via-[#680002] to-[#FFE9E9]",
    button: "bg-gradient-to-b from-[#F08D8F] to-[#A45253]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(146_64_14_/_100%)]",
  },
  gold: {
    outer: "bg-gradient-to-b from-[#917100] to-[#EAD98F]",
    inner: "bg-gradient-to-b from-[#FFFDDD] via-[#856807] to-[#FFF1B3]",
    button: "bg-gradient-to-b from-[#FFEBA1] to-[#9B873F]",
    textColor: "text-[#FFFDE5]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(178_140_2_/_100%)]",
  },
  bronze: {
    outer: "bg-gradient-to-b from-[#864813] to-[#E9B486]",
    inner: "bg-gradient-to-b from-[#EDC5A1] via-[#5F2D01] to-[#FFDEC1]",
    button: "bg-gradient-to-b from-[#FFE3C9] to-[#A36F3D]",
    textColor: "text-[#FFF7F0]",
    textShadow: "[text-shadow:_0_-1px_0_rgb(124_45_18_/_100%)]",
  },
}

const metalButtonVariants = (
  variant: ColorVariant = "default",
  isPressed: boolean,
  isHovered: boolean,
  isTouchDevice: boolean,
) => {
  const colors = colorVariants[variant]
  const transitionStyle = "all 250ms cubic-bezier(0.1, 0.4, 0.2, 1)"

  return {
    wrapper: cn(
      "relative inline-flex transform-gpu rounded-lg p-[1.25px] will-change-transform",
      colors.outer,
    ),
    wrapperStyle: {
      transform: isPressed
        ? "translateY(2.5px) scale(0.99)"
        : "translateY(0) scale(1)",
      boxShadow: isPressed
        ? "0 1px 2px rgba(0, 0, 0, 0.15)"
        : isHovered && !isTouchDevice
          ? "0 4px 12px rgba(0, 0, 0, 0.12)"
          : "0 3px 8px rgba(0, 0, 0, 0.08)",
      transition: transitionStyle,
      transformOrigin: "center center",
    },
    inner: cn(
      "absolute inset-[1px] transform-gpu rounded-lg will-change-transform",
      colors.inner,
    ),
    innerStyle: {
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.05)" : "none",
    },
    button: cn(
      "relative z-10 m-[1px] rounded-md inline-flex h-11 transform-gpu cursor-pointer items-center justify-center overflow-hidden px-6 py-2 text-sm leading-none font-semibold will-change-transform outline-none",
      "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      colors.button,
      colors.textColor,
      colors.textShadow,
    ),
    buttonStyle: {
      transform: isPressed ? "scale(0.97)" : "scale(1)",
      transition: transitionStyle,
      transformOrigin: "center center",
      filter:
        isHovered && !isPressed && !isTouchDevice ? "brightness(1.02)" : "none",
    },
  }
}

const ShineEffect = ({ isPressed }: { isPressed: boolean }) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-20 overflow-hidden transition-opacity duration-300",
        isPressed ? "opacity-20" : "opacity-0",
      )}
    >
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-neutral-100 to-transparent" />
    </div>
  )
}

export const MetalButton = React.forwardRef<
  HTMLButtonElement,
  MetalButtonProps
>(({ children, className, variant = "default", asChild = false, ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isTouchDevice, setIsTouchDevice] = React.useState(false)

  React.useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  const variants = metalButtonVariants(variant, isPressed, isHovered, isTouchDevice)
  const Comp = asChild ? Slot : "button"

  return (
    <div className={variants.wrapper} style={variants.wrapperStyle}>
      <div className={variants.inner} style={variants.innerStyle} />
      <Comp
        ref={ref}
        className={cn(variants.button, className)}
        style={variants.buttonStyle}
        {...props}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => { setIsPressed(false); setIsHovered(false) }}
        onMouseEnter={() => { if (!isTouchDevice) setIsHovered(true) }}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        onTouchCancel={() => setIsPressed(false)}
      >
        <ShineEffect isPressed={isPressed} />
        {children || "Button"}
        {isHovered && !isPressed && !isTouchDevice && (
          <div className="pointer-events-none absolute inset-0 rounded-md bg-gradient-to-t from-transparent to-white/5" />
        )}
      </Comp>
    </div>
  )
})
MetalButton.displayName = "MetalButton"

// ─── Legacy LiquidButton (simple pass-through, kept for any existing usages) ──
const liquidbuttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary/90 text-white border border-white/10 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.12)] hover:brightness-110 hover:-translate-y-px active:scale-[0.98]",
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
    defaultVariants: {
      variant: "default",
      size: "xxl",
    },
  }
)

const LiquidButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & VariantProps<typeof liquidbuttonVariants> & { asChild?: boolean }
>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      ref={ref}
      className={cn(liquidbuttonVariants({ variant, size, className }))}
      {...props}
    />
  )
})
LiquidButton.displayName = "LiquidButton"

export { Button, buttonVariants, liquidbuttonVariants, LiquidButton }
