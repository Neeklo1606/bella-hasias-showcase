"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Props for the InteractiveTravelCard component.
 */
export interface InteractiveTravelCardProps {
  /** The main title for the card, e.g., "Sapa Valley" */
  title: string;
  /** A subtitle or location, e.g., "Vietnam" */
  subtitle: string;
  /** The URL for the background image. */
  imageUrl: string;
  /** The text for the primary action button, e.g., "Book your trip" */
  actionText: string;
  /** The destination URL for the top-right link. */
  href: string;
  /** Callback function when the primary action button is clicked. */
  onActionClick: () => void;
  /** Optional additional class names for custom styling. */
  className?: string;
}

/**
 * A responsive and theme-adaptive travel card with a 3D tilt effect on hover.
 */
export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, actionText, href, onActionClick, className },
    ref
  ) => {
    // --- 3D Tilt Animation Logic ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { width, height, left, top } = rect;
      const mouseXVal = e.clientX - left;
      const mouseYVal = e.clientY - top;
      const xPct = mouseXVal / width - 0.5;
      const yPct = mouseYVal / height - 0.5;
      mouseX.set(xPct);
      mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    return (
      <article
        ref={ref}
        className={cn("group [perspective:1000px] [transform-style:preserve-3d]", className)}
        itemScope
        itemType="https://schema.org/Service"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          className="relative h-[420px] w-full overflow-hidden rounded-3xl bg-secondary shadow-lg transition-shadow duration-300 ease-out will-change-transform group-hover:shadow-xl md:h-[480px] [backface-visibility:hidden]"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            itemProp="image"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          
          {/* Darkening overlay for better text contrast over the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

          {/* Card Content (Header & Footer) */}
          <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
            {/* Header section with text and link */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 
                  className="font-display text-xl font-semibold text-background md:text-2xl"
                  itemProp="name"
                >
                  {title}
                </h3>
                <p 
                  className="font-sans text-sm text-background/80"
                  itemProp="description"
                >
                  {subtitle}
                </p>
              </div>

              <a
                href={href}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm transition-all duration-300 hover:bg-background/40"
                aria-label={`Перейти к ${title}`}
                itemProp="url"
              >
                <ArrowUpRight className="h-5 w-5 text-background" />
              </a>
            </div>

            {/* Footer Button */}
            <button
              onClick={onActionClick}
              className="w-full rounded-2xl bg-background/90 py-3 font-sans text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-background md:py-4 md:text-base"
            >
              {actionText}
            </button>
          </div>
        </motion.div>
      </article>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";
