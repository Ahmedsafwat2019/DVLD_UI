import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  CreditCard,
} from "lucide-react";
import { StatsCard } from "@/components/StatsCard";
import { ApplicationStatus } from "@/types";
import type { LocalDrivingLicenseApplication } from "@/types";

interface ApplicationsStatsProps {
  applications: LocalDrivingLicenseApplication[];
}

export function ApplicationsStats({ applications }: ApplicationsStatsProps) {
  const stats = {
    total: applications.length,
    new: applications.filter((a) => a.currentState === ApplicationStatus.New)
      .length,
    approved: applications.filter(
      (a) => a.currentState === ApplicationStatus.Approved
    ).length,
    rejected: applications.filter(
      (a) => a.currentState === ApplicationStatus.Rejected
    ).length,
    paid: applications.filter((a) => a.currentState === ApplicationStatus.Paid)
      .length,
    waitingTest: applications.filter(
      (a) => a.currentState === ApplicationStatus.WaitingTest
    ).length,
    passTest: applications.filter(
      (a) => a.currentState === ApplicationStatus.PassTest
    ).length,
    completed: applications.filter(
      (a) => a.currentState === ApplicationStatus.Completed
    ).length,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-8">
      <StatsCard
        label="إجمالي"
        value={stats.total}
        icon={FileText}
        colorClass="brand"
      />
      <StatsCard
        label="جديد"
        value={stats.new}
        icon={FileText}
        colorClass="blue-light"
      />
      <StatsCard
        label="موافق عليه"
        value={stats.approved}
        icon={CheckCircle}
        colorClass="success"
      />
      <StatsCard
        label="مرفوض"
        value={stats.rejected}
        icon={XCircle}
        colorClass="error"
      />
      <StatsCard
        label="مدفوع"
        value={stats.paid}
        icon={CreditCard}
        colorClass="green"
      />
      <StatsCard
        label="انتظار اختبار"
        value={stats.waitingTest}
        icon={Clock}
        colorClass="warning"
      />
      <StatsCard
        label="ناجح"
        value={stats.passTest}
        icon={CheckCircle}
        colorClass="green"
      />
      <StatsCard
        label="مكتمل"
        value={stats.completed}
        icon={CheckCircle}
        colorClass="brand"
      />
    </div>
  );
}
