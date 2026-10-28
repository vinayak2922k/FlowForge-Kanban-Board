import React from 'react';
import { Inbox, SearchX, Plus } from 'lucide-react';

export default function EmptyState({ type = 'column', searchQuery = '', onAction }) {
  if (type === 'search') {
    return (
      <div className="empty-state empty-state-search" role="status">
        <div className="empty-state-icon-wrap">
          <SearchX className="empty-state-icon" size={28} />
        </div>
        <h4 className="empty-state-title">No matching tasks</h4>
        <p className="empty-state-desc">
          No tasks match <span className="highlight-query">"{searchQuery}"</span>. Try adjusting your search query.
        </p>
        {onAction && (
          <button
            type="button"
            className="btn btn-secondary btn-sm empty-state-btn"
            onClick={onAction}
            aria-label="Clear active search"
          >
            Clear Search
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="empty-state empty-state-column" role="status">
      <div className="empty-state-icon-wrap">
        <Inbox className="empty-state-icon" size={26} />
      </div>
      <h4 className="empty-state-title">No tasks here</h4>
      <p className="empty-state-desc">Drop a card here or create a new task to get started.</p>
      {onAction && (
        <button
          type="button"
          className="btn btn-ghost btn-sm empty-state-btn"
          onClick={onAction}
          aria-label="Add task to this column"
        >
          <Plus size={14} className="icon-mr" />
          Add Task
        </button>
      )}
    </div>
  );
}

