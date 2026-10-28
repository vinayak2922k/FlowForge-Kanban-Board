import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCorners
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import { COLUMNS } from '../utils/sampleData';

export default function KanbanBoard({
  tasks,
  setTasks,
  searchQuery,
  onClearSearch,
  onDeleteTask,
  onMoveTask,
  onEditTask,
  onOpenAddModal
}) {
  const [activeTask, setActiveTask] = useState(null);

  // Configure sensors with safe activation constraints so clicks & edits aren't mistaken for drag
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5 // drag only triggers after 5px movement
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // Filter tasks based on global search query (case-insensitive on title and description)
  const query = searchQuery.trim().toLowerCase();
  const isSearching = Boolean(query);

  const filteredTasks = tasks.filter((task) => {
    if (!isSearching) return true;
    const matchTitle = task.title.toLowerCase().includes(query);
    const matchDesc = (task.description || '').toLowerCase().includes(query);
    return matchTitle || matchDesc;
  });

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Check if dragging over a column directly or over another card
    const isOverAColumn = COLUMNS.some((col) => col.id === overId);
    const activeTaskItem = tasks.find((t) => t.id === activeId);
    if (!activeTaskItem) return;

    if (isOverAColumn) {
      const targetColumn = overId;
      if (activeTaskItem.status !== targetColumn) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === activeId ? { ...t, status: targetColumn } : t
          )
        );
      }
    } else {
      // Over another card
      const overTaskItem = tasks.find((t) => t.id === overId);
      if (overTaskItem && activeTaskItem.status !== overTaskItem.status) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === activeId ? { ...t, status: overTaskItem.status } : t
          )
        );
      }
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeIndex = tasks.findIndex((t) => t.id === activeId);
    if (activeIndex === -1) return;

    // If dropped on a column container
    const isOverColumn = COLUMNS.some((col) => col.id === overId);
    if (isOverColumn) {
      const targetColumn = overId;
      if (tasks[activeIndex].status !== targetColumn) {
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === activeId ? { ...t, status: targetColumn } : t
          )
        );
      }
      return;
    }

    // Dropped on another card
    const overIndex = tasks.findIndex((t) => t.id === overId);
    if (overIndex === -1) return;

    if (activeIndex !== overIndex) {
      setTasks((prevTasks) => {
        const targetStatus = prevTasks[overIndex].status;
        const updated = prevTasks.map((t) =>
          t.id === activeId ? { ...t, status: targetStatus } : t
        );
        return arrayMove(updated, activeIndex, overIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="board-grid-wrapper">
        <div className="board-columns-container">
          {COLUMNS.map((column) => {
            const columnTasks = filteredTasks.filter(
              (task) => task.status === column.id
            );
            return (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={columnTasks}
                onDeleteTask={onDeleteTask}
                onMoveTask={onMoveTask}
                onEditTask={onEditTask}
                onOpenAddModal={onOpenAddModal}
                isSearching={isSearching}
                searchQuery={searchQuery}
                onClearSearch={onClearSearch}
              />
            );
          })}
        </div>
      </div>

      {/* Drag Overlay for smooth preview */}
      <DragOverlay dropAnimation={null}>
        {activeTask ? (
          <TaskCard
            task={activeTask}
            isOverlay
            onDeleteTask={() => {}}
            onMoveTask={() => {}}
            onEditTask={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
