import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = '#25d366' 
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeMap[size]} border-4 border-gray-200 rounded-full animate-spin`}
        style={{ borderTopColor: color }}
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
};

export default LoadingSpinner;