import React from "react";

type TextFieldProps = {
  label?: string;
  error?: string;
  helperText?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextField({
  label,
  error,
  helperText,
  id,
  className,
  ...rest
}: TextFieldProps) {
  const inputId = id ?? rest.name;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={[
          "rounded-md border px-3 py-2 text-sm outline-none transition",
          "focus:ring-1 focus:ring-blue-600",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      />

      {error ? (
        <p className="text-xs text-red-600">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
}
