# FlowForge — Plan smarter. Move faster.

> A modern, responsive, visually polished Kanban Task Management SaaS application built for the **Prodesk IT Sprint 05** assignment.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?style=flat&logo=vite)](https://vitejs.dev)
[![dnd--kit](https://img.shields.io/badge/@dnd--kit-Drag%20&%20Drop-4f46e5?style=flat)](https://dndkit.com)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20Ready-000000?style=flat&logo=vercel)](https://vercel.com)

**Live Demo:** [https://flowforge-kanban.vercel.app](https://flowforge-kanban.vercel.app) *(Update with your production URL after Vercel deployment)*

---

## 1. Project Overview

**FlowForge** is engineered as a high-tier SaaS productivity workspace rather than a generic student prototype. It empowers engineering teams to visualize workflow momentum, organize backlog items, and rapidly manage tasks across three distinct sprint states: **To Do**, **In Progress**, and **Done**.

### Visual Design System
- **Deep Navy Sidebar:** Immersive `#090e1a` / `#0f172a` backdrop providing strong contrast and focus.
- **Soft Off-White Workspace:** Clean `#f8fafc` canvas with subtle borders and shadows to eliminate visual fatigue.
- **Rich Violet & Indigo Accents:** Premium `#6366f1` / `#4f46e5` interactive buttons, badges, and focus rings.
- **Typography:** Crisp Inter font stack with deliberate hierarchy and spacing.
- **Responsive Layout:** Adaptive desktop (1440px), laptop (1024px), tablet (768px), and mobile (390px) layouts.

---

## 2. Key Features

### Phase 1 — Mandatory P0 Core
- **Task Creation Modal:** Add tasks with title validation, optional description, priority selection, and target column.
- **Central Task State:** Single source of truth in React state with immutable updates.
- **Task Deletion:** Remove tasks instantly with one click and automatic dashboard recalculation.
- **Direct Movement Controls:** Multi-directional status menu and stepper buttons on every card (`To Do` ↔ `In Progress` ↔ `Done`).

### Phase 2 — Priority 1 Enhancements
- **Inline Title Editing:** Click any task title or edit icon to edit in-place with `Enter` (save), `Esc` (cancel), and validation for non-empty text.
- **Semantic Priority Badges:** High (red), Medium (amber), and Low (emerald) visual badges and colored left-border card accents (not reliant on color alone).
- **Resilient localStorage Persistence:** Custom `useLocalStorage` hook with automatic serialization, edge-case recovery, and protection against overwriting valid empty boards.
- **Sample Tasks:** Six preloaded sprint items for initial demonstration that can be edited, deleted, or reset.

### Phase 3 — Priority 2 Advanced
- **Accessible Drag-and-Drop:** Built with `@dnd-kit/core` and `@dnd-kit/sortable`. Supports reordering within columns, dragging between columns, visual drop indicators, and smooth drag overlay.
- **Real-Time Global Search:** Instant case-insensitive filtering across task titles and descriptions with search result counts, highlight query, and clear search button.
- **Dynamic Sprint Statistics:** Real-time metrics for Total Tasks, To Do, In Progress, Done, and a dynamic Sprint Progress percentage bar.

---

## 3. Technology Stack

| Layer | Technology |
|---|---|
| **Framework & UI** | [React 18](https://react.dev) (Functional Components, Hooks) |
| **Bundler & Dev Server** | [Vite 6](https://vitejs.dev) |
| **Drag & Drop** | [@dnd-kit/core](https://dndkit.com), `@dnd-kit/sortable`, `@dnd-kit/utilities` |
| **Iconography** | [Lucide React](https://lucide.dev) |
| **Styling** | Modern CSS3 (CSS Grid, Flexbox, Custom Properties, Media Queries) |
| **Persistence** | Browser `localStorage` API |
| **Deployment Target** | [Vercel](https://vercel.com) |

---

## 4. Project Directory Structure

```text
flowforge/
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── Prompts.md
├── QA-DEMO-SCRIPT.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── hooks/
    │   └── useLocalStorage.js
    ├── utils/
    │   └── sampleData.js
    └── components/
        ├── Sidebar.jsx
        ├── BoardHeader.jsx
        ├── SearchBar.jsx
        ├── SummaryStats.jsx
        ├── KanbanBoard.jsx
        ├── KanbanColumn.jsx
        ├── TaskCard.jsx
        ├── TaskModal.jsx
        └── EmptyState.jsx
```

---

## 5. Local Setup & Development

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### Installation
Clone the repository and install dependencies:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev
```

Open your browser at `http://localhost:3000` (or the port indicated by Vite).

### Production Build
To create an optimized production bundle:

```bash
npm run build
```

The compiled assets will be in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## 6. Architecture & Implementation Highlights

### State Management & Data Flow
FlowForge strictly follows React best practices:
1. **Single Source of Truth:** `tasks` array stored at the top level in `App.jsx`.
2. **Derived State:** Dashboard statistics and filtered column arrays are computed on each render without redundant state variables.
3. **Immutable Updates:** State transitions use array methods like `.map()`, `.filter()`, and `arrayMove()`.
4. **Prop Drilling Minimized:** Clean component interfaces with descriptive callback props (`onAddTask`, `onDeleteTask`, `onMoveTask`, `onEditTask`).

### Drag-and-Drop Implementation
The board uses `@dnd-kit/core` with `PointerSensor` and `KeyboardSensor`.
- A 5-pixel activation constraint is configured on the `PointerSensor` so that clicking card buttons, status dropdowns, or inline editing inputs will never accidentally trigger a drag event.
- Visual droppable containers (`useDroppable`) highlight columns on hover.
- `DragOverlay` creates an elevated clone of the card under the user's cursor for fluid 60fps drag feedback.

### Resilient `localStorage` Persistence
The `useLocalStorage` custom hook reads from browser storage during the initial `useState` lazy initializer. If existing data is present (even an empty array `[]`), it respects the user's board state. All updates serialize synchronously via `useEffect`.

---

## 7. Vercel Deployment Instructions

FlowForge is configured out-of-the-box for 1-click deployment on [Vercel](https://vercel.com):

### Option A: Via GitHub (Recommended)
1. Initialize Git and push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete FlowForge Sprint 05 Kanban application"
   git branch -M main
   git remote add origin https://github.com/<your-username>/flowforge-kanban.git
   git push -u origin main
   ```
2. Log into **Vercel** ([vercel.com](https://vercel.com)) and click **Add New Project**.
3. Import your GitHub repository `flowforge-kanban`.
4. Vercel will automatically detect the **Vite** framework:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**. Your application will be live within 30 seconds!

### Option B: Via Vercel CLI
```bash
npm i -g vercel
vercel
# Follow the interactive CLI prompts to deploy
```

---

## 8. License & Authorship
- **Author:** Vinayak Sharma
- **Course / Track:** Prodesk IT Sprint 05
- **Project:** FlowForge Task Management Board

