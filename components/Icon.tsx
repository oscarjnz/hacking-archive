import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const SearchIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const ChevronIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ExternalIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M14 4h6v6" />
    <path d="M10 14 20 4" />
    <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
  </svg>
);

export const LinkIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M5 12.5 10 17.5 19 7.5" />
  </svg>
);

export const FilterIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M3 5h18" />
    <path d="M6 12h12" />
    <path d="M10 19h4" />
  </svg>
);

export const TerminalIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="m4 8 4 4-4 4" />
    <path d="M12 18h8" />
    <rect x="2" y="3" width="20" height="18" rx="2" />
  </svg>
);

export const XIcon = (props: IconProps) => (
  <svg {...baseProps} {...props}>
    <path d="M6 6l12 12" />
    <path d="M6 18 18 6" />
  </svg>
);
