"use client";

import { type LucideIcon } from "lucide-react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  trailing?: React.ReactNode;
  error?: string;
  rightLabel?: React.ReactNode;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  icon: Icon,
  trailing,
  error,
  rightLabel,
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="text-[12px] font-semibold text-[#0A2328]">
          {label}
        </label>
        {rightLabel}
      </div>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          className={`w-full h-11 rounded-lg border px-3 text-sm text-[#0A2328] placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#1E6B52] focus:border-transparent ${
            error ? "border-red-500" : "border-[#D1D5DB]"
          } ${Icon ? "pr-10" : ""} ${trailing ? "pr-10" : ""}`}
        />
        {Icon && (
          <Icon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        )}
        {trailing && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {trailing}
          </div>
        )}
      </div>
      {error && (
        <p className="text-[11px] text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}
