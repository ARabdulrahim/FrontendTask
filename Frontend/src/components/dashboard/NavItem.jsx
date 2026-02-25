import React from 'react';

const NavItem = ({ icon, label, active, isOpen }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${
    active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 font-bold' 
      : 'text-slate-500 hover:bg-slate-800/50 hover:text-white'
  }`}>
    {icon} 
    {isOpen && <span className="text-sm tracking-tight">{label}</span>}
  </div>
);

export default NavItem;