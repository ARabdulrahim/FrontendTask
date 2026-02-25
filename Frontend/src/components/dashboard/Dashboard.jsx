import React, { useState, useMemo, useCallback, useContext, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import TaskTable from './TaskTable';
import TaskModal from './TaskModal';
import AuthUser from '../../context/AuthUser';
import { authContext } from '../../context/AuthProvider';

const Dashboard = () => {

  // --- STATE ---
  let{handleCreateTask, handleFetchAllTask, handleUpdateTask, handleDeleteTask, tasks}=useContext(authContext);

  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // --- LOGIC ---
  
  // Memoized filtered list for performance
  const filteredTasks = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return tasks.filter(t => 
      t.title.toLowerCase().includes(query) 
    );
  }, [tasks, searchQuery]);

  // Sidebar Toggle
  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  // Create or Update Task
  const handleSaveTask = (formData) => {
    if (editingTask) {
      handleUpdateTask(formData, editingTask._id);
      closeModal();
    } else {
      handleCreateTask(formData);
      closeModal();
    }
    
  };

  const deleteTask = (id) => {
    if (window.confirm("Are you sure you want to delete this strategy?")) {
      handleDeleteTask(id);
    }
  };

  // --- MODAL CONTROLS ---
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  useEffect(()=>{
    handleFetchAllTask();
  },[handleCreateTask, handleUpdateTask, handleDeleteTask]);

  return (
    <div className="flex h-screen bg-[#0b0f1a] overflow-hidden font-sans text-slate-200">
      {/* LEFT NAVIGATION */}
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          toggleSidebar={toggleSidebar} 
        />

        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black italic mb-1 tracking-tight text-white uppercase">
                Task Manager
              </h2>
              <p className="text-slate-500 text-sm font-medium">
                Track and manage your automated trading task.
              </p>
            </div>
            
            <button 
              onClick={openCreateModal}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/30 active:scale-95 whitespace-nowrap"
            >
              <Plus size={20} strokeWidth={3} /> 
              <span>New Task</span>
            </button>
          </div>

          {/* DATA TABLE */}
          <TaskTable 
            tasks={filteredTasks} 
            onEdit={openEditModal}
            onDelete={deleteTask}
          />
          
          {/* FOOTER STATS (Optional addition) */}
          <div className="mt-6 flex gap-4">
            <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
              Active Tasks: {tasks.filter(t => t.status === 'Active').length}
            </div>
            <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold border-l border-slate-800 pl-4">
              Total Managed: {tasks.length}
            </div>
          </div>
        </div>
      </main>

      {/* CREATE/EDIT OVERLAY */}
      <TaskModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onSave={handleSaveTask} 
        initialData={editingTask}
      />
    </div>
  );
};

export default AuthUser(Dashboard);