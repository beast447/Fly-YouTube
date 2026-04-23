import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.jsx';
import Nav from './components/Nav.jsx';
import DispatchScreen from './screens/DispatchScreen.jsx';
import BrowseScreen from './screens/BrowseScreen.jsx';
import LogbookScreen from './screens/LogbookScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RouteDetailScreen from './screens/RouteDetailScreen.jsx';
import CreatorProfileScreen from './screens/CreatorProfileScreen.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="fy-layout">
          <Nav />
          <main className="fy-content">
            <Routes>
              <Route path="/" element={<DispatchScreen />} />
              <Route path="/browse" element={<BrowseScreen />} />
              <Route path="/logbook" element={<LogbookScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/route/:id" element={<RouteDetailScreen />} />
              <Route path="/creator/:id" element={<CreatorProfileScreen />} />
            </Routes>
          </main>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
