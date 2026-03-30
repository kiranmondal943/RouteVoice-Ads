import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';

// Types
export interface Driver {
  id: string;
  name: string;
  phone: string;
  route: string;
  status: 'active' | 'inactive';
  earnings: number;
  rating: number;
}

export interface Campaign {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'pending' | 'completed';
  progress: number;
  driversAssigned: number;
  budget: number;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  phone: string;
  activeCampaigns: number;
  totalSpent: number;
}

export interface Route {
  id: string;
  name: string;
  coverage: string;
  drivers: number;
  pricePerDay: number;
}

export interface AudioAd {
  id: string;
  title: string;
  duration: string;
  client: string;
  status: 'approved' | 'pending' | 'rejected';
}

export interface Transaction {
  id: string;
  client: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  type: string;
}

export interface SignedDocument {
  id: string;
  name: string;
  signature: string;
  date: string;
}

interface AppState {
  drivers: Driver[];
  campaigns: Campaign[];
  clients: Client[];
  routes: Route[];
  audioAds: AudioAd[];
  transactions: Transaction[];
  signedDocuments: SignedDocument[];
}

interface AppContextType extends AppState {
  addDriver: (driver: Driver) => void;
  updateDriver: (id: string, updates: Partial<Driver>) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  addClient: (client: Client) => void;
  addRoute: (route: Route) => void;
  addAudioAd: (ad: AudioAd) => void;
  addTransaction: (transaction: Transaction) => void;
  addSignedDocument: (doc: SignedDocument) => void;
  stats: {
    totalDrivers: number;
    activeDrivers: number;
    totalClients: number;
    activeCampaigns: number;
    monthlyRevenue: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialState: AppState = {
  drivers: [],
  campaigns: [],
  clients: [],
  routes: [],
  audioAds: [],
  transactions: [],
  signedDocuments: []
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('appState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialState;
      }
    }
    return initialState;
  });

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  const addDriver = (driver: Driver) => setState(s => ({ ...s, drivers: [driver, ...s.drivers] }));
  const updateDriver = (id: string, updates: Partial<Driver>) => setState(s => ({
    ...s,
    drivers: s.drivers.map(d => d.id === id ? { ...d, ...updates } : d)
  }));

  const addCampaign = (campaign: Campaign) => setState(s => ({ ...s, campaigns: [campaign, ...s.campaigns] }));
  const updateCampaign = (id: string, updates: Partial<Campaign>) => setState(s => ({
    ...s,
    campaigns: s.campaigns.map(c => c.id === id ? { ...c, ...updates } : c)
  }));

  const addClient = (client: Client) => setState(s => ({ ...s, clients: [client, ...s.clients] }));
  const addRoute = (route: Route) => setState(s => ({ ...s, routes: [route, ...s.routes] }));
  const addAudioAd = (ad: AudioAd) => setState(s => ({ ...s, audioAds: [ad, ...s.audioAds] }));
  const addTransaction = (transaction: Transaction) => setState(s => ({ ...s, transactions: [transaction, ...s.transactions] }));
  const addSignedDocument = (doc: SignedDocument) => setState(s => ({ ...s, signedDocuments: [doc, ...(s.signedDocuments || [])] }));

  const stats = useMemo(() => {
    const totalDrivers = state.drivers.length;
    const activeDrivers = state.drivers.filter(d => d.status === 'active').length;
    const totalClients = state.clients.length;
    const activeCampaigns = state.campaigns.filter(c => c.status === 'active').length;
    
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyRevenue = state.transactions
      .filter(t => {
        if (t.amount <= 0 || t.status !== 'completed') return false;
        // Parse YYYY-MM-DD in local time to avoid timezone shifts
        const [year, month, day] = t.date.split('-').map(Number);
        const tDate = new Date(year, month - 1, day);
        return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
      })
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalDrivers,
      activeDrivers,
      totalClients,
      activeCampaigns,
      monthlyRevenue
    };
  }, [state]);

  return (
    <AppContext.Provider value={{
      ...state,
      addDriver,
      updateDriver,
      addCampaign,
      updateCampaign,
      addClient,
      addRoute,
      addAudioAd,
      addTransaction,
      addSignedDocument,
      stats
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
