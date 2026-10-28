import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { Plus } from 'lucide-react';

export default function KanbanColumn({
  column,
  tasks = [],
  onDeleteTask,
  onMoveTask,
  onEditTask,
  onOpenAddModal,
  isSearching = false,
  searchQuery = '',
  onClearSearch
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id
  });

  const taskIds = tasks.map((t) => t.id);

  return (
    <section
      ref={setNodeRef}
      className={`kanban-column ${isOver ? 'kanban-column-over' : ''}`}
      aria-label={`${column.title} column`}
    >
      {/* Column Header */}
      <div className="column-header">
        <div className="column-header-title-group">
          <span
            className="column-status-indicator"
            style={{ backgroundColor: column.color }}
            aria-hidden="true"
          />
          <h2 className="column-title">{column.title}</h2>
          <span
            className="column-task-count-badge"
            style={{ backgroundColor: column.badgeBg, color: column.badgeText }}
            aria-label={`${tasks.length} tasks in ${column.title}`}
          >
            {tasks.length}
          </span>
        </div>

        <button
          type="button"
          className="column-quick-add-btn"
          onClick={() => onOpenAddModal(column.id)}
          title={`Add task to ${column.title}`}
          aria-label={`Add task to ${column.title}`}
        >
          <Plus size={16} />
        </button>
      </div>

      <p className="column-description">{column.description}</p>

      {/* Task Cards List / Droppable Surface */}
      <div className="column-content-area">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.length > 0 ? (
            <div className="task-list">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDeleteTask={onDeleteTask}
                  onMoveTask={onMoveTask}
                  onEditTask={onEditTask}
                />
              ))}
            </div>
          ) : isSearching ? (
            <EmptyState
              type="search"
              searchQuery={searchQuery}
              onAction={onClearSearch}
            />
          ) : (
            <EmptyState
              type="column"
              onAction={() => onOpenAddModal(column.id)}
            />
          )}
        </SortableContext>
      </div>
    </section>
  );
}
