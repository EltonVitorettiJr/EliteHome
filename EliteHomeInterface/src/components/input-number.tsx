import { type ChangeEvent, type InputHTMLAttributes, useId } from "react";

interface InputNumberProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  span: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
  className?: string;
}

export const InputNumber = ({
  label,
  onChange,
  span,
  value,
  className,
  ...props
}: InputNumberProps) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-2 w-1/2">
      <label htmlFor={inputId}>{label}</label>
      <div
        className={`rounded-md border border-gray-300 px-4 flex justify-center items-center gap-2 focus-within:border-brand-primary focus-within:ring-1 focus-within:ring-brand-primary bg-base-white transition-all
          ${className}`}
      >
        <span className="text-base-neutral mr-2 select-none">{span}</span>
        <input
          type="text"
          inputMode="numeric"
          onChange={onChange}
          id={inputId}
          className="w-full h-12.5 outline-none"
          value={value}
          {...props}
        />
      </div>
    </div>
  );
};
