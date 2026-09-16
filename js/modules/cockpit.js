/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — COCKPIT MODULE
   KPI-Übersicht, 5K-Fortschritt, Top 3 Hebel heute & Letzte Aktivitäten
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';

export function renderCockpit() {
  const metrics = state.getMetrics();
  const top3Hebel = state.getTop3Hebel();
  const leads = state.getLeads();
  const clients = state.getClients();

  // Fortschritts-Prozent für 5K Ziel
  const percent5k = Math.min(100, Math.round((metrics.currentRevenue / metrics.revenueTarget) * 100));
  const percentMRR = Math.min(100, Math.round((metrics.currentMRR / metrics.targetMRR) * 100));

  // Conversion Quote
  const conversionRate = metrics.demosSent > 0 
    ? Math.round((metrics.closedDealsCount / metrics.demosSent) * 100) 
    : 0;

  const html = `
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag">[ 01 // OVERVIEW ]</span>
        <h1 class="section-title">Solo Business Cockpit</h1>
        <p class="section-desc">Operatives Kontrollzentrum für Nexbot Webdesign — Raphael Neumeier (Manching / Ingolstadt)</p>
      </div>
      <div class="section-actions">
        <button class="btn btn-secondary" id="btnRefreshCockpit" title="Kennzahlen neu synchronisieren">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
          [ SYNC ]
        </button>
        <button class="btn btn-primary" id="btnOpenNewLeadModal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          [ NEUER LEAD ]
        </button>
      </div>
    </div>

    <!-- ─── METRIKEN GRID ─────────────────────────────────────────────── -->
    <div class="metrics-grid">
      <!-- 1. Realisierter Umsatz (5K Primärziel) -->
      <div class="metric-card highlight">
        <div class="metric-card-top">
          <span class="metric-label">Q4 Umsatz-Ziel (5.000 €)</span>
          <span class="badge ${percent5k >= 100 ? 'badge-emerald' : 'badge-amber'}">${percent5k}% ZIEL</span>
        </div>
        <div class="metric-val-wrap">
          <span class="metric-val">${metrics.currentRevenue.toLocaleString('de-DE')} €</span>
          <span class="metric-target-sub">/ 5.000 €</span>
        </div>
        <div class="metric-bottom">
          <span>${metrics.closedDealsCount} von ${metrics.targetDealsCount} Abschlüssen (à 1.250 €)</span>
          <span class="metric-trend-good">Stichtag 31.12.</span>
        </div>
      </div>

      <!-- 2. Wiederkehrender Cashflow (MRR) -->
      <div class="metric-card">
        <div class="metric-card-top">
          <span class="metric-label">Monatlicher Retainer (MRR)</span>
          <span class="badge badge-emerald">${percentMRR}% MRR</span>
        </div>
        <div class="metric-val-wrap">
          <span class="metric-val">${metrics.currentMRR} €</span>
          <span class="metric-target-sub">/ 156 € mtl.</span>
        </div>
        <div class="metric-bottom">
          <span>${clients.length} aktive Service-Verträge</span>
          <span style="color:var(--text-silver)">ARR: ${(metrics.currentMRR * 12).toLocaleString('de-DE')} €</span>
        </div>
      </div>

      <!-- 3. Aktive Pipeline -->
      <div class="metric-card">
        <div class="metric-card-top">
          <span class="metric-label">Pipeline-Potenzial</span>
          <span class="badge badge-blue">14 LEADS AKTIV</span>
        </div>
        <div class="metric-val-wrap">
          <span class="metric-val">${metrics.pipelineValue.toLocaleString('de-DE')} €</span>
        </div>
        <div class="metric-bottom">
          <span>In Pitch / Verhandlung</span>
          <span style="color:var(--status-blue)">21 Demos bereit</span>
        </div>
      </div>

      <!-- 4. Conversion & Abschlussquote -->
      <div class="metric-card">
        <div class="metric-card-top">
          <span class="metric-label">Demo-Closing-Quote</span>
          <span class="badge ${conversionRate >= 10 ? 'badge-emerald' : 'badge-amber'}">BENCHMARK 10%</span>
        </div>
        <div class="metric-val-wrap">
          <span class="metric-val">${conversionRate}%</span>
        </div>
        <div class="metric-bottom">
          <span>${metrics.closedDealsCount} Closed / ${metrics.demosSent} Demos raus</span>
          <span class="metric-trend-good">Saxer-Funnel</span>
        </div>
      </div>
    </div>

    <!-- ─── TOP 3 HEBEL HEUTE (SOLO FOKUS) ────────────────────────────── -->
    <div class="focus-card">
      <div class="focus-header">
        <div class="focus-title-group">
          <span class="badge badge-emerald">PRIORITÄT HEUTE</span>
          <div>
            <h2 class="focus-heading">Top 3 Hebel für Raphael Neumeier</h2>
            <p class="focus-subtitle">Konzentrierter Fokus als Solo-Unternehmer — Was bringt heute den größten Umsatzhebel?</p>
          </div>
        </div>
        <span class="badge badge-blue font-mono">SOLO-MODUS AKTIV</span>
      </div>

      <div class="focus-items-list" id="cockpitHebelList">
        ${top3Hebel.map(h => `
          <div class="focus-item ${h.isDone ? 'is-done' : ''}" data-hebel-id="${h.id}">
            <input type="checkbox" class="focus-checkbox" ${h.isDone ? 'checked' : ''} data-hebel-action="toggle" data-id="${h.id}">
            <span class="focus-rank">#${h.rank}</span>
            <div class="focus-item-content">
              <span class="focus-item-text">${h.text}</span>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <span class="badge badge-${h.category === 'Akquise' ? 'danger' : 'blue'}">${h.category}</span>
                ${h.leadId ? `<button class="btn btn-secondary btn-sm" data-action="open-lead" data-id="${h.leadId}">[ AKTE ÖFFNEN ]</button>` : ''}
                ${h.docId ? `<button class="btn btn-secondary btn-sm" data-action="open-doc" data-id="${h.docId}">[ VERTRAG ]</button>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- ─── ZWEI-SPALTIG: AKTUELLE PITCHES & SCHNELLÜBERSICHT ──────────── -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
      <!-- Spalte 1: Heiße Leads in Verhandlung & Pitch -->
      <div class="task-column">
        <div class="task-col-header">
          <span class="task-col-title">[ HEISSE LEADS // NÄCHSTER ABSCHLUSS ]</span>
          <span class="badge badge-amber">PRIO AKQUISE</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${leads
            .filter(l => ['verhandlung', 'pitch_versendet'].includes(l.status))
            .slice(0, 4)
            .map(l => `
              <div class="task-card" style="cursor: pointer;" data-action="open-lead" data-id="${l.id}">
                <div class="task-card-header">
                  <span class="table-cell-title">${l.companyName}</span>
                  <span class="badge ${l.status === 'verhandlung' ? 'badge-amber' : 'badge-blue'}">${l.status.replace('_', ' ').toUpperCase()}</span>
                </div>
                <div style="display:flex; justify-content:space-between; align-items:center; font-family:var(--font-mono); font-size:0.72rem; color:var(--text-silver);">
                  <span>${l.city} · ${l.category}</span>
                  <span style="color:var(--text-pure); font-weight:700;">${l.dealValue} €</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-silver); font-style:italic; line-height:1.35; background:rgba(255,255,255,0.02); padding:0.35rem 0.5rem; border-left:2px solid var(--border-bright);">
                  „${l.topReviewQuote || l.notes}“
                </div>
                <div style="display:flex; justify-content:flex-end; gap:0.4rem; padding-top:0.3rem;">
                  <a href="https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=Hallo%20Herr%20${encodeURIComponent(l.ownerName)}%2C%20hier%20der%20fertige%20Website-Entwurf%20f%C3%BCr%20${encodeURIComponent(l.companyName)}%3A%20${encodeURIComponent(l.demoUrl)}" 
                     target="_blank" class="btn btn-emerald btn-sm" onclick="event.stopPropagation();">
                    WhatsApp
                  </a>
                  <a href="tel:${l.phone.replace(/[^0-9+]/g, '')}" class="btn btn-secondary btn-sm" onclick="event.stopPropagation();">
                    Anrufen
                  </a>
                </div>
              </div>
            `).join('')}
        </div>
      </div>

      <!-- Spalte 2: Nexbot Organisation Schnellzugriff -->
      <div class="task-column">
        <div class="task-col-header">
          <span class="task-col-title">[ NEXBOT ORGANISATION // DOKUMENTE ]</span>
          <span class="badge badge-emerald">§ 5 DDG & BGB READY</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${state.getDocuments().slice(0, 4).map(d => `
            <div class="task-card" style="cursor: pointer;" data-action="preview-doc" data-path="${d.filePath}" data-title="${d.title}">
              <div class="task-card-header">
                <span class="table-cell-title" style="font-size:0.82rem;">${d.title}</span>
                <span class="badge badge-emerald">${d.status.toUpperCase()}</span>
              </div>
              <div style="font-size:0.75rem; color:var(--text-muted);">
                Kunde: <strong style="color:var(--text-silver);">${d.clientName}</strong> · Betrag: <strong style="color:var(--text-pure);">${d.amount}</strong>
              </div>
              <div style="font-size:0.72rem; color:var(--text-silver); line-height:1.35;">
                ${d.description}
              </div>
              <div style="display:flex; justify-content:flex-end; gap:0.4rem; padding-top:0.3rem;">
                <button class="btn btn-secondary btn-sm" data-action="preview-doc" data-path="${d.filePath}" data-title="${d.title}">
                  [ VORSCHAU / DRUCK ]
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  return html;
}

export function initCockpitEvents(container, router) {
  // Checkbox Toggle für Hebel
  container.querySelectorAll('[data-hebel-action="toggle"]').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      state.toggleHebel(id);
    });
  });

  // Open Lead Action
  container.querySelectorAll('[data-action="open-lead"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const leadId = btn.getAttribute('data-id');
      if (window.nexbotDrawer) {
        window.nexbotDrawer.open(leadId);
      }
    });
  });

  // Preview Doc Action
  container.querySelectorAll('[data-action="preview-doc"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const path = btn.getAttribute('data-path');
      const title = btn.getAttribute('data-title');
      if (window.nexbotModal) {
        window.nexbotModal.openIframe(path, title);
      }
    });
  });

  // Sync Button
  const btnSync = container.querySelector('#btnRefreshCockpit');
  if (btnSync) {
    btnSync.addEventListener('click', () => {
      state.recalculateMetrics();
      state.notify('sync');
      if (window.showToast) window.showToast('✓ Kennzahlen synchronisiert!');
    });
  }

  // Neuer Lead Button
  const btnNewLead = container.querySelector('#btnOpenNewLeadModal');
  if (btnNewLead) {
    btnNewLead.addEventListener('click', () => {
      if (window.nexbotModal) {
        window.nexbotModal.openNewLeadModal();
      }
    });
  }
}
