import React, { useState } from 'react';
import { Search, Download, CheckCircle, Clock, XCircle, Plus, ArrowUpRight, FileSignature, X } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export default function Payments() {
  const { transactions, addTransaction, signedDocuments, addSignedDocument } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModal, setActiveModal] = useState<'addFunds' | 'processPayout' | 'signDocument' | null>(null);
  const [activeTab, setActiveTab] = useState<'transactions' | 'documents'>('transactions');
  
  // Form states
  const [addFundsAmount, setAddFundsAmount] = useState('');
  const [addFundsClient, setAddFundsClient] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutDriver, setPayoutDriver] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [signature, setSignature] = useState('');

  const filteredPayments = transactions.filter(p => 
    p.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDocuments = (signedDocuments || []).filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.signature.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLocalDateString = () => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  };

  const handleAddFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment = {
      id: `PAY-00${transactions.length + 1}`,
      client: addFundsClient,
      amount: Number(addFundsAmount),
      date: getLocalDateString(),
      status: 'completed' as const,
      type: 'Top-up' as const
    };
    addTransaction(newPayment);
    setActiveModal(null);
    setAddFundsAmount('');
    setAddFundsClient('');
  };

  const handleProcessPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const newPayment = {
      id: `PAY-00${transactions.length + 1}`,
      client: payoutDriver,
      amount: -Number(payoutAmount),
      date: getLocalDateString(),
      status: 'pending' as const,
      type: 'Payout' as const
    };
    addTransaction(newPayment);
    setActiveModal(null);
    setPayoutAmount('');
    setPayoutDriver('');
  };

  const handleSignDocument = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc = {
      id: `DOC-00${(signedDocuments?.length || 0) + 1}`,
      name: documentName,
      signature: signature,
      date: getLocalDateString()
    };
    addSignedDocument(newDoc);
    setActiveModal(null);
    setDocumentName('');
    setSignature('');
    setActiveTab('documents');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'transactions' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'documents' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Signed Documents
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setActiveModal('addFunds')}
            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </button>
          <button 
            onClick={() => setActiveModal('processPayout')}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Process Payout
          </button>
          <button 
            onClick={() => setActiveModal('signDocument')}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors"
          >
            <FileSignature className="w-4 h-4 mr-2" />
            Sign Document
          </button>
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder={activeTab === 'transactions' ? "Search transactions..." : "Search documents..."}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {activeTab === 'transactions' ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client / Driver</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {payment.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {payment.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={payment.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        {payment.amount > 0 ? '+' : ''}₹{Math.abs(payment.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        payment.status === 'completed' ? 'bg-green-100 text-green-800' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {payment.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {payment.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                        {payment.status === 'failed' && <XCircle className="w-3 h-3 mr-1" />}
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signed By</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {doc.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-serif italic">
                      {doc.signature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Signed
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredDocuments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FileSignature className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-sm font-semibold text-gray-900">No signed documents</h3>
                        <p className="mt-1 text-sm text-gray-500">Sign a new document to see it here.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add Funds Modal */}
      {activeModal === 'addFunds' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Add Funds</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddFunds} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g., Fresh Mart"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={addFundsClient} 
                  onChange={e => setAddFundsClient(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input 
                  required 
                  type="number" 
                  min="1"
                  placeholder="5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={addFundsAmount} 
                  onChange={e => setAddFundsAmount(e.target.value)} 
                />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">Add Funds</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Process Payout Modal */}
      {activeModal === 'processPayout' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Process Driver Payout</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleProcessPayout} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g., Raju Das"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={payoutDriver} 
                  onChange={e => setPayoutDriver(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payout Amount (₹)</label>
                <input 
                  required 
                  type="number" 
                  min="1"
                  placeholder="450"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={payoutAmount} 
                  onChange={e => setPayoutAmount(e.target.value)} 
                />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">Process Payout</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sign Document Modal */}
      {activeModal === 'signDocument' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Sign Document</h2>
              <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSignDocument} className="p-4 space-y-4">
              <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-4">
                Use this feature to digitally sign driver agreements or client contracts.
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g., Driver Agreement - Raju Das"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={documentName} 
                  onChange={e => setDocumentName(e.target.value)} 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Digital Signature (Type Full Name)</label>
                <input 
                  required 
                  type="text" 
                  placeholder="Your Full Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-serif italic text-lg" 
                  value={signature} 
                  onChange={e => setSignature(e.target.value)} 
                />
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors">Sign & Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
