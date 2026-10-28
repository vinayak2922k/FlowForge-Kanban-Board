# FlowForge — Sprint 05 Engineering Prompts Log

This document records the design requirements, architectural decisions, prompt iterations, and engineering steps undertaken during the development of **FlowForge** for the Prodesk IT Sprint 05 assignment.

---

## 1. Requirement Analysis & Planning Prompt

### Context
Build a premium, production-grade Kanban Task Management board named **FlowForge** ("Plan smarter. Move faster.") using React 18, Vite, `@dnd-kit`, and modern CSS3.

### Core Architectural Decisions
- **No Redux / External State Libraries:** Use standard React `useState` and `useEffect` with unidirectional data flow and state lifting.
- **Strictly No Direct DOM Manipulation:** All UI changes occur through declarative React state updates.
- **Single Source of Truth:** Central `tasks` state held in `App.jsx`, synchronized with browser `localStorage`.
- **Derivation Over Duplication:** Dynamic statistics, column distributions, and search filtering are calculated on-the-fly from the central `tasks` array.
- **Accessibility & Hybrid Controls:** Provide both fluid Drag-and-Drop (`@dnd-kit`) and keyboard/click-based fallback controls (status dropdown and stepper buttons) on every card.

---

## 2. Component Hierarchy & Design System Prompt

### Component Tree
```text
App (State Holder, LocalStorage Sync, Toast Manager)
├── Sidebar (Brand, Workspace Context, Navigation, Reset/Clear Board, Profile)
└── MainWorkspace
    ├── BoardHeader (Breadcrumb, Title, Subtitle, Global SearchBar, Add Task Trigger)
    └── WorkspaceScrollable
        ├── SummaryStats (Total, To Do, In Progress, Done, Progress Bar)
        └── KanbanBoard (DndContext, Collision Detection, DragOverlay)
            ├── KanbanColumn: To Do (Droppable, SortableContext)
            │   └── TaskCard (Sortable, Inline Edit, Priority Badge, Move Dropdown, Delete)
            ├── KanbanColumn: In Progress (Droppable, SortableContext)
            │   └── TaskCard (...)
            └── KanbanColumn: Done (Droppable, SortableContext)
                └── TaskCard (...)
└── TaskModal (Controlled Form, Validation, Priority & Status Selectors, Esc / Backdrop Handlers)
```

### Visual Token Scheme
- Sidebar: Deep Navy `#090e1a` / `#0f172a`
- Workspace: Soft Off-White `#f8fafc`
- Accents: Indigo `#4f46e5`, Violet `#6366f1`
- High Priority: Left Accent Border `#ef4444`, Badge Tint `#fef2f2`, Badge Text `#dc2626`
- Medium Priority: Left Accent Border `#f59e0b`, Badge Tint `#fffbeb`, Badge Text `#b45309`
- Low Priority: Left Accent Border `#10b981`, Badge Tint `#ecfdf5`, Badge Text `#047857`

---

## 3. State Management & Persistence Implementation Prompt

### `useLocalStorage` Hook Design
```javascript
export function useLocalStorage(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const storedItem = window.localStorage.getItem(key);
      if (storedItem !== null) {
        return JSON.parse(storedItem);
      }
      window.localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error(error);
    }
  }, [key, state]);

  return [state, setState];
}
```

### Key Safeguards
1. **Lazy State Initializer:** Avoids calling `localStorage.getItem()` on re-renders.
2. **Explicit Null Check:** Differentiates between "no storage set" (returns default 6 sample tasks) and "user emptied the board `[]`" (preserves empty board across refresh).
3. **Try/Catch Boundaries:** Protects against private browsing storage exceptions or corrupted JSON payloads.

---

## 4. Drag-and-Drop with `@dnd-kit` Prompt

### Challenges Addressed
- **Click vs. Drag Conflict:** Card action buttons (Edit, Delete, Move) must remain clickable without triggering a drag session.
  - *Solution:* Implemented `PointerSensor` with `activationConstraint: { distance: 5 }`.
- **Fluid Multi-Column Reordering:**
  - *Solution:* Handled `onDragOver` for immediate column switching and `onDragEnd` with `arrayMove` for indexed reordering.
- **Ghosting / Visual Feedback:**
  - *Solution:* Leveraged `<DragOverlay>` to render an active card clone elevated with smooth shadows while dimming the original item.

---

## 5. Inline Editing & Priority Styling Prompt

### Inline Editing Flow
1. User clicks card title or Pencil icon.
2. `isEditing` state toggles to `true`.
3. Input automatically receives focus and text selection via `useRef`.
4. `Enter` triggers validation and save; `Escape` restores original title and exits.
5. If title is whitespace-only, shows inline error and preserves edit mode.

### Priority Indication
- Every card renders a left accent border matching priority severity.
- Card header renders a priority badge with both an icon (`AlertCircle`, `Clock`, `ShieldCheck`) and textual label (`High`, `Medium`, `Low`) to guarantee high accessibility for colorblind individuals.

---

## 6. Testing & Quality Assurance Verification Prompt

Executed local verification commands:
```bash
npm run build
```
Result: Zero compile errors, bundle emitted cleanly to `dist/`.

Tested scenarios:
1. Creating tasks across all 3 columns with empty-title validation.
2. Deleting tasks and verifying immediate recalculation of summary stats.
3. Editing titles inline and cancelling with `Esc`.
4. Real-time global search with title/description filtering and empty result state.
5. Dragging cards across columns and reordering inside columns.
6. Persistent storage surviving hard page reload.
7. Mobile responsiveness from 390px up to 1440px desktop screen widths.
