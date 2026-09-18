import React from 'react';

const DailyMitraLogo = ({ className = 'h-10', showText = true, variant = 'full' }) => {
  return (
    <div className={`flex items-center gap-2.5 font-sans select-none ${className}`}>
      {/* Exact Shopping Cart & Grocery Logo Image */}
      <img
        src="/logo.png"
        alt="DailyMitra Logo"
        className="h-full w-auto object-contain hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default DailyMitraLogo;
