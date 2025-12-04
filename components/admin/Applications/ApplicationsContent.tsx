"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { DataTable } from "@/components/data-table";
import { createColumns } from "@/components/admin/table/AdminColumns";
import type { LocalDrivingLicenseApplication } from "@/types";
import { api } from "@/lib/api";

interface ApplicationsContentProps {
  initialApplications: LocalDrivingLicenseApplication[];
}

export function ApplicationsContent({
  initialApplications,
}: ApplicationsContentProps) {
  const [applications, setApplications] =
    useState<LocalDrivingLicenseApplication[]>(initialApplications);
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    try {
      setLoading(true);
      const response = await api.localDrivingLicencesApps.getAppViews();
      const result = await response.json();

      if (result.success) {
        setApplications(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = createColumns(handleRefresh);

  return loading ? (
    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
      <Spinner className="w-12 h-12 mx-auto mb-4" />
      <p className="text-gray-600">جاري تحميل الطلبات...</p>
    </div>
  ) : (
    <DataTable columns={columns} data={applications} />
  );
}
