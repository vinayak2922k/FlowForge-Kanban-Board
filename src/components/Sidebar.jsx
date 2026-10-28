import React from 'react';
import {
  Kanban,
  CheckSquare,
  LayoutDashboard,
  Layers,
  Settings,
  HelpCircle,
  X,
  RotateCcw,
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function Sidebar({
  isOpen,
  onClose,
  activeNav = 'kanban',
  onSelectNav,
  onResetSampleData,
  onClearBoard
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: null },
    { id: 'kanban', label: 'Kanban Board', icon: Kanban, badge: 'Active' },
    { id: 'mytasks', label: 'My Tasks', icon: CheckSquare, badge: null },
    { id: 'projects', label: 'Projects & Epics', icon: Layers, badge: null }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar-container ${isOpen ? 'sidebar-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-icon">
            <Kanban size={22} className="logo-svg" />
          </div>
          <div className="brand-info">
            <span className="brand-name">FlowForge</span>
            <span className="brand-tagline">Plan smarter. Move faster.</span>
          </div>
          <button
            type="button"
            className="sidebar-mobile-close"
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Workspace Card */}
        <div className="workspace-pill">
          <div className="workspace-avatar">PI</div>
          <div className="workspace-meta">
            <span className="workspace-title">Prodesk IT</span>
            <span className="workspace-sub">Sprint 05 Management</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav" aria-label="Main Navigation">
          <span className="nav-section-title">Workflow</span>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                    onClick={() => {
                      onSelectNav(item.id);
                      if (window.innerWidth < 1024) onClose();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} className="nav-icon" />
                    <span className="nav-label">{item.label}</span>
                    {item.badge && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <span className="nav-section-title">Quick Actions</span>
          <div className="sidebar-actions-group">
            <button
              type="button"
              className="sidebar-action-btn"
              onClick={onResetSampleData}
              title="Restore default Sprint 05 sample tasks"
            >
              <RotateCcw size={15} />
              <span>Reset Sample Tasks</span>
            </button>
            <button
              type="button"
              className="sidebar-action-btn action-danger"
              onClick={onClearBoard}
              title="Clear all tasks from the board"
            >
              <ShieldAlert size={15} />
              <span>Clear Board</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer: Profile Section */}
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">VS</div>
            <div className="user-details">
              <span className="user-name">Vinayak Sharma</span>
              <span className="user-role">Lead Engineer · Sprint 5</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

