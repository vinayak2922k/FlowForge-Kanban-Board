import React from 'react';
import {
  Layers,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Calendar,
  Users,
  Compass,
  Check
} from 'lucide-react';

export default function ProjectsView({
  tasks = [],
  onSwitchToKanban,
  onOpenAddModal
}) {
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((t) => t.status === 'done').length;
  const overallProgress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const epics = [
    {
      id: 'epic-1',
      title: 'FlowForge Core Kanban Engine',
      description: 'Drag-and-drop state machine, multi-column reordering, and resilient localStorage persistence layer.',
      category: 'Core Engine',
      categoryClass: 'badge-indigo',
      status: 'In Progress',
      statusClass: 'status-inprogress',
      progress: overallProgress,
      tasksCount: totalTasks,
      lead: 'Vinayak Sharma',
      dueDate: 'Nov 04, 2026'
    },
    {
      id: 'epic-2',
      title: 'Linear-Grade SaaS Design System',
      description: 'Midnight obsidian navigation, atmospheric dot-matrix canvas, glassmorphic cards, and accessible micro-interactions.',
      category: 'UI/UX Design',
      categoryClass: 'badge-violet',
      status: 'Completed',
      statusClass: 'status-done',
      progress: 100,
      tasksCount: 6,
      lead: 'Design Team',
      dueDate: 'Oct 28, 2026'
    },
    {
      id: 'epic-3',
      title: 'Accessibility & Responsive Engine',
      description: 'Keyboard navigation sensors, screen-reader status indicators, WCAG color contrast, and 390px mobile drawer.',
      category: 'Accessibility',
      categoryClass: 'badge-emerald',
      status: 'Completed',
      statusClass: 'status-done',
      progress: 100,
      tasksCount: 4,
      lead: 'QA & Engineering',
      dueDate: 'Oct 29, 2026'
    },
    {
      id: 'epic-4',
      title: 'Production Build & Vercel Edge Deployment',
      description: 'Vite 6 tree-shaking, static asset compression, zero-warning build output, and automated Vercel CI/CD.',
      category: 'DevOps & Cloud',
      categoryClass: 'badge-amber',
      status: 'Live on Edge',
      statusClass: 'status-live',
      progress: 100,
      tasksCount: 3,
      lead: 'DevOps Team',
      dueDate: 'Live'
    }
  ];

  return (
    <div className="projects-container">
      {/* Portfolio Header Metric */}
      <section className="projects-header-card">
        <div className="projects-header-info">
          <div className="hero-badge">
            <Compass size={14} className="icon-mr" />
            <span>Sprint 05 Strategic Roadmap</span>
          </div>
          <h2 className="projects-title">Active Projects & Strategic Epics</h2>
          <p className="projects-desc">
            Organizing multi-feature engineering initiatives across Sprint 05. Track high-level deliverables and dive into the Kanban execution board.
          </p>
        </div>

        <div className="projects-header-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onSwitchToKanban}
          >
            <Layers size={16} className="icon-mr" />
            View Kanban Board
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => onOpenAddModal('todo')}
          >
            <Plus size={16} className="icon-mr" />
            Create Sprint Task
          </button>
        </div>
      </section>

      {/* Epics Grid */}
      <div className="epics-grid">
        {epics.map((epic) => (
          <article key={epic.id} className="epic-card">
            <div className="epic-card-header">
              <span className={`epic-category-badge ${epic.categoryClass}`}>
                {epic.category}
              </span>
              <span className={`epic-status-pill ${epic.statusClass}`}>
                <span className="pulse-dot" style={{ width: 6, height: 6 }} />
                {epic.status}
              </span>
            </div>

            <h3 className="epic-title">{epic.title}</h3>
            <p className="epic-description">{epic.description}</p>

            {/* Progress Section */}
            <div className="epic-progress-section">
              <div className="epic-progress-label-row">
                <span className="epic-progress-text">Delivery Progress</span>
                <span className="epic-progress-percent">{epic.progress}%</span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${epic.progress}%` }}
                />
              </div>
            </div>

            {/* Epic Footer Meta */}
            <div className="epic-footer">
              <div className="epic-meta-item">
                <Users size={13} className="text-muted icon-mr" />
                <span>{epic.lead}</span>
              </div>
              <div className="epic-meta-item">
                <Calendar size={13} className="text-muted icon-mr" />
                <span>{epic.dueDate}</span>
              </div>
            </div>

            {/* Card Action */}
            <button
              type="button"
              className="epic-jump-btn"
              onClick={onSwitchToKanban}
            >
              <span>Explore Workstream</span>
              <ArrowRight size={14} />
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
