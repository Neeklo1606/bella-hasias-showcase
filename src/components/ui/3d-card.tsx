"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveTravelCardProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  actionText: string;
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
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const rotateX = useTransform(springY, [-0.5, 0.5], ["10.5deg", "-10.5deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-10.5deg", "10.5deg"]);

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
        className={cn("group [perspective:1000px]", className)}
        itemScope
        itemType="https://schema.org/Service"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-secondary shadow-lg transition-shadow duration-300 ease-out will-change-transform group-hover:shadow-xl md:h-[360px]"
        >
          {/* Background Image */}
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            itemProp="image"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
                <p 
                  className="font-sans text-xs text-white/90 md:text-sm"
                  itemProp="description"
                >
                  {subtitle}
                </p>
              </div>

              <a
                href={href}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 hover:bg-white/40"
                aria-label={`Перейти к ${title}`}
                itemProp="url"
              >
                <ArrowUpRight className="h-4 w-4 text-white" />
              </a>
            </div>

            {/* Footer Button */}
            <button
              onClick={onActionClick}
              className="w-full rounded-xl bg-white/95 py-2.5 font-sans text-sm font-medium text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white md:py-3"
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