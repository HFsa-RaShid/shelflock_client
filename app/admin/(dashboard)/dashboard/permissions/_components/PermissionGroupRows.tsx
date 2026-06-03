// components/users/PermissionGroupRows.tsx
"use client";

import React from "react";
import { PermissionGroup } from "../data/usersPermissions";
import PermissionCell from "./PermissionCell";

interface Props {
  group: PermissionGroup;
  isLastGroup?: boolean;
}

export default function PermissionGroupRows({
  group,
  isLastGroup = false,
}: Props) {
  const totalRows = group.rows?.length || 0;

  return (
    <>
      {/* Group Title Header Row */}
      <tr className="bg-[#f7f8fa]" style={{ height: "38px" }}>
        <td
          colSpan={4}
          className="px-4 py-3 body-bold primary-text uppercase  text-left"
          style={{
            height: "38px",
            borderLeft: "1px solid #E9E9E9",
            borderRight: "1px solid #E9E9E9",
            borderBottom: "1px solid #E9E9E9",
          }}
        >
          {group.group}
        </td>
      </tr>

      {/* Feature Rows Mapping */}
      {group.rows.map((row, rowIndex) => {
        const isLastRowOfTable = isLastGroup && rowIndex === totalRows - 1;

        const getCellStyle = (colIndex: number) => {
          return {
            height: "48px",
            borderBottom: "1px solid #E9E9E9",
            borderRight: "1px solid #E9E9E9",
            borderLeft: colIndex === 0 ? "1px solid #E9E9E9" : "none",
            borderBottomLeftRadius:
              isLastRowOfTable && colIndex === 0 ? "6px" : "0px",
            borderBottomRightRadius:
              isLastRowOfTable && colIndex === 3 ? "6px" : "0px",
          };
        };

        return (
          <tr
            key={row.feature}
            className="hover:bg-gray-50/50 transition-colors"
            style={{ height: "48px" }}
          >
            {/* Column 1: Feature Text cell */}
            <td
              className="px-4 py-3 text-left body-medium primary-text"
              style={getCellStyle(0)}
            >
              {row.feature}
            </td>

            {/* Column 2: Owner Cell */}
            <td className="text-center" style={getCellStyle(1)}>
              <div className="flex items-center justify-center w-full h-full">
                <PermissionCell allowed={row.owner} />
              </div>
            </td>

            {/* Column 3: Admin Cell */}
            <td className="text-center" style={getCellStyle(2)}>
              <div className="flex items-center justify-center w-full h-full">
                <PermissionCell allowed={row.admin} />
              </div>
            </td>

            {/* Column 4: Staff Cell */}
            <td className="text-center" style={getCellStyle(3)}>
              <div className="flex items-center justify-center w-full h-full">
                <PermissionCell allowed={row.staff} />
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
