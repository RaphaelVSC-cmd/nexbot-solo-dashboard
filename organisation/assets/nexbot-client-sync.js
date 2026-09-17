/**
 * Nexbot Client Sync Engine
 * Synchronisiert aktive Kundendaten nahtlos aus dem Nexbot Dashboard in alle Dokumente.
 */
(function() {
  function applyClientSync() {
    try {
      const raw = localStorage.getItem('nexbot_active_client');
      if (!raw) return;
      const c = JSON.parse(raw);
      if (!c || !c.clientName) return;

      const clientName = c.clientName || 'Musterkunde GmbH';
      const clientContact = c.clientContact || 'z. Hd. Herrn Max Mustermann';
      const clientStreet = c.clientStreet || 'Musterstraße 12';
      const clientZipCity = c.clientZipCity || '85055 Ingolstadt';
      const clientEmail = c.clientEmail || 'kontakt@musterkunde.de';
      const projectPrice = c.projectPrice ? `${c.projectPrice.replace('€','').trim()},00 €` : '1.250,00 €';
      const hostingPrice = c.hostingPrice ? `${c.hostingPrice.replace('€','').trim()},00 €` : '49,00 €';
      const city = clientZipCity.split(' ').slice(1).join(' ') || 'Ingolstadt';

      // 1. Standard Address Blocks (Angebot, Rechnung)
      const recipientAddress = document.getElementById('recipientAddress');
      if (recipientAddress) {
        recipientAddress.innerHTML = `<strong>${clientName}</strong><br>${clientContact}<br>${clientStreet}<br>${clientZipCity}`;
      }

      // 2. Contract Party Address (Vertrag BGB)
      const partyBodies = document.querySelectorAll('.party-body[contenteditable="true"]');
      partyBodies.forEach(pb => {
        const text = pb.textContent || '';
        if (text.includes('Auftraggeber') || text.includes('Musterkunde')) {
          pb.innerHTML = `<strong>${clientName}</strong><br>${clientContact}<br>${clientStreet}, ${clientZipCity}<br>E-Mail: ${clientEmail}<br>– nachfolgend <em>„Auftraggeber“</em> genannt –`;
        } else if (text.includes('Verantwortlicher') || text.includes('Musterkunde')) {
          pb.innerHTML = `<strong>${clientName}</strong><br>${clientContact}<br>${clientStreet}, ${clientZipCity}<br>E-Mail: ${clientEmail}`;
        }
      });

      // 3. Signature Slot Client Names & Dates
      const sigClientName = document.getElementById('clientSigCompanyName') || document.getElementById('sigClientName');
      if (sigClientName) sigClientName.textContent = clientName;

      const sigClientDate = document.getElementById('clientSigLocationDate') || document.getElementById('sigDateClient');
      if (sigClientDate) {
        const parts = sigClientDate.textContent.split(',');
        const datePart = parts.length > 1 ? parts[1].trim() : new Date().toLocaleDateString('de-DE');
        sigClientDate.textContent = `${city}, ${datePart}`;
      }

      // 4. Payment Reference in Invoice
      const paymentRef = document.getElementById('paymentRef');
      if (paymentRef) {
        const invNum = document.getElementById('invoiceNumber') ? document.getElementById('invoiceNumber').textContent.trim() : 'RE-2026-001';
        paymentRef.textContent = `${invNum} ${clientName}`;
      }

      // 5. Project Meta in Abnahme
      const projTitle = document.getElementById('projectTitle');
      if (projTitle && c.projectTitle) projTitle.textContent = c.projectTitle;

      const projId = document.getElementById('projectId');
      if (projId && c.projectId) projId.textContent = c.projectId;

      const projPriceEl = document.getElementById('projectPrice');
      if (projPriceEl && c.projectPrice) projPriceEl.textContent = `${c.projectPrice} € netto`;

      // 6. Prices in Offer (if 1st row has item-price)
      const firstPrice = document.querySelector('.item-price');
      if (firstPrice && c.projectPrice && !window._nexbotCustomRows) {
        firstPrice.textContent = projectPrice;
        if (typeof window.calculateTotals === 'function') window.calculateTotals();
      }

      // 6b. Hosting Price Display in SLA / Wartungsvertrag
      const hostingPriceDisplay = document.getElementById('hostingPriceDisplay');
      if (hostingPriceDisplay && c.hostingPrice) {
        hostingPriceDisplay.textContent = hostingPrice;
      }

      // 7. Inject visual sync pill into Toolbar
      const tbBrand = document.querySelector('.toolbar-brand');
      if (tbBrand && !document.getElementById('syncPill')) {
        const pill = document.createElement('span');
        pill.id = 'syncPill';
        pill.style.cssText = 'font-family: var(--font-mono); font-size: 9.5pt; background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.25); padding: 2px 8px; border-radius: 4px; margin-left: 8px; font-weight: 500;';
        pill.textContent = `● Kunde: ${clientName}`;
        pill.title = 'Daten wurden automatisch aus dem Nexbot Dashboard übernommen';
        tbBrand.appendChild(pill);
      }
    } catch (e) {
      console.warn('Nexbot sync error:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyClientSync);
  } else {
    applyClientSync();
  }
})();
