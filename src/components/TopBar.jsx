import Icon from './Icon.jsx';
import { FY, FONTS } from '../theme.js';

export default function TopBar({ title, subtitle, onBack, rightSlot }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px 10px',
        flexShrink: 0,
        borderBottom: `1px solid ${FY.border}`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: FY.midnight600,
              border: `1px solid ${FY.border}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
          >
            <Icon d="M15 18l-6-6 6-6" size={16} color={FY.fg2} />
          </button>
        )}
        <div>
          <div
            style={{
              fontFamily: FONTS.display,
              fontSize: 17,
              fontWeight: 700,
              color: FY.fg,
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontFamily: FONTS.body,
                fontSize: 11,
                color: FY.fg3,
                marginTop: 2,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
      {rightSlot && <div>{rightSlot}</div>}
    </div>
  );
}
