import { FY } from '../theme.js';

export default function Icon({ d, d2, size = 20, color = FY.fg2, circle, points }) {
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
    >
      {d && <path d={d} />}
      {d2 && <path d={d2} />}
      {circle && <circle cx={circle.cx} cy={circle.cy} r={circle.r} />}
      {points && <polyline points={points} />}
    </svg>
  );
}
