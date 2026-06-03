// components/users/PermissionMatrix.tsx
"use client";

import React from "react";
import { permissionGroups } from "../data/usersPermissions";
import PermissionGroupRows from "./PermissionGroupRows";
import {
  OwnerIcon,
  AdminIcon,
  StaffIcon,
} from "@/components/icons/RoleMatrixIcons";

const roleHeaders = [
  { label: "Owner", icon: <OwnerIcon size={18} /> },
  { label: "Admin", icon: <AdminIcon size={18} /> },
  { label: "Staff", icon: <StaffIcon size={18} /> },
];

export default function PermissionMatrix() {
  return (
    /* A. MAIN OUTER CONTAINER CARD LOGIC */
    <div
      className="bg-white flex flex-col opacity-100 w-full"
      style={{
        borderRadius: "12px",
        border: "1px solid #E9E9E9",
        padding: "20px 24px 20px 24px", 
      }}
    >
      {/* Container Header Section Title */}
      <div className="w-full pb-6 select-none">
        <h2 className="title-medium primary-text">Permission Matrix</h2>
      </div>

      {/* B. TABLE INTERIOR LAYOUT CONTAINER PANEL */}
      <div className="overflow-x-auto w-full mt-2">
        <table className="w-full border-separate border-spacing-0 min-w-[1085px]">
          <thead>
            <tr className="w-full" style={{ height: "48px" }}>
              {/* Feature Category Header */}
              <th
                className="text-left px-4 py-3 body-medium primary-text bg-white"
                style={{
                  width: "348px",
                  height: "48px",
                  borderTop: "1px solid #E9E9E9",
                  borderLeft: "1px solid #E9E9E9",
                  borderBottom: "1px solid #E9E9E9",
                  borderRight: "1px solid #E9E9E9",
                  borderTopLeftRadius: "6px",
                }}
              >
                Feature / Action
              </th>

              {/* Dynamic Roles Header Blocks */}
              {roleHeaders.map((rh, index) => {
                const isLastHeader = index === roleHeaders.length - 1;
                return (
                  <th
                    key={rh.label}
                    className="px-6 bg-white body-medium primary-text"
                    style={{
                      width: "245.66665649414062px",
                      height: "48px",
                      borderTop: "1px solid #E9E9E9",
                      borderBottom: "1px solid #E9E9E9",
                      borderRight: "1px solid #E9E9E9",
                      borderLeft: "none",
                      borderTopRightRadius: isLastHeader ? "6px" : "0px",
                    }}
                  >
                    <div className="flex items-center justify-center gap-1.5 select-none">
                      {rh.icon}
                      <span className="body-medium primary-text">
                        {rh.label}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {permissionGroups.map((group, index) => {
              const isLastGroup = index === permissionGroups.length - 1;
              return (
                <PermissionGroupRows
                  key={group.group}
                  group={group}
                  isLastGroup={isLastGroup}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}