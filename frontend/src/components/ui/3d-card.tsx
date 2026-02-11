"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

export interface InteractiveTravelCardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  actionText?: string;
  href: string;
  onActionClick: () => void;
  className?: string;
}

export const InteractiveTravelCard = React.forwardRef<
  HTMLDivElement,
  InteractiveTravelCardProps
>(
  (
    { title, subtitle, imageUrl, actionText, href, onActionClick, className },
    ref
  ) => {
    const isMobile = useIsMobile();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (isMobile) return;
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

    // Entire card is clickable on both mobile and desktop
    const handleCardClick = () => {
      onActionClick();
    };

    return (
      <article
        ref={ref}
        className={cn("group [perspective:1000px] overflow-hidden rounded-2xl", className)}
        itemScope
        itemType="https://schema.org/Service"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className={cn(
            "relative h-[280px] w-full overflow-hidden rounded-2xl bg-secondary shadow-lg transition-shadow duration-300 ease-out will-change-transform md:h-[360px] [backface-visibility:hidden] cursor-pointer",
            "active:scale-[0.98] hover:shadow-xl"
          )}
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            itemProp="image"
            className="absolute -inset-4 h-[calc(100%+32px)] w-[calc(100%+32px)] object-cover object-top scale-110 transition-transform duration-500 ease-out group-hover:scale-115"
          />
          
          {/* Darker overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

          {/* Card Content */}
          <div className="relative flex h-full flex-col justify-between p-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 
                  className="font-display text-lg font-semibold text-white md:text-xl"
                  itemProp="name"
                >
                  {title}
                </h3>
                {subtitle && (
                  <p 
                    className="font-sans text-xs text-white/90 md:text-sm"
                    itemProp="description"
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Arrow icon */}
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors"
                aria-hidden="true"
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Empty space at bottom - removed button */}
            <div />
          </div>
        </motion.div>
      </article>
    );
  }
);
InteractiveTravelCard.displayName = "InteractiveTravelCard";
