// ไอคอนลายเส้น (line-art) สไตล์เทคนิคอล — ใช้แทน emoji เพื่อลุค blueprint
// ทุกตัวรับ className เพื่อกำหนดขนาด/สีผ่าน text-color (stroke = currentColor)
type IconProps = { className?: string };

const common = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BoltIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

export function BatteryIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="2" y="7" width="16" height="10" rx="2" />
      <line x1="22" y1="11" x2="22" y2="13" />
      <path d="M11 9.5 8.5 12.5H11.5L9 15.5" />
    </svg>
  );
}

export function BanknoteIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

export function GaugeIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M12 14 16 10" />
      <path d="M3.5 18a9 9 0 1 1 17 0" />
      <circle cx="12" cy="14" r="1" />
    </svg>
  );
}

export function TrashIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <path d="M4 7h16M10 11v6M14 11v6M5 7l1 13h12l1-13M9 7V4h6v3" />
    </svg>
  );
}

export function SearchIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg {...common} className={className}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
