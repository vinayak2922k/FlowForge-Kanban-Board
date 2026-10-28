import React, { useState, useRef, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  GripVertical,
  Pencil,
  Trash2,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Calendar,
  AlertCircle,
  Clock,
  ShieldCheck,
  MoreVertical
} from 'lucide-react';

const PRIORITY_CONFIG = {
  high: {
    label: 'High',
    className: 'priority-high',
    icon: AlertCircle,
    color: '#ef4444'
  },
  medium: {
    label: 'Medium',
    className: 'priority-medium',
    icon: Clock,
    color: '#f59e0b'
  },
  low: {
    label: 'Low',
    className: 'priority-low',
    icon: ShieldCheck,
    color: '#10b981'
  }
};

const NEXT_STATUS = {
  todo: 'inprogress',
  inprogress: 'done',
  done: 'todo'
};

const PREV_STATUS = {
  todo: 'done',
  inprogress: 'todo',
  done: 'inprogress'
};

const STATUS_LABELS = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done'
};

export default function TaskCard({
  task,
  onDeleteTask,
  onMoveTask,
  onEditTask,
  isOverlay = false
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editError, setEditError] = useState('');
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const inputRef = useRef(null);
  const menuRef = useRef(null);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: task.id,
    disabled: isEditing || isOverlay
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.35 : 1
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  // Close status dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowStatusMenu(false);
      }
    }
    if (showStatusMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStatusMenu]);

  const handleStartEdit = () => {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(true);
    setShowStatusMenu(false);
  };

  const handleSaveEdit = () => {
    const trimmed = editTitle.trim();
    if (!trimmed) {
      setEditError('Title cannot be empty');
      return;
    }
    onEditTask(task.id, trimmed);
    setIsEditing(false);
    setEditError('');
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditError('');
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  const priorityMeta = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.medium;
  const PriorityIcon = priorityMeta.icon;

  const formattedDate = task.createdAt
    ? new Date(task.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })
    : null;

  return (
    <article
      ref={setNodeRef}
      style={style}
      className={`task-card ${priorityMeta.className} ${
        isOverlay ? 'task-card-overlay' : ''
      } ${isDragging ? 'task-card-dragging' : ''}`}
      aria-labelledby={`task-title-${task.id}`}
    >
      {/* Card Header: Drag Handle, Priority Badge, Quick Controls */}
      <div className="task-card-header">
        <div className="task-card-header-left">
          {/* Drag Handle */}
          <button
            type="button"
            className="drag-handle-btn"
            title="Drag to reorder or move"
            aria-label="Drag task to another column or position"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={16} />
          </button>

          {/* Priority Badge */}
          <span className={`priority-badge ${priorityMeta.className}`}>
            <PriorityIcon size={12} className="priority-badge-icon" aria-hidden="true" />
            <span>{priorityMeta.label}</span>
          </span>
        </div>

        {/* Action Controls: Edit, Status Menu, Delete */}
        <div className="task-card-header-actions" ref={menuRef}>
          {!isEditing && (
            <>
              <button
                type="button"
                className="card-action-btn edit-btn"
                onClick={handleStartEdit}
                title="Edit title (inline)"
                aria-label={`Edit task "${task.title}"`}
              >
                <Pencil size={13} />
              </button>

              <div className="status-dropdown-wrapper">
                <button
                  type="button"
                  className="card-action-btn status-menu-trigger"
                  onClick={() => setShowStatusMenu((prev) => !prev)}
                  title="Change status"
                  aria-label="Change task column status"
                  aria-expanded={showStatusMenu}
                >
                  <MoreVertical size={13} />
                </button>

                {showStatusMenu && (
                  <div className="status-menu-popup" role="menu">
                    <span className="status-menu-label">Move to:</span>
                    {['todo', 'inprogress', 'done'].map((statusKey) => (
                      <button
                        key={statusKey}
                        type="button"
                        role="menuitem"
                        disabled={task.status === statusKey}
                        className={`status-menu-item ${
                          task.status === statusKey ? 'status-menu-item-active' : ''
                        }`}
                        onClick={() => {
                          onMoveTask(task.id, statusKey);
                          setShowStatusMenu(false);
                        }}
                      >
                        <span className={`status-dot status-dot-${statusKey}`} />
                        {STATUS_LABELS[statusKey]}
                        {task.status === statusKey && (
                          <Check size={13} className="ml-auto text-muted" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="button"
                className="card-action-btn delete-btn"
                onClick={() => onDeleteTask(task.id)}
                title="Delete task"
                aria-label={`Delete task "${task.title}"`}
              >
                <Trash2 size={13} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Card Body: Title (or Inline Edit Input) & Optional Description */}
      <div className="task-card-body">
        {isEditing ? (
          <div className="inline-edit-box">
            <input
              ref={inputRef}
              type="text"
              className={`inline-edit-input ${editError ? 'input-error' : ''}`}
              value={editTitle}
              onChange={(e) => {
                setEditTitle(e.target.value);
                if (editError) setEditError('');
              }}
              onKeyDown={handleKeyDown}
              aria-label="Edit task title"
              placeholder="Task title..."
            />
            {editError && <span className="inline-edit-error">{editError}</span>}
            <div className="inline-edit-actions">
              <button
                type="button"
                className="btn btn-primary btn-xs"
                onClick={handleSaveEdit}
                title="Save changes (Enter)"
              >
                <Check size={12} className="icon-mr" />
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-xs"
                onClick={handleCancelEdit}
                title="Cancel changes (Esc)"
              >
                <X size={12} className="icon-mr" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <h3
            id={`task-title-${task.id}`}
            className="task-title"
            onClick={handleStartEdit}
            title="Click to edit inline"
          >
            {task.title}
          </h3>
        )}

        {task.description && !isEditing && (
          <p className="task-description">{task.description}</p>
        )}
      </div>

      {/* Card Footer: Creation Date and Quick Column Steppers */}
      <div className="task-card-footer">
        {formattedDate && (
          <div className="task-date">
            <Calendar size={12} className="task-date-icon" aria-hidden="true" />
            <span>{formattedDate}</span>
          </div>
        )}

        {/* Quick Stepper Buttons for One-Click Accessibility */}
        <div className="task-steppers">
          {task.status !== 'todo' && (
            <button
              type="button"
              className="stepper-btn stepper-prev"
              onClick={() => onMoveTask(task.id, PREV_STATUS[task.status])}
              title={`Move back to ${STATUS_LABELS[PREV_STATUS[task.status]]}`}
              aria-label={`Move back to ${STATUS_LABELS[PREV_STATUS[task.status]]}`}
            >
              <ArrowLeft size={12} />
              <span className="stepper-text">Prev</span>
            </button>
          )}
          {task.status !== 'done' && (
            <button
              type="button"
              className="stepper-btn stepper-next"
              onClick={() => onMoveTask(task.id, NEXT_STATUS[task.status])}
              title={`Move forward to ${STATUS_LABELS[NEXT_STATUS[task.status]]}`}
              aria-label={`Move forward to ${STATUS_LABELS[NEXT_STATUS[task.status]]}`}
            >
              <span className="stepper-text">Next</span>
              <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

