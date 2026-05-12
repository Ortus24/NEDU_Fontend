import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../features/admin/components/AdminSidebar";
import AdminHeader from "../features/admin/components/AdminHeader";

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <AdminSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((prev) => !prev)}
        pendingKycCount={3}
        pendingDisputeCount={2}
      />

      {/* Main wrapper — pushes right of sidebar */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
          collapsed ? "ml-[72px]" : "ml-[256px]"
        }`}
      >
        {/* Sticky Header */}
        <AdminHeader sidebarCollapsed={collapsed} />

        {/* Page Content */}
        <main className="flex-1 pt-16">
          <div className="p-6 max-w-[1600px] mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
