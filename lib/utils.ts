import { ApplicationStatus } from "@/types";
import { StatusConfig } from "@/types/license";
import { clsx, type ClassValue } from "clsx";
import {
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  XCircle,
} from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
export function formatToISODate(date: Date | string | null): string | null {
  if (!date) return null;
  const d = new Date(date);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

export function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

export async function parseJSON(response: Response) {
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const getStatusConfig = (status: ApplicationStatus): StatusConfig => {
  const configs: Record<ApplicationStatus, StatusConfig> = {
    [ApplicationStatus.New]: {
      label: "جديد",
      icon: FileText,
      bgColor: "bg-blue-light-50",
      textColor: "text-blue-light-700",
      iconColor: "text-blue-light-600",
      borderColor: "border-blue-light-200",
    },
    [ApplicationStatus.Approved]: {
      label: "موافق عليه",
      icon: CheckCircle,
      bgColor: "bg-success-50",
      textColor: "text-success-700",
      iconColor: "text-success-600",
      borderColor: "border-success-200",
    },
    [ApplicationStatus.Rejected]: {
      label: "مرفوض",
      icon: XCircle,
      bgColor: "bg-error-50",
      textColor: "text-error-700",
      iconColor: "text-error-600",
      borderColor: "border-error-200",
    },
    [ApplicationStatus.Paid]: {
      label: "مدفوع",
      icon: CreditCard,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    [ApplicationStatus.WaitingTest]: {
      label: " انتظار",
      icon: Clock,
      bgColor: "bg-warning-50",
      textColor: "text-warning-700",
      iconColor: "text-warning-600",
      borderColor: "border-warning-200",
    },
    [ApplicationStatus.FailTest]: {
      label: "راسب",
      icon: XCircle,
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      iconColor: "text-red-600",
      borderColor: "border-red-200",
    },
    [ApplicationStatus.PassTest]: {
      label: "ناجح",
      icon: CheckCircle,
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    [ApplicationStatus.Completed]: {
      label: "مكتمل",
      icon: CheckCircle,
      bgColor: "bg-brand-50",
      textColor: "text-brand-700",
      iconColor: "text-brand-600",
      borderColor: "border-brand-200",
    },
  };

  return (
    configs[status] || {
      label: "غير معروف",
      icon: FileText,
      bgColor: "bg-gray-50",
      textColor: "text-gray-700",
      iconColor: "text-gray-600",
      borderColor: "border-gray-200",
    }
  );
};
