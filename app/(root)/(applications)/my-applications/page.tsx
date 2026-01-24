"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  CreditCard,
  Filter,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { LocalDrivingLicenseApplication } from "@/types";


type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "accepted"
  | "rejected"
  | "pending_payment";

const getStatusConfig = (status: ApplicationStatus) => {
  const configs = {
    submitted: {
      label: "مقدم",
      icon: FileText,
      bgColor: "bg-blue-light-50",
      textColor: "text-blue-light-700",
      iconColor: "text-blue-light-600",
      borderColor: "border-blue-light-200",
    },
    under_review: {
      label: "قيد المراجعة",
      icon: Clock,
      bgColor: "bg-warning-50",
      textColor: "text-warning-700",
      iconColor: "text-warning-600",
      borderColor: "border-warning-200",
    },
    accepted: {
      label: "مقبول",
      icon: CheckCircle,
      bgColor: "bg-success-50",
      textColor: "text-success-700",
      iconColor: "text-success-600",
      borderColor: "border-success-200",
    },
    rejected: {
      label: "مرفوض",
      icon: XCircle,
      bgColor: "bg-error-50",
      textColor: "text-error-700",
      iconColor: "text-error-600",
      borderColor: "border-error-200",
    },
    pending_payment: {
      label: "بانتظار الدفع",
      icon: CreditCard,
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
  };

  return configs[status];
};

const StatusBadge = ({ status }: { status: ApplicationStatus }) => {
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

const ApplicationRow = ({ application }: { application: any }) => {
  return (
    <tr className="border-b border-gray-200 hover:odd:bg-gray-50 hover:even:bg-white transition-colors even:bg-gray-50">
      <td className="px-4 py-4 text-sm text-gray-900 font-medium">
        {application.id}
      </td>
      <td className="px-4 py-4 text-sm text-gray-900">
        {application.licenseClass}
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">
        {new Date(application.applicationDate).toLocaleDateString("ar-EG")}
      </td>
      <td className="px-4 py-4 text-sm text-gray-900 font-medium">
        {application.paidFees} ج.م
      </td>
      <td className="px-4 py-4">
        <StatusBadge status={application.status} />
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">
        {new Date(application.lastUpdated).toLocaleDateString("ar-EG")}
      </td>
      <td className="px-4 py-4">
        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors">
          <Eye className="w-4 h-4" />
          عرض
        </button>
      </td>
    </tr>
  );
};

export default function MyApplicationsPage() {

  
const [applications, setApplications] = useState<LocalDrivingLicenseApplication []>([]);
const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchApplications = async () => {
    try {
      // استدعاء الدالة (مهم)
      const response = await api.localDrivingLicencesApps.getAppViewByPersonID(); // الدالة مش محتاجة parameter، بس TypeScript شايف id: any
      // response هو ApiResponse<LocalDrivingLicenseApplication[]>
     const result = await response.json();
     console.log("Fetched applications:", result); // تحقق من البيانات في الكونسول

      if (result.success) {
        setApplications(result.data); // نحط البيانات في الـ state
      } else {
        console.error("API returned an error:", result.error);
      }
    } catch (error) {
      console.error("Failed to load applications", error);
    } finally {
      setLoading(false);
    }
  };

  fetchApplications();
}, []);
  /*
  
  const [filterStatus, setFilterStatus] = useState<any>("all");

  const filteredApplications =
    filterStatus === "all"
      ? applications
      : applications.filter((app) => app.currentState === filterStatus);

  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.currentState === "submitted").length,
    under_review: applications.filter((a) => a.status === "under_review")
      .length,
    accepted: mpplications.filter((a) => a.status === "accepted").length,
    rejected: mockApplications.filter((a) => a.status === "rejected").length,
  };
  */

  return (
    <section className="pb-12  md:pb-16 lg:pb-24 ">
      <div className="container mx-auto px-4 sm:px-6" dir="rtl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href={ROUTES.HOME} className="hover:text-brand-600">
              الرئيسية
            </Link>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-gray-900 font-medium">طلباتي</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            طلباتي
          </h1>
          <p className="text-gray-600 text-lg">
            تتبع حالة طلبات رخصة القيادة الخاصة بك
          </p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-brand-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">مقدم</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-light-700">
                  {stats.submitted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-light-50 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-blue-light-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">قيد المراجعة</p>
                <p className="text-2xl sm:text-3xl font-bold text-warning-700">
                  {stats.under_review}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning-50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">مقبول</p>
                <p className="text-2xl sm:text-3xl font-bold text-success-700">
                  {stats.accepted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success-50 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">مرفوض</p>
                <p className="text-2xl sm:text-3xl font-bold text-error-700">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-error-50 flex items-center justify-center flex-shrink-0">
                <XCircle className="w-6 h-6 text-error-600" />
              </div>
            </div>
          </div>
        </div> */}

        {/* Filter */}
       { /*
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                تصفية حسب:
              </span>
            </div>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              {[
                { value: "all", label: "الكل" },
                { value: "submitted", label: "مقدم" },
                { value: "under_review", label: "قيد المراجعة" },
                { value: "accepted", label: "مقبول" },
                { value: "rejected", label: "مرفوض" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all shrink-0",
                    filterStatus === filter.value
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        */
}

        {/* Applications Table */}
        {applications.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      رقم الطلب
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      نوع الرخصة
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      تاريخ التقديم
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      الرسوم
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      الحالة
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      آخر تحديث
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <ApplicationRow
                      key={application.localDrivingLicenseApplicationId}
                      application={application}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              لا توجد طلبات
            </h3>
            <p className="text-gray-600 mb-6">
              لم يتم العثور على طلبات تطابق الفلتر المحدد
            </p>
            <Link
              href={ROUTES.NEW}
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium"
            >
              <FileText className="w-5 h-5" />
              تقديم طلب جديد
            </Link>
          </div>
        )}

        {/* Call to Action */}
        {applications.length > 0 && (
          <div className="mt-8 bg-linear-to-r from-brand-50 to-blue-light-50 rounded-xl p-6 sm:p-8 border border-brand-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  هل تريد تقديم طلب جديد؟
                </h3>
                <p className="text-gray-600">
                  قدم طلب للحصول على رخصة قيادة جديدة بسهولة
                </p>
              </div>
              <Link
                href={ROUTES.NEW}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors font-medium shadow-sm shrink-0"
              >
                <FileText className="w-5 h-5" />
                تقديم طلب جديد
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
