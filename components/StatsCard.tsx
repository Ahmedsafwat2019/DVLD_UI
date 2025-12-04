import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  colorClass: "brand" | "blue-light" | "success" | "error" | "green" | "warning";
}

const colorConfigs = {
  brand: {
    textColor: "text-brand-700",
    bgColor: "bg-brand-50",
    iconColor: "text-brand-600",
  },
  "blue-light": {
    textColor: "text-blue-light-700",
    bgColor: "bg-blue-light-50",
    iconColor: "text-blue-light-600",
  },
  success: {
    textColor: "text-success-700",
    bgColor: "bg-success-50",
    iconColor: "text-success-600",
  },
  error: {
    textColor: "text-error-700",
    bgColor: "bg-error-50",
    iconColor: "text-error-600",
  },
  green: {
    textColor: "text-green-700",
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  warning: {
    textColor: "text-warning-700",
    bgColor: "bg-warning-50",
    iconColor: "text-warning-600",
  },
};

export const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  icon: Icon,
  colorClass,
}) => {
  const colors = colorConfigs[colorClass];

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-theme-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <p className={`text-2xl font-bold ${colors.textColor}`}>{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-full ${colors.bgColor} flex items-center justify-center`}
        >
          <Icon className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
      </div>
    </div>
  );
};
