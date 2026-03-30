import { Users, Megaphone, IndianRupee, Activity, PlayCircle, CheckCircle, Pause, Play } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export default function Dashboard() {
  const { stats, campaigns, drivers, updateCampaign } = useAppContext();

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Active Drivers" 
          value={stats.activeDrivers.toString()} 
          subtitle={`Out of ${stats.totalDrivers} total`}
          icon={Users}
          color="bg-blue-50 text-blue-600"
        />
        <StatCard 
          title="Active Campaigns" 
          value={stats.activeCampaigns.toString()} 
          subtitle="Running today"
          icon={Megaphone}
          color="bg-green-50 text-green-600"
        />
        <StatCard 
          title="Monthly Revenue" 
          value={`₹${stats.monthlyRevenue.toLocaleString('en-IN')}`} 
          subtitle="Earned this month"
          icon={IndianRupee}
          color="bg-purple-50 text-purple-600"
        />
        <StatCard 
          title="Total Clients" 
          value={stats.totalClients.toString()} 
          subtitle="Active subscriptions"
          icon={Activity}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Quick Actions - Core Feature */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Daily Operations Control</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            <PlayCircle className="w-5 h-5" />
            <span>Broadcast Ads to All Drivers</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            <CheckCircle className="w-5 h-5" />
            <span>Verify Proof of Work</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white py-3 px-4 rounded-lg font-medium transition-colors">
            <Megaphone className="w-5 h-5" />
            <span>New Campaign Launch</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Campaigns */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Live Campaigns</h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{campaign.title}</h3>
                    <p className="text-sm text-gray-500">{campaign.client}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    campaign.status === 'active' ? 'bg-green-100 text-green-700' :
                    campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium text-gray-900">{campaign.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${campaign.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-end space-x-3">
                    {campaign.status === 'active' ? (
                      <button 
                        onClick={() => updateCampaign(campaign.id, { status: 'paused' })}
                        className="flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-700"
                      >
                        <Pause className="w-4 h-4 mr-1" /> Pause
                      </button>
                    ) : campaign.status === 'pending' || campaign.status === 'paused' ? (
                      <button 
                        onClick={() => updateCampaign(campaign.id, { status: 'active' })}
                        className="flex items-center text-sm font-medium text-green-600 hover:text-green-700"
                      >
                        <Play className="w-4 h-4 mr-1" /> Start
                      </button>
                    ) : (
                      <span className="flex items-center text-sm font-medium text-gray-500">
                        <CheckCircle className="w-4 h-4 mr-1" /> Completed
                      </span>
                    )}
                    <a 
                      href="/campaigns"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {campaigns.length === 0 && (
              <div className="p-6 text-center text-gray-500">No campaigns yet.</div>
            )}
          </div>
        </div>

        {/* Driver Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Driver Activity</h2>
            <button className="text-sm text-blue-600 font-medium hover:text-blue-700">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {drivers.map(driver => (
              <div key={driver.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{driver.name}</h3>
                    <p className="text-sm text-gray-500">{driver.route}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${driver.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className="text-sm text-gray-600 capitalize">{driver.status}</span>
                </div>
              </div>
            ))}
            {drivers.length === 0 && (
              <div className="p-6 text-center text-gray-500">No drivers yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, color }: any) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-500 mt-1">{subtitle}</span>
      </div>
    </div>
  );
}
