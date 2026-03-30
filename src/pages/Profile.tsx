import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, X, Key, Smartphone, LogOut, Check } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    role: 'Super Administrator',
    email: 'admin@routevoice.com',
    phone: '+91 98765 43210',
    location: 'Kolkata, West Bengal, India'
  });

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'password' | '2fa' | 'signout' | null>(null);
  const [editForm, setEditForm] = useState(profile);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editForm);
    setIsEditModalOpen(false);
  };

  // UPDATED: Logic to clear the session and force a redirect to login
 const handleLogout = () => {
    // This is the most important line - it deletes the "Key"
    localStorage.removeItem("isLoggedIn");
    localStorage.clear();
    sessionStorage.clear();
    
    // Send the user to the login page immediately
    window.location.href = '/login'; 
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-400"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-6">
            <div className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-sm flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
                {profile.name.charAt(0)}
              </div>
            </div>
            <button 
              onClick={() => {
                setEditForm(profile);
                setIsEditModalOpen(true);
              }}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
            >
              Edit Profile
            </button>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
            <p className="text-gray-500 flex items-center mt-1">
              <Shield className="w-4 h-4 mr-1 text-blue-600" />
              {profile.role}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Contact Information</h3>
              <div className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-3 text-gray-400" />
                {profile.email}
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-3 text-gray-400" />
                {profile.phone}
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-gray-400" />
                {profile.location}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Account Settings</h3>
              <button 
                onClick={() => setActiveModal('password')}
                className="w-full flex items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                <Key className="w-4 h-4 mr-3 text-gray-400" />
                Change Password
              </button>
              <button 
                onClick={() => setActiveModal('2fa')}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm font-medium text-gray-700 transition-colors"
              >
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-3 text-gray-400" />
                  Two-Factor Authentication
                </div>
                {twoFactorEnabled && <Check className="w-4 h-4 text-green-600" />}
              </button>
              <button 
                onClick={() => setActiveModal('signout')}
                className="w-full flex items-center px-4 py-3 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-3 text-red-500" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Edit Profile</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveProfile} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editForm.role} onChange={e => setEditForm({...editForm, role: e.target.value})}>
                  <option value="Super Administrator">Super Administrator</option>
                  <option value="Campaign Manager">Campaign Manager</option>
                  <option value="Support Agent">Support Agent</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input required type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editForm.email} onChange={e => setEditForm({...editForm, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input required type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editForm.phone} onChange={e => setEditForm({...editForm, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={editForm.location} onChange={e => setEditForm({...editForm, location: e.target.value})} />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <form onSubmit={(e) => { e.preventDefault(); setActiveModal(null); }} className="p-4 space-y-4">
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

      {/* 2FA Modal */}
      {activeModal === '2fa' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {twoFactorEnabled ? '2FA is currently enabled' : 'Secure your account'}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                {twoFactorEnabled 
                  ? 'Two-factor authentication adds an extra layer of security to your account. You can disable it below.' 
                  : 'Add an extra layer of security to your account by enabling two-factor authentication.'}
              </p>
              <div className="flex justify-center space-x-3">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Close</button>
                <button 
                  onClick={() => {
                    setTwoFactorEnabled(!twoFactorEnabled);
                    setActiveModal(null);
                  }} 
                  className={`px-4 py-2 text-white rounded-lg font-medium transition-colors ${twoFactorEnabled ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out Modal */}
      {activeModal === 'signout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sign Out</h3>
              <p className="text-sm text-gray-500 mb-6">Are you sure you want to sign out of your account?</p>
              <div className="flex justify-center space-x-3">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                {/* This button triggers the handleLogout function above */}
                <button onClick={handleLogout} className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors">Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
