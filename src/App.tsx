import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import DriverView from './pages/DriverView';
// ... other imports ...
import Campaigns from './pages/Campaigns';
import Drivers from './pages/Drivers';
import DriverOnboarding from './pages/DriverOnboarding';
import RoutesPage from './pages/RoutesPage';
import AudioAds from './pages/AudioAds';
import Clients from './pages/Clients';
import Analytics from './pages/Analytics';
import Payments from './pages/Payments';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import { AppProvider } from './store/AppContext';

// This is a "Guard" - it checks if you are logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/driver" element={<DriverView />} />

          {/* All these routes are now PROTECTED by the login page */}
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="campaigns" element={<Campaigns />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="driver-onboarding" element={<DriverOnboarding />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="audio-ads" element={<AudioAds />} />
            <Route path="clients" element={<Clients />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="payments" element={<Payments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
