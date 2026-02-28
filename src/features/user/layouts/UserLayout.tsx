import React from "react";
import { Outlet } from "react-router-dom";
import { UserHeader } from "../components/UserHeader";
import { UserFooter } from "../components/UserFooter";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen font-display bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden">
      <UserHeader />
      <div className="flex-1 flex flex-col w-full">
        <Outlet />
      </div>
      <UserFooter />
    </div>
  );
}
