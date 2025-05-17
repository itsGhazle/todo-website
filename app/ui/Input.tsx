"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, className = "", ...props }, ref) => {
    return (
      <div className="mb-4">
        <label htmlFor={id} className="block text-gray-700 mb-2">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={`w-full p-2 border rounded-md ${className}`}
          {...props}
        />
        {error && <p className="text-red-500 mt-1">{error.message}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
