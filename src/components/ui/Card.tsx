import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = '', gradient = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl shadow-lg p-6 backdrop-blur-sm
        ${gradient ? 'bg-gradient-to-br animate-gradient bg-[length:200%_200%]' : 'bg-white/90'} 
        ${onClick ? 'cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
}