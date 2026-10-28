import React from 'react';
import { CheckCircle2, Clock, ListTodo, TrendingUp, Layers, Sparkles } from 'lucide-react';

export default function SummaryStats({ tasks = [] }) {
  const total = tasks.length;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'inprogress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const completionPercentage = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const statCards = [
    {
      id: 'total',
      label: 'Total Tasks',
      value: total,
      subtext: 'Active sprint scope',
      icon: Layers,
      color: 'indigo',
      badge: 'Backlog + Active'
    },
    {
      id: 'todo',
      label: 'To Do',
      value: todoCount,
      subtext: 'Awaiting kickoff',
      icon: ListTodo,
      color: 'violet',
      badge: 'Queued'
    },
    {
      id: 'inprogress',
      label: 'In Progress',
      value: inProgressCount,
      subtext: 'Under active review',
      icon: Clock,
      color: 'amber',
      badge: 'In Flight'
    },
    {
      id: 'done',
      label: 'Done',
      value: doneCount,
      subtext: 'Verified & shipped',
      icon: CheckCircle2,
      color: 'emerald',
      badge: 'Completed'
    }
  ];

  return (
    <section className="stats-section" aria-label="Task progress summary">
      <div className="stats-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className={`stat-card stat-${stat.color}`}>
              <div className="stat-card-top-accent" />
              <div className="stat-card-header">
                <div className="stat-label-wrap">
                  <span className="stat-label">{stat.label}</span>
                  <span className={`stat-badge stat-badge-${stat.color}`}>{stat.badge}</span>
                </div>
                <div className={`stat-icon-wrap stat-icon-${stat.color}`}>
                  <Icon size={17} aria-hidden="true" />
                </div>
              </div>
              <div className="stat-card-body">
                <span className="stat-value">{stat.value}</span>
                <span className="stat-subtext">{stat.subtext}</span>
              </div>
            </div>
          );
        })}

        {/* Completion Progress Card */}
        <div className="stat-card stat-progress">
          <div className="stat-card-top-accent" />
          <div className="stat-card-header">
            <div className="stat-label-wrap">
              <span className="stat-label">Velocity</span>
              <span className="stat-badge stat-badge-cyan">Completion Rate</span>
            </div>
            <div className="stat-icon-wrap stat-icon-cyan">
              <TrendingUp size={17} aria-hidden="true" />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-progress-numbers">
              <div className="stat-val-group">
                <span className="stat-value">{completionPercentage}%</span>
                <span className="stat-trend-indicator">
                  <Sparkles size={11} className="icon-mr" />
                  {doneCount}/{total} tasks
                </span>
              </div>
            </div>
            <div
              className="progress-bar-track"
              role="progressbar"
              aria-valuenow={completionPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Sprint completion progress: ${completionPercentage}%`}
            >
              <div
                className="progress-bar-fill"
                style={{ width: `${completionPercentage}%` }}
              >
                <div className="progress-bar-glow" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
