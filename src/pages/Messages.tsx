import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Phone, Video, MoreVertical, X, PhoneCall, Video as VideoIcon, Trash2, Ban } from 'lucide-react';

const initialContacts = [
  { id: 1, name: 'Raju Das', role: 'Driver', lastMessage: 'Proof uploaded for today.', time: '10:30 AM', unread: 2 },
  { id: 2, name: 'Fresh Mart', role: 'Client', lastMessage: 'Can we change the audio ad?', time: 'Yesterday', unread: 0 },
  { id: 3, name: 'Suresh Singh', role: 'Driver', lastMessage: 'Route completed.', time: 'Yesterday', unread: 0 },
];

const initialMessages: Record<number, { id: number; text: string; sender: 'me' | 'them'; time: string }[]> = {
  1: [
    { id: 1, text: 'Hi, I have started the route for today.', sender: 'them', time: '10:00 AM' },
    { id: 2, text: 'Great! Please ensure the volume is set correctly.', sender: 'me', time: '10:05 AM' },
    { id: 3, text: 'Proof uploaded for today.', sender: 'them', time: '10:30 AM' },
  ],
  2: [
    { id: 1, text: 'Can we change the audio ad?', sender: 'them', time: 'Yesterday' },
  ],
  3: [
    { id: 1, text: 'Route completed.', sender: 'them', time: 'Yesterday' },
  ]
};

export default function Messages() {
  const [contacts, setContacts] = useState(initialContacts);
  const [activeContact, setActiveContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [activeCall, setActiveCall] = useState<'audio' | 'video' | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter contacts by name or if any of their messages contain the search term
  const filteredContacts = contacts.filter(c => {
    const matchesName = c.name.toLowerCase().includes(searchTerm.toLowerCase());
    const contactMessages = messages[c.id] || [];
    const matchesMessage = contactMessages.some(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesName || matchesMessage;
  });

  const handleContactClick = (contact: typeof contacts[0]) => {
    setActiveContact(contact);
    // Mark as read
    setContacts(contacts.map(c => c.id === contact.id ? { ...c, unread: 0 } : c));
    setShowDropdown(false);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim()) return;

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'me' as const,
      time: timeString
    };

    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMsg]
    }));

    setContacts(prev => prev.map(c => 
      c.id === activeContact.id 
        ? { ...c, lastMessage: newMessage, time: timeString }
        : c
    ));

    setNewMessage('');
  };

  const clearChat = () => {
    setMessages(prev => ({
      ...prev,
      [activeContact.id]: []
    }));
    setContacts(prev => prev.map(c => 
      c.id === activeContact.id 
        ? { ...c, lastMessage: '', time: '' }
        : c
    ));
    setShowDropdown(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeContact]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm h-[calc(100vh-8rem)] flex overflow-hidden relative">
      {/* Sidebar */}
      <div className="w-full md:w-80 border-r border-gray-200 flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => handleContactClick(contact)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${activeContact.id === contact.id ? 'bg-blue-50' : ''}`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-gray-900">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate pr-4">{contact.lastMessage}</p>
                {contact.unread > 0 && (
                  <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
          {filteredContacts.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              No messages found.
            </div>
          )}
        </div>
      </div>

      {/* Chat Area - Hidden on mobile unless active */}
      <div className="hidden md:flex flex-1 flex-col h-full bg-gray-50">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center relative">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3">
              {activeContact.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">{activeContact.name}</h2>
              <p className="text-xs text-gray-500">{activeContact.role}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-400 relative">
            <button onClick={() => setActiveCall('audio')} className="hover:text-blue-600 transition-colors"><Phone className="w-5 h-5" /></button>
            <button onClick={() => setActiveCall('video')} className="hover:text-blue-600 transition-colors"><Video className="w-5 h-5" /></button>
            <button onClick={() => setShowDropdown(!showDropdown)} className="hover:text-gray-600 transition-colors"><MoreVertical className="w-5 h-5" /></button>
            
            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 top-8 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-1">
                <button 
                  onClick={clearChat}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2 text-gray-400" />
                  Clear Chat
                </button>
                <button 
                  onClick={() => setShowDropdown(false)}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                >
                  <Ban className="w-4 h-4 mr-2 text-red-500" />
                  Block Contact
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          <div className="flex justify-center">
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Today</span>
          </div>
          
          {(messages[activeContact.id] || []).length === 0 ? (
            <div className="flex-1 flex items-center justify-center h-full text-gray-400 text-sm">
              No messages yet. Start the conversation!
            </div>
          ) : (
            (messages[activeContact.id] || []).map((msg) => (
              <div key={msg.id} className={`flex items-end ${msg.sender === 'me' ? 'justify-end' : ''}`}>
                <div className={`${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none'} p-3 rounded-2xl max-w-md shadow-sm`}>
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] mt-1 block ${msg.sender === 'me' ? 'text-blue-200 text-right' : 'text-gray-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
            <input 
              type="text" 
              placeholder="Type a message..." 
              className="flex-1 bg-gray-100 border-transparent rounded-full px-4 py-2 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button 
              type="submit"
              disabled={!newMessage.trim()}
              className="w-10 h-10 bg-blue-600 disabled:bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors flex-shrink-0"
            >
              <Send className="w-4 h-4 ml-1" />
            </button>
          </form>
        </div>
      </div>

      {/* Call Modal */}
      {activeCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden text-white flex flex-col items-center py-12 relative">
            <button 
              onClick={() => setActiveCall(null)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center text-4xl font-bold mb-6 border-4 border-gray-700">
              {activeContact.name.charAt(0)}
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">{activeContact.name}</h2>
            <p className="text-gray-400 mb-12">
              {activeCall === 'audio' ? 'Calling...' : 'Video calling...'}
            </p>
            
            <div className="flex space-x-6">
              <button 
                onClick={() => setActiveCall(null)}
                className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Phone className="w-6 h-6 rotate-[135deg]" />
              </button>
              {activeCall === 'video' && (
                <button 
                  className="w-14 h-14 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center transition-colors"
                >
                  <VideoIcon className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
