import React from 'react';

export const Logo = ({ className = "h-10 w-10" }: { className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
      {/* Subtle outer glow / bounding circle */}
      <circle cx="16" cy="16" r="16" fill="url(#glow_grad)" fillOpacity="0.1" />
      
      {/* Main Document Body */}
      <path 
        d="M11 6C9.89543 6 9 6.89543 9 8V24C9 25.1046 9.89543 26 11 26H21C22.1046 26 23 25.1046 23 24V11.5L17.5 6H11Z" 
        fill="url(#doc_grad)" 
      />
      
      {/* Folded Corner */}
      <path 
        d="M17.5 6V11.5H23" 
        fill="#FFFFFF" 
        fillOpacity="0.25"
      />

      {/* AI Network Node & Connection */}
      <circle cx="13" cy="20" r="1.5" fill="white" />
      <path d="M14 19L16 17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Growth Arrow Base Node */}
      <circle cx="17" cy="16.5" r="1.5" fill="white" />
      
      {/* Upward Growth Arrow breaking through */}
      <path 
        d="M17 16.5V11M17 11L14.5 13.5M17 11L19.5 13.5" 
        stroke="white" 
        strokeWidth="1.75" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />

      <defs>
        <linearGradient id="glow_grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="doc_grad" x1="9" y1="6" x2="23" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C3AED" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

export const LogoWordmark = ({ className = "" }: { className?: string }) => (
  <div className={`flex flex-col justify-center ${className}`}>
    <span className="font-sans font-extrabold text-[1.1rem] tracking-tight text-slate-900 dark:text-white leading-none">
      Resume<span className="text-violet-600">Forge</span> <span className="font-medium text-slate-500 dark:text-slate-400">AI</span>
    </span>
    <span className="text-[0.6rem] font-bold text-blue-500 tracking-[0.15em] uppercase mt-[2px]">
      ATS Resume Intelligence
    </span>
  </div>
);
