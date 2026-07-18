/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface SchoolLogoProps {
  className?: string;
  showText?: boolean;
  textColorClass?: string;
  size?: "sm" | "md" | "lg";
}

export default function SchoolLogo({
  className = "",
  showText = true,
  textColorClass = "text-hijau-primary",
  size = "md",
}: SchoolLogoProps) {
  const dimensions = {
    sm: "h-9 w-9",
    md: "h-12 w-12",
    lg: "h-20 w-20",
  };

  return (
    <div className={`flex items-center gap-3 ${className}`} id="school-logo-container">
      {/* Emblem SVG */}
      <div className={`relative flex-shrink-0 ${dimensions[size]}`} id="school-logo-emblem">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-sm select-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer Shield Border */}
          <path
            d="M50 5C75 5 90 20 90 45C90 70 70 90 50 95C30 90 10 70 10 45C10 20 25 5 50 5Z"
            fill="url(#shieldGradient)"
            stroke="#f26522"
            strokeWidth="3"
          />

          {/* Inner Badge Background */}
          <path
            d="M50 10C70 10 84 22 84 45C84 65 67 82 50 87C33 82 16 65 16 45C16 22 30 10 50 10Z"
            fill="#ffffff"
            stroke="#1b7339"
            strokeWidth="1.5"
          />

          {/* Muhammadiyah Sun Motif */}
          <g transform="translate(50, 46)">
            {/* Sun Rays */}
            {[...Array(12)].map((_, i) => (
              <path
                key={i}
                d="M0 -32 L4 -12 L0 -8 L-4 -12 Z"
                fill="#f26522"
                transform={`rotate(${i * 30})`}
              />
            ))}
            
            {/* Center Circle */}
            <circle cx="0" cy="0" r="14" fill="#1b7339" stroke="#ffeada" strokeWidth="1" />
            
            {/* Stylized Core Icon (Star) */}
            <path
              d="M0 -7 L2 -2 L7 -2 L3 1 L5 6 L0 3 L-5 6 L-3 1 L-7 -2 L-2 -2 Z"
              fill="#ffffff"
            />
          </g>

          {/* Banner Ribbon at Bottom */}
          <path
            d="M15 72 L30 68 L50 71 L70 68 L85 72 L78 80 L50 78 L22 80 Z"
            fill="#1b7339"
            stroke="#f26522"
            strokeWidth="1"
          />

          {/* Banner Text Placeholder */}
          <path
            id="curve-text-path"
            d="M20 74 Q 50 82 80 74"
            fill="none"
          />
          <text fill="#ffffff" fontSize="5.5" fontWeight="bold" textAnchor="middle">
            <textPath href="#curve-text-path" startOffset="50%">
              SMK MUH 4 SRAGEN
            </textPath>
          </text>

          {/* Definitions */}
          <defs>
            <linearGradient id="shieldGradient" x1="50" y1="5" x2="50" y2="95" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#d8f5e5" />
              <stop offset="100%" stopColor="#eefcf4" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col select-none" id="school-logo-text">
          <span className={`font-extrabold tracking-tight leading-tight uppercase ${textColorClass} ${
            size === "sm" ? "text-xs" : size === "md" ? "text-sm md:text-base" : "text-xl md:text-2xl"
          }`}>
            SMK Muhammadiyah 4
          </span>
          <span className="text-[10px] md:text-xs font-semibold tracking-wider text-slate-500 uppercase leading-none">
            Sragen, Jawa Tengah
          </span>
        </div>
      )}
    </div>
  );
}
