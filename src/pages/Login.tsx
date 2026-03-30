import React, { useState, useEffect } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');

  // CLEARS OLD SESSIONS ON LOAD: This forces the "lock" to work
  useEffect(() => {
    localStorage.removeItem("isLoggedIn");
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/dashboard";
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-blue-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">RV</div>
          <h2 className="text-3xl font-black text-gray-900">RouteVoice Admin</h2>
          <p className="text-gray-500 mt-2">Enter your security key to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input 
              type="password" 
              placeholder="Admin Password"
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-100 transition-all text-center text-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
            Access Dashboard
          </button>
        </form>
        <div className="mt-8 pt-6 border-t text-center">
          <a href="/driver" className="text-blue-600 font-bold hover:underline">Go to Driver Portal →</a>
        </div>
      </div>
    </div>
  );
}
