import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

const StrategyModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({ title: '', status: 'Active' });

  useEffect(() => {
    if (initialData) {
      setFormData({ title: initialData.title, status: initialData.status });
    } else {
      setFormData({ title: '', status: 'Active' });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
      <div className="bg-[#0b0f1a] border border-slate-800 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold italic text-white">{initialData ? 'Edit Task' : 'New Strategy'}</h3>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-800 rounded-full transition-colors"><X/></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Title</label>
            <input 
              required value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 text-white focus:border-blue-500 outline-none" 
              placeholder="e.g. BTC/USDT" 
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Initial Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 px-5 text-white focus:border-blue-500 outline-none appearance-none"
            >
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Succcess">Success</option>
            </select>
          </div>
          
          <button type="submit" className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
            <Save size={20}/> Save Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default StrategyModal;