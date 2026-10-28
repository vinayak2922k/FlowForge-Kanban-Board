import React from 'react';
import { Plus, ChevronRight, Menu, Sparkles } from 'lucide-react';
import SearchBar from './SearchBar';

export default function BoardHeader({
  searchQuery,
  onSearchChange,
  onClearSearch,
  onOpenAddModal,
  onToggleSidebar
}) {
  return (
    <header className="board-header">
      {/* Top Breadcrumb & Mobile Hamburger */}
      <div className="board-header-top">
        <div className="breadcrumb-nav">
          <button
            type="button"
            className="mobile-sidebar-toggle"
            onClick={onToggleSidebar}
            aria-label="Toggle navigation sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="breadcrumb-item">Workspace</span>
          <ChevronRight size={14} className="breadcrumb-separator" aria-hidden="true" />
          <span className="breadcrumb-item">Sprint 05</span>
          <ChevronRight size={14} className="breadcrumb-separator" aria-hidden="true" />
          <span className="breadcrumb-item breadcrumb-current">Kanban Board</span>
        </div>

        <div className="header-status-badge">
          <span className="pulse-dot" aria-hidden="true" />
          <span>Active Sprint</span>
        </div>
      </div>

      {/* Main Row: Titles and Primary Action Controls */}
      <div className="board-header-main">
        <div className="board-title-group">
          <h1 className="board-title">Kanban Board</h1>
          <p className="board-subtitle">
            Organize your work. Keep your momentum.
          </p>
        </div>

        <div className="board-controls">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onClearSearch={onClearSearch}
          />

          <button
            type="button"
            className="btn btn-primary btn-add-task"
            onClick={() => onOpenAddModal('todo')}
            aria-label="Create a new task"
          >
            <Plus size={18} className="icon-mr" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
