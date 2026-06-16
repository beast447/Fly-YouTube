import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext.tsx';
import Nav from './components/Nav.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';

const DispatchScreen = lazy(() => import('./screens/DispatchScreen.tsx'));
const BrowseScreen = lazy(() => import('./screens/BrowseScreen.tsx'));
const LogbookScreen = lazy(() => import('./screens/LogbookScreen.tsx'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen.tsx'));
const RouteDetailScreen = lazy(() => import('./screens/RouteDetailScreen.tsx'));
const CreatorProfileScreen = lazy(() => import('./screens/CreatorProfileScreen.tsx'));
const NotFoundScreen = lazy(() => import('./screens/NotFoundScreen.tsx'));

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="fy-layout">
          <Nav />
          <main className="fy-content" id="main-content">
            <ErrorBoundary>
              <Suspense fallback={null}>
                <Routes>
                  <Route path="/" element={<DispatchScreen />} />
                  <Route path="/browse" element={<BrowseScreen />} />
                  <Route path="/logbook" element={<LogbookScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/route/:id" element={<RouteDetailScreen />} />
                  <Route path="/creator/:id" element={<CreatorProfileScreen />} />
                  <Route path="*" element={<NotFoundScreen />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </main>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
