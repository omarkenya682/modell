import React, { useState, useEffect } from 'react';

interface LogoProps {
  url?: string;
  className?: string;
  darkBackground?: boolean;
}

const Logo: React.FC<LogoProps> = ({ url, className = "", darkBackground = false }) => {
  const [error, setError] = useState(false);

  // Reset error if url changes
  useEffect(() => {
    setError(false);
  }, [url]);

  if (url && !error && url !== '/logo.png') {
    return (
      <img
        src={url}
        alt="Model Land Investment"
        className={`object-contain ${className}`}
        onError={() => setError(true)}
      />
    );
  }

  // Fallback Professional Text Logo
  return (
    <div className={`flex flex-col justify-center select-none ${className}`}>
      <h1 className={`text-4xl md:text-6xl font-black tracking-tight leading-none ${darkBackground ? 'text-white' : 'text-green-800'}`}>
        MODEL LAND
      </h1>
      <div className="flex items-center gap-2 mt-1">
         <div className="h-0.5 w-full bg-[#FF2C2C]"></div>
         <span className={`font-bold text-xs md:text-sm tracking-[0.3em] uppercase whitespace-nowrap ${darkBackground ? 'text-gray-300' : 'text-[#FF2C2C]'}`}>
           INVESTMENT
         </span>
         <div className="h-0.5 w-full bg-[#FF2C2C]"></div>
      </div>
    </div>
  );
};

export default Logo;