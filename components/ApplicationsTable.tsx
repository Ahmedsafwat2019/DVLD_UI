"use client";

import React from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  User,
  CreditCard,
  FileText,
  Trash2,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ApplicationWithDetails } from "@/types";

type ApplicationStatus = 1 | 2 | 3 | 4;

interface StatusConfig {
  label: string;
  icon: typeof FileText;
  bgColor: string;
  textColor: string;
  iconColor: string;
  borderColor: string;
}

const getStatusConfig = (status: number): StatusConfig => {
  const configs: Record<number, StatusConfig> = {
    1: {
      label: "مقدم",
      icon: FileText,
      bgColor: "bg-blue-light-50",
      textColor: "text-blue-light-700",
      iconColor: "text-blue-light-600",
      borderColor: "border-blue-light-200",
    },
    2: {
      label: "قيد المراجعة",
      icon: Clock,
      bgColor: "bg-warning-50",
      textColor: "text-warning-700",
      iconColor: "text-warning-600",
      borderColor: "border-warning-200",
    },
    3: {
      label: "مقبول",
      icon: CheckCircle,
      bgColor: "bg-success-50",
      textColor: "text-success-700",
      iconColor: "text-success-600",
      borderColor: "border-success-200",
    },
    4: {
      label: "مرفوض",
      icon: XCircle,
      bgColor: "bg-error-50",
      textColor: "text-error-700",
      iconColor: "text-error-600",
      borderColor: "border-error-200",
    },
  };

  // Return default config if status is not recognized
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

const StatusBadge = ({ status }: { status: number }) => {
  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
        config.bgColor,
        config.textColor,
        config.borderColor
      )}
    >
      <Icon className={cn("w-4 h-4", config.iconColor)} />
      {config.label}
    </div>
  );
};

interface ApplicationsTableProps {
  applications: ApplicationWithDetails[];
  onViewDetails?: (applicationId: string) => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onViewDetails,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                رقم الطلب
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                المتقدم
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                نوع الطلب
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                تاريخ التقديم
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                الحالة
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                الرسوم المدفوعة
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                الإجراءات
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.map((app, index) => (
              <tr
                key={app.id || `app-${index}`}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {app.id?.slice(0, 8).toUpperCase() || "N/A"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {app.person?.fullName || "غير متوفر"}
                      </div>
                      {app.person?.nationalNo && (
                        <div className="text-xs text-gray-500">
                          {app.person.nationalNo}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {app.applicationType?.applicationTypeTitle || "غير متوفر"}
                  </div>
                  {app.applicationType?.applicationFees !== undefined && (
                    <div className="text-xs text-gray-500">
                      رسوم: {app.applicationType.applicationFees} ج.م
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {app.applicationDate
                        ? new Date(app.applicationDate).toLocaleDateString(
                            "ar-EG",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )
                        : "غير متوفر"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={app.applicationStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {app.paidFees ?? 0} ج.م
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onViewDetails?.(app.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    تعديل
                  </button>
                  <button
                    onClick={() => onViewDetails?.(app.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {applications.length === 0 && (
        <div className="py-12 text-center">
          <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">لا توجد طلبات</p>
        </div>
      )}
    </div>
  );
};
