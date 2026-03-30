import React, { useState } from 'react';
import { Plus, Search, Music, Play, MoreVertical, CheckCircle, Clock, X, Upload } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export default function AudioAds() {
  const { audioAds, addAudioAd } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAd, setNewAd] = useState({ title: '', client: '', duration: '' });

  const filteredAds = audioAds.filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUploadAd = (e: React.FormEvent) => {
    e.preventDefault();
    const ad = {
      id: `A00${audioAds.length + 1}`,
      title: newAd.title,
      client: newAd.client,
      duration: newAd.duration || '0:30',
      status: 'approved' as const,
    };
    addAudioAd(ad);
    setIsModalOpen(false);
    setNewAd({ title: '', client: '', duration: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search audio ads..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" />
          Upload Ad
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {filteredAds.map(ad => (
            <li key={ad.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                  <button className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Play className="w-6 h-6 ml-1" />
                  </button>
                  <div className="ml-4 flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{ad.title}</h3>
                    <div className="mt-1 flex items-center text-sm text-gray-500 space-x-4">
                      <span className="truncate">{ad.client}</span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {ad.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex items-center space-x-4">
                  <span className={`hidden sm:inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                    ad.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ad.status === 'approved' && <CheckCircle className="w-3 h-3 mr-1" />}
                    {ad.status.charAt(0).toUpperCase() + ad.status.slice(1)}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
          {filteredAds.length === 0 && (
            <li className="p-12 text-center">
              <Music className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No audio ads found</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by uploading a new audio ad.</p>
              <div className="mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Upload Ad
                </button>
              </div>
            </li>
          )}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Upload Audio Ad</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUploadAd} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Title</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newAd.title} onChange={e => setNewAd({...newAd, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newAd.client} onChange={e => setNewAd({...newAd, client: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration (e.g. 0:30)</label>
                <input type="text" placeholder="0:30" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newAd.duration} onChange={e => setNewAd({...newAd, duration: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audio File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <span className="text-sm font-medium">Click to upload or drag and drop</span>
                  <span className="text-xs mt-1">MP3, WAV up to 10MB</span>
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">Upload</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
