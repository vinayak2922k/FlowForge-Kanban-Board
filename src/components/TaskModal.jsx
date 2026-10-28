import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, AlertCircle, Sparkles } from 'lucide-react';

export default function TaskModal({
  isOpen,
  onClose,
  onAddTask,
  defaultStatus = 'todo'
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [status, setStatus] = useState(defaultStatus);
  const [error, setError] = useState('');

  const titleInputRef = useRef(null);

  // Sync default status when opened from column quick-add
  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setStatus(defaultStatus || 'todo');
      setError('');
      // Auto-focus on input after mount
      setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, defaultStatus]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Please provide a task title to continue.');
      titleInputRef.current?.focus();
      return;
    }

    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      description: description.trim(),
      priority,
      status,
      createdAt: new Date().toISOString()
    };

    onAddTask(newTask);
    onClose();
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-dialog">
        <div className="modal-header">
          <div className="modal-header-text">
            <div className="modal-badge">
              <Sparkles size={13} className="icon-mr" />
              <span>Sprint Task</span>
            </div>
            <h2 id="modal-title" className="modal-title">
              Create New Task
            </h2>
            <p className="modal-subtitle">
              Plan smarter and track execution momentum.
            </p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close task creation modal"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="task-title-input" className="form-label">
              Task Title <span className="required-indicator">*</span>
            </label>
            <input
              id="task-title-input"
              ref={titleInputRef}
              type="text"
              className={`form-input ${error ? 'input-has-error' : ''}`}
              placeholder="e.g. Implement OAuth token refresh handler"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              required
            />
            {error && (
              <p className="form-error-msg" role="alert">
                <AlertCircle size={14} className="icon-mr" />
                {error}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="task-desc-input" className="form-label">
              Description <span className="optional-label">(Optional)</span>
            </label>
            <textarea
              id="task-desc-input"
              className="form-textarea"
              rows={3}
              placeholder="Provide background, technical goals, or acceptance criteria..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Priority & Target Column Row */}
          <div className="form-row">
            <div className="form-group col-half">
              <label htmlFor="task-priority-select" className="form-label">
                Priority Level
              </label>
              <select
                id="task-priority-select"
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high">🔴 High Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="low">🟢 Low Priority</option>
              </select>
            </div>

            <div className="form-group col-half">
              <label htmlFor="task-status-select" className="form-label">
                Initial Column
              </label>
              <select
                id="task-status-select"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="todo">📋 To Do</option>
                <option value="inprogress">⚡ In Progress</option>
                <option value="done">✅ Done</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Plus size={16} className="icon-mr" />
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

