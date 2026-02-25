import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-800/30 text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]">
            <th className="px-8 py-5">Title</th>
            <th className="px-8 py-5">Status</th>
            <th className="px-8 py-5 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {tasks.length > 0 ? tasks.map((task) => (
            <tr key={task._id} className="hover:bg-blue-500/5 transition-colors group">
              <td className="px-8 py-5 font-bold text-lg text-white">{task.title}</td>
              <td className="px-8 py-5 text-xs">
                <span className={`px-3 py-1 rounded-full font-black uppercase tracking-tighter ${
                  task.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-800 text-slate-500'
                }`}>
                  {task.status}
                </span>
              </td>
              <td className="px-8 py-5">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(task)} className="p-2 hover:bg-slate-800 rounded-lg text-blue-400"><Edit size={18}/></button>
                  <button onClick={() => onDelete(task._id)} className="p-2 hover:bg-slate-800 rounded-lg text-rose-500"><Trash2 size={18}/></button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5" className="px-8 py-10 text-center text-slate-500 italic">No strategies found matching your search.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;