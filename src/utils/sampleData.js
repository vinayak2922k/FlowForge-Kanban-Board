export const INITIAL_TASKS = [
  {
    id: "task-1",
    title: "Design responsive landing page hero",
    description: "Create sleek visual hierarchy, typography styles, and interactive call-to-action button for the FlowForge marketing site.",
    status: "todo",
    priority: "high",
    createdAt: "2026-10-28T09:30:00.000Z"
  },
  {
    id: "task-2",
    title: "Prepare Sprint 05 documentation",
    description: "Document React component hierarchy, state lifting patterns, drag-and-drop implementation, and QA demo script.",
    status: "todo",
    priority: "medium",
    createdAt: "2026-10-28T10:15:00.000Z"
  },
  {
    id: "task-3",
    title: "Review OAuth2 API integration",
    description: "Audit token refresh lifecycle, error boundaries, and rate limiting headers in the auth service client.",
    status: "inprogress",
    priority: "high",
    createdAt: "2026-10-28T11:00:00.000Z"
  },
  {
    id: "task-4",
    title: "Refactor useLocalStorage hook",
    description: "Ensure resilient JSON serialization and prevent race conditions when initializing board state.",
    status: "inprogress",
    priority: "medium",
    createdAt: "2026-10-28T11:45:00.000Z"
  },
  {
    id: "task-5",
    title: "Configure Vite and React 18 toolchain",
    description: "Set up fast HMR, CSS Grid layouts, and build optimizations for seamless Vercel edge deployment.",
    status: "done",
    priority: "low",
    createdAt: "2026-10-28T08:00:00.000Z"
  },
  {
    id: "task-6",
    title: "Set up dnd-kit drag-and-drop sensor",
    description: "Configure PointerSensor activation constraint and KeyboardSensor for accessible card movement across columns.",
    status: "done",
    priority: "high",
    createdAt: "2026-10-28T08:45:00.000Z"
  }
];

export const COLUMNS = [
  {
    id: "todo",
    title: "To Do",
    description: "Tasks awaiting kickoff",
    color: "#6366f1",
    badgeBg: "rgba(99, 102, 241, 0.12)",
    badgeText: "#4f46e5"
  },
  {
    id: "inprogress",
    title: "In Progress",
    description: "Actively being worked on",
    color: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.14)",
    badgeText: "#b45309"
  },
  {
    id: "done",
    title: "Done",
    description: "Completed and verified",
    color: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.14)",
    badgeText: "#047857"
  }
];

