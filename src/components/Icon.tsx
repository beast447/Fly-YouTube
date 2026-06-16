import { FY } from '../theme.ts';

interface IconProps {
  d?: string;
  d2?: string;
  size?: number;
  color?: string;
  circle?: { cx: number; cy: number; r: number };
  points?: string;
}

export default function Icon({ d, d2, size = 20, color = FY.fg2, circle, points }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d && <path d={d} />}
      {d2 && <path d={d2} />}
      {circle && <circle cx={circle.cx} cy={circle.cy} r={circle.r} />}
      {points && <polyline points={points} />}
    </svg>
  );
}
