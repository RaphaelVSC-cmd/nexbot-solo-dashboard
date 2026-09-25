# 🎛️ Nexbot Solo Business Dashboard

**Das zentrale Cockpit für Raphael Neumeier / Nexbot Webdesign**  
*Manching & Ingolstadt · Zielkunden: Handwerksbetriebe & lokale KMU in Bayern*

---

## 🎯 Überblick & Zweck

Dieses Dashboard ist die eigenständige operative Steuerungszentrale für das Solo-Webdesign-Unternehmen von **Raphael Neumeier**. Es bildet den vollständigen Geschäftszyklus ab:
1. **Google Places Lead-Scraping & Ranking** (Fokus: SHK, Spengler, Dachdecker, GalaBau, Bauunternehmen)
2. **Autonome KI-Website-Produktion** (unter 45–60 Min auf Vercel Edge)
3. **Demo-First Sales-Pipeline** nach der Saxer-Methode (WhatsApp-Link mit Micro-Commitment & Loom-Video)
4. **Verträge & Rechnungsstellung** (Lückenlose Verknüpfung der Dokumente aus `Nexbot Organisation`)
5. **Retainer- & Supportzeit-Management** (49 € / Monat, 30 Min monatliches Service-Budget)
6. **Persönliche Solo-Tageshebel** (Fokus auf die 3 wichtigsten Hebel des Tages)

---

## 💎 Design-Identität (Abgeleitet aus nexbot.info)

- **Aesthetic:** Monochromatic Tech HUD / Saifullah Monochromatic Aesthetic
- **Farben:**
  - Base: `#050508` (Tiefes Obsidian / Sci-Fi Anthrazit)
  - Cards: `rgba(12, 12, 16, 0.85)` / Solid `#0c0c10`
  - Text: `#ffffff` (Pure), `#c8c8d4` (Silver), `#727282` (Muted)
  - Subtle Status Badges: Emerald Green (`#10b981`), Amber (`#f59e0b`), Tech Blue (`#38bdf8`), Crimson Red (`#ef4444`)
- **Typografie:**
  - Display: `Sora`
  - Monospace: `Space Mono` (HUD-Klammern `[ 01 COCKPIT ]`, Zähler, Metriken)
  - Sans: `Inter` (Lesetext, Tabellen, Formulare)
- **Zero-Build Architecture:** Semantisches HTML5, reines Vanilla CSS mit Design-Tokens, native ES6+ Module (`type="module"`), 100 % performant ohne Node/Vite Build-Locking.

---

## 🚀 Die 6 Kern-Module

1. **Cockpit (Executive Overview):**
   - 5.000-€-Q4-Umsatzziel-Tracker mit 4 Meilenstein-Markern (4 Kunden à 1.250 €)
   - 196-€-MRR-Tracker (4 Kunden à 49 € / Monat)
   - Pipeline-Potenzial & Conversion-Quote
   - "Top 3 Hebel heute" (Interaktive Prioritätenliste für Raphael Solo)
2. **Sales-Pipeline (Demo-First Kanban):**
   - 6 Phasen: *1. Recherchiert* → *2. Demo in Bau* → *3. Demo Live* → *4. Pitch raus* → *5. Verhandlung* → *6. Gewonnen (Closed)*
   - Drag & Drop mit Status-Persistenz im `localStorage`
   - Schnellaktionen: 1-Klick WhatsApp Pitch (`wa.me`), Anruf, Live-Demo
3. **Kunden & Retainer (MRR):**
   - Übersicht aller gewonnenen Handwerkskunden
   - Domain, Vertragsbeginn, Retainer-Betrag, Zahlungsart (SEPA), 30-Minuten-Supportzeit-Budget Tracker
4. **Verträge & Rechtliches (Nexbot Organisation):**
   - Direkte Verknüpfung mit allen Vorlagen aus dem Ordner `Nexbot Organisation`:
     - 01_Angebote: `Nexbot_Musterangebot_Webdesign.html`
     - 02_Verträge: `01_Webdesign_Projektvertrag_BGB.html`, `02_AVV_Datenschutz_DSGVO.html`, `03_Abnahmeprotokoll_Webdesign_BGB.html`
     - 03_Rechnungen: `Nexbot_Kleinunternehmer_Rechnung.html`
     - 04_Buchhaltung_EÜR: `Nexbot_EUER_Rechner_2026.html`
     - 05_Behörden_Unterlagen: W-IdNr. & USt-IdNr. Bescheid (BZSt), Gewerbeanmeldung Manching, ELSTER USt-IdNr.
   - 1-Klick Iframe-Vorschau & Druckfunktion im Dashboard
5. **Solo-Tasks:**
   - Aufgeteilt nach *Akquise & Sales*, *Technik & Build* und *Recht & Verwaltung*
   - Prioritäts-Filter (P0, P1, P2) und interaktive Checkboxen
6. **Cold-Call-Zentrale (Saxer-Methode):**
   - Phase A: Gatekeeper-Überwindung (Sekretariat)
   - Phase B: Inhaber-Opener (Lob & Micro-Commitment)
   - Phase C: Loom-Video Aufbau (60–90 Sekunden)
   - Bumerang-Einwandbehandlungs-Matrix
   - Trainings- & Anruf-Logger

---

## 🛠️ Installation & Lokaler Start

Da das Dashboard auf einer Zero-Build-Architektur basiert, ist keine Installation von `node_modules` erforderlich:

```bash
# Lokalen Server starten (z. B. via Python)
python -m http.server 3000

# Dashboard im Browser öffnen
http://localhost:3000
```

---

## 🌐 Live-Deployment auf Vercel

Das Projekt ist für 1-Click Vercel Edge Deployment vorkonfiguriert (`vercel.json` mit Security Headers).

© 2026 Raphael Neumeier · Nexbot Webdesign · Grasweg 85, 85077 Manching
