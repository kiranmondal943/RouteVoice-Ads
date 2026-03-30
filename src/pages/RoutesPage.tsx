import React, { useState } from 'react';
import { Plus, Search, Map, Users, TrendingUp, X } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export default function RoutesPage() {
  const { routes, addRoute } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({ name: '', coverage: 'Medium', drivers: '', pricePerDay: '' });

  const filteredRoutes = routes.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRoute = (e: React.FormEvent) => {
    e.preventDefault();
    const route = {
      id: `R00${routes.length + 1}`,
      name: newRoute.name,
      coverage: newRoute.coverage,
      drivers: parseInt(newRoute.drivers) || 0,
      pricePerDay: parseInt(newRoute.pricePerDay) || 0
    };
    addRoute(route);
    setIsModalOpen(false);
    setNewRoute({ name: '', coverage: 'Medium', drivers: '', pricePerDay: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search routes..." 
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
          Add Route
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoutes.map(route => (
          <div key={route.id} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Map className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{route.name}</h3>
                  <p className="text-sm text-gray-500">{route.id}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="text-sm">Coverage</span>
                </div>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  route.coverage === 'Very High' ? 'bg-green-100 text-green-700' :
                  route.coverage === 'High' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {route.coverage}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="text-sm">Active Drivers</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{route.drivers}</span>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Price per day</span>
                <span className="text-lg font-bold text-gray-900">₹{route.pricePerDay}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredRoutes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
          <Map className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No routes found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by adding a new route.</p>
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <Plus className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New Route
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Add New Route</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddRoute} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route Name</label>
                <input required type="text" placeholder="e.g. Station - Market" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newRoute.name} onChange={e => setNewRoute({...newRoute, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Coverage Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={newRoute.coverage} onChange={e => setNewRoute({...newRoute, coverage: e.target.value})}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Very High">Very High</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Est. Drivers</label>
                  <input required type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newRoute.drivers} onChange={e => setNewRoute({...newRoute, drivers: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price/Day (₹)</label>
                  <input required type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={newRoute.pricePerDay} onChange={e => setNewRoute({...newRoute, pricePerDay: e.target.value})} />
                </div>
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium">Save Route</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
