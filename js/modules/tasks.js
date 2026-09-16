/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — TASKS MODULE
   Persönliches Solo-Taskboard für Raphael (Akquise, Technik/Build, Verwaltung)
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';

export function renderTasks(filterCategory = 'all') {
  let tasks = state.getTasks();

  if (filterCategory !== 'all') {
    tasks = tasks.filter(t => t.category.toLowerCase() === filterCategory.toLowerCase());
  }

  const categories = [
    { id: 'all', label: 'Alle Aufgaben' },
    { id: 'akquise', label: '📞 Akquise & Sales' },
    { id: 'technik', label: '⚡ Technik & Build' },
    { id: 'verwaltung', label: '📋 Recht & Verwaltung' }
  ];

  const html = `
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag">[ 05 // SOLO TASKS ]</span>
        <h1 class="section-title">Persönliches Aufgaben-Board</h1>
        <p class="section-desc">Priorisierte To-Dos für den heutigen Arbeitstag — Fokus auf Umsatzhebel & operative Exzellenz</p>
      </div>
      <div class="section-actions">
        <button class="btn btn-primary" id="btnAddNewTask">
          + Neue Aufgabe
        </button>
      </div>
    </div>

    <!-- ─── FILTER TABS ───────────────────────────────────────────────── -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.3rem;">
      ${categories.map(cat => `
        <button class="btn btn-sm ${filterCategory === cat.id ? 'btn-primary' : 'btn-secondary'}" data-task-filter="${cat.id}">
          ${cat.label}
        </button>
      `).join('')}
    </div>

    <!-- ─── 3 SPALTEN: OFFEN, IN ARBEIT, ERLEDIGT ─────────────────────── -->
    <div class="tasks-columns">
      <!-- Spalte 1: Offene Aufgaben -->
      <div class="task-column">
        <div class="task-col-header">
          <span class="task-col-title">Offen (${tasks.filter(t => t.status === 'offen').length})</span>
          <span class="badge badge-amber">TO-DO</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${tasks.filter(t => t.status === 'offen').map(t => renderTaskCard(t)).join('')}
          ${tasks.filter(t => t.status === 'offen').length === 0 ? `
            <div style="text-align:center; padding:1.5rem; color:var(--text-muted); font-size:0.75rem;">Keine offenen Aufgaben</div>
          ` : ''}
        </div>
      </div>

      <!-- Spalte 2: In Arbeit -->
      <div class="task-column">
        <div class="task-col-header">
          <span class="task-col-title">In Bearbeitung (${tasks.filter(t => t.status === 'in_arbeit').length})</span>
          <span class="badge badge-blue">AKTIV</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${tasks.filter(t => t.status === 'in_arbeit').map(t => renderTaskCard(t)).join('')}
          ${tasks.filter(t => t.status === 'in_arbeit').length === 0 ? `
            <div style="text-align:center; padding:1.5rem; color:var(--text-muted); font-size:0.75rem;">Keine Aufgaben in Bearbeitung</div>
          ` : ''}
        </div>
      </div>

      <!-- Spalte 3: Erledigt -->
      <div class="task-column">
        <div class="task-col-header">
          <span class="task-col-title">Erledigt (${tasks.filter(t => t.status === 'erledigt').length})</span>
          <span class="badge badge-emerald">DONE</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.75rem;">
          ${tasks.filter(t => t.status === 'erledigt').map(t => renderTaskCard(t)).join('')}
          ${tasks.filter(t => t.status === 'erledigt').length === 0 ? `
            <div style="text-align:center; padding:1.5rem; color:var(--text-muted); font-size:0.75rem;">Noch keine erledigten Aufgaben</div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  return html;
}

function renderTaskCard(t) {
  const isDone = t.status === 'erledigt';
  const prioClass = t.priority === 'P0' ? 'task-prio-p0' : t.priority === 'P1' ? 'task-prio-p1' : 'task-prio-p2';

  return `
    <div class="task-card ${isDone ? 'is-done' : ''}" data-task-id="${t.id}">
      <div class="task-card-header">
        <div style="display:flex; align-items:center; gap:0.5rem;">
          <input type="checkbox" class="focus-checkbox" ${isDone ? 'checked' : ''} data-action="toggle-task" data-id="${t.id}">
          <span class="badge ${prioClass} font-mono">${t.priority}</span>
          <span class="badge font-mono" style="font-size:0.62rem;">${t.category}</span>
        </div>
        <span class="table-cell-sub font-mono" style="font-size:0.65rem;">${t.dueDate}</span>
      </div>

      <div class="table-cell-title" style="font-size:0.85rem; ${isDone ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">
        ${t.title}
      </div>

      ${t.description ? `
        <div style="font-size:0.73rem; color:var(--text-silver); line-height:1.4;">
          ${t.description}
        </div>
      ` : ''}

      ${t.leadId ? `
        <div style="display:flex; justify-content:flex-end; padding-top:0.35rem; border-top:1px solid rgba(255,255,255,0.04);">
          <button class="btn btn-secondary btn-sm" data-action="open-lead" data-id="${t.leadId}">
            [ LEAD-AKTE ]
          </button>
        </div>
      ` : ''}
    </div>
  `;
}

export function initTasksEvents(container) {
  // Filter Tabs
  container.querySelectorAll('[data-task-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-task-filter');
      container.innerHTML = renderTasks(cat);
      initTasksEvents(container);
    });
  });

  // Checkbox toggle
  container.querySelectorAll('[data-action="toggle-task"]').forEach(cb => {
    cb.addEventListener('change', () => {
      const id = cb.getAttribute('data-id');
      state.toggleTaskStatus(id);
    });
  });

  // Lead Akte öffnen
  container.querySelectorAll('[data-action="open-lead"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const leadId = btn.getAttribute('data-id');
      if (window.nexbotDrawer) window.nexbotDrawer.open(leadId);
    });
  });

  // Neuer Task Button
  const btnNew = container.querySelector('#btnAddNewTask');
  if (btnNew) {
    btnNew.addEventListener('click', () => {
      if (window.nexbotModal) window.nexbotModal.openNewTaskModal();
    });
  }
}
