/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — SLIDE-OVER DETAIL DRAWER
   Zentrale Lead- & Kunden-Akte mit smarten Verknüpfungen (Dokumente, Demo, Notizen)
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';
import { PIPELINE_COLUMNS } from './pipeline.js';

class DrawerManager {
  constructor() {
    this.currentLeadId = null;
    this.backdrop = document.getElementById('drawerBackdrop');
    this.panel = document.getElementById('drawerPanel');
    this.init();
  }

  init() {
    if (!this.backdrop || !this.panel) return;

    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    const closeBtn = document.getElementById('drawerCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Escape Key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  isOpen() {
    return this.backdrop && this.backdrop.classList.contains('is-open');
  }

  open(leadId) {
    this.currentLeadId = leadId;
    const lead = state.getLeadById(leadId);
    if (!lead) return;

    this.renderContent(lead);
    this.backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      this.currentLeadId = null;
    }
  }

  renderContent(lead) {
    const body = document.getElementById('drawerBody');
    const headerTitle = document.getElementById('drawerCompanyName');
    const headerTag = document.getElementById('drawerTag');

    if (headerTitle) headerTitle.textContent = lead.companyName;
    if (headerTag) headerTag.textContent = `[ ID: ${lead.id} · ${lead.city} ]`;

    // WhatsApp Message
    const encodedPitch = encodeURIComponent(
      `Hallo Herr ${lead.ownerName || ''},\n\nwie besprochen sende ich Ihnen hier den fertigen, interaktiven Website-Entwurf für ${lead.companyName}:\n👉 ${lead.demoUrl || 'https://nexbot.info'}\n\nTippen Sie einfach kurz auf dem Smartphone darauf.\n\nBeste Grüße,\nRaphael Neumeier\nNexbot Webdesign`
    );
    const waLink = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodedPitch}`;

    body.innerHTML = `
      <!-- ─── STATUS & SCHNELL-AKTIONEN ──────────────────────────────── -->
      <div class="drawer-section">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <label class="form-label" style="margin:0;">Status:</label>
            <select id="drawerStatusSelect" class="form-select" style="width:170px;">
              ${PIPELINE_COLUMNS.map(col => `
                <option value="${col.id}" ${lead.status === col.id ? 'selected' : ''}>${col.title}</option>
              `).join('')}
            </select>
          </div>

          <div class="drawer-actions-bar">
            <a href="${waLink}" target="_blank" class="btn btn-emerald btn-sm" title="Personalisierten WhatsApp-Pitch senden">
              💬 WhatsApp Pitch
            </a>
            <a href="tel:${lead.phone.replace(/[^0-9+]/g, '')}" class="btn btn-secondary btn-sm" title="Direkt anrufen">
              📞 Anrufen
            </a>
          </div>
        </div>
      </div>

      <!-- ─── STAMMDATEN & KONTAKT ───────────────────────────────────── -->
      <div class="drawer-section">
        <span class="drawer-section-title">01 // Stammdaten & Recherche</span>
        <div class="drawer-info-grid">
          <div class="drawer-info-box">
            <span class="drawer-info-label">Inhaber / Meister:</span>
            <span class="drawer-info-value">${lead.ownerName || 'Nicht angegeben'}</span>
          </div>
          <div class="drawer-info-box">
            <span class="drawer-info-label">Gewerk / Branche:</span>
            <span class="drawer-info-value">${lead.category}</span>
          </div>
          <div class="drawer-info-box">
            <span class="drawer-info-label">Telefonnummer:</span>
            <span class="drawer-info-value font-mono">${lead.phone || 'Keine Angabe'}</span>
          </div>
          <div class="drawer-info-box">
            <span class="drawer-info-label">Standort:</span>
            <span class="drawer-info-value">${lead.street ? lead.street + ', ' : ''}${lead.city}</span>
          </div>
        </div>

        <!-- GOOGLE BEWERTUNG -->
        <div class="drawer-info-box" style="margin-top:0.4rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
            <span class="drawer-info-label">Google Bewertung (Opener-Haken):</span>
            <span class="kanban-card-rating font-mono">★ ${lead.googleRating ? lead.googleRating.toFixed(1) : '5.0'} (${lead.reviewCount || 0} Rezensionen)</span>
          </div>
          <div style="font-size:0.8rem; font-style:italic; color:#ffffff; background:rgba(255,255,255,0.03); padding:0.5rem 0.75rem; border-left:3px solid #facc15; border-radius:0 var(--radius-xs) var(--radius-xs) 0;">
            „${lead.topReviewQuote || 'Hervorragender regionaler Fachbetrieb.'}“
          </div>
        </div>
      </div>

      <!-- ─── TECHNISCHE ASSETS & LIVE DEMO ──────────────────────────── -->
      <div class="drawer-section">
        <span class="drawer-section-title">02 // Digitale Assets & Vercel Edge Demo</span>
        <div class="drawer-info-grid">
          <div class="drawer-info-box">
            <span class="drawer-info-label">Einmalpreis Festpreis:</span>
            <span class="drawer-info-value font-mono" style="color:var(--text-pure); font-size:1rem; font-weight:700;">${lead.dealValue} €</span>
          </div>
          <div class="drawer-info-box">
            <span class="drawer-info-label">Care-Retainer:</span>
            <span class="drawer-info-value font-mono" style="color:var(--status-emerald); font-size:1rem; font-weight:700;">${lead.monthlyRetainer} € / Monat</span>
          </div>
        </div>

        <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-top:0.4rem;">
          ${lead.demoUrl ? `
            <a href="${lead.demoUrl}" target="_blank" class="btn btn-secondary btn-sm" style="flex:1; justify-content:center;">
              🌐 Vercel Live-Link öffnen ↗
            </a>
            <button class="btn btn-primary btn-sm" id="btnPreviewDemoInside" data-url="${lead.demoUrl}" style="flex:1; justify-content:center;">
              📱 Smartphone Simulator
            </button>
          ` : `
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-muted); padding:0.5rem; border:1px dashed var(--border-subtle); width:100%; text-align:center;">
              Demo noch nicht generiert — AntiGravity IDE aufrufen: <code>website-generator</code>
            </div>
          `}
        </div>
      </div>

      <!-- ─── SMART VERKNÜPFTE DOKUMENTE (NEXBOT ORGANISATION) ───────── -->
      <div class="drawer-section">
        <span class="drawer-section-title">03 // Verträge & Rechnungen (Nexbot Organisation)</span>
        <div style="display:flex; flex-direction:column; gap:0.5rem;">
          <!-- 1. Angebot -->
          <div style="background:rgba(255,255,255,0.025); border:1px solid var(--border-subtle); padding:0.6rem 0.85rem; border-radius:var(--radius-xs); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div class="table-cell-title" style="font-size:0.8rem;">01 Musterangebot Webdesign</div>
              <div class="table-cell-sub">1.250 € Festpreis + 39 €/Mtl.</div>
            </div>
            <button class="btn btn-secondary btn-sm" data-action="preview-doc" data-path="../../Nexbot Organisation/01_Angebote/Nexbot_Musterangebot_Webdesign.html" data-title="Musterangebot Webdesign">
              Vorschau
            </button>
          </div>

          <!-- 2. BGB Projektvertrag -->
          <div style="background:rgba(255,255,255,0.025); border:1px solid var(--border-subtle); padding:0.6rem 0.85rem; border-radius:var(--radius-xs); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div class="table-cell-title" style="font-size:0.8rem;">02 BGB-Projektvertrag & AVV</div>
              <div class="table-cell-sub">§§ 631 ff. BGB + Art. 28 DSGVO</div>
            </div>
            <button class="btn btn-secondary btn-sm" data-action="preview-doc" data-path="../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html" data-title="BGB Werkvertrag">
              Vorschau
            </button>
          </div>

          <!-- 3. Rechnung -->
          <div style="background:rgba(255,255,255,0.025); border:1px solid var(--border-subtle); padding:0.6rem 0.85rem; border-radius:var(--radius-xs); display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div class="table-cell-title" style="font-size:0.8rem;">03 Kleinunternehmer-Rechnung (§ 19 UStG)</div>
              <div class="table-cell-sub">${lead.invoiceStatus === 'bezahlt' ? 'Status: Bezahlt' : 'Status: Offen / Fällig'}</div>
            </div>
            <button class="btn btn-secondary btn-sm" data-action="preview-doc" data-path="../../Nexbot Organisation/03_Rechnungen/Nexbot_Kleinunternehmer_Rechnung.html" data-title="Rechnungsvorlage">
              Vorschau
            </button>
          </div>
        </div>
      </div>

      <!-- ─── NOTIZEN & AKQUISITIONS-VERLAUF ──────────────────────────── -->
      <div class="drawer-section">
        <span class="drawer-section-title">04 // Gespeicherte Notizen & Telefon-Historie</span>
        <div class="drawer-notes-area">
          <textarea id="drawerNotesTextarea" class="form-textarea" rows="4" placeholder="Notizen zum Kunden oder Call eintragen...">${lead.notes || ''}</textarea>
          <button id="btnSaveDrawerNotes" class="btn btn-primary btn-sm" style="align-self:flex-end;">
            [ NOTIZ SPEICHERN ]
          </button>
        </div>
      </div>
    `;

    // Status Change Event
    const statusSelect = document.getElementById('drawerStatusSelect');
    if (statusSelect) {
      statusSelect.addEventListener('change', (e) => {
        const newStatus = e.target.value;
        state.updateLeadStatus(lead.id, newStatus);
        if (window.showToast) window.showToast(`✓ Status aktualisiert auf [${newStatus.toUpperCase()}]`);
      });
    }

    // Save Notes Event
    const saveNotesBtn = document.getElementById('btnSaveDrawerNotes');
    const notesText = document.getElementById('drawerNotesTextarea');
    if (saveNotesBtn && notesText) {
      saveNotesBtn.addEventListener('click', () => {
        state.updateLeadNotes(lead.id, notesText.value);
        if (window.showToast) window.showToast('✓ Notiz erfolgreich gespeichert!');
      });
    }

    // Preview Doc inside Drawer
    body.querySelectorAll('[data-action="preview-doc"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const path = btn.getAttribute('data-path');
        const title = btn.getAttribute('data-title');
        if (window.nexbotModal) window.nexbotModal.openIframe(path, title);
      });
    });

    // Smartphone Simulator Button
    const simBtn = document.getElementById('btnPreviewDemoInside');
    if (simBtn) {
      simBtn.addEventListener('click', () => {
        const url = simBtn.getAttribute('data-url');
        if (window.nexbotModal) window.nexbotModal.openDeviceSimulator(url, lead.companyName);
      });
    }
  }
}

export let drawerInstance = null;

export function initDrawer() {
  drawerInstance = new DrawerManager();
  window.nexbotDrawer = drawerInstance;
  return drawerInstance;
}
