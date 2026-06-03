// components/users/PageHeader.tsx
import FlatPrimaryBtn from "@/components/button/FlatPrimaryBtn";
import Primarybtn from "@/components/ui/primary-button";
import { UserPlus } from "lucide-react";

interface Props {
  onAddUser: () => void;
}

export default function PageHeader({ onAddUser }: Props) {
  return (
    <div className="flex items-end justify-end mb-4">
      <FlatPrimaryBtn onClick={onAddUser} icon={<UserPlus size={18} />}>
        Add New User
      </FlatPrimaryBtn>
    </div>
  );
}