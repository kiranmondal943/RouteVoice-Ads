import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">RouteVoice Ads</h2>
          <p className="mt-2 text-sm text-gray-600 font-medium">Please sign in to your admin account</p>
        </div>
        <div className="space-y-4">
          <button 
            onClick={() => window.location.href = '/dashboard'} 
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Sign In as Admin
          </button>
        </div>
      </div>
    </div>
  );
}
