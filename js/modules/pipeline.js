/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — SALES PIPELINE (DEMO-FIRST KANBAN)
   6 Trichter-Phasen mit HTML5 Drag & Drop, Filtern & Schnellaktionen
   ═══════════════════════════════════════════════════════════════════════ */

import { state } from '../state.js';

export const PIPELINE_COLUMNS = [
  { id: 'recherchiert', title: '1. Recherchiert', desc: 'Google Maps, Sterne & Inhaber' },
  { id: 'demo_in_produktion', title: '2. Demo in Bau', desc: 'AntiGravity 8-Phasen-KI' },
  { id: 'demo_live', title: '3. Demo Live', desc: 'Vercel Edge geprüft' },
  { id: 'pitch_versendet', title: '4. Pitch raus', desc: 'Loom-Video & WhatsApp' },
  { id: 'verhandlung', title: '5. Verhandlung', desc: 'Saxer Follow-Up & Einwände' },
  { id: 'gewonnen', title: '6. Gewonnen 🎉', desc: '1.250 € + 49 € Retainer' }
];

export function renderPipeline(filterQuery = '', filterCategory = 'all', filterCity = 'all') {
  let leads = state.getLeads();

  // Filter anwenden
  if (filterQuery) {
    const q = filterQuery.toLowerCase();
    leads = leads.filter(l => 
      l.companyName.toLowerCase().includes(q) ||
      l.city.toLowerCase().includes(q) ||
      (l.ownerName && l.ownerName.toLowerCase().includes(q)) ||
      (l.category && l.category.toLowerCase().includes(q))
    );
  }

  if (filterCategory !== 'all') {
    leads = leads.filter(l => l.category && l.category.toLowerCase().includes(filterCategory.toLowerCase()));
  }

  if (filterCity !== 'all') {
    leads = leads.filter(l => l.city && l.city.toLowerCase().includes(filterCity.toLowerCase()));
  }

  // Kategorien & Städte für Dropdowns sammeln
  const allLeads = state.getLeads();
  const categories = [...new Set(allLeads.map(l => l.category).filter(Boolean))];
  const cities = [...new Set(allLeads.map(l => l.city).filter(Boolean))];

  const html = `
    <div class="section-header">
      <div class="section-title-wrap">
        <span class="section-tag">[ 02 // SALES PIPELINE ]</span>
        <h1 class="section-title">Demo-First Akquise-Trichter</h1>
        <p class="section-desc">Vollständiger Verkaufszyklus vom Google-Places-Scraping über die fertige Vercel-Demo bis zum Abschluss</p>
      </div>
      <div class="section-actions">
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <!-- Suche -->
          <input type="text" id="pipelineSearchInput" class="form-input" style="width: 180px;" placeholder="Betrieb / Ort suchen..." value="${filterQuery}">
          
          <!-- Filter Branche -->
          <select id="pipelineCategorySelect" class="form-select" style="width: 150px;">
            <option value="all">Alle Gewerke</option>
            ${categories.map(c => `<option value="${c}" ${filterCategory === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>

          <!-- Filter Stadt -->
          <select id="pipelineCitySelect" class="form-select" style="width: 130px;">
            <option value="all">Alle Regionen</option>
            ${cities.map(ct => `<option value="${ct}" ${filterCity === ct ? 'selected' : ''}>${ct}</option>`).join('')}
          </select>

          <!-- Neuer Lead Button -->
          <button class="btn btn-primary" id="pipelineBtnNewLead">
            + Neuer Lead
          </button>
        </div>
      </div>
    </div>

    <!-- ─── KANBAN BOARD ──────────────────────────────────────────────── -->
    <div class="kanban-board-container">
      <div class="kanban-board" id="kanbanBoard">
        ${PIPELINE_COLUMNS.map(col => {
          const colLeads = leads.filter(l => l.status === col.id);
          const colTotalValue = colLeads.reduce((s, l) => s + (Number(l.dealValue) || 1250), 0);

          return `
            <div class="kanban-column" data-col-id="${col.id}">
              <div class="kanban-col-header">
                <div class="kanban-col-title-wrap">
                  <span class="kanban-col-title">${col.title}</span>
                  <span class="kanban-col-count">${colLeads.length}</span>
                </div>
                <span class="kanban-col-sum">${colTotalValue.toLocaleString('de-DE')} €</span>
              </div>

              <div class="kanban-cards-wrap" data-dropzone="${col.id}">
                ${colLeads.map(l => `
                  <div class="kanban-card" draggable="true" data-lead-id="${l.id}">
                    <div class="kanban-card-header">
                      <span class="kanban-card-title">${l.companyName}</span>
                      <span class="badge ${col.id === 'gewonnen' ? 'badge-emerald' : col.id === 'verhandlung' ? 'badge-amber' : 'badge-blue'}">
                        ${l.dealValue} €
                      </span>
                    </div>

                    <div class="kanban-card-meta">
                      <span>${l.city} · ${l.category}</span>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <span class="kanban-card-rating">
                        ★ ${l.googleRating ? l.googleRating.toFixed(1) : '5.0'} 
                        <span style="color:var(--text-muted); font-size:0.65rem;">(${l.reviewCount || 0})</span>
                      </span>
                      <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted);">
                        ${l.ownerName || 'Inhaber'}
                      </span>
                    </div>

                    ${l.topReviewQuote ? `
                      <div class="kanban-card-quote">
                        „${l.topReviewQuote.length > 75 ? l.topReviewQuote.slice(0, 75) + '...' : l.topReviewQuote}“
                      </div>
                    ` : ''}

                    <div class="kanban-card-footer">
                      <span class="kanban-card-deal">
                        +${l.monthlyRetainer} €/Mtl.
                      </span>

                      <div class="kanban-card-actions">
                        ${l.demoUrl ? `
                          <a href="${l.demoUrl}" target="_blank" class="kanban-action-btn" title="Live Vercel-Demo öffnen" onclick="event.stopPropagation();">
                            🌐 Demo
                          </a>
                        ` : ''}

                        ${l.phone ? `
                          <a href="https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=Hallo%20Herr%20${encodeURIComponent(l.ownerName || '')}%2C%20hier%20der%20fertige%20Website-Entwurf%20f%C3%BCr%20${encodeURIComponent(l.companyName)}%3A%20${encodeURIComponent(l.demoUrl || 'https://nexbot.info')}" 
                             target="_blank" class="kanban-action-btn btn-wa" title="WhatsApp Pitch senden" onclick="event.stopPropagation();">
                            💬 WA
                          </a>
                          <a href="tel:${l.phone.replace(/[^0-9+]/g, '')}" class="kanban-action-btn" title="Direkt anrufen (Saxer-Skript)" onclick="event.stopPropagation();">
                            📞 Call
                          </a>
                        ` : ''}
                      </div>
                    </div>
                  </div>
                `).join('')}

                ${colLeads.length === 0 ? `
                  <div style="text-align:center; padding: 2rem 1rem; color:var(--text-muted); font-family:var(--font-mono); font-size:0.7rem; border:1px dashed var(--border-subtle); border-radius:var(--radius-xs);">
                    Keine Leads in dieser Phase
                  </div>
                ` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  return html;
}

export function initPipelineEvents(container) {
  // Suche
  const searchInput = container.querySelector('#pipelineSearchInput');
  const catSelect = container.querySelector('#pipelineCategorySelect');
  const citySelect = container.querySelector('#pipelineCitySelect');

  function triggerFilter() {
    const q = searchInput ? searchInput.value.trim() : '';
    const cat = catSelect ? catSelect.value : 'all';
    const city = citySelect ? citySelect.value : 'all';

    const currentHtml = renderPipeline(q, cat, city);
    const wrapper = container.querySelector('.kanban-board-container');
    if (wrapper) {
      const temp = document.createElement('div');
      temp.innerHTML = currentHtml;
      const newBoard = temp.querySelector('.kanban-board-container');
      if (newBoard) {
        wrapper.replaceWith(newBoard);
        initDragAndDrop(container);
        initCardClicks(container);
      }
    }
  }

  if (searchInput) searchInput.addEventListener('input', triggerFilter);
  if (catSelect) catSelect.addEventListener('change', triggerFilter);
  if (citySelect) citySelect.addEventListener('change', triggerFilter);

  // Neuer Lead
  const btnNew = container.querySelector('#pipelineBtnNewLead');
  if (btnNew) {
    btnNew.addEventListener('click', () => {
      if (window.nexbotModal) window.nexbotModal.openNewLeadModal();
    });
  }

  initDragAndDrop(container);
  initCardClicks(container);
}

function initCardClicks(container) {
  container.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Wenn auf Aktionslinks geklickt wurde, nicht Drawer öffnen
      if (e.target.closest('a') || e.target.closest('button')) return;
      const leadId = card.getAttribute('data-lead-id');
      if (window.nexbotDrawer) {
        window.nexbotDrawer.open(leadId);
      }
    });
  });
}

function initDragAndDrop(container) {
  let draggedLeadId = null;

  container.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedLeadId = card.getAttribute('data-lead-id');
      card.classList.add('is-dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', draggedLeadId);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('is-dragging');
      container.querySelectorAll('.kanban-cards-wrap').forEach(z => z.classList.remove('drag-over'));
    });
  });

  container.querySelectorAll('.kanban-cards-wrap').forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      const targetStatus = zone.getAttribute('data-dropzone');
      const leadId = e.dataTransfer.getData('text/plain') || draggedLeadId;

      if (leadId && targetStatus) {
        const success = state.updateLeadStatus(leadId, targetStatus);
        if (success && window.showToast) {
          const l = state.getLeadById(leadId);
          window.showToast(`✓ „${l.companyName}“ verschoben nach [${targetStatus.toUpperCase()}]`);
        }
      }
    });
  });
}
