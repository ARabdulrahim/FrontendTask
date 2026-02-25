import React, { useContext } from 'react';
import { LayoutGrid, TrendingUp, Wallet, User, LogOut } from 'lucide-react';
import NavItem from './NavItem';
import { authContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen }) => {
  let{handleLogout}=useContext(authContext);
  let navigate= useNavigate();
  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800 flex flex-col z-20`}>
      <div className="p-6 mb-4 flex items-center gap-3">
        <div onClick={()=> navigate("/")} className="w-8 h-8 bg-blue-600 rounded-lg flex-shrink-0 flex items-center justify-center font-bold cursor-pointer">P</div>
        {isOpen && <span className="font-bold text-xl tracking-tight text-white">Planzo</span>}
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <NavItem icon={<LayoutGrid size={20}/>} label="Dashboard" active isOpen={isOpen} />
        <NavItem icon={<TrendingUp size={20}/>} label="Analytics" isOpen={isOpen} />
        <NavItem icon={<Wallet size={20}/>} label="Assets" isOpen={isOpen} />
        <NavItem icon={<User size={20}/>} label="Profile" isOpen={isOpen} />
      </nav>

      <button className="p-6 flex items-center gap-3 text-slate-500 hover:text-red-400 transition-colors">
        <LogOut onClick={handleLogout} size={20} /> {isOpen && <span className="font-bold uppercase text-xs tracking-widest">Logout</span>}
      </button>
    </aside>
  );
};

export default Sidebar;