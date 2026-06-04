import React from "react";
import { ClipLoader } from "react-spinners"; 

const LoadingOverlay = ({ children, fullPage = false }) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center py-10 px-4 transition-all animate-fade-in ${
        fullPage 
          ? "fixed inset-0 bg-white/80 z-50 min-h-screen" 
          : "min-h-[40vh] w-full"
      }`}
    >
    
      <ClipLoader color="var(--secondary-color, #1e293b)" size={50} speedMultiplier={0.8} />
      
      {children && (
        <p className="mt-4 text-gray-500 text-sm font-medium animate-pulse text-center max-w-xs leading-relaxed">
          {children}
        </p>
      )}
    </div>
  );
};

export default LoadingOverlay;