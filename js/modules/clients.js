/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — CLIENTS & RETAINER MODULE
   Kunden- & MRR-Verwaltung, 49 € Monatsverträge & 30-Minuten Service-Budget
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';

export function renderClients() {
  const clients = state.getClients();
  const metrics = state.getMetrics();

  const totalMRR = clients.reduce((sum, c) => sum + (Number(c.monthlyRetainer) || 49), 0);
  const totalARR = totalMRR * 12;

  const html = `
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag">[ 03 // CLIENTS & MRR ]</span>
        <h1 class="section-title">Kunden & Retainer-Manager</h1>
        <p class="section-desc">Verwaltung gewonnener Handwerkskunden, monatlicher 49-€-Serviceverträge und 30-Minuten-Supportzeit-Budgets</p>
      </div>
      <div class="section-actions">
        <div class="badge badge-emerald font-mono">
          MRR: ${totalMRR} € / Monat (ARR: ${totalARR.toLocaleString('de-DE')} €)
        </div>
      </div>
    </div>

    <!-- ─── KPI MINI STRIP ────────────────────────────────────────────── -->
    <div class="metrics-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 1.5rem;">
      <div class="metric-card">
        <span class="metric-label">Aktive Retainer-Kunden</span>
        <div class="metric-val-wrap">
          <span class="metric-val">${clients.length}</span>
          <span class="metric-target-sub">/ 4 Ziel Q4</span>
        </div>
      </div>
      <div class="metric-card">
        <span class="metric-label">Monatlicher Cashflow (MRR)</span>
        <div class="metric-val-wrap">
          <span class="metric-val">${totalMRR} €</span>
          <span class="metric-target-sub">/ 156 € Ziel</span>
        </div>
      </div>
      <div class="metric-card">
        <span class="metric-label">Support-Budget Gesamt</span>
        <div class="metric-val-wrap">
          <span class="metric-val">${clients.length * 30} Min</span>
          <span class="metric-target-sub">monatlich inkl.</span>
        </div>
      </div>
    </div>

    <!-- ─── KUNDEN-TABELLE ────────────────────────────────────────────── -->
    <div class="table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Kunde / Betrieb</th>
            <th>Domain & Hosting</th>
            <th>Vertragsbeginn</th>
            <th>Retainer (Monat)</th>
            <th>Support-Budget (30 Min)</th>
            <th>Zahlung & Rechnungen</th>
            <th style="text-align: right;">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          ${clients.map(c => {
            const budgetPercent = Math.min(100, Math.round((c.usedMinutesThisMonth / c.supportBudgetMinutes) * 100));
            return `
              <tr style="cursor: pointer;" data-action="open-client-lead" data-lead-id="${c.leadId}">
                <td>
                  <div class="table-cell-title">${c.companyName}</div>
                  <div class="table-cell-sub">${c.contactPerson}</div>
                </td>

                <td>
                  <div style="display:flex; align-items:center; gap:0.4rem;">
                    <a href="https://${c.domain}" target="_blank" class="table-cell-title" style="color:var(--status-blue); text-decoration:none;" onclick="event.stopPropagation();">
                      ${c.domain}
                    </a>
                  </div>
                  <div class="table-cell-sub">Vercel Edge Global SSL</div>
                </td>

                <td>
                  <div class="table-cell-title font-mono" style="font-size:0.75rem;">${c.startDate}</div>
                  <div class="table-cell-sub">1.250 € Festpreis bezahlt</div>
                </td>

                <td>
                  <div class="table-cell-title font-mono" style="color:var(--status-emerald); font-size:0.9rem;">
                    ${c.monthlyRetainer} € <span style="font-size:0.7rem; color:var(--text-muted);">/ Mtl.</span>
                  </div>
                  <div class="table-cell-sub">${c.paymentMethod}</div>
                </td>

                <td style="min-width: 140px;">
                  <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.68rem; margin-bottom:0.2rem;">
                    <span>${c.usedMinutesThisMonth} / ${c.supportBudgetMinutes} Min</span>
                    <span style="color:${budgetPercent > 80 ? 'var(--status-danger)' : 'var(--status-emerald)'};">${budgetPercent}%</span>
                  </div>
                  <div style="height: 5px; background: rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
                    <div style="height:100%; width:${budgetPercent}%; background:${budgetPercent > 80 ? 'var(--status-danger)' : 'var(--status-emerald)'};"></div>
                  </div>
                </td>

                <td>
                  <span class="badge badge-emerald">${c.invoiceStatus.toUpperCase()}</span>
                  <div class="table-cell-sub font-mono">${c.latestInvoiceNumber}</div>
                </td>

                <td style="text-align: right;">
                  <div style="display:flex; gap:0.4rem; justify-content:flex-end;">
                    <button class="btn btn-secondary btn-sm" data-action="preview-contract" data-path="${c.contractFile}" onclick="event.stopPropagation();" title="BGB-Vertrag anzeigen">
                      [ VERTRAG ]
                    </button>
                    <button class="btn btn-primary btn-sm" data-action="open-client-lead" data-lead-id="${c.leadId}" onclick="event.stopPropagation();">
                      [ AKTE ]
                    </button>
                  </div>
                </td>
              </tr>
            `;
          }).join('')}

          ${clients.length === 0 ? `
            <tr>
              <td colspan="7" style="text-align:center; padding: 2.5rem; color:var(--text-muted); font-family:var(--font-mono);">
                Noch keine Kunden abgeschlossen. Verschiebe einen Lead in der Pipeline auf [GEWONNEN], um ihn hier automatisch anzulegen.
              </td>
            </tr>
          ` : ''}
        </tbody>
      </table>
    </div>
  `;

  return html;
}

export function initClientsEvents(container) {
  container.querySelectorAll('[data-action="open-client-lead"]').forEach(elem => {
    elem.addEventListener('click', (e) => {
      const leadId = elem.getAttribute('data-lead-id');
      if (leadId && window.nexbotDrawer) {
        window.nexbotDrawer.open(leadId);
      }
    });
  });

  container.querySelectorAll('[data-action="preview-contract"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const path = btn.getAttribute('data-path');
      if (path && window.nexbotModal) {
        window.nexbotModal.openIframe(path, 'BGB-Projektvertrag');
      }
    });
  });
}
