import { useState, useEffect } from 'react';
import { Bell, Shield, Globe, CreditCard, Smartphone, ChevronDown, ChevronUp, Check, X } from 'lucide-react';

export default function Settings() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [activeModal, setActiveModal] = useState<'password' | null>(null);
  
  const [settings, setSettings] = useState({
    general: {
      language: 'English',
      timezone: 'Asia/Kolkata',
      currency: 'INR (₹)'
    },
    notifications: {
      emailAlerts: true,
      smsAlerts: false,
      pushNotifications: true,
      marketingEmails: false
    },
    security: {
      twoFactor: false,
      sessionTimeout: '30m'
    },
    app: {
      requirePhotoProof: true,
      requireLocation: true,
      autoAssignRoutes: false
    },
    billing: {
      autoRecharge: true,
      billingEmail: 'admin@routevoice.com'
    }
  });

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleToggle = (category: keyof typeof settings, key: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !(prev[category] as any)[key]
      }
    }));
    triggerToast();
  };

  const handleChange = (category: keyof typeof settings, key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    triggerToast();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in-up">
          <Check className="w-5 h-5 text-green-400" />
          <span className="text-sm font-medium">Settings saved successfully</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Platform Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your RouteVoice Ads platform preferences.</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {/* General Settings */}
          <div className="flex flex-col">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleSection('general')}>
              <div className="flex items-start">
                <Globe className="w-6 h-6 text-gray-400 mt-0.5 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">General</h3>
                  <p className="text-sm text-gray-500 mt-1">Language, timezone, and regional settings.</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                {expandedSection === 'general' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            {expandedSection === 'general' && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      value={settings.general.language}
                      onChange={(e) => handleChange('general', 'language', e.target.value)}
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Bengali</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      value={settings.general.timezone}
                      onChange={(e) => handleChange('general', 'timezone', e.target.value)}
                    >
                      <option>Asia/Kolkata</option>
                      <option>UTC</option>
                      <option>America/New_York</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      value={settings.general.currency}
                      onChange={(e) => handleChange('general', 'currency', e.target.value)}
                    >
                      <option>INR (₹)</option>
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="flex flex-col">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleSection('notifications')}>
              <div className="flex items-start">
                <Bell className="w-6 h-6 text-gray-400 mt-0.5 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage email, SMS, and push notifications.</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                {expandedSection === 'notifications' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            {expandedSection === 'notifications' && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Email Alerts</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications.emailAlerts ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('notifications', 'emailAlerts')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications.emailAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">SMS Alerts</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications.smsAlerts ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('notifications', 'smsAlerts')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications.smsAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Push Notifications</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('notifications', 'pushNotifications')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Marketing Emails</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.notifications.marketingEmails ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('notifications', 'marketingEmails')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.notifications.marketingEmails ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Security */}
          <div className="flex flex-col">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleSection('security')}>
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-gray-400 mt-0.5 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Security & Privacy</h3>
                  <p className="text-sm text-gray-500 mt-1">Password, 2FA, and data privacy controls.</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                {expandedSection === 'security' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            {expandedSection === 'security' && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Two-Factor Authentication (2FA)</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.security.twoFactor ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('security', 'twoFactor')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.security.twoFactor ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Timeout</label>
                  <select 
                    className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleChange('security', 'sessionTimeout', e.target.value)}
                  >
                    <option value="15m">15 Minutes</option>
                    <option value="30m">30 Minutes</option>
                    <option value="1h">1 Hour</option>
                    <option value="never">Never</option>
                  </select>
                </div>
                <div className="pt-2">
                  <button 
                    onClick={() => setActiveModal('password')}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* App Settings */}
          <div className="flex flex-col">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleSection('app')}>
              <div className="flex items-start">
                <Smartphone className="w-6 h-6 text-gray-400 mt-0.5 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Driver App Settings</h3>
                  <p className="text-sm text-gray-500 mt-1">Configure proof of work requirements and app behavior.</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                {expandedSection === 'app' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            {expandedSection === 'app' && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Require Photo Proof of Ad Playing</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.app.requirePhotoProof ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('app', 'requirePhotoProof')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.app.requirePhotoProof ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Require GPS Location Tracking</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.app.requireLocation ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('app', 'requireLocation')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.app.requireLocation ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Auto-Assign Routes to Available Drivers</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.app.autoAssignRoutes ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('app', 'autoAssignRoutes')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.app.autoAssignRoutes ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* Billing & Payouts */}
          <div className="flex flex-col">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-gray-50 transition-colors" onClick={() => toggleSection('billing')}>
              <div className="flex items-start">
                <CreditCard className="w-6 h-6 text-gray-400 mt-0.5 mr-4" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Billing & Payouts</h3>
                  <p className="text-sm text-gray-500 mt-1">Manage payment methods and driver payout rules.</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                {expandedSection === 'billing' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            {expandedSection === 'billing' && (
              <div className="px-6 pb-6 pt-2 bg-gray-50 border-t border-gray-100 space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm text-gray-700 font-medium">Auto-Recharge Wallet</span>
                  <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.billing.autoRecharge ? 'bg-blue-600' : 'bg-gray-200'}`} onClick={() => handleToggle('billing', 'autoRecharge')}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.billing.autoRecharge ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Billing Email</label>
                  <input 
                    type="email" 
                    className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    value={settings.billing.billingEmail}
                    onChange={(e) => handleChange('billing', 'billingEmail', e.target.value)}
                  />
                </div>
                <div className="pt-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    Manage Payment Methods
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Change Password Modal */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); triggerToast(); }} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input required type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input required type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <input required type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
