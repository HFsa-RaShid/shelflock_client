
"use client";

import DeleteIcon from "@/components/icons/DeleteIcon";
import { TeamUser } from "../data/usersPermissions";
import RoleSelect from "./RoleSelect";
import StatusBadge from "./StatusBadge";
import UserAvatar from "./UserAvatar";

interface Props {
  user: TeamUser;
  isLastRow?: boolean;
}

export default function TeamUserRow({ user, isLastRow = false }: Props) {
  const totalCols = 6;

  const getCellStyle = (colIndex: number) => {
    return {
      paddingTop: "10px", 
      paddingBottom: "10px",
      borderBottom: "1px solid #EEEFF2",
      borderLeft: colIndex === 0 ? "1px solid #EEEFF2" : "none",
      borderRight: colIndex === totalCols - 1 ? "1px solid #EEEFF2" : "none",
      borderBottomLeftRadius: isLastRow && colIndex === 0 ? "8px" : "0px",
      borderBottomRightRadius:
        isLastRow && colIndex === totalCols - 1 ? "8px" : "0px",
    };
  };

  return (
    <tr
      className="bg-white hover:bg-gray-50/50 transition-colors duration-150"
      style={{ height: "60px" }}
    >
      {/* 1. User Info Column (Fixed structural limit width) */}
      <td
        className="px-4 bg-white"
        style={{ ...getCellStyle(0), width: "240px" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center overflow-hidden shrink-0"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "100px",
              border: "1px solid #F8F9FB",
            }}
          >
            <UserAvatar initials={user.initials} color={user.avatarColor} />
          </div>

          <div className="flex flex-col truncate">
            <span className="body-sm-medium primary-text truncate">
              {user.name}
            </span>
            <span className="body-xs subtext truncate">
              {user.subRole || user.role}
            </span>
          </div>
        </div>
      </td>

      {/* 2. Email / Phone Column */}
      <td
        className="px-4 body-sm-medium primary-text text-[13px]"
        style={getCellStyle(1)}
      >
        {user.email || user.phone || "—"}
      </td>

      {/* 3. Status Column */}
      <td className="px-4" style={getCellStyle(2)}>
        <div className="w-fit">
          <StatusBadge status={user.status} />
        </div>
      </td>

      {/* 4. Role Column */}
      <td className="px-4" style={getCellStyle(3)}>
        {user.role === "Owner" ? (
          <span className="body-xs px-2.5 py-1 bg-[#feefe4] text-[#fa7319] rounded-[6px] ">
            Owner
          </span>
        ) : (
          <RoleSelect value={user.role} />
        )}
      </td>

      {/* 5. Last Active Column */}
      <td
        className="px-4 body-sm-medium primary-text text-[13px]"
        style={getCellStyle(4)}
      >
        {user.lastActive}
      </td>

      {/* 6. Action Column (Strict bounds right side flush setup) */}
      <td
        className="px-4 bg-white"
        style={{ ...getCellStyle(5), width: "140px" }}
      >
        <div className="flex items-center gap-2 justify-start">
          {user.role === "Owner" ? (
            <span className="body-sm-medium primary-text pl-4 tracking-widest select-none text-gray-300">
              ---
            </span>
          ) : (
            <>
              {/* A. RESEND BUTTON */}
              {user.status === "Pending" ? (
                <button
                  className="flex items-center justify-center font-medium text-[13px] text-[#2570FC] hover:opacity-90 active:scale-98 transition-all shrink-0"
                  style={{
                    width: "74px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "1px solid #2570FC1A",
                    backgroundColor: "#EDF4FF",
                    padding: "8px",
                  }}
                >
                  Resend
                </button>
              ) : (
                /* B. SAVE BUTTON */
                <button
                  className="flex items-center justify-center font-medium text-[13px] text-[#0E2038] hover:bg-gray-50 active:scale-98 transition-all shrink-0"
                  style={{
                    width: "74px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "1px solid #E9E9E9",
                    backgroundColor: "#FFFFFF",
                    padding: "8px",
                    boxShadow: "0px 1px 2px 0px rgba(82, 88, 102, 0.06)",
                  }}
                >
                  Save
                </button>
              )}

              {/* C. DELETE BUTTON */}
              <button
                className="flex items-center justify-center hover:bg-red-50/50 active:scale-95 transition-all shrink-0"
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  border: "1px solid #e9e9e9",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <DeleteIcon size={16} className="text-[#DF1C41]" />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
