import React from 'react';

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  ...props 
}) {
  const baseStyle = "inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200";
  
  const variants = {
    primary: "bg-gold hover:bg-gold-hover text-navy-light px-4 py-2",
    secondary: "bg-transparent border border-navy text-navy hover:bg-navy/5 px-4 py-2",
    dark: "bg-navy hover:bg-navy-light text-white px-4 py-2",
    outline: "bg-transparent border border-border-color text-text-dark hover:bg-bg-light px-4 py-2"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
