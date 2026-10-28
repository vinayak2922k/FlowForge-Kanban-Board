import React from 'react';
import {
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Plus
} from 'lucide-react';

export default function OverviewView({
  tasks = [],
  onSwitchToKanban,
  onOpenAddModal
}) {
  const total = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'inprogress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const highPriority = tasks.filter((t) => t.priority === 'high').length;
  const medPriority = tasks.filter((t) => t.priority === 'medium').length;
  const lowPriority = tasks.filter((t) => t.priority === 'low').length;

  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <div className="overview-container">
      {/* Hero Sprint Status Banner */}
      <section className="overview-hero-card">
        <div className="overview-hero-content">
          <div className="hero-badge">
            <Zap size={14} className="icon-mr" />
            <span>Sprint 05 Live Milestone</span>
          </div>
          <h2 className="overview-hero-title">Engineering Velocity & Delivery</h2>
          <p className="overview-hero-desc">
            FlowForge Kanban tracking is operating at <strong>{completionRate}% completion</strong>. 
            {inProgressCount > 0
              ? ` There are ${inProgressCount} active tasks under development.`
              : ' All scheduled sprint items are currently resolved.'}
          </p>
          <div className="overview-hero-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSwitchToKanban}
            >
              Open Kanban Board
              <ArrowRight size={16} style={{ marginLeft: 8 }} />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onOpenAddModal('todo')}
            >
              <Plus size={16} className="icon-mr" />
              Quick Add Task
            </button>
          </div>
        </div>

        <div className="overview-hero-radial">
          <div className="radial-metric-circle">
            <span className="radial-metric-val">{completionRate}%</span>
            <span className="radial-metric-lbl">Sprint Complete</span>
          </div>
        </div>
      </section>

      {/* Grid: Status Distribution & Priority Breakdown */}
      <div className="overview-grid-two">
        {/* Workflow Pipeline Status */}
        <div className="overview-card">
          <div className="overview-card-header">
            <div className="overview-card-title-group">
              <Activity size={18} className="text-primary-500 icon-mr" />
              <h3 className="overview-card-title">Workflow Column Distribution</h3>
            </div>
            <span className="text-muted text-xs">{total} Total Items</span>
          </div>

          <div className="distribution-bars-list">
            {/* To Do */}
            <div className="distribution-item">
              <div className="dist-label-row">
                <span className="dist-name">
                  <span className="status-dot status-dot-todo" style={{ display: 'inline-block', marginRight: 8 }} />
                  To Do
                </span>
                <span className="dist-count">{todoCount} tasks ({total > 0 ? Math.round((todoCount / total) * 100) : 0}%)</span>
              </div>
              <div className="dist-track">
                <div
                  className="dist-fill dist-fill-todo"
                  style={{ width: `${total > 0 ? (todoCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* In Progress */}
            <div className="distribution-item">
              <div className="dist-label-row">
                <span className="dist-name">
                  <span className="status-dot status-dot-inprogress" style={{ display: 'inline-block', marginRight: 8 }} />
                  In Progress
                </span>
                <span className="dist-count">{inProgressCount} tasks ({total > 0 ? Math.round((inProgressCount / total) * 100) : 0}%)</span>
              </div>
              <div className="dist-track">
                <div
                  className="dist-fill dist-fill-inprogress"
                  style={{ width: `${total > 0 ? (inProgressCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Done */}
            <div className="distribution-item">
              <div className="dist-label-row">
                <span className="dist-name">
                  <span className="status-dot status-dot-done" style={{ display: 'inline-block', marginRight: 8 }} />
                  Done
                </span>
                <span className="dist-count">{doneCount} tasks ({total > 0 ? Math.round((doneCount / total) * 100) : 0}%)</span>
              </div>
              <div className="dist-track">
                <div
                  className="dist-fill dist-fill-done"
                  style={{ width: `${total > 0 ? (doneCount / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Priority Severity Breakdown */}
        <div className="overview-card">
          <div className="overview-card-header">
            <div className="overview-card-title-group">
              <AlertCircle size={18} className="text-amber-500 icon-mr" />
              <h3 className="overview-card-title">Priority Severity Breakdown</h3>
            </div>
            <span className="text-muted text-xs">Risk Matrix</span>
          </div>

          <div className="priority-overview-list">
            <div className="priority-overview-item prio-high">
              <div className="prio-metric-left">
                <span className="priority-badge priority-high">High Priority</span>
                <span className="prio-desc">Requires immediate engineering attention</span>
              </div>
              <span className="prio-number">{highPriority}</span>
            </div>

            <div className="priority-overview-item prio-med">
              <div className="prio-metric-left">
                <span className="priority-badge priority-medium">Medium Priority</span>
                <span className="prio-desc">Scheduled for regular sprint cadence</span>
              </div>
              <span className="prio-number">{medPriority}</span>
            </div>

            <div className="priority-overview-item prio-low">
              <div className="prio-metric-left">
                <span className="priority-badge priority-low">Low Priority</span>
                <span className="prio-desc">Enhancements & optimization backlog</span>
              </div>
              <span className="prio-number">{lowPriority}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sprint Milestone Timeline & Audit */}
      <section className="overview-card">
        <div className="overview-card-header">
          <div className="overview-card-title-group">
            <Clock size={18} className="text-primary-500 icon-mr" />
            <h3 className="overview-card-title">Recent Sprint Activity & Workstream</h3>
          </div>
          <span className="text-muted text-xs">Real-Time Sync</span>
        </div>

        {tasks.length > 0 ? (
          <div className="activity-timeline">
            {tasks.slice(0, 5).map((task) => (
              <div key={task.id} className="timeline-item">
                <div className={`timeline-dot status-dot-${task.status}`} />
                <div className="timeline-content">
                  <div className="timeline-title-row">
                    <span className="timeline-task-title">{task.title}</span>
                    <span className="timeline-badge">
                      {task.status === 'todo' && '📋 Added to To Do'}
                      {task.status === 'inprogress' && '⚡ Moved to In Progress'}
                      {task.status === 'done' && '✅ Marked as Done'}
                    </span>
                  </div>
                  {task.description && (
                    <p className="timeline-desc">{task.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Layers size={24} className="text-muted" style={{ marginBottom: 8 }} />
            <p className="empty-state-title">No task activity logged yet</p>
            <p className="empty-state-desc">Create a task or reset the board to view sprint activity.</p>
          </div>
        )}
      </section>
    </div>
  );
}
