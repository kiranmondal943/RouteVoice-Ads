import React, { useState } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    // STRICT CHECK: The button only works if this matches
    if (password === "admin123") {
      setError(false);
      localStorage.setItem("isLoggedIn", "true"); // This is the "Key"
      window.location.href = "/dashboard"; // Move into the app
    } else {
      setError(true);
      alert("Access Denied: Incorrect Admin Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-blue-600 tracking-tight">RouteVoice Admin</h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">Please enter your credentials to manage ads</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Admin Password</label>
              <input
                type="password"
                required
                className={`appearance-none rounded-xl relative block w-full px-4 py-4 border ${error ? 'border-red-500' : 'border-gray-300'} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setError(false);
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg"
            >
              Secure Sign In
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <a href="/driver" className="text-blue-500 text-sm font-semibold hover:underline">
            Switch to Driver View →
          </a>
        </div>
      </div>
    </div>
  );
}
