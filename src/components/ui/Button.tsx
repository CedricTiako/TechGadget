import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isFullWidth?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  href,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  icon,
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-[#25d366] hover:bg-[#20c056] text-white focus:ring-green-500',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-white focus:ring-gray-500',
    outline: 'border border-[#25d366] text-[#25d366] hover:bg-[#25d366] hover:bg-opacity-10 focus:ring-green-500',
    ghost: 'hover:bg-gray-100 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };
  
  const sizeStyles = {
    sm: 'text-xs py-1 px-2',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-3 px-6',
  };
  
  const widthClass = isFullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  const buttonClass = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClass} ${disabledClass} ${className}`;
  
  if (href) {
    return (
      <Link to={href} className={buttonClass}>
        {icon && <span className="mr-2">{icon}</span>}
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;