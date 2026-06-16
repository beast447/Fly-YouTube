import { useState } from 'react';
import Badge from './Badge.tsx';
import Avatar from './Avatar.tsx';
import { FY, FONTS, EASE } from '../theme.ts';
import type { Creator, Difficulty, Route } from '../types/index.ts';

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  smooth: 'Smooth ride',
  turbulence: 'Expect turbulence',
  hard: 'Briefing required',
};

interface RouteCardProps {
  route: Route;
  creator?: Creator;
  onClick: () => void;
}

export default function RouteCard({ route, creator, onClick }: RouteCardProps) {
  const [hovered, setHovered] = useState(false);
  const variant = route.difficulty;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: FY.midnight700,
        border: `1px solid ${hovered ? FY.borderMd : FY.border}`,
        borderRadius: 16,
        overflow: 'hidden',
        flexShrink: 0,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: `transform 200ms ${EASE}, border-color 200ms`,
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.4)' : '0 4px 16px rgba(0,0,0,0.25)',
        width: '100%',
        textAlign: 'left',
        display: 'block',
        padding: 0,
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: 100, background: route.gradient, position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 35%, rgba(8,12,20,0.88))',
          }}
        />
        {route.isNew && (
          <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
            <Badge variant="new">New</Badge>
          </div>
        )}
        <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12, zIndex: 2 }}>
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 10,
              color: FY.amber300,
              letterSpacing: '0.04em',
              marginBottom: 2,
            }}
          >
            {route.dep} → {route.arr}
          </div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 13,
              fontWeight: 700,
              color: FY.fg,
              lineHeight: 1.2,
            }}
          >
            {route.name}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 12px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          {creator && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Avatar gradient={creator.gradient} size={20} />
              <span
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 11,
                  color: FY.fg2,
                  fontWeight: 600,
                }}
              >
                {creator.name}
              </span>
            </div>
          )}
          <Badge variant={variant}>{DIFFICULTY_LABEL[variant]}</Badge>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { label: 'Duration', val: route.duration },
            { label: 'Distance', val: route.distance },
            { label: 'Alt', val: route.altitude },
          ].map(({ label, val }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: FONTS.body,
                  fontSize: 9,
                  color: FY.fg3,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: FONTS.mono,
                  fontSize: 11,
                  color: FY.fg2,
                  marginTop: 1,
                }}
              >
                {val}
              </div>
            </div>
          ))}
          <div style={{ marginLeft: 'auto' }}>
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 9,
                color: FY.fg3,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              Pilots
            </div>
            <div
              style={{
                fontFamily: FONTS.mono,
                fontSize: 11,
                color: FY.fg2,
                marginTop: 1,
              }}
            >
              {route.pilots.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
