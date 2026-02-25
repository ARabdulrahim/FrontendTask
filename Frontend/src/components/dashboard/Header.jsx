import React, { useContext, useEffect } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { authContext } from '../../context/AuthProvider';

const Header = ({ searchQuery, setSearchQuery, toggleSidebar }) => {
  let{handleGetProfile, profile}=useContext(authContext);

  useEffect(()=>{
    handleGetProfile();
  },[]);

  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/20">
      <div className="flex items-center gap-4">
        {/* Toggle Button */}
        <button 
          onClick={toggleSidebar} 
          className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-lg"
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-slate-500" size={18} />
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 w-64" 
            placeholder="Search strategies..." 
          />
        </div>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6">
        <Bell size={20} className="text-slate-400 cursor-pointer hover:text-white" />
        <div className="flex items-center gap-3 border-l border-slate-800 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white">{profile.name}</p>
            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter">Task Member</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">
              AT
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;