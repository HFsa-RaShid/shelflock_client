import React from "react";

interface SectionBadgeProps {
  text: string;
  className?: string; 
}

const SectionBadge: React.FC<SectionBadgeProps> = ({ text, className = "" }) => {
  return (
    <div
      className={`body-sm-regular primary-text px-4 py-1 rounded-full inline-block mb-4 ${className}`}
      style={{
        border: "1px solid #E9E9E9",
        background: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(5px)",
        boxShadow: "0px 2px 3px 0px rgba(183, 183, 183, 0.25)",
      }}
    >
      {text}
    </div>
  );
};

export default SectionBadge;