"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  CreditCard,
  Filter,
  ArrowLeft,
  Trash2,
} from "lucide-react";
const ApplicationRow = ({ application }: { application: any }) => {
  const [menu, setMenu] = useState<{
    x: number;
    y: number;
    visible: boolean;
  }>({ x: 0, y: 0, visible: false });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    setMenu({
      x: e.clientX,
      y: e.clientY,
      visible: true,
    });
  };

  const closeMenu = () => {
    setMenu({ ...menu, visible: false });
  };
  type ApplicationStatus =
  | "submitted"
  | "under_review"
  | "accepted"
  | "rejected"
  | "pending_payment";

const getStatusConfig = (status: ApplicationStatus | string) => {
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

  // لو الـ status غير معروف، نرجع default config
  return configs[status] ?? {
    label: "غير معروف",
    icon: FileText,
    bgColor: "bg-gray-50",
    textColor: "text-gray-400",
    iconColor: "text-gray-400",
    borderColor: "border-gray-200",
  };
};

const StatusBadge = ({ status }: { status: ApplicationStatus | string }) => {
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

  return (
    <>
      <tr
        onContextMenu={handleContextMenu}
        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <td className="px-4 py-4 text-sm font-medium">{application.id}</td>
        <td className="px-4 py-4 text-sm">{application.licenseClass}</td>
        <td className="px-4 py-4 text-sm text-gray-600">
          {new Date(application.applicationDate).toLocaleDateString("ar-EG")}
        </td>
        <td className="px-4 py-4 text-sm font-medium">
          {application.paidFees} ج.م
        </td>
        <td className="px-4 py-4">
          <StatusBadge status={application.status} />
        </td>
        <td className="px-4 py-4 text-sm text-gray-600">
          {new Date(application.lastUpdated).toLocaleDateString("ar-EG")}
        </td>
        <td className="px-4 py-4">
          <button className="text-brand-600 hover:text-brand-700">
            عرض
          </button>
        </td>
      </tr>

      {/* Context Menu */}
      {menu.visible && (
        <>
          {/* Overlay */}
          <div
            onClick={closeMenu}
            className="fixed inset-0 z-40"
          />

          <div
            className="fixed z-50 w-44 bg-white border border-gray-200 rounded-lg shadow-lg text-sm"
            style={{ top: menu.y, left: menu.x }}
          >
            <button
              onClick={() => {
                closeMenu();
                console.log("عرض", application.id);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <Eye className="w-4 h-4" />
              عرض الطلب
            </button>

            <button
              onClick={() => {
                closeMenu();
                console.log("دفع", application.id);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
            >
              <CreditCard className="w-4 h-4" />
              دفع الرسوم
            </button>

            <button
              onClick={() => {
                closeMenu();
                console.log("حذف", application.id);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
              حذف
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default ApplicationRow;
