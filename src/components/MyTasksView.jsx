import React, { useState } from 'react';
import {
  CheckSquare,
  Square,
  Pencil,
  Trash2,
  Check,
  X,
  Plus,
  Filter,
  Calendar,
  AlertCircle,
  Clock,
  ShieldCheck,
  SearchX
} from 'lucide-react';

const PRIORITY_META = {
  high: { label: 'High', class: 'priority-high', icon: AlertCircle },
  medium: { label: 'Medium', class: 'priority-medium', icon: Clock },
  low: { label: 'Low', class: 'priority-low', icon: ShieldCheck }
};

export default function MyTasksView({
  tasks = [],
  searchQuery = '',
  onAddTask,
  onEditTask,
  onDeleteTask,
  onMoveTask
}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickPriority, setQuickPriority] = useState('medium');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  // Handle Quick Add
  const handleQuickAdd = (e) => {
    e.preventDefault();
    const trimmed = quickTitle.trim();
    if (!trimmed) return;

    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmed,
      description: '',
      priority: quickPriority,
      status: 'todo',
      createdAt: new Date().toISOString()
    };
    onAddTask(newTask);
    setQuickTitle('');
  };

  // Toggle Complete / Incomplete
  const handleToggleTaskStatus = (task) => {
    if (task.status === 'done') {
      onMoveTask(task.id, 'inprogress');
    } else {
      onMoveTask(task.id, 'done');
    }
  };

  // Inline edit handlers
  const handleStartEdit = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title);
  };

  const handleSaveEdit = (taskId) => {
    const trimmed = editTitle.trim();
    if (trimmed) {
      onEditTask(taskId, trimmed);
    }
    setEditingId(null);
  };

  // Filter Tasks
  const query = searchQuery.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) => {
    // Search
    if (query) {
      const matchTitle = task.title.toLowerCase().includes(query);
      const matchDesc = (task.description || '').toLowerCase().includes(query);
      if (!matchTitle && !matchDesc) return false;
    }
    // Status
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    // Priority
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className="mytasks-container">
      {/* Quick Add Task Input Card */}
      <form onSubmit={handleQuickAdd} className="quick-add-card">
        <input
          type="text"
          className="quick-add-input"
          placeholder="Add a new task to your personal backlog... (Press Enter to save)"
          value={quickTitle}
          onChange={(e) => setQuickTitle(e.target.value)}
        />
        <div className="quick-add-controls">
          <select
            className="quick-add-select"
            value={quickPriority}
            onChange={(e) => setQuickPriority(e.target.value)}
            aria-label="Task priority"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={15} className="icon-mr" />
            Add
          </button>
        </div>
      </form>

      {/* Filter Tabs Bar */}
      <div className="mytasks-filter-bar">
        <div className="filter-tab-group">
          {['all', 'todo', 'inprogress', 'done'].map((statusKey) => (
            <button
              key={statusKey}
              type="button"
              className={`filter-tab-btn ${filterStatus === statusKey ? 'tab-btn-active' : ''}`}
              onClick={() => setFilterStatus(statusKey)}
            >
              {statusKey === 'all' && `All (${tasks.length})`}
              {statusKey === 'todo' && `To Do (${tasks.filter((t) => t.status === 'todo').length})`}
              {statusKey === 'inprogress' && `In Progress (${tasks.filter((t) => t.status === 'inprogress').length})`}
              {statusKey === 'done' && `Completed (${completedCount})`}
            </button>
          ))}
        </div>

        <div className="filter-priority-select-wrap">
          <Filter size={14} className="icon-mr text-muted" />
          <select
            className="filter-priority-dropdown"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="high">🔴 High Priority Only</option>
            <option value="medium">🟡 Medium Priority Only</option>
            <option value="low">🟢 Low Priority Only</option>
          </select>
        </div>
      </div>

      {/* Tasks Table / Interactive List */}
      <div className="mytasks-list-wrapper">
        {filteredTasks.length > 0 ? (
          <ul className="mytasks-list">
            {filteredTasks.map((task) => {
              const prioMeta = PRIORITY_META[task.priority] || PRIORITY_META.medium;
              const PrioIcon = prioMeta.icon;
              const isDone = task.status === 'done';
              const isEditing = editingId === task.id;

              return (
                <li
                  key={task.id}
                  className={`mytask-row ${isDone ? 'mytask-row-done' : ''}`}
                >
                  {/* Status Toggle Checkbox */}
                  <button
                    type="button"
                    className="mytask-check-btn"
                    onClick={() => handleToggleTaskStatus(task)}
                    title={isDone ? 'Mark as In Progress' : 'Mark as Done'}
                    aria-label={`Toggle task "${task.title}" status`}
                  >
                    {isDone ? (
                      <CheckSquare size={19} className="text-emerald-500" />
                    ) : (
                      <Square size={19} className="text-muted" />
                    )}
                  </button>

                  {/* Task Content or Inline Edit */}
                  <div className="mytask-content">
                    {isEditing ? (
                      <div className="mytask-edit-wrap">
                        <input
                          type="text"
                          className="form-input form-input-sm"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit(task.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                          autoFocus
                        />
                        <button
                          type="button"
                          className="btn btn-primary btn-xs"
                          onClick={() => handleSaveEdit(task.id)}
                        >
                          <Check size={13} />
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary btn-xs"
                          onClick={() => setEditingId(null)}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span
                          className={`mytask-title ${isDone ? 'title-done' : ''}`}
                          onClick={() => handleStartEdit(task)}
                          title="Click to edit inline"
                        >
                          {task.title}
                        </span>
                        {task.description && (
                          <span className="mytask-desc">{task.description}</span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Priority Badge */}
                  <span className={`priority-badge ${prioMeta.class}`}>
                    <PrioIcon size={12} className="priority-badge-icon" />
                    <span>{prioMeta.label}</span>
                  </span>

                  {/* Column Status Pill */}
                  <span className={`status-pill status-pill-${task.status}`}>
                    <span className={`status-dot status-dot-${task.status}`} />
                    {task.status === 'todo' && 'To Do'}
                    {task.status === 'inprogress' && 'In Progress'}
                    {task.status === 'done' && 'Done'}
                  </span>

                  {/* Actions */}
                  <div className="mytask-actions">
                    {!isEditing && (
                      <button
                        type="button"
                        className="card-action-btn"
                        onClick={() => handleStartEdit(task)}
                        title="Edit task title"
                      >
                        <Pencil size={14} />
                      </button>
                    )}
                    <button
                      type="button"
                      className="card-action-btn delete-btn"
                      onClick={() => onDeleteTask(task.id)}
                      title="Delete task"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty-state">
            <SearchX size={32} className="text-muted" style={{ marginBottom: 12 }} />
            <h4 className="empty-state-title">No tasks found</h4>
            <p className="empty-state-desc">
              {query
                ? `No tasks matched query "${query}".`
                : 'No tasks currently match this filter tab.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
