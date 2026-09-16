/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — MAIN ENTRY POINT & ROUTER
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from './state.js';
import { renderCockpit, initCockpitEvents } from './modules/cockpit.js';
import { renderPipeline, initPipelineEvents } from './modules/pipeline.js';
import { renderClients, initClientsEvents } from './modules/clients.js';
import { renderDocuments, initDocumentsEvents } from './modules/documents.js';
import { renderTasks, initTasksEvents } from './modules/tasks.js';
import { renderColdCall, initColdCallEvents } from './modules/coldcall.js';
import { initDrawer } from './modules/drawer.js';
import { initModal, showToast } from './modules/modal.js';

let currentRoute = 'cockpit';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialisiere Drawer & Modal Services
  initDrawer();
  initModal();

  // 2. HUD Uhr & Header Metriken
  initHUDClock();
  updateHeaderKPIs();

  // 3. Navigation & Routing
  initNavigation();

  // 4. Mobile Menu Toggle
  initMobileMenu();

  // 5. State Subscription (Reaktivität)
  state.subscribe((newState, changeType) => {
    updateHeaderKPIs();
    updateSidebarCounters();
    // Re-Render current view
    navigateTo(currentRoute, false);
  });

  // 6. Initiale Route laden
  const hash = window.location.hash.replace('#', '') || 'cockpit';
  navigateTo(hash);
  updateSidebarCounters();
});

/* ─── HUD LIVE CLOCK ─────────────────────────────────────────────────── */
function initHUDClock() {
  const clockElem = document.getElementById('hudClock');
  if (!clockElem) return;

  function update() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    clockElem.textContent = `[ MANCHING / INGOLSTADT ${timeStr} ]`;
  }
  update();
  setInterval(update, 1000);
}

/* ─── HEADER KPI & 5K TRACKER ────────────────────────────────────────── */
function updateHeaderKPIs() {
  const metrics = state.getMetrics();
  const fillElem = document.getElementById('kpiProgressFill');
  const valElem = document.getElementById('kpiTrackerVal');

  if (fillElem && valElem) {
    const pct = Math.min(100, Math.round((metrics.currentRevenue / metrics.revenueTarget) * 100));
    fillElem.style.width = `${pct}%`;
    valElem.textContent = `${metrics.currentRevenue.toLocaleString('de-DE')} € / ${metrics.revenueTarget.toLocaleString('de-DE')} € (${pct}%)`;
  }
}

/* ─── SIDEBAR COUNTERS ───────────────────────────────────────────────── */
function updateSidebarCounters() {
  const leads = state.getLeads();
  const clients = state.getClients();
  const docs = state.getDocuments();
  const tasks = state.getTasks();

  const countPipe = document.getElementById('cntPipeline');
  if (countPipe) countPipe.textContent = leads.filter(l => l.status !== 'gewonnen').length;

  const countClients = document.getElementById('cntClients');
  if (countClients) countClients.textContent = clients.length;

  const countDocs = document.getElementById('cntDocs');
  if (countDocs) countDocs.textContent = docs.length;

  const countTasks = document.getElementById('cntTasks');
  if (countTasks) countTasks.textContent = tasks.filter(t => t.status === 'offen').length;
}

/* ─── NAVIGATION & ROUTING ───────────────────────────────────────────── */
function initNavigation() {
  document.querySelectorAll('[data-route]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const route = link.getAttribute('data-route');
      window.location.hash = route;
      navigateTo(route);
      closeMobileMenu();
    });
  });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '') || 'cockpit';
    if (hash !== currentRoute) {
      navigateTo(hash);
    }
  });

  // Global Quick Add Lead Button in Header
  const quickAddBtn = document.getElementById('btnHeaderQuickAdd');
  if (quickAddBtn) {
    quickAddBtn.addEventListener('click', () => {
      if (window.nexbotModal) window.nexbotModal.openNewLeadModal();
    });
  }

  // Reset Data Button in Footer
  const resetBtn = document.getElementById('btnResetData');
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Möchtest du alle Daten wirklich auf den Original-Bestand zurücksetzen?')) {
        state.resetAllData();
        showToast('✓ Datenbestand erfolgreich zurückgesetzt!');
      }
    });
  }
}

function navigateTo(route, updateHistory = true) {
  currentRoute = route;
  if (updateHistory && window.location.hash.replace('#', '') !== route) {
    window.location.hash = route;
  }

  // Update Sidebar active states
  document.querySelectorAll('.sidebar-nav-item').forEach(item => {
    item.classList.toggle('is-active', item.getAttribute('data-route') === route);
  });

  const mainArea = document.getElementById('appMainArea');
  if (!mainArea) return;

  // Render Modul
  if (route === 'cockpit') {
    mainArea.innerHTML = renderCockpit();
    initCockpitEvents(mainArea, navigateTo);
  } else if (route === 'pipeline') {
    mainArea.innerHTML = renderPipeline();
    initPipelineEvents(mainArea);
  } else if (route === 'clients') {
    mainArea.innerHTML = renderClients();
    initClientsEvents(mainArea);
  } else if (route === 'documents') {
    mainArea.innerHTML = renderDocuments();
    initDocumentsEvents(mainArea);
  } else if (route === 'tasks') {
    mainArea.innerHTML = renderTasks();
    initTasksEvents(mainArea);
  } else if (route === 'coldcall') {
    mainArea.innerHTML = renderColdCall();
    initColdCallEvents(mainArea);
  } else {
    // Fallback zu Cockpit
    mainArea.innerHTML = renderCockpit();
    initCockpitEvents(mainArea, navigateTo);
  }

  window.scrollTo({ top: 0, behavior: 'instant' });
}

/* ─── MOBILE MENU ────────────────────────────────────────────────────── */
function initMobileMenu() {
  const menuBtn = document.getElementById('hudMenuBtn');
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (menuBtn && sidebar && backdrop) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      backdrop.classList.toggle('active');
    });

    backdrop.addEventListener('click', closeMobileMenu);
  }
}

function closeMobileMenu() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('mobile-open');
  if (backdrop) backdrop.classList.remove('active');
}
