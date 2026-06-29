"use client";

import { useState } from "react";
import Link from "next/link";

interface InvestorCardProps {
  name: string;
  slug: string;
  philosophy: string;
  imageUrl: string;
}

export default function InvestorCard({
  name,
  slug,
  philosophy,
  imageUrl,
}: InvestorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Link href={`/investors/${slug}`}>
      <div
        className="group h-80 w-full cursor-pointer perspective"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="relative w-full h-full transition-transform duration-500 transform-gpu"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center justify-center p-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full h-full bg-gray-100 relative overflow-hidden">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
              <h3 className="font-serif text-2xl font-bold">{name}</h3>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full bg-white rounded-lg shadow-md overflow-hidden flex flex-col justify-between p-8"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="space-y-4">
              <p className="text-sm text-accent font-semibold uppercase tracking-wider">
                Philosophy
              </p>
              <p className="text-foreground font-serif text-lg leading-relaxed italic">
                &ldquo;{philosophy}&rdquo;
              </p>
            </div>
            <div className="pt-6 border-t border-muted">
              <p className="text-xs text-foreground/60 uppercase tracking-wider">
                ← Click to explore
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
