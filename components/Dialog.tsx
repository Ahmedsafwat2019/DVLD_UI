"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title = "تأكيد الطلب",
  description = "هل أنت متأكد أنك تريد المتابعة؟",
  onConfirm,
  onCancel,
  confirmText = "تأكيد",
  cancelText = "إلغاء",
  loading = false,
}: ConfirmDialogProps) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-sm rounded-3xl bg-linear-to-br from-[#111827] via-[#1a1f2e] to-[#111827] text-white border-2 border-[#1f2937]/80 shadow-2xl shadow-black/50 backdrop-blur-xl overflow-hidden"
        dir="rtl"
      >
        {/* Decorative linear overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none" />

        <DialogHeader className="relative flex flex-col items-center text-center space-y-4 pb-2">
          {/* Icon with enhanced styling */}
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-xl animate-pulse" />
            <div className="relative bg-linear-to-br from-[#1e40af]/30 via-[#3b82f6]/20 to-[#2563eb]/30 p-5 rounded-full border border-blue-500/30 shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-blue-500/30">
              <CircleHelp className="w-9 h-9 text-[#60a5fa] drop-shadow-lg" />
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold bg-linear-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight mt-2">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-300/90 leading-relaxed text-base px-2 max-w-sm  text-center">
            {description}
            <br />
            <span className="text-sm">لا يمكن التراجع عن هذا الإجراء</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="relative  gap-3 pt-6 pb-2 mt-4 border-t border-gray-700/50">
          <Button
            variant="outline"
            className="border-2 border-gray-600/60 bg-gray-800/40 text-gray-200 hover:text-white hover:bg-gray-700/60 hover:border-gray-500 px-8 py-2.5 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            type="submit"
            onClick={onConfirm}
            disabled={loading}
            className="relative bg-linear-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 text-white px-8 py-2.5 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              {loading && (
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {loading ? "جاري الإرسال..." : confirmText}
            </span>
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
