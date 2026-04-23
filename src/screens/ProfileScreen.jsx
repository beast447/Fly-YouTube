import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../components/TopBar.jsx';
import SectionLabel from '../components/SectionLabel.jsx';
import StatTile from '../components/StatTile.jsx';
import Badge from '../components/Badge.jsx';
import CreatorRow from '../components/CreatorRow.jsx';
import Divider from '../components/Divider.jsx';
import { useApp } from '../context/AppContext.jsx';
import { FY, FONTS } from '../theme.js';

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { currentUser, creators, followedIds, flights, login, register, logout, authError, setAuthError } = useApp();
  const [email, setEmail] = useState('pilot@example.com');
  const [password, setPassword] = useState('pilotdemo123');
  const [username, setUsername] = useState('');
  const [mode, setMode] = useState('login');

  const followedCreators = creators.filter((c) => followedIds.has(c.id));

  async function submitAuth(event) {
    event.preventDefault();
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, username || undefined);
      }
    } catch (error) {
      setAuthError(error.message);
    }
  }

  return (
    <div className="fy-page-enter">
      <TopBar title="Profile" />
      <div className="fy-screen">
        {!currentUser ? (
          <form onSubmit={submitAuth} style={{ background: FY.midnight700, border: `1px solid ${FY.border}`, borderRadius: 14, padding: 16, marginBottom: 20 }}>
            <SectionLabel>{mode === 'login' ? 'Sign in' : 'Create account'}</SectionLabel>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" style={inputStyle} />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" style={inputStyle} />
            {mode === 'register' && <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" style={inputStyle} />}
            {authError && <p style={{ color: '#ff8f8f', fontSize: 12 }}>{authError}</p>}
            <button type="submit" style={buttonStyle}>{mode === 'login' ? 'Sign in' : 'Create account'}</button>
            <button type="button" style={{ ...buttonStyle, background: FY.midnight500 }} onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
              {mode === 'login' ? 'Need an account?' : 'Already have an account?'}
            </button>
          </form>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: 18 }}>
              <div style={{ fontFamily: FONTS.display, fontSize: 20, fontWeight: 700, color: FY.fg }}>{currentUser.username}</div>
              <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: FY.fg3 }}>{currentUser.email}</div>
              <div style={{ marginTop: 8 }}><Badge variant="amber">Authenticated pilot</Badge></div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
              <StatTile value={flights.length} label="Flights" />
              <StatTile value={followedCreators.length} label="Following" accent={FY.gold300} />
              <StatTile value={creators.length} label="Creators" accent={FY.horizon400} />
            </div>
            <button type="button" style={{ ...buttonStyle, marginBottom: 20 }} onClick={logout}>Sign out</button>
          </>
        )}

        <div style={{ marginBottom: 24 }}>
          <SectionLabel>Monitoring these frequencies</SectionLabel>
          <div style={{ background: FY.midnight700, border: `1px solid ${FY.border}`, borderRadius: 14, overflow: 'hidden' }}>
            {followedCreators.map((creator, i, arr) => (
              <div key={creator.id}>
                <CreatorRow creator={creator} following onClick={() => navigate(`/creator/${creator.id}`)} />
                {i < arr.length - 1 && <Divider />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  marginBottom: 10,
  padding: '10px 12px',
  borderRadius: 10,
  border: `1px solid ${FY.border}`,
  background: FY.midnight600,
  color: FY.fg,
};

const buttonStyle = {
  width: '100%',
  border: 'none',
  borderRadius: 10,
  padding: '10px 12px',
  background: FY.amber500,
  color: '#fff',
  fontWeight: 700,
  marginTop: 6,
};
