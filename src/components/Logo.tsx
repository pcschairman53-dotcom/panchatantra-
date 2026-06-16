/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  // Dimensions based on size
  const strokeWidth = 2;
  const dimensions = {
    sm: { width: 44, height: 44, textClass: 'text-xs md:text-sm' },
    md: { width: 80, height: 80, textClass: 'text-base md:text-lg' },
    lg: { width: 140, height: 140, textClass: 'text-xl md:text-2xl' },
    xl: { width: 220, height: 220, textClass: 'text-2xl md:text-3xl' },
  };

  const currentSize = dimensions[size];

  return (
    <div className={`flex items-center gap-3 ${className}`} id="school-logo-container">
      {/* Premium SVG Vector Seal of Panchatantra Ethics School */}
      <svg
        id="school-seal-svg"
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg transition-transform duration-300 hover:scale-[1.03]"
      >
        <defs>
          {/* Gold Gradient for Premium Classical Feel */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="30%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>

          {/* Golden Yellow Soft Accent */}
          <linearGradient id="lightGold" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F9F5E8" />
            <stop offset="100%" stopColor="#E2D4A8" />
          </linearGradient>

          {/* Deep Navy Radial Background */}
          <radialGradient id="navyRadial" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
            <stop offset="0%" stopColor="#1A365D" />
            <stop offset="70%" stopColor="#0B1D33" />
            <stop offset="100%" stopColor="#050C16" />
          </radialGradient>

          {/* Text Path for "PANCHATANTRA ETHICS SCHOOL" */}
          <path
            id="textPathTop"
            d="M 60, 200 A 140,140 0 0,1 340,200"
            fill="transparent"
          />

          {/* Text Path for Tagline */}
          <path
            id="textPathBottom"
            d="M 340, 200 A 140,140 0 0,1 60,200"
            fill="transparent"
          />
        </defs>

        {/* Outer Gold Ring */}
        <circle cx="200" cy="200" r="190" stroke="url(#goldGradient)" strokeWidth="6" fill="#050C16" />

        {/* Inner Radial Navy Blue Disc */}
        <circle cx="200" cy="200" r="180" fill="url(#navyRadial)" stroke="url(#goldGradient)" strokeWidth="2" />

        {/* Ring separators */}
        <circle cx="200" cy="200" r="148" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="4 2" fill="transparent" />
        <circle cx="200" cy="200" r="142" stroke="url(#goldGradient)" strokeWidth="3" fill="transparent" />

        {/* Outer Laurels (Gold Leaves Left and Right) */}
        {/* Left Laurel */}
        <g stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" opacity="0.85">
          <path d="M 40,200 C 35,160 45,120 70,90" />
          {/* Leaves */}
          <path d="M 40,200 Q 30,195 40,190 Q 45,195 40,200 Z" fill="url(#goldGradient)" />
          <path d="M 36,180 Q 24,175 36,170 Q 42,175 36,180 Z" fill="url(#goldGradient)" />
          <path d="M 35,160 Q 23,153 35,148 Q 41,154 35,160 Z" fill="url(#goldGradient)" />
          <path d="M 37,140 Q 26,131 38,126 Q 44,133 37,140 Z" fill="url(#goldGradient)" />
          <path d="M 43,120 Q 33,109 45,105 Q 50,113 43,120 Z" fill="url(#goldGradient)" />
          <path d="M 52,102 Q 43,90 55,87 Q 60,96 52,102 Z" fill="url(#goldGradient)" />
          <path d="M 64,88 Q 57,75 68,73 Q 73,81 64,88 Z" fill="url(#goldGradient)" />
        </g>
        {/* Right Laurel */}
        <g stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" opacity="0.85">
          <path d="M 360,200 C 365,160 355,120 330,90" />
          {/* Leaves */}
          <path d="M 360,200 Q 370,195 360,190 Q 355,195 360,200 Z" fill="url(#goldGradient)" />
          <path d="M 364,180 Q 376,175 364,170 Q 358,175 364,180 Z" fill="url(#goldGradient)" />
          <path d="M 365,160 Q 377,153 365,148 Q 359,154 365,160 Z" fill="url(#goldGradient)" />
          <path d="M 363,140 Q 374,131 362,126 Q 356,133 363,140 Z" fill="url(#goldGradient)" />
          <path d="M 357,120 Q 367,109 355,105 Q 350,113 357,120 Z" fill="url(#goldGradient)" />
          <path d="M 348,102 Q 357,90 345,87 Q 340,96 348,102 Z" fill="url(#goldGradient)" />
          <path d="M 336,88 Q 343,75 332,73 Q 327,81 336,88 Z" fill="url(#goldGradient)" />
        </g>

        {/* Stars at Side of Ring */}
        <g fill="url(#goldGradient)">
          {/* Left Stars */}
          <path d="M 52,200 L 55,193 L 62,193 L 57,189 L 59,182 L 52,187 L 45,182 L 47,189 L 42,193 L 49,193 Z" />
          {/* Right Stars */}
          <path d="M 348,200 L 351,193 L 358,193 L 353,189 L 355,182 L 348,187 L 341,182 L 343,189 L 338,193 L 345,193 Z" />
        </g>

        {/* Circular Text: PANCHATANTRA ETHICS SCHOOL */}
        <text fontFamily="'Cinzel', 'Georgia', serif" fontSize="21.5" fontWeight="bold" fill="url(#goldGradient)">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            PANCHATANTRA ETHICS SCHOOL
          </textPath>
        </text>

        {/* Circular Text: MORAL LEARNING FOR A CHANGING WORLD */}
        <text fontFamily="'Inter', sans-serif" fontSize="13" letterSpacing="2" fontWeight="600" fill="url(#goldGradient)">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            MORAL LEARNING FOR A CHANGING WORLD
          </textPath>
        </text>

        {/* ================= INNER CORE CREST DESIGN ================= */}
        {/* Established text under tree */}
        <text x="200" y="322" fontFamily="'Cinzel', serif" fontSize="11" letterSpacing="1" fontWeight="bold" fill="url(#goldGradient)" textAnchor="middle">
          EST. 2026
        </text>

        {/* The Majestic Banyan Tree (Main Ethical Element) */}
        <g id="banyan-tree">
          {/* Tree Trunk & Roots */}
          <path
            d="M 185,280 C 185,280 190,260 190,230 C 190,210 185,200 178,190 L 222,190 C 215,200 210,210 210,230 C 210,260 215,280 215,280 Z"
            fill="url(#goldGradient)"
          />
          {/* Hanging Roots from Major Branches */}
          <path d="M 160,185 L 160,250 M 240,185 L 240,250 M 135,175 L 135,220 M 265,175 L 265,220" stroke="url(#goldGradient)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
          
          {/* Principal Branches */}
          <path d="M 183,195 C 160,185 140,180 120,185 C 120,185 130,175 145,173" stroke="url(#goldGradient)" strokeWidth="5" strokeLinecap="round" />
          <path d="M 217,195 C 240,185 260,180 280,185 C 280,185 270,175 255,173" stroke="url(#goldGradient)" strokeWidth="5" strokeLinecap="round" />
          <path d="M 195,190 C 185,170 175,150 160,140" stroke="url(#goldGradient)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 205,190 C 215,170 225,150 240,140" stroke="url(#goldGradient)" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 200,190 L 200,120" stroke="url(#goldGradient)" strokeWidth="4" strokeLinecap="round" />

          {/* Golden Banyan Tree Canopy Foliage - Structured with Interlocking Open Books */}
          {/* Central leaves */}
          <path d="M 185,115 C 185,100 215,100 215,115 C 215,130 185,130 185,115 Z" fill="url(#goldGradient)" opacity="0.9" />
          <path d="M 160,135 C 160,120 180,120 180,135 C 180,150 160,150 160,135 Z" fill="url(#goldGradient)" opacity="0.9" />
          <path d="M 220,135 C 220,120 240,120 240,135 C 240,150 220,150 220,135 Z" fill="url(#goldGradient)" opacity="0.9" />
          
          {/* Left Wing Canopy */}
          <path d="M 130,165 C 130,145 160,145 160,165 C 160,185 130,185 130,165 Z" fill="url(#goldGradient)" opacity="0.9" />
          <path d="M 105,175 C 105,155 130,155 130,175 C 130,195 105,195 105,175 Z" fill="url(#goldGradient)" opacity="0.9" />
          
          {/* Right Wing Canopy */}
          <path d="M 240,165 C 240,145 270,145 270,165 C 270,185 240,185 240,165 Z" fill="url(#goldGradient)" opacity="0.9" />
          <path d="M 270,175 C 270,155 295,155 295,175 C 295,195 270,195 270,175 Z" fill="url(#goldGradient)" opacity="0.9" />

          {/* Little Golden Book Leaves hanging in the tree canopy */}
          {/* Book leaf central */}
          <g transform="translate(190, 88) scale(0.6)" stroke="url(#goldGradient)" strokeWidth="2.5" fill="#050C16">
            <path d="M 0,15 C 5,5 15,5 15,15 L 15,35 C 15,25 5,25 0,15 M 0,15 C -5,5 -15,5 -15,15 L -15,35 C -15,25 -5,25 0,15" />
          </g>
          {/* Book leaf left-top */}
          <g transform="translate(160, 105) scale(0.5) rotate(-20)" stroke="url(#goldGradient)" strokeWidth="2.5" fill="#050C16">
            <path d="M 0,15 C 5,5 15,5 15,15 L 15,35 C 15,25 5,25 0,15 M 0,15 C -5,5 -15,5 -15,15 L -15,35 C -15,25 -5,25 0,15" />
          </g>
          {/* Book leaf right-top */}
          <g transform="translate(240, 105) scale(0.5) rotate(20)" stroke="url(#goldGradient)" strokeWidth="2.5" fill="#050C16">
            <path d="M 0,15 C 5,5 15,5 15,15 L 15,35 C 15,25 5,25 0,15 M 0,15 C -5,5 -15,5 -15,15 L -15,35 C -15,25 -5,25 0,15" />
          </g>
          {/* Book leaf left-low */}
          <g transform="translate(125, 140) scale(0.5) rotate(-35)" stroke="url(#goldGradient)" strokeWidth="2.5" fill="#050C16">
            <path d="M 0,15 C 5,5 15,5 15,15 L 15,35 C 15,25 5,25 0,15 M 0,15 C -5,5 -15,5 -15,15 L -15,35 C -15,25 -5,25 0,15" />
          </g>
          {/* Book leaf right-low */}
          <g transform="translate(275, 140) scale(0.5) rotate(35)" stroke="url(#goldGradient)" strokeWidth="2.5" fill="#050C16">
            <path d="M 0,15 C 5,5 15,5 15,15 L 15,35 C 15,25 5,25 0,15 M 0,15 C -5,5 -15,5 -15,15 L -15,35 C -15,25 -5,25 0,15" />
          </g>
        </g>

        {/* Golden Scale of Justice (Ethics and Morality) in Main Trunk Center */}
        <g id="scales-of-justice" transform="translate(187, 192) scale(0.7)">
          {/* Pillar */}
          <line x1="18" y1="10" x2="18" y2="60" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />
          <line x1="8" y1="60" x2="28" y2="60" stroke="url(#goldGradient)" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="18" cy="8" r="4.5" fill="url(#goldGradient)" />
          {/* Beam (balanced horizontally for absolute integrity/justice) */}
          <line x1="-12" y1="20" x2="48" y2="20" stroke="url(#goldGradient)" strokeWidth="3" strokeLinecap="round" />
          {/* Left Pan */}
          <line x1="-12" y1="20" x2="-22" y2="45" stroke="url(#goldGradient)" strokeWidth="1.2" />
          <line x1="-12" y1="20" x2="-2" y2="45" stroke="url(#goldGradient)" strokeWidth="1.2" />
          <path d="M -24,45 C -24,51 0,51 0,45 Z" fill="url(#goldGradient)" />
          {/* Right Pan */}
          <line x1="48" y1="20" x2="38" y2="45" stroke="url(#goldGradient)" strokeWidth="1.2" />
          <line x1="48" y1="20" x2="58" y2="45" stroke="url(#goldGradient)" strokeWidth="1.2" />
          <path d="M 36,45 C 36,51 60,51 60,45 Z" fill="url(#goldGradient)" />
        </g>

        {/* Sacred Open Book with Ethical Flames at the Base of the Tree Roots */}
        <g id="knowledge-book-candle" transform="translate(160, 260) scale(0.9)">
          {/* Pages of Open Book */}
          <path
            d="M 44,22 C 34,13 12,13 0,21 L 0,45 C 12,37 34,37 44,45 M 44,22 C 54,13 76,13 88,21 L 88,45 C 76,37 54,37 44,45"
            fill="#050C16"
            stroke="url(#goldGradient)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Flute/Middle bind */}
          <line x1="44" y1="22" x2="44" y2="45" stroke="url(#goldGradient)" strokeWidth="2.5" />
          {/* Ethical Flame of Enlightenment rising from the center of book */}
          <path
            d="M 44,18 C 45.5,12 48.5,8 44,0 C 39.5,8 42.5,12 44,18 Z"
            fill="url(#goldGradient)"
            stroke="url(#goldGradient)"
            strokeWidth="0.8"
          />
        </g>

        {/* Symbolic Sacred Animals (Panchatantra Ethics Tales representation) */}
        {/* Left Side: Lion & Rabbit */}
        <g id="animals-left" transform="translate(100, 222) scale(0.85)">
          {/* Majestic Royal Lion */}
          <g transform="translate(0, 5)">
            {/* Body */}
            <path d="M 12,42 C 16,36 30,36 34,42 C 34,45 32,50 34,55 L 12,55 C 11,50 11,45 12,42 Z" fill="url(#goldGradient)" opacity="0.95" />
            {/* Mane & Head */}
            <circle cx="16" cy="27" r="13" fill="url(#goldGradient)" />
            <circle cx="16" cy="27" r="9" fill="#050C16" />
            <circle cx="16" cy="27" r="7" fill="url(#goldGradient)" />
            {/* Tail */}
            <path d="M 32,44 C 36,44 38,30 42,32" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="42" cy="32" r="2" fill="url(#goldGradient)" />
          </g>

          {/* Cute clever rabbit sitting next to the lion */}
          <g transform="translate(43, 33) scale(0.65)">
            {/* Body */}
            <ellipse cx="12" cy="22" rx="10.5" ry="7.5" fill="url(#goldGradient)" />
            {/* Head */}
            <circle cx="21" cy="14" r="5.5" fill="url(#goldGradient)" />
            {/* Ears */}
            <path d="M 19,9 C 18,3 21,3 21,9 Z" fill="url(#goldGradient)" />
            <path d="M 22,9 C 22,3 25,3 24,9 Z" fill="url(#goldGradient)" />
            {/* Tail */}
            <circle cx="3" cy="20" r="2.5" fill="url(#goldGradient)" />
          </g>
        </g>

        {/* Right Side: Wise Asian Elephant & Playful Monkey */}
        <g id="animals-right" transform="translate(230, 222) scale(0.85)">
          {/* Majestic Elephant */}
          <g transform="translate(30, 0)">
            {/* Elephant Body */}
            <path d="M 10,40 Q 15,22 35,22 Q 55,22 60,35 Q 63,42 61,59 L 14,59 Q 15,48 10,40 Z" fill="url(#goldGradient)" opacity="0.95" stroke="#050C16" strokeWidth="0.5" />
            {/* Ears */}
            <path d="M 23,25 C 10,25 10,43 23,43 Z" fill="url(#goldGradient)" stroke="#050C16" strokeWidth="0.5" />
            {/* Trunk */}
            <path d="M 6,36 Q -5,36 -2,46 Q 0,51 6,48 Q 1,44 6,36" fill="url(#goldGradient)" />
            {/* Tusk */}
            <path d="M 12,41 Q 4,44 9,47 L 11,43 Z" fill="#FFF" />
          </g>

          {/* Wise monkey sitting next to tree/elephant */}
          <g transform="translate(10, 31) scale(0.68)">
            {/* Body */}
            <ellipse cx="15" cy="24" rx="9" ry="11" fill="url(#goldGradient)" />
            {/* Head */}
            <circle cx="15" cy="11" r="6.5" fill="url(#goldGradient)" />
            {/* Ears */}
            <circle cx="8" cy="11" r="2" fill="url(#goldGradient)" />
            <circle cx="22" cy="11" r="2" fill="url(#goldGradient)" />
            {/* Tail */}
            <path d="M 10,32 Q -2,32 5,18" fill="none" stroke="url(#goldGradient)" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        </g>

        {/* Small bird resting on left laurel of banyan tree */}
        <g transform="translate(108, 194) scale(0.55)" fill="url(#goldGradient)">
          <path d="M 15,10 C 22,5 25,12 30,12 C 32,8 35,8 37,11 C 37,13 32,18 25,18 C 18,18 10,14 15,10 Z" />
          <path d="M 15,10 Q 10,8 12,4 Z" />
          <line x1="20" y1="17" x2="18" y2="22" stroke="url(#goldGradient)" strokeWidth="1.5" />
          <line x1="24" y1="17" x2="24" y2="22" stroke="url(#goldGradient)" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Elegant Side Brand Styling */}
      {showText && (
        <div className="flex flex-col select-none" id="school-brand-titles">
          <span className="font-serif font-bold tracking-tight text-white leading-tight uppercase text-base sm:text-lg lg:text-xl text-shadow">
            Panchatantra
          </span>
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-semibold text-amber-400 tracking-wider text-xs sm:text-sm">
              ETHICS SCHOOL
            </span>
            <span className="h-2 w-px bg-slate-600 hidden sm:inline" />
            <span className="text-[10px] font-medium tracking-wide text-emerald-400 font-sans uppercase hidden sm:inline">
              CBSE Program
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
