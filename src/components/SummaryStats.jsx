import React from 'react';
import { CheckCircle2, Clock, ListTodo, TrendingUp, Layers } from 'lucide-react';

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
      subtext: 'Across all columns',
      icon: Layers,
      color: 'indigo',
      badge: 'All'
    },
    {
      id: 'todo',
      label: 'To Do',
      value: todoCount,
      subtext: 'Awaiting progress',
      icon: ListTodo,
      color: 'violet',
      badge: 'Backlog'
    },
    {
      id: 'inprogress',
      label: 'In Progress',
      value: inProgressCount,
      subtext: 'Active workload',
      icon: Clock,
      color: 'amber',
      badge: 'Active'
    },
    {
      id: 'done',
      label: 'Done',
      value: doneCount,
      subtext: 'Completed goals',
      icon: CheckCircle2,
      color: 'emerald',
      badge: 'Shipped'
    }
  ];

  return (
    <section className="stats-section" aria-label="Task progress summary">
      <div className="stats-grid">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className={`stat-card stat-${stat.color}`}>
              <div className="stat-card-header">
                <span className="stat-label">{stat.label}</span>
                <div className={`stat-icon-wrap stat-icon-${stat.color}`}>
                  <Icon size={18} aria-hidden="true" />
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
          <div className="stat-card-header">
            <span className="stat-label">Sprint Progress</span>
            <div className="stat-icon-wrap stat-icon-cyan">
              <TrendingUp size={18} aria-hidden="true" />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-progress-numbers">
              <span className="stat-value">{completionPercentage}%</span>
              <span className="stat-subtext">{doneCount} of {total} completed</span>
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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
