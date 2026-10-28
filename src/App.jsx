import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import BoardHeader from './components/BoardHeader';
import SummaryStats from './components/SummaryStats';
import KanbanBoard from './components/KanbanBoard';
import TaskModal from './components/TaskModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_TASKS } from './utils/sampleData';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const STORAGE_KEY = 'flowforge_sprint05_tasks_v1';

export default function App() {
  const [tasks, setTasks] = useLocalStorage(STORAGE_KEY, INITIAL_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDefaultStatus, setModalDefaultStatus] = useState('todo');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('kanban');
  const [toast, setToast] = useState(null);

  // Helper to display a lightweight toast alert
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Add a new task (P0)
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
    showToast(`Task "${newTask.title.slice(0, 28)}..." added successfully`);
  };

  // Delete a task (P0)
  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    showToast(`Task removed from board`, 'info');
  };

  // Move a task to a specific column (P0)
  const handleMoveTask = (taskId, targetStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, status: targetStatus } : t))
    );
  };

  // Inline edit task title (P1)
  const handleEditTask = (taskId, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === taskId ? { ...t, title: newTitle } : t))
    );
    showToast(`Task title updated`, 'success');
  };

  // Quick reset to sample tasks
  const handleResetSampleData = () => {
    if (window.confirm('Reset the board to initial Sprint 05 sample tasks?')) {
      setTasks(INITIAL_TASKS);
      setSearchQuery('');
      showToast('Board restored to default sample tasks');
    }
  };

  // Clear all tasks from board
  const handleClearBoard = () => {
    if (window.confirm('Are you sure you want to clear all tasks from the board?')) {
      setTasks([]);
      setSearchQuery('');
      showToast('All tasks cleared from the board', 'info');
    }
  };

  // Open modal targeting specific column
  const handleOpenAddModal = (status = 'todo') => {
    setModalDefaultStatus(status);
    setIsModalOpen(true);
  };

  return (
    <div className="app-layout">
      {/* Deep Navy Left Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
        onResetSampleData={handleResetSampleData}
        onClearBoard={handleClearBoard}
      />

      {/* Main SaaS Workspace */}
      <div className="main-workspace">
        <BoardHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery('')}
          onOpenAddModal={handleOpenAddModal}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="workspace-scrollable">
          <div className="workspace-content-container">
            {/* Real-time Dynamic Statistics */}
            <SummaryStats tasks={tasks} />

            {/* Kanban Columns & DnD Surface */}
            <KanbanBoard
              tasks={tasks}
              setTasks={setTasks}
              searchQuery={searchQuery}
              onClearSearch={() => setSearchQuery('')}
              onDeleteTask={handleDeleteTask}
              onMoveTask={handleMoveTask}
              onEditTask={handleEditTask}
              onOpenAddModal={handleOpenAddModal}
            />
          </div>
        </main>
      </div>

      {/* Add Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
        defaultStatus={modalDefaultStatus}
      />

      {/* Notification Toast */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`} role="status">
          {toast.type === 'success' && <CheckCircle size={16} className="icon-mr" />}
          {toast.type === 'error' && <AlertCircle size={16} className="icon-mr" />}
          {toast.type === 'info' && <Info size={16} className="icon-mr" />}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
