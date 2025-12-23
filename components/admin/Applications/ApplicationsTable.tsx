"use client";

import { useMemo, useState } from "react";
import { DataTable } from "@/components/data-table";
import { createColumns } from "@/components/admin/table/AdminColumns";
import type { LocalDrivingLicenseApplication } from "@/types";
import { api } from "@/lib/api";

interface ApplicationsTableProps {
  applications: LocalDrivingLicenseApplication[];
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const [refreshedApplications, setRefreshedApplications] =
    useState<LocalDrivingLicenseApplication[]>(applications);

  const handleRefresh = async () => {
    try {
      const response = await api.localDrivingLicencesApps.getAppViews();
      const result = await response.json();

      if (result.success) {
        setRefreshedApplications(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };
  // Create columns on the client side
  const columns = useMemo(() => createColumns(handleRefresh), []);

  return <DataTable columns={columns} data={refreshedApplications} />;
}
