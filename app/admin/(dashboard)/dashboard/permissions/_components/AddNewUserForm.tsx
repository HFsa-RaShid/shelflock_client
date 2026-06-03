// components/users/AddNewUserForm.tsx
"use client";

import { useState } from "react";
import { Role } from "../data/usersPermissions";
import InviteIcon from "@/components/icons/InviteIcon";
import FlatPrimaryBtn from "@/components/button/FlatPrimaryBtn";

export default function AddNewUserForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState<Role>("Admin");

  const handleSubmit = () => {
    if (!name.trim() || !contact.trim()) return;
    alert(`Invited: ${name} (${contact}) as ${role}`);
    setName("");
    setContact("");
    setRole("Admin");
  };

  return (
    <div
      className="bg-white flex flex-col opacity-100 w-full"
      style={{
        minHeight: "149px",
        borderRadius: "12px",
        border: "1px solid #E9E9E9",
        padding: "20px",
        gap: "16px",
      }}
    >
      {/* Upper subtext label heading section */}
      <h2 className="title-medium primary-text select-none">Add New User</h2>

      {/* Grid Inputs Wrapper Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end w-full">
        {/* A. Name Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="body-sm-medium subtext select-none">Name</label>
          <input
            type="text"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}

            className="border border-[#E9E9E9] rounded-lg px-3 body-sm-medium primary-text placeholder-[#808897] placeholder:opacity-100 focus:outline-none focus:border-[#F74608] transition-all w-full"
            style={{
              height: "40px", 
              padding: "12px", 
              borderRadius: "8px",
              boxShadow: "0px 1px 2px 0px rgba(13, 13, 18, 0.06)", 
              backgroundColor: "#FFFFFF",
            }}
          />
        </div>

        {/* B. Email or Phone Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="body-sm-medium subtext select-none">
            Email or Phone
          </label>
          <input
            type="text"
            placeholder="Enter email or phone"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
   
            className="border border-[#E9E9E9] rounded-[8px] py-2 px-3 body-sm-medium primary-text  placeholder:opacity-100 focus:outline-none focus:border-[#F74608] transition-all w-full"
            style={{
              height: "40px", 
              padding: "12px", 
              borderRadius: "8px",
              boxShadow: "0px 1px 2px 0px rgba(13, 13, 18, 0.06)", 
              backgroundColor: "#FFFFFF",
            }}
          />
        </div>

        {/* C. Role dropdown option select list + Action Wrapper */}
        <div className="flex flex-col gap-1.5 w-full">
          <label className="body-sm-medium subtext select-none">Role</label>
          <div className="flex gap-2 w-full items-center">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="flex-1 border border-[#E9E9E9] rounded-lg px-3 body-sm-medium primary-text bg-white focus:outline-none focus:border-[#F74608] cursor-pointer appearance-none transition-all"
              style={{
                height: "40px", 
                borderRadius: "8px",
                boxShadow: "0px 1px 2px 0px rgba(13, 13, 18, 0.06)",
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808897' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                backgroundSize: "16px",
                paddingRight: "32px",
              }}
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
              <option value="Owner">Owner</option>
            </select>

            <FlatPrimaryBtn
              onClick={handleSubmit}
              icon={<InviteIcon size={16} />}
              className="w-[110px] h-10"
            >
              Add User
            </FlatPrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
}