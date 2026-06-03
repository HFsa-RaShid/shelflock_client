// app/users-permissions/page.tsx
"use client";
import { useRef } from "react";

import { roleSummaries } from "./data/usersPermissions";
import PageHeader from "./_components/PageHeader";
import RoleSummaryCard from "./_components/RolesSummaryCard";
import StoreTeamTable from "./_components/StoreTeamTable";
import AddNewUserForm from "./_components/AddNewUserForm";
import PermissionMatrix from "./_components/PermissionMatrix";

export default function UsersPermissionsPage() {
  const addFormRef = useRef<HTMLDivElement>(null);

  const scrollToAddForm = () => {
    addFormRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="">
      <div className=" space-y-4">
        {/* Header */}
        <PageHeader onAddUser={scrollToAddForm} />

        {/* Role Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {roleSummaries.map((summary) => (
            <RoleSummaryCard key={summary.role} summary={summary} />
          ))}
        </div>

        {/* Store Team Table */}
        <StoreTeamTable />

        {/* Add New User Form */}
        <div ref={addFormRef}>
          <AddNewUserForm />
        </div>

        {/* Permission Matrix */}
        <PermissionMatrix />
      </div>
    </div>
  );
}
