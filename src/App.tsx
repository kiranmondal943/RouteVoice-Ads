import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
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
import Login from './pages/Login';
import DriverView from './pages/DriverView';
import { AppProvider } from './store/AppContext';
import React from 'react';

// THE GATEKEEPER: This checks if the user has the "isLoggedIn" key
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  if (!isLoggedIn) {
    // If not logged in, force them to the login page
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/driver" element={<DriverView />} />

          {/* Protected Pages (Locked by the Gatekeeper) */}
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

          {/* If the URL is wrong, go back to Login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
