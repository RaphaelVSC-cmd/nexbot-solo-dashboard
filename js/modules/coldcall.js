/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — COLD CALL TRAINING & SAXER MODULE
   Gesprächsleitfaden, Bumerang-Einwandbehandlung & Call-Logger für Raphael Solo
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';

export function renderColdCall() {
  const script = state.getColdCallScript();
  const logs = state.getCallLogs();

  const html = `
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag">[ 06 // SALES TRAINING ]</span>
        <h1 class="section-title">Cold-Call-Zentrale (Saxer-Methode)</h1>
        <p class="section-desc">Interaktiver Gesprächsleitfaden, Bumerang-Einwandbehandlung & Trainings-Protokoll zur Überwindung von Kaltakquise-Unsicherheiten</p>
      </div>
      <div class="section-actions">
        <span class="badge badge-emerald font-mono">DEMO-FIRST PSYCHOLOGIE</span>
      </div>
    </div>

    <!-- ─── 2-SPALTIGES LAYOUT: LEITFADEN LINKS, EINWÄNDE RECHTS ──────── -->
    <div class="script-grid">
      <!-- LINKE SPALTE: GESPRÄCHSLEITFADEN NACH SAXER -->
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- PHASE A: GATEKEEPER -->
        <div class="script-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 class="table-cell-title" style="font-size:0.95rem;">${script.gatekeeper.title}</h3>
            <span class="badge badge-amber font-mono">SEKRETARIAT</span>
          </div>

          <div class="script-box">
            <span class="script-speaker">
              <span style="color:var(--status-blue);">●</span> ${script.gatekeeper.speaker} (Opener):
            </span>
            <p class="script-dialogue">„${script.gatekeeper.dialogue}“</p>
          </div>

          <div style="background:rgba(255,255,255,0.02); border-left:2px solid var(--status-amber); padding:0.6rem 0.8rem; border-radius:0 var(--radius-xs) var(--radius-xs) 0;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--status-amber); margin-bottom:0.25rem;">${script.gatekeeper.responseExample}</div>
            <div class="script-dialogue" style="font-size:0.82rem;">„${script.gatekeeper.counter}“</div>
          </div>
        </div>

        <!-- PHASE B: INHABER OPENER -->
        <div class="script-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 class="table-cell-title" style="font-size:0.95rem;">${script.opener.title}</h3>
            <span class="badge badge-emerald font-mono">CHEF AM TELEFON</span>
          </div>

          <div class="script-box">
            <span class="script-speaker">
              <span style="color:var(--status-emerald);">●</span> ${script.opener.speaker}:
            </span>
            <p class="script-dialogue">„${script.opener.dialogue}“</p>
          </div>

          <div class="script-cue">
            ${script.opener.pauseNotice} — Lass den Handwerker reden! Höre genau zu.
          </div>

          <div class="script-box" style="border-color:var(--border-bright);">
            <span class="script-speaker" style="color:var(--status-emerald);">
              ● Der Übergang zum WhatsApp Micro-Commitment:
            </span>
            <p class="script-dialogue">„${script.opener.hook}“</p>
          </div>
        </div>

        <!-- PHASE C: LOOM VIDEO AUFBAU -->
        <div class="script-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 class="table-cell-title" style="font-size:0.95rem;">Phase C: Loom-Video Aufbau (60–90s)</h3>
            <span class="badge badge-purple font-mono">WHATSAPP-VIDEO</span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            ${script.loomStructure.map(item => `
              <div style="background:rgba(255,255,255,0.025); border:1px solid var(--border-subtle); padding:0.75rem; border-radius:var(--radius-xs);">
                <div style="font-family:var(--font-mono); font-size:0.68rem; color:var(--status-blue); font-weight:700;">${item.step}</div>
                <div style="font-family:var(--font-display); font-size:0.82rem; font-weight:600; color:var(--text-pure); margin:0.2rem 0;">${item.title}</div>
                <div style="font-size:0.72rem; color:var(--text-silver); line-height:1.35;">${item.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- RECHTE SPALTE: BUMERANG-EINWANDBEHANDLUNG & CALL-LOGGER -->
      <div style="display: flex; flex-direction: column; gap: 1.25rem;">
        <!-- BUMERANG EINWANDBEHANDLUNG -->
        <div class="script-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 class="table-cell-title" style="font-size:0.95rem;">Bumerang-Einwandbehandlung</h3>
            <span class="badge badge-danger font-mono">SCHLAGFERTIGKEIT</span>
          </div>
          <p style="font-size:0.76rem; color:var(--text-silver);">
            Niemals diskutieren oder widersprechen. Den Einwand aufgreifen, loben und sofort als stärkstes Argument für die fertige Demo nutzen!
          </p>

          <div style="display:flex; flex-direction:column; gap:0.85rem;">
            ${script.bumerang.map(b => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.85rem;">
                <div style="font-family:var(--font-display); font-size:0.82rem; font-weight:700; color:var(--status-danger); margin-bottom:0.35rem;">
                  ${b.objection}
                </div>
                <div style="font-size:0.78rem; color:var(--text-pure); line-height:1.45; background:rgba(16,185,129,0.04); border-left:2px solid var(--status-emerald); padding:0.4rem 0.65rem;">
                  ${b.reply}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ANRUF-TRAINING & CALL-LOGGER -->
        <div class="script-card">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3 class="table-cell-title" style="font-size:0.95rem;">Anruf-Log & Trainings-Notiz</h3>
            <span class="badge badge-blue font-mono">CALL-LOG</span>
          </div>

          <form id="callLogForm" style="display:flex; flex-direction:column; gap:0.75rem;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              <div>
                <label class="form-label">Betriebsname:</label>
                <input type="text" id="callLogCompany" class="form-input" placeholder="z. B. Saridis SHK" required>
              </div>
              <div>
                <label class="form-label">Gesprächspartner:</label>
                <input type="text" id="callLogContact" class="form-input" placeholder="z. B. Herr Saridis">
              </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
              <div>
                <label class="form-label">Gesprächs-Ergebnis:</label>
                <select id="callLogStatus" class="form-select">
                  <option value="WhatsApp-Zustimmung">WhatsApp-Erlaubnis erhalten 🎉</option>
                  <option value="Follow-Up vereinbart">Follow-Up Termin vereinbart</option>
                  <option value="Chef nicht erreichbar">Chef auf Baustelle / Rückruf</option>
                  <option value="Kein Interesse">Kein Interesse / Abgelehnt</option>
                  <option value="Übungs-Call">Übungs-Lauf (Simulation)</option>
                </select>
              </div>
              <div>
                <label class="form-label">Ergebnis-Notiz:</label>
                <input type="text" id="callLogNotes" class="form-input" placeholder="Wichtigste Aussage des Kunden...">
              </div>
            </div>

            <button type="submit" class="btn btn-primary" style="justify-content:center;">
              [ ANRUF PROTOKOLLIEREN ]
            </button>
          </form>

          <!-- LISTE DER LETZTEN CALLS -->
          <div style="margin-top:0.5rem; display:flex; flex-direction:column; gap:0.5rem;">
            <div style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">
              Protokollierte Calls (${logs.length}):
            </div>
            ${logs.map(log => `
              <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); padding:0.5rem 0.75rem; border-radius:var(--radius-xs); display:flex; justify-content:space-between; align-items:center; font-size:0.75rem;">
                <div>
                  <strong style="color:var(--text-pure);">${log.companyName}</strong> 
                  <span style="color:var(--text-muted);">(${log.contactName || 'Inhaber'})</span>
                  <div style="color:var(--text-silver); font-size:0.7rem; margin-top:0.15rem;">${log.notes}</div>
                </div>
                <div style="text-align:right;">
                  <span class="badge badge-emerald font-mono">${log.status}</span>
                  <div class="table-cell-sub font-mono">${log.date}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;

  return html;
}

export function initColdCallEvents(container) {
  const form = container.querySelector('#callLogForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = container.querySelector('#callLogCompany').value.trim();
      const contact = container.querySelector('#callLogContact').value.trim();
      const status = container.querySelector('#callLogStatus').value;
      const notes = container.querySelector('#callLogNotes').value.trim();

      if (company) {
        state.addCallLog({
          companyName: company,
          contactName: contact,
          status: status,
          notes: notes
        });

        if (window.showToast) window.showToast(`✓ Call für „${company}“ protokolliert!`);
        container.innerHTML = renderColdCall();
        initColdCallEvents(container);
      }
    });
  }
}
