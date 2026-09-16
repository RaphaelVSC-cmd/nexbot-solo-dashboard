/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — DOCUMENTS & CONTRACTS MODULE
   Direkte Verknüpfung & Vorschau des Ordners „Nexbot Organisation"
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';

export function renderDocuments(activeFilter = 'all') {
  let docs = state.getDocuments();

  if (activeFilter !== 'all') {
    docs = docs.filter(d => d.category === activeFilter);
  }

  const categories = [
    { id: 'all', label: 'Alle Dokumente' },
    { id: '01_Angebote', label: '01 Angebote' },
    { id: '02_Verträge', label: '02 Verträge & AVV' },
    { id: '03_Rechnungen', label: '03 Rechnungen' },
    { id: '04_Buchhaltung_EÜR', label: '04 EÜR Buchhaltung' },
    { id: '05_Behörden_Unterlagen', label: '05 Behörden' }
  ];

  const html = `
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag">[ 04 // DOKUMENTE & RECHT ]</span>
        <h1 class="section-title">Nexbot Organisation & Verträge</h1>
        <p class="section-desc">Nahtloser Zugriff auf Angebote, BGB-Werkverträge, DSGVO-AVVs und Kleinunternehmer-Rechnungen — Direktansicht & Druck ohne Dateisystem-Wechsel</p>
      </div>
      <div class="section-actions">
        <a href="../../Nexbot Organisation/INDEX_NEXBOT_ORGANISATION.html" target="_blank" class="btn btn-secondary" title="Organisation Hub in separatem Tab öffnen">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
          [ HUB ÖFFNEN ]
        </a>
      </div>
    </div>

    <!-- ─── KATEGORIE-FILTER TABS ─────────────────────────────────────── -->
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; overflow-x: auto; padding-bottom: 0.4rem;">
      ${categories.map(cat => `
        <button class="btn btn-sm ${activeFilter === cat.id ? 'btn-primary' : 'btn-secondary'}" data-doc-filter="${cat.id}">
          ${cat.label}
        </button>
      `).join('')}
    </div>

    <!-- ─── DOKUMENTEN-GRID ───────────────────────────────────────────── -->
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem;">
      ${docs.map(doc => {
        let badgeClass = 'badge-blue';
        if (doc.status === 'unterzeichnet' || doc.status === 'bezahlt' || doc.status === 'angenommen' || doc.status === 'bestätigt') {
          badgeClass = 'badge-emerald';
        } else if (doc.status === 'versendet' || doc.status === 'in_verhandlung') {
          badgeClass = 'badge-amber';
        }

        return `
          <div class="task-card" style="padding: 1.1rem;">
            <div class="task-card-header" style="margin-bottom: 0.35rem;">
              <span class="badge badge-purple font-mono">${doc.category.replace('_', ' ')}</span>
              <span class="badge ${badgeClass} font-mono">${doc.status.toUpperCase()}</span>
            </div>

            <h3 class="table-cell-title" style="font-size: 0.95rem; margin-bottom: 0.25rem;">${doc.title}</h3>
            
            <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.72rem; color:var(--text-silver); margin-bottom:0.5rem;">
              <span>Kunde: <strong style="color:var(--text-pure);">${doc.clientName}</strong></span>
              <span style="color:var(--status-emerald); font-weight:700;">${doc.amount}</span>
            </div>

            <p style="font-size: 0.76rem; color: var(--text-silver); line-height: 1.4; margin-bottom: 0.75rem; flex: 1;">
              ${doc.description}
            </p>

            <div style="display:flex; justify-content:space-between; align-items:center; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06);">
              <span class="table-cell-sub font-mono">${doc.date}</span>

              <div style="display: flex; gap: 0.4rem;">
                <a href="${doc.filePath}" target="_blank" class="btn btn-secondary btn-sm" title="Im neuen Tab öffnen">
                  Öffnen ↗
                </a>
                <button class="btn btn-primary btn-sm" data-action="preview-doc" data-path="${doc.filePath}" data-title="${doc.title}">
                  Vorschau
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  return html;
}

export function initDocumentsEvents(container) {
  // Filter Tabs
  container.querySelectorAll('[data-doc-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-doc-filter');
      const newHtml = renderDocuments(cat);
      container.innerHTML = newHtml;
      initDocumentsEvents(container);
    });
  });

  // Vorschau
  container.querySelectorAll('[data-action="preview-doc"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const path = btn.getAttribute('data-path');
      const title = btn.getAttribute('data-title');
      if (window.nexbotModal) {
        window.nexbotModal.openIframe(path, title);
      }
    });
  });
}
