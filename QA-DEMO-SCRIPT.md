# FlowForge — 3-Minute QA Video Demo Script

> **Assignment:** Prodesk IT Sprint 05  
> **Project:** FlowForge — Plan smarter. Move faster.  
> **Presenter:** Vinayak Sharma  
> **Duration:** 3 Minutes  
> *Note: Subtitle callouts are provided for each step if presenting without microphone audio.*

---

## Timeline & Step-by-Step Walkthrough

```text
00:00 ─── [Intro & Concept]
00:25 ─── [Architecture & State Flow]
00:50 ─── [Creating Tasks & Form Validation]
01:15 ─── [Inline Editing & Priority Badges]
01:40 ─── [Drag-and-Drop & Accessible Controls]
02:05 ─── [Real-Time Search & Empty States]
02:25 ─── [localStorage Persistence & Hard Refresh]
02:45 ─── [Responsive Layout & Vercel Readiness]
03:00 ─── [Wrap Up]
```

---

### Segment 1: Introduction & Brand Presentation (00:00 – 00:25)
- **Visual:** Display the full application loaded on desktop (1440px). Hover over the deep navy sidebar, the workspace title, and the live status indicators.
- **Spoken Audio:**
  > "Hello everyone! Welcome to my demonstration of FlowForge, developed for the Prodesk IT Sprint 05 assignment. FlowForge is a modern SaaS Kanban Task Management board designed around the philosophy: 'Plan smarter. Move faster.' It features a deep navy sidebar, soft off-white workspace, dynamic sprint statistics, and rich violet and indigo accents."
- **Subtitle Callout:**
  > `[SUBTITLE]: FlowForge Kanban Board — React 18 + Vite + @dnd-kit + CSS3`

---

### Segment 2: React Component Architecture & Props (00:25 – 00:50)
- **Visual:** Briefly show the component structure or inspect elements in dev tools showing `Sidebar`, `BoardHeader`, `SummaryStats`, `KanbanBoard`, and `KanbanColumn`.
- **Spoken Audio:**
  > "Under the hood, FlowForge strictly adheres to clean React architecture. All tasks reside in a single source of truth in `App.jsx`. There is no Redux and no direct DOM manipulation. Data cascades down via props, and child components communicate upward via callback functions like `onAddTask`, `onEditTask`, and `onMoveTask`. The five summary metric cards calculate totals and completion percentages dynamically from this state."
- **Subtitle Callout:**
  > `[SUBTITLE]: Unidirectional data flow: State lifted to App.jsx; Derived metrics update automatically.`

---

### Segment 3: Adding a Task & Validation (00:50 – 01:15)
- **Visual:** Click the **Add Task** button in the header. Try submitting an empty form to show the validation error. Then fill in title: `"Implement Webhook Listener"`, description: `"Process asynchronous payment notifications"`, select `"High Priority"`, and submit.
- **Spoken Audio:**
  > "Let's create a new task. Notice when I leave the title blank and click 'Add Task', clear validation prevents submission. Now I'll enter 'Implement Webhook Listener', select High Priority, and click submit. Notice the new card appears instantly in the To Do column, the task count increments, and our Sprint Progress metric recalculates in real time."
- **Subtitle Callout:**
  > `[SUBTITLE]: Modal validation safeguards required title. Immutable state updates board & statistics.`

---

### Segment 4: Inline Editing, Priorities, and Deletion (01:15 – 01:40)
- **Visual:** Click on the title of a card to trigger inline edit. Type a modified title and press `Enter`. Show the priority badge and colored left-border accent. Then click the trash icon on a card to delete it.
- **Spoken Audio:**
  > "Editing tasks is seamless. Clicking any title opens inline edit mode right in the card. Pressing Enter saves the change, while Escape cancels. Each card features distinct priority styling: red for High, amber for Medium, and green for Low, paired with accessible badges. Clicking the delete icon removes the task and immediately syncs the board."
- **Subtitle Callout:**
  > `[SUBTITLE]: Inline editing with keyboard shortcuts (Enter/Esc). Accessible priority badges and left borders.`

---

### Segment 5: Drag-and-Drop & Accessibility Fallbacks (01:40 – 02:05)
- **Visual:** Grab the drag handle of the `"Review OAuth2 API integration"` card, drag it smoothly from *In Progress* to *Done*. Highlight the droppable container glowing, and the elevated shadow on the DragOverlay. Then use the quick stepper button `[Prev]` on a card to demonstrate accessible movement.
- **Spoken Audio:**
  > "FlowForge implements actual drag-and-drop using `@dnd-kit`. Watch how the drop target highlights and the DragOverlay gives smooth, elevated visual feedback as I move this task from In Progress to Done. Even better, for keyboard and screen-reader accessibility, every card also includes dedicated stepper buttons and a dropdown menu to change status without dragging."
- **Subtitle Callout:**
  > `[SUBTITLE]: @dnd-kit Drag-and-Drop with 5px activation constraint + Keyboard/stepper fallback controls.`

---

### Segment 6: Real-Time Global Search (02:05 – 02:25)
- **Visual:** Type `"OAuth"` into the search bar. Observe instant filtering across all columns. Show the clear search (X) button. Then type `"NonExistent"` to display the custom `EmptyState` component with the clear button.
- **Spoken Audio:**
  > "Next, our global search allows real-time, case-insensitive filtering across both task titles and descriptions without mutating underlying data. When no matching tasks are found, an elegant empty state guides the user to reset their search query."
- **Subtitle Callout:**
  > `[SUBTITLE]: Controlled real-time search across title and description with dedicated empty-state feedback.`

---

### Segment 7: localStorage Persistence & Hard Reload (02:25 – 02:45)
- **Visual:** Perform a hard refresh in the browser (`Ctrl + F5` / `Cmd + Shift + R`). Show that all created tasks, edits, and column positions remain identical.
- **Spoken Audio:**
  > "All state changes are automatically synchronized with browser localStorage via our custom `useLocalStorage` hook. If I perform a hard refresh right now, you can see all tasks, edits, and moved cards are restored exactly as we left them."
- **Subtitle Callout:**
  > `[SUBTITLE]: useLocalStorage hook guarantees full persistence across hard browser reloads.`

---

### Segment 8: Responsive Layout & Production Build (02:45 – 03:00)
- **Visual:** Open browser DevTools device toolbar. Switch to Tablet (768px) and Mobile (390px iPhone). Open the mobile hamburger menu drawer. Then show the production terminal output of `npm run build`.
- **Spoken Audio:**
  > "Finally, FlowForge is fully responsive down to mobile viewports with an off-canvas drawer navigation and smooth scrollable columns. The production build compiles cleanly in under 3 seconds and is 100% ready for Vercel deployment. Thank you!"
- **Subtitle Callout:**
  > `[SUBTITLE]: Fully responsive (1440px / 1024px / 768px / 390px). Production build verified for Vercel.`
