"use client";

import { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const TextField = ({
  label,
  id,
  value,
  onChange,
  error,
  className = "",
  ...props
}: TextFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full p-2 border border-gray-300 rounded ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
