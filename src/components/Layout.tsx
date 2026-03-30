import { useState } from 'react';
import { Outlet, NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Megaphone, 
  Users, 
  UserPlus,
  Map, 
  Music, 
  Briefcase, 
  BarChart3, 
  CreditCard, 
  MessageSquare, 
  User, 
  Settings,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { cn } from '../lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Campaigns', href: '/campaigns', icon: Megaphone },
  { name: 'Drivers', href: '/drivers', icon: Users },
  { name: 'Driver Onboarding', href: '/driver-onboarding', icon: UserPlus },
  { name: 'Routes', href: '/routes', icon: Map },
  { name: 'Audio Ads', href: '/audio-ads', icon: Music },
  { name: 'Clients', href: '/clients', icon: Briefcase },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Payments', href: '/payments', icon: CreditCard },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Profile', href: '/profile', icon: User },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Helper to format the page title in the top bar
  const pageTitle = location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/80 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <span className="text-xl font-bold text-blue-600">RouteVoice Ads</span>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 mr-3",
                  isActive ? "text-blue-700" : "text-gray-400"
                )} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="ml-2 md:ml-0 text-lg font-semibold text-gray-900 capitalize">
              {pageTitle}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              <Bell className="w-6 h-6" />
            </button>
            
            {/* I UPDATED THE LINE BELOW: Profile Circle Icon is now a Link */}
            <Link 
              to="/profile" 
              title="Go to Profile"
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
            >
              A
            </Link>
          </div>
        </header>

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
