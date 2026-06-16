import { useState } from 'react';
import Avatar from './Avatar.tsx';
import { FY, FONTS } from '../theme.ts';
import type { Creator } from '../types/index.ts';

interface CreatorRowProps {
  creator: Creator;
  onClick: () => void;
  following: boolean;
}

export default function CreatorRow({ creator, onClick, following }: CreatorRowProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        width: '100%',
        border: 'none',
        textAlign: 'left',
        background: hover ? FY.midnight600 : 'transparent',
        transition: 'background 150ms',
      }}
    >
      <Avatar gradient={creator.gradient} size={44} initials={creator.name[0]} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONTS.body,
            fontSize: 14,
            fontWeight: 600,
            color: FY.fg,
          }}
        >
          {creator.name}
        </div>
        <div style={{ fontFamily: FONTS.body, fontSize: 12, color: FY.fg3 }}>
          {creator.routes} routes · {creator.followers} followers
        </div>
      </div>
      <span
        style={{
          padding: '5px 14px',
          borderRadius: 9999,
          fontSize: 12,
          fontWeight: 600,
          fontFamily: FONTS.body,
          background: following ? 'transparent' : FY.amber500,
          color: following ? FY.fg3 : '#fff',
          border: `1px solid ${following ? FY.border : 'transparent'}`,
          flexShrink: 0,
        }}
      >
        {following ? 'Following' : 'Follow'}
      </span>
    </button>
  );
}
