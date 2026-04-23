import { useState } from 'react';
import StatusBar from './components/StatusBar.jsx';
import TabBar from './components/TabBar.jsx';
import DispatchScreen from './screens/DispatchScreen.jsx';
import BrowseScreen from './screens/BrowseScreen.jsx';
import LogbookScreen from './screens/LogbookScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RouteDetailScreen from './screens/RouteDetailScreen.jsx';
import CreatorProfileScreen from './screens/CreatorProfileScreen.jsx';

export default function App() {
  const [tab, setTab] = useState('dispatch');
  const [stack, setStack] = useState([]); // [{ type: 'route' | 'creator', data }]
  const [screenKey, setScreenKey] = useState(0);

  const pushScreen = (type, data) => setStack((s) => [...s, { type, data }]);
  const popScreen = () => setStack((s) => s.slice(0, -1));

  const handleTabChange = (nextTab) => {
    setStack([]);
    setTab(nextTab);
    setScreenKey((k) => k + 1);
  };

  const top = stack[stack.length - 1];

  const renderScreen = () => {
    if (top?.type === 'route') {
      return <RouteDetailScreen route={top.data} onBack={popScreen} />;
    }
    if (top?.type === 'creator') {
      return (
        <CreatorProfileScreen
          creator={top.data}
          onBack={popScreen}
          onRouteSelect={(route) => pushScreen('route', route)}
        />
      );
    }

    const nav = {
      onRouteSelect: (route) => pushScreen('route', route),
      onCreatorSelect: (creator) => pushScreen('creator', creator),
    };

    switch (tab) {
      case 'dispatch':
        return <DispatchScreen {...nav} />;
      case 'browse':
        return <BrowseScreen {...nav} />;
      case 'logbook':
        return (
          <LogbookScreen onRouteSelect={(route) => pushScreen('route', route)} />
        );
      case 'profile':
        return (
          <ProfileScreen
            onCreatorSelect={(creator) => pushScreen('creator', creator)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fy-stage">
      <div className="fy-stage-glow" />
      <div className="fy-phone">
        <div className="fy-dynamic-island" />
        <StatusBar />
        <div className="fy-app-content">
          <div className="fy-screen-wrap" key={`${tab}-${stack.length}-${screenKey}`}>
            {renderScreen()}
          </div>
        </div>
        {!top && <TabBar active={tab} onSelect={handleTabChange} />}
      </div>
    </div>
  );
}
