"use client";

import React, { useState } from "react";
import {
  FileText,
  Calendar,
  User,
  CreditCard,
  Check,
  X,
  Loader2,
} from "lucide-react";
import type { LocalDrivingLicenseApplication } from "@/types";
import { ApplicationStatus } from "@/types";
import { api } from "@/lib/api";
import { toast } from "sonner";
import StatusBadge from "./Badges/StatusBadge";
import { formatDate } from "@/lib/utils";

interface ApplicationsTableProps {
  applications: LocalDrivingLicenseApplication[];
  onStatusChange?: () => void;
}

export const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  onStatusChange,
}) => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const handleChangeStatus = async (
    applicationId: string,
    newStatus: ApplicationStatus
  ) => {
    setLoadingStates((prev) => ({ ...prev, [applicationId]: true }));

    try {
      const response = await api.localDrivingLicencesApps.changeStatus({
        id: applicationId,
        status: newStatus,
      });

      const { message, success } = await response.json();

      if (success) {
        toast.success(message || "تم تحديث حالة الطلب بنجاح");
        onStatusChange?.();
      } else {
        toast.error(message || "فشل تحديث حالة الطلب");
      }
    } catch (error) {
      console.error("Error changing status:", error);
      toast.error("حدث خطأ أثناء تحديث حالة الطلب");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [applicationId]: false }));
    }
  };

  const canApprove = (status: ApplicationStatus) =>
    status === ApplicationStatus.New;
  const canReject = (status: ApplicationStatus) =>
    status === ApplicationStatus.New || status === ApplicationStatus.Approved;

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
                نوع الرخصة
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                المدينة / البلد
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                تاريخ الإنشاء
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
            {applications.map((app, index) => {
              const isLoading =
                loadingStates[app.localDrivingLicenseApplicationId];
              console.log(app);

              return (
                <tr
                  key={app.localDrivingLicenseApplicationId || `app-${index}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {app.localDrivingLicenseApplicationId
                          ?.slice(0, 8)
                          .toUpperCase() || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {app.fullName || "غير متوفر"}
                        </div>
                        {app.nationalNum && (
                          <div className="text-xs text-gray-500">
                            {app.nationalNum}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {app.className || "غير متوفر"}
                    </div>
                    <div className="text-xs text-gray-500">
                      العمر: {app.age} سنة
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {app.city || "غير متوفر"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {app.country || "غير متوفر"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {app.createdDate
                          ? formatDate(new Date(app.createdDate))
                          : "غير متوفر"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={app.currentState} />
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
                    <div className="flex items-center gap-2">
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 text-brand-500 animate-spin" />
                      ) : (
                        <>
                          {canApprove(app.currentState) && (
                            <button
                              onClick={() =>
                                handleChangeStatus(
                                  app.localDrivingLicenseApplicationId,
                                  ApplicationStatus.Approved
                                )
                              }
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-success-600 hover:text-success-700 hover:bg-success-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="قبول"
                            >
                              <Check className="w-4 h-4" />
                              قبول
                            </button>
                          )}
                          {canReject(app.currentState) && (
                            <button
                              onClick={() =>
                                handleChangeStatus(
                                  app.localDrivingLicenseApplicationId,
                                  ApplicationStatus.Rejected
                                )
                              }
                              disabled={isLoading}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-error-600 hover:text-error-700 hover:bg-error-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="رفض"
                            >
                              <X className="w-4 h-4" />
                              رفض
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
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
