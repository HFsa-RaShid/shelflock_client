// components/users/PermissionCell.tsx
interface Props {
  allowed: boolean;
}

export default function PermissionCell({ allowed }: Props) {
  return (
    <td className="py-2.5 px-6 text-center">
      {allowed ? (
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-sm  border-2 border-[#20d05b]">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#20d05b"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </span>
      ) : (
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-sm border-2 border-[#7f8482]">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#7f8482"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      )}
    </td>
  );
}
