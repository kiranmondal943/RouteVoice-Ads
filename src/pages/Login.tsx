import React, { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is the "Security Guard" logic
    if (password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/dashboard";
    } else {
      alert("Wrong password! Access Denied.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-600">RouteVoice Admin</h2>
          <p className="mt-2 text-sm text-gray-500">Enter Admin Password to enter</p>
        </div>
        
        {/* We use a FORM so that pressing Enter also works */}
        <form onSubmit={handleLogin} className="space-y-4 mt-6">
          <input 
            type="password" 
            placeholder="Admin Password"
            className="w-full p-4 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all"
          >
            Sign In as Admin
          </button>
          <div className="text-center pt-4 border-t border-gray-100 mt-4">
             <a href="/driver" className="text-blue-500 text-sm underline font-medium">Switch to Driver View</a>
          </div>
        </form>
      </div>
    </div>
  );
}
