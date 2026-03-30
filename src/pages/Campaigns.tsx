import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Play, Pause, CheckCircle, X } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export default function Campaigns() {
  const { campaigns, addCampaign, updateCampaign } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingCampaign, setViewingCampaign] = useState<any>(null);
  const [newCampaign, setNewCampaign] = useState({ title: '', client: '', budget: '', driversAssigned: '' });

  const filteredCampaigns = campaigns.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign = {
      id: `C00${campaigns.length + 1}`,
      title: newCampaign.title,
      client: newCampaign.client,
      status: 'pending' as const,
      progress: 0,
      driversAssigned: parseInt(newCampaign.driversAssigned) || 0,
      budget: parseInt(newCampaign.budget) || 0
    };
    addCampaign(campaign);
    setIsModalOpen(false);
    setNewCampaign({ title: '', client: '', budget: '', driversAssigned: '' });
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'paused' : 'active';
    updateCampaign(id, { status: newStatus as any });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search campaigns..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 font-medium w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium w-full sm:w-auto"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map(campaign => (
          <div key={campaign.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                  campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                  campaign.status === 'paused' ? 'bg-orange-100 text-orange-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                </span>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{campaign.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{campaign.client}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Drivers Assigned</span>
                  <span className="font-medium text-gray-900">{campaign.driversAssigned}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Budget</span>
                  <span className="font-medium text-gray-900">₹{campaign.budget}</span>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-900">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 flex justify-between items-center border-t border-gray-100">
              {campaign.status === 'active' ? (
                <button 
                  onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                  className="flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
                >
                  <Pause className="w-4 h-4 mr-1" /> Pause
                </button>
              ) : campaign.status === 'pending' || campaign.status === 'paused' ? (
                <button 
                  onClick={() => handleToggleStatus(campaign.id, campaign.status)}
                  className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
                >
                  <Play className="w-4 h-4 mr-1" /> Start
                </button>
              ) : (
                <span className="flex items-center text-sm font-medium text-gray-500">
                  <CheckCircle className="w-4 h-4 mr-1" /> Completed
                </span>
              )}
              <button 
                onClick={() => setViewingCampaign(campaign)}
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
          <Play className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No campaigns found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new campaign.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Campaign
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">New Campaign</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddCampaign} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Title</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newCampaign.title} onChange={e => setNewCampaign({...newCampaign, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input required type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newCampaign.client} onChange={e => setNewCampaign({...newCampaign, client: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                  <input required type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newCampaign.budget} onChange={e => setNewCampaign({...newCampaign, budget: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drivers Needed</label>
                  <input required type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newCampaign.driversAssigned} onChange={e => setNewCampaign({...newCampaign, driversAssigned: e.target.value})} />
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">Create Campaign</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewingCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Details</h2>
              <button onClick={() => setViewingCampaign(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium text-gray-900">{viewingCampaign.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Client</p>
                <p className="font-medium text-gray-900">{viewingCampaign.client}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="font-medium text-gray-900 capitalize">{viewingCampaign.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="font-medium text-gray-900">{viewingCampaign.progress}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium text-gray-900">₹{viewingCampaign.budget}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Drivers Assigned</p>
                  <p className="font-medium text-gray-900">{viewingCampaign.driversAssigned}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-end">
              <button onClick={() => setViewingCampaign(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
