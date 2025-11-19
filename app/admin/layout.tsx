"use client";

import { useSidebar } from "@/contexts/SidebarContext";
// import AppHeader from "@/layout/AppHeader";
// import Backdrop from "@/layout/Backdrop";
import Backdrop from "@/components/admin/layout/Backdrop";
import React from "react";

import AdminHeader from "@/components/admin/layout/AppHeader";
import AdminSidebar from "@/components/admin/layout/AppSidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state (RTL - right side)
  const mainContentMargin = isMobileOpen
    ? "mr-0"
    : isExpanded || isHovered
      ? "lg:mr-[290px]"
      : "lg:mr-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
      <AdminSidebar />
      <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AdminHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
