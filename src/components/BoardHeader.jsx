import React from 'react';
import { Plus, ChevronRight, Menu } from 'lucide-react';
import SearchBar from './SearchBar';

const VIEW_METADATA = {
  overview: {
    breadcrumb: 'Executive Overview',
    title: 'Sprint Overview & Analytics',
    subtitle: 'High-level project metrics, sprint health, and velocity breakdown.'
  },
  kanban: {
    breadcrumb: 'Kanban Board',
    title: 'Kanban Board',
    subtitle: 'Organize your work. Keep your momentum.'
  },
  mytasks: {
    breadcrumb: 'My Tasks',
    title: 'My Assigned Tasks',
    subtitle: 'Personal interactive checklist and sprint execution list.'
  },
  projects: {
    breadcrumb: 'Projects & Epics',
    title: 'Projects & Strategic Epics',
    subtitle: 'Track milestone delivery and initiatives across Sprint 05.'
  }
};

export default function BoardHeader({
  activeNav = 'kanban',
  searchQuery,
  onSearchChange,
  onClearSearch,
  onOpenAddModal,
  onToggleSidebar
}) {
  const currentView = VIEW_METADATA[activeNav] || VIEW_METADATA.kanban;

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
          <span className="breadcrumb-item breadcrumb-current">{currentView.breadcrumb}</span>
        </div>

        <div className="header-status-badge">
          <span className="pulse-dot" aria-hidden="true" />
          <span>Active Sprint 05</span>
        </div>
      </div>

      {/* Main Row: Titles and Primary Action Controls */}
      <div className="board-header-main">
        <div className="board-title-group">
          <h1 className="board-title">{currentView.title}</h1>
          <p className="board-subtitle">{currentView.subtitle}</p>
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
