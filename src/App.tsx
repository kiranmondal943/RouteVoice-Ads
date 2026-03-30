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
import Login from './pages/Login'; // NEW: Imported the Login page
import { AppProvider } from './store/AppContext';

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* 
            NEW: Login Route 
            We put this OUTSIDE the Layout route so it doesn't show the sidebar 
          */}
          <Route path="/login" element={<Login />} />

          {/* Main App Routes with Sidebar/Header Layout */}
          <Route path="/" element={<Layout />}>
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

          {/* Catch-all: Redirect any unknown URL to Login or Dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}
