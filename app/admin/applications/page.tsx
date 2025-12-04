import type { LocalDrivingLicenseApplication } from "@/types";
import { api } from "@/lib/api";
import { ApplicationsStats } from "@/components/admin/Applications/ApplicationsStats";
import { ApplicationsContent } from "@/components/admin/Applications/ApplicationsContent";
import { redirect } from "next/navigation";

// async function checkAdminAccess(): Promise<boolean> {
//   try {
//     const response = await api.account.me();
//     const result = await response.json();

//     return (
//       result.success &&
//       result.data &&
//       result.data.role?.toLowerCase() === "admin"
//     );
//   } catch (error) {
//     console.error("Admin access check failed:", error);
//     return false;
//   }
// }

async function getApplications(): Promise<LocalDrivingLicenseApplication[]> {
  try {
    const response = await api.localDrivingLicencesApps.getAppViews();
    const result = await response.json();

    if (result.success) {
      return result.data || [];
    }

    return [];
  } catch (error) {
    console.error("Error fetching applications:", error);
    return [];
  }
}

export default async function ApplicationsPage() {
  // Check admin access before rendering the page
  // const isAdmin = await checkAdminAccess();

  // if (!isAdmin) {
  //   redirect("/");
  // }

  const applications = await getApplications();

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إدارة الطلبات</h1>
          <p className="text-gray-600 mt-2">
            عرض وإدارة جميع طلبات رخص القيادة المحلية
          </p>
        </div>

        {/* Stats Cards */}
        <ApplicationsStats applications={applications} />

        {/* Applications Count */}
        {applications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex gap-3 items-center">
              الطلبات ({applications.length}){" "}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              استخدم أيقونة التصفية في عمود الحالة لتصفية الطلبات
            </p>
          </div>
        )}

        {/* Applications Table */}
        <ApplicationsContent initialApplications={applications} />
      </div>
    </div>
  );
}
