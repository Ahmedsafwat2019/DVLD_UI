"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { api } from "@/lib/api";
import type {
  Application,
  ApplicationType,
  PersonDetails,
  ApplicationWithDetails,
} from "@/types";
import { ApplicationsTable } from "@/components/ApplicationsTable";

export default function ApplicationsPage() {
  const [filterStatus, setFilterStatus] = useState<number | "all">("all");
  const [applications, setApplications] = useState<ApplicationWithDetails[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all data efficiently
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Step 1: Fetch all applications
      const applicationsResponse = await api.applications.getAll();
      const applicationsResult = await applicationsResponse.json();

      if (!applicationsResult.success) {
        setError(
          applicationsResult.message || "Failed to fetch applications"
        );
        return;
      }

      const applicationsData: Application[] = applicationsResult.data || [];

      // Step 2: Get unique person IDs and application type IDs
      const personIds = [
        ...new Set(applicationsData.map((app) => app.applicantPersonId)),
      ];
      const applicationTypeIds = [
        ...new Set(applicationsData.map((app) => app.applicationTypeId)),
      ];

      // Step 3: Fetch all persons and application types in parallel
      const [personsMap, applicationTypesMap] = await Promise.all([
        fetchPersonsMap(personIds),
        fetchApplicationTypesMap(applicationTypeIds),
      ]);

      // Step 4: Combine data
      const enrichedApplications: ApplicationWithDetails[] =
        applicationsData.map((app) => ({
          ...app,
          person: personsMap.get(app.applicantPersonId),
          applicationType: applicationTypesMap.get(app.applicationTypeId),
        }));

      setApplications(enrichedApplications);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonsMap = async (
    personIds: string[]
  ): Promise<Map<string, PersonDetails>> => {
    const personsMap = new Map<string, PersonDetails>();

    await Promise.all(
      personIds.map(async (id) => {
        try {
          const response = await api.persons.getById(id);
          const result = await response.json();
          if (result.success && result.data) {
            // Build fullName from individual name parts
            const person = result.data;
            person.fullName =
              `${person.firstName} ${person.secondName} ${person.thirdName} ${person.lastName}`.trim();
            personsMap.set(id, person);
          }
        } catch (error) {
          console.error(`Error fetching person ${id}:`, error);
        }
      })
    );

    return personsMap;
  };

  const fetchApplicationTypesMap = async (
    typeIds: string[]
  ): Promise<Map<string, ApplicationType>> => {
    const typesMap = new Map<string, ApplicationType>();

    await Promise.all(
      typeIds.map(async (id) => {
        try {
          const response = await api.ApplicationTypes.getById(id);
          const result = await response.json();
          if (result.success && result.data) {
            typesMap.set(id, result.data);
          }
        } catch (error) {
          console.error(`Error fetching application type ${id}:`, error);
        }
      })
    );

    return typesMap;
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Filter applications by status
  const filteredApplications =
    filterStatus === "all"
      ? applications
      : applications.filter((app) => app.applicationStatus === filterStatus);

  // Calculate statistics
  const stats = {
    total: applications.length,
    submitted: applications.filter((a) => a.applicationStatus === 1).length,
    under_review: applications.filter((a) => a.applicationStatus === 2).length,
    accepted: applications.filter((a) => a.applicationStatus === 3).length,
    rejected: applications.filter((a) => a.applicationStatus === 4).length,
  };

  const handleViewDetails = (applicationId: string) => {
    console.log("View details for:", applicationId);
    // Add navigation or modal logic here
  };
  console.log(applications);

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
        {/* <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              تصفية حسب:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { value: "all" as const, label: "الكل" },
                { value: 1, label: "مقدم" },
                { value: 2, label: "قيد المراجعة" },
                { value: 3, label: "مقبول" },
                { value: 4, label: "مرفوض" },
              ].map((filter) => (
                <button
                  key={String(filter.value)}
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
        </div> */}

        {/* Applications Count */}
        {!loading && !error && applications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              الطلبات ({filteredApplications.length})
            </h2>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Loader2 className="w-12 h-12 text-brand-500 mx-auto mb-4 animate-spin" />
            <p className="text-gray-600">جاري تحميل الطلبات...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-white rounded-xl border border-red-200 p-12 text-center">
            <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              حدث خطأ
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchAllData}
              className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors"
            >
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* Applications List - Table View */}
        {!loading && !error && applications.length > 0 && (
          <ApplicationsTable
            applications={filteredApplications}
            onViewDetails={handleViewDetails}
          />
        )}

        {/* Empty State for No Data */}
        {!loading && !error && applications.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              لا توجد طلبات
            </h3>
            <p className="text-gray-600">لم يتم تقديم أي طلبات بعد</p>
          </div>
        )}
      </div>
    </div>
  );
}
