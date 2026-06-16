import { FY } from '../theme.ts';
import Skeleton from './Skeleton.tsx';

export default function RouteCardSkeleton() {
  return (
    <div
      style={{
        background: FY.midnight700,
        border: `1px solid ${FY.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <Skeleton height={100} borderRadius={0} />
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <Skeleton height={11} width="50%" />
        <div style={{ display: 'flex', gap: 12 }}>
          <Skeleton height={20} width={60} />
          <Skeleton height={20} width={60} />
          <Skeleton height={20} width={60} />
        </div>
      </div>
    </div>
  );
}
