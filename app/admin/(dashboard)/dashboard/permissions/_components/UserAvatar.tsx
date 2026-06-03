// components/users/UserAvatar.tsx
interface Props {
  initials: string;
  color: string;
  size?: number;
}

export default function UserAvatar({ initials, color, size = 36 }: Props) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold text-xs flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
