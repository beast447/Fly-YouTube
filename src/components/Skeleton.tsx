import type { CSSProperties } from 'react';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: CSSProperties;
}

export default function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = 6,
  style,
}: SkeletonProps) {
  return (
    <div
      className="fy-skeleton"
      style={{ width, height, borderRadius, ...style }}
      aria-hidden="true"
    />
  );
}
