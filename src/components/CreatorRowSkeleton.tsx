import Skeleton from './Skeleton.tsx';

export default function CreatorRowSkeleton() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px' }}>
      <Skeleton width={44} height={44} borderRadius={9999} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Skeleton height={14} width="40%" />
        <Skeleton height={12} width="65%" />
      </div>
      <Skeleton width={72} height={26} borderRadius={9999} />
    </div>
  );
}
