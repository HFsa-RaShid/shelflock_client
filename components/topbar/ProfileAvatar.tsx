import React from "react";

interface ProfileAvatarProps {
  imageUrl: string;
}

export default function ProfileAvatar({ imageUrl }: ProfileAvatarProps) {
  return (
    <button className="w-9 h-9 rounded-[10px] overflow-hidden border border-[#E9E9E9] shrink-0 hover:opacity-90 transition">
      <img
        src={imageUrl}
        alt="User profile"
        className="w-full h-full object-cover"
      />
    </button>
  );
}
