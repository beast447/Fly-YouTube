import { useNavigate } from 'react-router-dom';
import Icon from './Icon.jsx';
import { FY, FONTS } from '../theme.js';

export default function TopBar({ title, subtitle, back = false, rightSlot }) {
  const navigate = useNavigate();

  return (
    <div className="fy-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {back && (
          <button
            onClick={() => navigate(-1)}
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
              flexShrink: 0,
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
