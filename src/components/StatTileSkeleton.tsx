import { FY } from '../theme.ts';
import Skeleton from './Skeleton.tsx';

export default function StatTileSkeleton() {
  return (
    <div
      style={{
        flex: 1,
        background: FY.midnight700,
        border: `1px solid ${FY.border}`,
        borderRadius: 12,
        padding: '12px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <Skeleton height={20} width={40} />
      <Skeleton height={10} width={50} />
    </div>
  );
}
