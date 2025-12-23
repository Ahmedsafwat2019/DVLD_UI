"use client";

import { LocalDrivingLicenseApplication, ApplicationStatus } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  FileText,
  Calendar,
  User,
  CreditCard,
  Check,
  X,
  Loader2,
  Trash,
} from "lucide-react";
import StatusBadge from "@/components/Badges/StatusBadge";
import { formatDate } from "@/lib/utils";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

import { MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export const createColumns = (
  onStatusChange?: () => void
): ColumnDef<LocalDrivingLicenseApplication>[] => [
  {
    header: "رقم الطلب",
    accessorKey: "localDrivingLicenseApplicationId",
    cell: ({ row }) => {
      const id = row.original.localDrivingLicenseApplicationId;
      return (
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">
            {id?.slice(0, 8).toUpperCase() || "N/A"}
          </span>
        </div>
      );
    },
  },
  {
    header: "المتقدم",
    accessorKey: "fullName",
    cell: ({ row }) => {
      const { fullName, nationalNum } = row.original;
      return (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <div className="text-sm font-medium text-gray-900">
              {fullName || "غير متوفر"}
            </div>
            {nationalNum && (
              <div className="text-xs text-gray-500">{nationalNum}</div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    header: "نوع الرخصة",
    accessorKey: "className",
    cell: ({ row }) => {
      const { className, age } = row.original;
      return (
        <div>
          <div className="text-sm text-gray-900">
            {className || "غير متوفر"}
          </div>
          <div className="text-xs text-gray-500">العمر: {age} سنة</div>
        </div>
      );
    },
  },
  {
    header: "المدينة / البلد",
    accessorKey: "city",
    cell: ({ row }) => {
      const { city, country } = row.original;
      return (
        <div>
          <div className="text-sm text-gray-900">{city || "غير متوفر"}</div>
          <div className="text-xs text-gray-500">{country || "غير متوفر"}</div>
        </div>
      );
    },
  },
  {
    header: "تاريخ الإنشاء",
    accessorKey: "createdDate",
    cell: ({ row }) => {
      const date = row.original.createdDate;
      return (
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-900">
            {date ? formatDate(new Date(date)) : "غير متوفر"}
          </span>
        </div>
      );
    },
  },
  {
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <span>الحالة</span>
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>تصفية حسب الحالة</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={!column.getFilterValue()}
                onCheckedChange={() => column.setFilterValue(undefined)}
                className="font-semibold"
              >
                الكل
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={column.getFilterValue() === ApplicationStatus.New}
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.New : undefined
                  )
                }
                className="text-blue-light-700 hover:bg-blue-light-50"
              >
                جديد
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={column.getFilterValue() === ApplicationStatus.Approved}
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.Approved : undefined
                  )
                }
                className="text-success-700 hover:bg-success-50"
              >
                موافق عليه
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={column.getFilterValue() === ApplicationStatus.Rejected}
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.Rejected : undefined
                  )
                }
                className="text-error-700 hover:bg-error-50"
              >
                مرفوض
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={column.getFilterValue() === ApplicationStatus.Paid}
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.Paid : undefined
                  )
                }
                className="text-green-700 hover:bg-green-50"
              >
                مدفوع
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  column.getFilterValue() === ApplicationStatus.WaitingTest
                }
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.WaitingTest : undefined
                  )
                }
                className="text-warning-700 hover:bg-warning-50"
              >
                انتظار اختبار
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={column.getFilterValue() === ApplicationStatus.FailTest}
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.FailTest : undefined
                  )
                }
                className="text-red-700 hover:bg-red-50"
              >
                راسب
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={column.getFilterValue() === ApplicationStatus.PassTest}
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.PassTest : undefined
                  )
                }
                className="text-green-700 hover:bg-green-50"
              >
                ناجح
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={
                  column.getFilterValue() === ApplicationStatus.Completed
                }
                onCheckedChange={(checked) =>
                  column.setFilterValue(
                    checked ? ApplicationStatus.Completed : undefined
                  )
                }
                className="text-brand-700 hover:bg-brand-50"
              >
                مكتمل
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    accessorKey: "currentState",
    cell: ({ row }) => {
      return <StatusBadge status={row.original.currentState} />;
    },
    filterFn: (row, id, value) => {
      return value === undefined || row.getValue(id) === value;
    },
  },
  {
    header: "الرسوم المدفوعة",
    accessorKey: "paidFees",
    cell: ({ row }) => {
      const fees = row.original.paidFees ?? 0;
      return (
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900">{fees} ج.م</span>
        </div>
      );
    },
  },
  {
    header: "الإجراءات",
    id: "actions",
    cell: ({ row }) => {
      const application = row.original;
      const [isLoading, setIsLoading] = useState(false);

      const handleChangeStatus = async (newStatus: ApplicationStatus) => {
        setIsLoading(true);

        try {
          const response = await api.localDrivingLicencesApps.changeStatus({
            id: application.localDrivingLicenseApplicationId,
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
          setIsLoading(false);
        }
      };

      const handleApplicationDelete = async (applicationId: string) => {
        setIsLoading(true);
        try {
          const response = await (
            await api.localDrivingLicencesApps.deleteById(applicationId)
          ).json();

          if (response.success) {
            toast.success(response.data || "تم حذف الطلب بنجاح");
            onStatusChange?.();
          } else {
            toast.error(response.error || "فشل حذف الطلب");
          }
        } catch (error) {
          console.error("Error deleting application:", error);
          toast.error("حدث خطأ أثناء حذف الطلب");
        } finally {
          setIsLoading(false);
        }
      };

      const canApprove = application.currentState === ApplicationStatus.New;
      const canReject =
        application.currentState === ApplicationStatus.New ||
        application.currentState === ApplicationStatus.Approved;

      return (
        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <span className="sr-only">فتح القائمة</span>
                  <MoreHorizontal className="h-4 w-4" />
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-right">
              الإجراءات
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(
                  application.localDrivingLicenseApplicationId
                );
                toast.success("تم نسخ رقم الطلب بنجاح");
              }}
              className="text-gray-700"
            >
              <FileText className="ml-2 h-4 w-4 text-gray-500" />
              <span>نسخ رقم الطلب</span>
            </DropdownMenuItem>
            {canApprove && canReject && <DropdownMenuSeparator />}
            {canApprove && (
              <DropdownMenuItem
                onClick={() => handleChangeStatus(ApplicationStatus.Approved)}
                disabled={isLoading}
                className="text-success-600 hover:bg-success-50 hover:text-success-700 focus:bg-success-50 focus:text-success-700"
              >
                <Check className="ml-2 h-4 w-4" />
                <span className="font-semibold">قبول الطلب</span>
              </DropdownMenuItem>
            )}
            {canReject && (
              <DropdownMenuItem
                onClick={() => handleChangeStatus(ApplicationStatus.Rejected)}
                disabled={isLoading}
                className="text-error-600 hover:bg-error-50 hover:text-error-700 focus:bg-error-50 focus:text-error-700"
              >
                <X className="ml-2 h-4 w-4" />
                <span className="font-semibold">رفض الطلب</span>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() =>
                handleApplicationDelete(
                  application.localDrivingLicenseApplicationId
                )
              }
              disabled={isLoading}
              className="text-red-700 bg-red-50 hover:bg-red-100! hover:text-red-700!"
            >
              <Trash className="ml-2 h-4 w-4 text-red-500" />
              <span>حذف الطلب</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// Export default columns without callback for backward compatibility
export const columns: ColumnDef<LocalDrivingLicenseApplication>[] =
  createColumns();
