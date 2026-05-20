import type { ReactNode } from "react";

interface CardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export const Card = ({ title, subtitle, icon }: CardProps) => {
  return (
    <div className="p-4 border border-gray-200">
      <div className="flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};
