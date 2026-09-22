/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — CENTRAL STATE MANAGER
   Reaktives State-Management mit localStorage-Persistenz & Auto-KPI-Kalkulation
   ═══════════════════════════════════════════════════════════════════════ */

import { INITIAL_DATA } from './initial-data.js';

const STORAGE_KEY = 'nexbot_solo_cockpit_v1';

class StateManager {
  constructor() {
    this.listeners = [];
    this.state = this.loadState();
    this.recalculateMetrics();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Sicherstellen, dass alle Schlüssel vorhanden sind
        return {
          metrics: { ...INITIAL_DATA.metrics, ...(parsed.metrics || {}) },
          leads: Array.isArray(parsed.leads) ? parsed.leads : INITIAL_DATA.leads,
          clients: Array.isArray(parsed.clients) ? parsed.clients : INITIAL_DATA.clients,
          documents: Array.isArray(parsed.documents) ? parsed.documents : INITIAL_DATA.documents,
          tasks: Array.isArray(parsed.tasks) ? parsed.tasks : INITIAL_DATA.tasks,
          top3Hebel: Array.isArray(parsed.top3Hebel) ? parsed.top3Hebel : INITIAL_DATA.top3Hebel,
          coldCallScript: parsed.coldCallScript || INITIAL_DATA.coldCallScript,
          callLogs: Array.isArray(parsed.callLogs) ? parsed.callLogs : INITIAL_DATA.callLogs
        };
      }
    } catch (err) {
      console.warn('Fehler beim Laden aus localStorage, lade Initial-Daten:', err);
    }
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (err) {
      console.error('Fehler beim Speichern in localStorage:', err);
    }
  }

  subscribe(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    }
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(changeType = 'update', payload = null) {
    this.saveState();
    this.listeners.forEach(fn => {
      try {
        fn(this.state, changeType, payload);
      } catch (e) {
        console.error('Fehler im State-Listener:', e);
      }
    });
  }

  recalculateMetrics() {
    const leads = this.state.leads || [];
    const clients = this.state.clients || [];

    // Gewonnene Abschlüsse
    const closedLeads = leads.filter(l => l.status === 'gewonnen');
    const closedCount = closedLeads.length;
    const closedRevenue = closedLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 1250), 0);

    // Aktive Retainer
    const activeClients = clients.filter(c => c.status === 'aktiv');
    const totalMRR = activeClients.reduce((sum, c) => sum + (Number(c.monthlyRetainer) || 49), 0);

    // Pipeline-Wert (alle nicht gewonnenen oder verlorenen)
    const pipelineLeads = leads.filter(l => l.status !== 'gewonnen');
    const pipeValue = pipelineLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 1250), 0);

    // Demos versendet
    const sentCount = leads.filter(l => ['pitch_versendet', 'verhandlung', 'gewonnen'].includes(l.status)).length;

    this.state.metrics.currentRevenue = closedRevenue;
    this.state.metrics.closedDealsCount = closedCount;
    this.state.metrics.currentMRR = totalMRR;
    this.state.metrics.pipelineValue = pipeValue;
    this.state.metrics.demosSent = sentCount;
  }

  /* ─── GETTERS ──────────────────────────────────────────────────────── */
  getMetrics() {
    return this.state.metrics;
  }

  getLeads(filterFn = null) {
    if (filterFn) return this.state.leads.filter(filterFn);
    return this.state.leads;
  }

  getLeadById(id) {
    return this.state.leads.find(l => l.id === id);
  }

  getClients() {
    return this.state.clients;
  }

  getClientById(id) {
    return this.state.clients.find(c => c.id === id);
  }

  getDocuments() {
    return this.state.documents;
  }

  getDocumentsByClient(clientName) {
    return this.state.documents.filter(d => 
      d.clientName && d.clientName.toLowerCase().includes(clientName.toLowerCase())
    );
  }

  getTasks() {
    return this.state.tasks;
  }

  getTop3Hebel() {
    return this.state.top3Hebel;
  }

  getColdCallScript() {
    return this.state.coldCallScript;
  }

  getCallLogs() {
    return this.state.callLogs;
  }

  /* ─── MUTATIONS ────────────────────────────────────────────────────── */
  updateLeadStatus(leadId, newStatus) {
    const lead = this.state.leads.find(l => l.id === leadId);
    if (!lead) return false;

    const oldStatus = lead.status;
    lead.status = newStatus;
    lead.lastContactAt = new Date().toISOString().split('T')[0];

    // Wenn auf "gewonnen" gesetzt, automatisch Client & Vertrag anlegen falls noch nicht existent
    if (newStatus === 'gewonnen' && oldStatus !== 'gewonnen') {
      this.convertLeadToClient(lead);
    }

    this.recalculateMetrics();
    this.notify('lead_status_changed', { leadId, oldStatus, newStatus });
    return true;
  }

  updateLeadNotes(leadId, notes) {
    const lead = this.state.leads.find(l => l.id === leadId);
    if (!lead) return false;

    lead.notes = notes;
    lead.lastContactAt = new Date().toISOString().split('T')[0];
    this.notify('lead_notes_updated', { leadId });
    return true;
  }

  addLead(newLead) {
    const id = 'lead-' + String(Date.now()).slice(-5);
    const lead = {
      id,
      companyName: newLead.companyName || 'Neuer Handwerksbetrieb',
      ownerName: newLead.ownerName || '',
      category: newLead.category || 'Handwerk',
      city: newLead.city || 'Ingolstadt',
      street: newLead.street || '',
      phone: newLead.phone || '',
      googleRating: Number(newLead.googleRating) || 5.0,
      reviewCount: Number(newLead.reviewCount) || 1,
      topReviewQuote: newLead.topReviewQuote || '',
      status: newLead.status || 'recherchiert',
      dealValue: Number(newLead.dealValue) || 1250,
      monthlyRetainer: Number(newLead.monthlyRetainer) || 49,
      demoUrl: newLead.demoUrl || '',
      localDemoPath: newLead.localDemoPath || '',
      loomUrl: newLead.loomUrl || '',
      contractFile: '',
      invoiceStatus: 'noch_nicht_faellig',
      notes: newLead.notes || '',
      createdAt: new Date().toISOString().split('T')[0],
      lastContactAt: new Date().toISOString().split('T')[0]
    };

    this.state.leads.unshift(lead);
    this.recalculateMetrics();
    this.notify('lead_added', { lead });
    return lead;
  }

  convertLeadToClient(lead) {
    const existing = this.state.clients.find(c => c.leadId === lead.id || c.companyName === lead.companyName);
    if (existing) return existing;

    const clientId = 'client-' + String(Date.now()).slice(-4);
    const newClient = {
      id: clientId,
      leadId: lead.id,
      companyName: lead.companyName,
      contactPerson: lead.ownerName || 'Inhaber',
      domain: lead.companyName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.de',
      startDate: new Date().toISOString().split('T')[0],
      contractType: 'Modern UI Pro Webdesign + Care Retainer',
      oneTimePrice: lead.dealValue || 1250,
      monthlyRetainer: lead.monthlyRetainer || 49,
      paymentMethod: 'SEPA-Lastschrift',
      status: 'aktiv',
      supportBudgetMinutes: 30,
      usedMinutesThisMonth: 0,
      contractFile: '../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html',
      avvFile: '../../Nexbot Organisation/02_Verträge/02_AVV_Datenschutz_DSGVO.html',
      acceptanceFile: '../../Nexbot Organisation/02_Verträge/03_Abnahmeprotokoll_Webdesign_BGB.html',
      latestInvoiceNumber: 'RE-2026-00' + (this.state.clients.length + 1),
      invoiceStatus: 'bezahlt'
    };

    this.state.clients.unshift(newClient);

    // Automatisch Dokumente verknüpfen
    this.state.documents.unshift({
      id: 'doc-' + String(Date.now()).slice(-4),
      title: `Webdesign Projektvertrag — ${lead.companyName}`,
      category: '02_Verträge',
      clientName: lead.companyName,
      leadId: lead.id,
      amount: `${lead.dealValue || 1250} €`,
      status: 'unterzeichnet',
      date: new Date().toISOString().split('T')[0],
      filePath: '../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html',
      description: 'BGB Werkvertrag nach §§ 631 ff. mit digitaler Signatur.'
    });

    return newClient;
  }

  toggleHebel(hebelId) {
    const h = this.state.top3Hebel.find(item => item.id === hebelId);
    if (h) {
      h.isDone = !h.isDone;
      this.notify('hebel_toggled', { hebelId, isDone: h.isDone });
    }
  }

  toggleTaskStatus(taskId) {
    const t = this.state.tasks.find(item => item.id === taskId);
    if (t) {
      t.status = t.status === 'erledigt' ? 'offen' : 'erledigt';
      this.notify('task_toggled', { taskId, status: t.status });
    }
  }

  addTask(newTask) {
    const task = {
      id: 'task-' + String(Date.now()).slice(-4),
      title: newTask.title || 'Neue Aufgabe',
      description: newTask.description || '',
      category: newTask.category || 'Akquise',
      priority: newTask.priority || 'P1',
      status: 'offen',
      dueDate: newTask.dueDate || 'Heute',
      leadId: newTask.leadId || null
    };
    this.state.tasks.unshift(task);
    this.notify('task_added', { task });
    return task;
  }

  addCallLog(logEntry) {
    const entry = {
      id: 'call-' + String(Date.now()).slice(-4),
      date: new Date().toLocaleDateString('de-DE') + ' ' + new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
      companyName: logEntry.companyName || 'Unbekannt',
      contactName: logEntry.contactName || '',
      status: logEntry.status || 'Gespräch geführt',
      notes: logEntry.notes || ''
    };
    this.state.callLogs.unshift(entry);
    this.notify('call_log_added', { entry });
    return entry;
  }

  updateDocumentStatus(docId, newStatus) {
    const doc = this.state.documents.find(d => d.id === docId);
    if (doc) {
      doc.status = newStatus;
      this.notify('document_status_changed', { docId, newStatus });
    }
  }

  resetAllData() {
    this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
    this.recalculateMetrics();
    this.notify('state_reset');
  }
}

export const state = new StateManager();
