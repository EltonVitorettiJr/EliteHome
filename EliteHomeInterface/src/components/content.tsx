import type { ReactNode } from "react";

interface ContentProps {
  children: ReactNode;
  className?: string;
}

export const Content = ({ children, className }: ContentProps) => {
  return (
    <section
      className={`max-w-7xl mx-auto p-4.5 sm:p-6 lg:p-8 ${className || ""}`}
    >
      {children}
    </section>
  );
};
