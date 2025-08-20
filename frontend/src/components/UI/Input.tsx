import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {label}
        </label>
      )}
      <input
        className={`outline-none
          block w-full rounded-md border-gray-300 shadow-sm
          dark:bg-gray-800 dark:border-gray-600 dark:text-white 
          dark:placeholder-gray-400
          focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2
          ${error ? 'border-red-300 dark:border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};