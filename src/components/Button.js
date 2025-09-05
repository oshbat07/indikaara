import React from 'react';

/**
 * Button Component - Reusable button with multiple variants
 * @param {string} variant - Button style variant: 'primary', 'secondary', 'outline'
 * @param {string} size - Button size: 'sm', 'md', 'lg'
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 * @param {function} onClick - Click handler
 * @param {string} type - Button type: 'button', 'submit', 'reset'
 * @param {boolean} disabled - Whether button is disabled
 * @param {object} ...props - Additional props
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) => {
  // Base button styles
  const baseStyles = 'inline-flex items-center justify-center font-bold tracking-wide transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantStyles = {
    primary: 'bg-[var(--primary-color)] text-white hover:bg-[var(--secondary-color)] focus:ring-[var(--primary-color)]',
    secondary: 'bg-[var(--secondary-color)] text-white hover:bg-[var(--primary-color)] focus:ring-[var(--secondary-color)]',
    outline: 'bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white focus:ring-[var(--primary-color)]'
  };

  // Size styles
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-[var(--border-radius-lg)]',
    md: 'px-6 py-3 text-base rounded-[var(--border-radius-full)]',
    lg: 'px-8 py-4 text-lg rounded-[var(--border-radius-full)]'
  };

  // Combine all styles
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
