import React, { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // PROTECTED: Only you know this password!
    if (password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/dashboard";
    } else {
      alert("Incorrect Admin Password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">RouteVoice Admin</h2>
          <p className="mt-2 text-sm text-gray-500">Secure Access Portal</p>
        </div>
        <div className="space-y-4">
          <input 
            type="password" 
            placeholder="Enter Admin Password"
            className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
          >
            Access Dashboard
          </button>
          <div className="text-center pt-4">
             <a href="/driver" className="text-blue-500 text-sm underline font-medium">Switch to Driver View</a>
          </div>
        </div>
      </div>
    </div>
  );
}
