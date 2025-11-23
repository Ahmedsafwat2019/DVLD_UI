"use client";

import React, { useState } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  User,
  CreditCard,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Static data for demo
const mockApplications = [
  {
    id: "APP-001",
    licenseClass: "رخصة قيادة خاصة - الفئة الأولى",
    applicantName: "أحمد محمد علي",
    applicationDate: "2024-01-15",
    status: "submitted",
    paidFees: 500,
    lastUpdated: "2024-01-16",
  },
  {
    id: "APP-002",
    licenseClass: "رخصة قيادة عامة - الفئة الثانية",
    applicantName: "فاطمة حسن",
    applicationDate: "2024-01-10",
    status: "under_review",
    paidFees: 750,
    lastUpdated: "2024-01-18",
  },
  {
    id: "APP-003",
    licenseClass: "رخصة قيادة دراجة نارية",
    applicantName: "محمد عبدالله",
    applicationDate: "2024-01-05",
    status: "accepted",
    paidFees: 400,
    lastUpdated: "2024-01-20",
  },
  {
    id: "APP-004",
    licenseClass: "رخصة قيادة خاصة - الفئة الأولى",
    applicantName: "سارة أحمد",
    applicationDate: "2023-12-28",
    status: "rejected",
    paidFees: 500,
    lastUpdated: "2024-01-12",
  },
  {
    id: "APP-005",
    licenseClass: "رخصة قيادة شاحنة",
    applicantName: "خالد محمود",
    applicationDate: "2024-01-20",
    status: "pending_payment",
    paidFees: 0,
    lastUpdated: "2024-01-20",
  },
];

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

const ApplicationCard = ({ application }: { application: any }) => {
  const statusConfig = getStatusConfig(application.status);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-theme-lg transition-all duration-200 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {application.licenseClass}
            </h3>
          </div>
          <p className="text-sm text-gray-500">رقم الطلب: {application.id}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">المتقدم:</span>
          <span className="font-medium text-gray-900">
            {application.applicantName}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">تاريخ التقديم:</span>
          <span className="font-medium text-gray-900">
            {new Date(application.applicationDate).toLocaleDateString("ar-EG")}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">الرسوم المدفوعة:</span>
          <span className="font-medium text-gray-900">
            {application.paidFees} ج.م
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">آخر تحديث:</span>
          <span className="font-medium text-gray-900">
            {new Date(application.lastUpdated).toLocaleDateString("ar-EG")}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-gray-100">
        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 hover:bg-brand-50 rounded-lg transition-colors">
          <Eye className="w-4 h-4" />
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

export default function ApplicationsPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredApplications =
    filterStatus === "all"
      ? mockApplications
      : mockApplications.filter((app) => app.status === filterStatus);

  const stats = {
    total: mockApplications.length,
    submitted: mockApplications.filter((a) => a.status === "submitted").length,
    under_review: mockApplications.filter((a) => a.status === "under_review")
      .length,
    accepted: mockApplications.filter((a) => a.status === "accepted").length,
    rejected: mockApplications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-brand-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">مقدم</p>
                <p className="text-2xl font-bold text-blue-light-700">
                  {stats.submitted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-light-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-light-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">قيد المراجعة</p>
                <p className="text-2xl font-bold text-warning-700">
                  {stats.under_review}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-warning-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">مقبول</p>
                <p className="text-2xl font-bold text-success-700">
                  {stats.accepted}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-success-50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-theme-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">مرفوض</p>
                <p className="text-2xl font-bold text-error-700">
                  {stats.rejected}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-error-50 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-error-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              تصفية حسب:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all", label: "الكل" },
                { value: "submitted", label: "مقدم" },
                { value: "under_review", label: "قيد المراجعة" },
                { value: "accepted", label: "مقبول" },
                { value: "rejected", label: "مرفوض" },
                { value: "pending_payment", label: "بانتظار الدفع" },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setFilterStatus(filter.value)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
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

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredApplications.map((application) => (
              <ApplicationCard key={application.id} application={application} />
            ))}
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
          </div>
        )}
      </div>
    </div>
  );
}
