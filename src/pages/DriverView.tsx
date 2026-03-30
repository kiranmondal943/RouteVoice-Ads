import React, { useState } from 'react';
import { Play, User, IndianRupee, Home, MapPin, Award } from 'lucide-react';

export default function DriverView() {
  const [activeTab, setActiveTab] = useState<'home' | 'profile' | 'earnings'>('home');
  const [driverId, setDriverId] = useState('');
  const [isFound, setIsFound] = useState(false);

  // Mock Driver Data
  const driverData = {
    name: "Kiran Deb Mondal",
    id: "TO-101",
    totalEarnings: "₹4,250",
    todayAds: 12,
    rating: 4.8,
    route: "Garia Station to Patuli C5"
  };

  if (!isFound) {
    return (
      <div className="min-h-screen bg-blue-700 flex items-center justify-center p-6 text-white text-center">
        <div className="max-w-sm w-full space-y-6">
          <h1 className="text-3xl font-black italic">ROUTE VOICE</h1>
          <p className="text-blue-100">Enter your Driver ID to start work</p>
          <input 
            className="w-full p-4 rounded-2xl text-gray-900 font-bold outline-none text-center" 
            placeholder="TO-101"
            onChange={(e) => setDriverId(e.target.value)}
          />
          <button 
            onClick={() => driverId === "TO-101" ? setIsFound(true) : alert("Invalid ID")}
            className="w-full py-4 bg-yellow-400 text-blue-900 font-black rounded-2xl uppercase tracking-widest shadow-xl"
          >
            Start Shift
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans text-gray-900">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 rounded-b-[40px] shadow-lg">
        <p className="text-blue-100 text-sm">Welcome back,</p>
        <h1 className="text-2xl font-bold">{driverData.name}</h1>
      </div>

      <div className="p-6">
        {/* TAB 1: HOME (AD PLAYER) */}
        {activeTab === 'home' && (
          <div className="space-y-6 text-center pt-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="inline-block p-3 bg-green-100 text-green-600 rounded-full text-xs font-bold mb-4 uppercase">System Active</div>
              <h2 className="text-2xl font-black mb-2 italic text-blue-600">Fresh Mart Ad</h2>
              <p className="text-gray-500 mb-8 flex items-center justify-center"><MapPin size={16} className="mr-1" />{driverData.route}</p>
              
              <button 
                onClick={() => alert("Audio playing...")}
                className="w-32 h-32 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-2xl active:scale-95 transition-all"
              >
                <Play size={48} fill="currentColor" />
              </button>
              <p className="mt-6 text-blue-600 font-black animate-pulse">TAP TO PLAY AUDIO</p>
            </div>
          </div>
        )}

        {/* TAB 2: EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Your Earnings</h2>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Earned</p>
                <p className="text-3xl font-black text-green-600">{driverData.totalEarnings}</p>
              </div>
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><IndianRupee /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase">Ads Played Today</p>
                <p className="text-xl font-bold">{driverData.todayAds}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-500 text-xs uppercase">Bonus Earned</p>
                <p className="text-xl font-bold">₹150</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
             <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center">
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">K</div>
                <h3 className="font-bold text-xl">{driverData.name}</h3>
                <p className="text-gray-500 text-sm">{driverData.id}</p>
                <div className="mt-4 flex items-center justify-center text-yellow-500 space-x-1 font-bold">
                  <Award size={18} /> <span>{driverData.rating} Star Driver</span>
                </div>
             </div>
             <button onClick={() => setIsFound(false)} className="w-full p-4 text-red-600 font-bold">Sign Out Shift</button>
          </div>
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-20 flex items-center justify-around px-6">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-blue-600' : 'text-gray-400'}`}>
          <Home size={24} />
          <span className="text-[10px] mt-1 font-bold">HOME</span>
        </button>
        <button onClick={() => setActiveTab('earnings')} className={`flex flex-col items-center ${activeTab === 'earnings' ? 'text-blue-600' : 'text-gray-400'}`}>
          <IndianRupee size={24} />
          <span className="text-[10px] mt-1 font-bold">EARNINGS</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={`flex flex-col items-center ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-400'}`}>
          <User size={24} />
          <span className="text-[10px] mt-1 font-bold">PROFILE</span>
        </button>
      </nav>
    </div>
  );
}
