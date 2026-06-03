
// components/users/StoreTeamTable.tsx
import { teamUsers } from "../data/usersPermissions";
import TeamUserRow from "./TeamUserRow";
import SecondaryBtn from "@/components/ui/secondary-button";
import UserPlusIcon from "@/components/icons/UserPlusIcon";
import SortIcon from "@/components/icons/SortIcon";

export default function StoreTeamTable() {
  const cols = ["User", "Email", "Status", "Role", "Last Active", "Action"];

  return (
    /* 1. Full Wrapper Card Design */
    <div
      className="bg-white flex flex-col opacity-100 w-full"
      style={{
        borderRadius: "12px",
        border: "1px solid #EEEFF2",
        padding: "8px", // Card container side bounds tight rakhar jonno p-2 thakbe
        gap: "8px",
      }}
    >
      {/* 2. Upper Header Part */}
      <div
        className="flex items-center justify-between opacity-100 w-full"
        style={{
          borderRadius: "8px",
          border: "1px solid #EEEFF2",
          paddingTop: "12px",
          paddingRight: "16px",
          paddingBottom: "12px",
          paddingLeft: "16px",
          gap: "24px",
          height: "61px",
        }}
      >
        <h2 className="title-medium primary-text">Store Team</h2>
        <SecondaryBtn icon={<UserPlusIcon size={20} />}>
          Invite User
        </SecondaryBtn>
      </div>

      {/* 3. Table Wrapper */}
      <div className="overflow-x-auto w-full rounded-[8px]">
        {/* auto layout constraint table width mapping table-layout-auto handle kora holo */}
        <table className="w-full min-w-[700px] border-separate border-spacing-0 table-auto">
          <thead>
            {/* Header Row */}
            <tr className="bg-white" style={{ height: "48px" }}>
              {cols.map((col, index) => (
                <th
                  key={col}
                  className="px-4 py-3 body-sm-medium subtext bg-white text-left text-[13px]"
                  style={{
                    borderTop: "1px solid #EEEFF2",
                    borderBottom: "1px solid #EEEFF2",

                    // Specific columns target kore broad layout collapse prevent kora holo 🎯
                    width:
                      col === "User"
                        ? "240px"
                        : col === "Action"
                          ? "140px"
                          : "auto",

                    borderLeft: index === 0 ? "1px solid #EEEFF2" : "none",
                    borderRight:
                      index === cols.length - 1 ? "1px solid #EEEFF2" : "none",

                    borderTopLeftRadius: index === 0 ? "8px" : "0px",
                    borderTopRightRadius:
                      index === cols.length - 1 ? "8px" : "0px",
                  }}
                >
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span className="capitalize">{col}</span>
                    {col !== "Action" && (
                      <SortIcon size={18} className="text-[#808897]" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {teamUsers.map((user, index) => {
              const isLastRow = index === teamUsers.length - 1;
              return (
                <TeamUserRow key={user.id} user={user} isLastRow={isLastRow} />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
