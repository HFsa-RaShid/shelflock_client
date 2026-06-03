type IconProps = {
  className?: string;
  size?: number;
};

function baseProps(className?: string, size = 16) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className,
  } as const;
}

export function EditIcon({ className, size }: IconProps) {
  return (
    <svg {...baseProps(className, size)}>
      <path
        d="M11.333 2.00001C11.5081 1.8249 11.716 1.686 11.9447 1.59128C12.1735 1.49657 12.4187 1.44775 12.6663 1.44775C12.914 1.44775 13.1592 1.49657 13.388 1.59128C13.6167 1.686 13.8246 1.8249 13.9997 2.00001C14.1748 2.17512 14.3137 2.383 14.4084 2.61178C14.5031 2.84055 14.5519 3.08571 14.5519 3.33334C14.5519 3.58096 14.5031 3.82612 14.4084 4.0549C14.3137 4.28368 14.1748 4.49156 13.9997 4.66667L5.33301 13.3333L1.33301 14.6667L2.66634 10.6667L11.333 2.00001Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DeleteIcon({ className, size }: IconProps) {
  return (
    <svg {...baseProps(className, size)}>
      <path
        d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SearchIcon({ className, size }: IconProps) {
  return (
    <svg {...baseProps(className, size)}>
      <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14L11.1 11.1"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DragIcon({ className, size }: IconProps) {
  return (
    <svg {...baseProps(className, size)}>
      <path d="M6 2H6.00667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
      <path d="M10 2H10.0067" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
      <path d="M6 8H6.00667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
      <path d="M10 8H10.0067" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
      <path d="M6 14H6.00667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
      <path d="M10 14H10.0067" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className, size }: IconProps) {
  return (
    <svg {...baseProps(className, size)}>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

