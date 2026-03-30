import React, { useState } from 'react';
import { Play, Search, MapPin } from 'lucide-react';

export default function DriverView() {
  const [driverId, setDriverId] = useState('');
  const [activeAd, setActiveAd] = useState<any>(null);

  const checkAd = () => {
    // This is "Mock" data. Later, this will fetch from your Google Sheet/Supabase
    if (driverId === "TO-101") {
      setActiveAd({
        client: "Fresh Mart Grocery",
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        route: "Garia Station to Patuli"
      });
    } else {
      alert("Driver ID not found. Try 'TO-101'");
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 p-6 flex flex-col items-center text-white font-sans">
      <h1 className="text-2xl font-bold mb-8">RouteVoice Driver App</h1>
      
      {!activeAd ? (
        <div className="w-full max-w-sm space-y-4 bg-white/10 p-6 rounded-2xl backdrop-blur-md">
          <label className="block text-sm font-medium">Enter your Toto ID</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="e.g. TO-101"
              className="w-full p-4 rounded-xl text-gray-900 outline-none"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
            />
          </div>
          <button 
            onClick={checkAd}
            className="w-full py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl flex items-center justify-center space-x-2"
          >
            <Search size={20} />
            <span>Check for Ads</span>
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm bg-white text-gray-900 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-bounce-in">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <MapPin size={40} />
            </div>
            <h2 className="text-xl font-bold">{activeAd.client}</h2>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">{activeAd.route}</p>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => {
                const audio = new Audio(activeAd.audioUrl);
                audio.play();
              }}
              className="w-28 h-28 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Play size={48} fill="currentColor" />
            </button>
            <p className="mt-4 font-bold text-blue-600 animate-pulse text-lg">TAP TO PLAY AD</p>
          </div>

          <button onClick={() => setActiveAd(null)} className="text-gray-400 text-sm underline pt-4">Switch Driver ID</button>
        </div>
      )}
    </div>
  );
}
