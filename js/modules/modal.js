/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — MODAL & TOAST MANAGER
   Iframe-Dokumentenvorschau, Smartphone-Simulator & Schnell-Erfassungs-Dialoge
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';

class ModalManager {
  constructor() {
    this.backdrop = document.getElementById('modalBackdrop');
    this.box = document.getElementById('modalBox');
    this.title = document.getElementById('modalTitle');
    this.body = document.getElementById('modalBody');
    this.closeBtn = document.getElementById('modalCloseBtn');
    this.init();
  }

  init() {
    if (!this.backdrop) return;

    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.backdrop.classList.contains('is-open')) {
        this.close();
      }
    });
  }

  close() {
    if (this.backdrop) {
      this.backdrop.classList.remove('is-open');
      this.body.innerHTML = '';
      this.box.style.width = '';
      this.box.style.maxWidth = '';
    }
  }

  openIframe(srcUrl, titleText) {
    if (!this.backdrop) return;

    this.title.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span>${titleText}</span>
        <span class="badge badge-emerald font-mono">ORIGINAL-DOKUMENT</span>
      </div>
    `;

    this.box.style.width = '940px';
    this.box.style.maxWidth = '96vw';

    this.body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 1rem; background:#14141e; border-bottom:1px solid var(--border-subtle);">
        <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-muted); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
          Pfad: ${srcUrl}
        </div>
        <div style="display:flex; gap:0.4rem;">
          <button class="btn btn-secondary btn-sm" id="btnModalPrintDoc">
            🖨️ Drucken / PDF
          </button>
          <a href="${srcUrl}" target="_blank" class="btn btn-primary btn-sm">
            Neues Fenster ↗
          </a>
        </div>
      </div>
      <iframe src="${srcUrl}" id="modalDocIframe" class="modal-iframe"></iframe>
    `;

    const printBtn = document.getElementById('btnModalPrintDoc');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        const iframe = document.getElementById('modalDocIframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }
      });
    }

    this.backdrop.classList.add('is-open');
  }

  openDeviceSimulator(url, companyName) {
    if (!this.backdrop) return;

    this.title.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <span>Smartphone-Simulator: ${companyName}</span>
        <span class="badge badge-purple font-mono">375 × 812 (iPhone DevTools)</span>
      </div>
    `;

    this.box.style.width = '420px';
    this.box.style.maxWidth = '95vw';

    this.body.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:1.25rem; background:#08080c; height:100%; overflow:hidden;">
        <!-- PHONE FRAME -->
        <div style="width:375px; height:680px; max-height:calc(86vh - 80px); background:#000; border:4px solid #333; border-radius:36px; overflow:hidden; position:relative; box-shadow:0 15px 40px rgba(0,0,0,0.9); display:flex; flex-direction:column;">
          <!-- NOTCH -->
          <div style="width:120px; height:18px; background:#111; border-radius:0 0 12px 12px; position:absolute; top:0; left:50%; transform:translateX(-50%); z-index:10;"></div>
          
          <iframe src="${url}" style="width:100%; height:100%; border:none; background:#050508;"></iframe>
        </div>
      </div>
    `;

    this.backdrop.classList.add('is-open');
  }

  openNewLeadModal() {
    if (!this.backdrop) return;

    this.title.textContent = 'Neuen Handwerks-Lead anlegen';
    this.box.style.width = '560px';

    this.body.innerHTML = `
      <div style="padding:1.5rem; background:#0a0a10; color:var(--text-pure); overflow-y:auto; max-height:calc(86vh - 60px);">
        <form id="newLeadForm" style="display:flex; flex-direction:column; gap:1rem;">
          <div>
            <label class="form-label">Firmenname / Betrieb:</label>
            <input type="text" id="nlCompany" class="form-input" placeholder="z. B. Spenglerei Huber" required>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div>
              <label class="form-label">Inhaber / Meister:</label>
              <input type="text" id="nlOwner" class="form-input" placeholder="z. B. Thomas Huber">
            </div>
            <div>
              <label class="form-label">Gewerk / Branche:</label>
              <input type="text" id="nlCategory" class="form-input" placeholder="z. B. Spenglerei & Dach" required>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div>
              <label class="form-label">Ort / Region:</label>
              <input type="text" id="nlCity" class="form-input" placeholder="z. B. Ingolstadt" required>
            </div>
            <div>
              <label class="form-label">Telefonnummer:</label>
              <input type="text" id="nlPhone" class="form-input" placeholder="+49 841 ...">
            </div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div>
              <label class="form-label">Google Sterne (1-5):</label>
              <input type="number" step="0.1" min="1" max="5" id="nlRating" class="form-input" value="5.0">
            </div>
            <div>
              <label class="form-label">Anzahl Rezensionen:</label>
              <input type="number" id="nlReviews" class="form-input" value="12">
            </div>
          </div>

          <div>
            <label class="form-label">Beste Kunden-Rezension (Wortlaut):</label>
            <input type="text" id="nlQuote" class="form-input" placeholder="Schnelle und saubere Reparatur...">
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div>
              <label class="form-label">Website-Festpreis (€):</label>
              <input type="number" id="nlDeal" class="form-input" value="1250">
            </div>
            <div>
              <label class="form-label">Monatlicher Retainer (€):</label>
              <input type="number" id="nlRetainer" class="form-input" value="39">
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.5rem;">
            <button type="button" class="btn btn-secondary" id="btnCancelNewLead">Abbrechen</button>
            <button type="submit" class="btn btn-primary">[ LEAD ANLEGEN ]</button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('btnCancelNewLead')?.addEventListener('click', () => this.close());
    document.getElementById('newLeadForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const newLead = {
        companyName: document.getElementById('nlCompany').value.trim(),
        ownerName: document.getElementById('nlOwner').value.trim(),
        category: document.getElementById('nlCategory').value.trim(),
        city: document.getElementById('nlCity').value.trim(),
        phone: document.getElementById('nlPhone').value.trim(),
        googleRating: parseFloat(document.getElementById('nlRating').value) || 5.0,
        reviewCount: parseInt(document.getElementById('nlReviews').value) || 1,
        topReviewQuote: document.getElementById('nlQuote').value.trim(),
        dealValue: parseFloat(document.getElementById('nlDeal').value) || 1250,
        monthlyRetainer: parseFloat(document.getElementById('nlRetainer').value) || 39,
        status: 'recherchiert'
      };

      state.addLead(newLead);
      this.close();
      if (window.showToast) window.showToast(`✓ Lead „${newLead.companyName}“ angelegt!`);
    });

    this.backdrop.classList.add('is-open');
  }

  openNewTaskModal() {
    if (!this.backdrop) return;

    this.title.textContent = 'Neue Solo-Aufgabe erstellen';
    this.box.style.width = '480px';

    this.body.innerHTML = `
      <div style="padding:1.5rem; background:#0a0a10; color:var(--text-pure);">
        <form id="newTaskForm" style="display:flex; flex-direction:column; gap:1rem;">
          <div>
            <label class="form-label">Aufgaben-Titel:</label>
            <input type="text" id="ntTitle" class="form-input" placeholder="z. B. 3 Handwerker anrufen..." required>
          </div>

          <div>
            <label class="form-label">Details / Notiz:</label>
            <textarea id="ntDesc" class="form-textarea" rows="2" placeholder="Konkreter Schritt..."></textarea>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div>
              <label class="form-label">Kategorie:</label>
              <select id="ntCategory" class="form-select">
                <option value="Akquise">Akquise & Sales</option>
                <option value="Technik">Technik & Build</option>
                <option value="Verwaltung">Recht & Verwaltung</option>
              </select>
            </div>
            <div>
              <label class="form-label">Priorität:</label>
              <select id="ntPriority" class="form-select">
                <option value="P0">P0 — Höchste Prio (Sofort)</option>
                <option value="P1" selected>P1 — Wichtig</option>
                <option value="P2">P2 — Normal</option>
              </select>
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:0.5rem; margin-top:0.5rem;">
            <button type="button" class="btn btn-secondary" id="btnCancelNewTask">Abbrechen</button>
            <button type="submit" class="btn btn-primary">[ AUFGABE ERSTELLEN ]</button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('btnCancelNewTask')?.addEventListener('click', () => this.close());
    document.getElementById('newTaskForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = {
        title: document.getElementById('ntTitle').value.trim(),
        description: document.getElementById('ntDesc').value.trim(),
        category: document.getElementById('ntCategory').value,
        priority: document.getElementById('ntPriority').value,
        dueDate: 'Heute'
      };

      state.addTask(task);
      this.close();
      if (window.showToast) window.showToast('✓ Aufgabe erfolgreich erstellt!');
    });

    this.backdrop.classList.add('is-open');
  }
}

export function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${type === 'success' ? '#10b981' : '#ef4444'}" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

window.showToast = showToast;

export let modalInstance = null;

export function initModal() {
  modalInstance = new ModalManager();
  window.nexbotModal = modalInstance;
  return modalInstance;
}
