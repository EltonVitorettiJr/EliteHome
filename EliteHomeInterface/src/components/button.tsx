import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

const buttonVariants = {
  primary: "bg-brand-primary text-white",
  secondary: "bg-base-white text-base-dark-blue",
  tertiary: "bg-base-dark-blue text-base-white",
};

export const Button = ({
  onClick,
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-medium text-md w-full py-2.5 px-4 rounded-md
        ${buttonVariants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
