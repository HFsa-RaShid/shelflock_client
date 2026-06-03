// components/users/RoleSelect.tsx
"use client";
import { useState } from "react";
import { Role } from "../data/usersPermissions";


interface Props {
  value: Role;
  onChange?: (role: Role) => void;
  disabled?: boolean;
}

export default function RoleSelect({ value, onChange, disabled }: Props) {
  const [selected, setSelected] = useState<Role>(value);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = e.target.value as Role;
    setSelected(newRole);
    onChange?.(newRole);
  };

  return (
    <select
      value={selected}
      onChange={handleChange}
      disabled={disabled}
      className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <option value="Owner">Owner</option>
      <option value="Admin">Admin</option>
      <option value="Staff">Staff</option>
    </select>
  );
}
