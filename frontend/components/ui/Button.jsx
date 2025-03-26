'use client';

export default function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
