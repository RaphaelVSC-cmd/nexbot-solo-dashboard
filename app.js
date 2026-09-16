/* ═══════════════════════════════════════════════════════════════════════
   NEXBOT SOLO BUSINESS DASHBOARD — UNIFIED APP.JS
   Stand-Alone Architektur (Funktioniert sowohl auf Vercel als auch via Doppel-Klick lokal)
   ═══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ─── 1. INITIAL REAL DATA STORE ───────────────────────────────────── */
  const INITIAL_DATA = {
    metrics: {
      revenueTarget: 5000,
      currentRevenue: 1250,
      targetMRR: 156,
      currentMRR: 39,
      targetDealsCount: 4,
      closedDealsCount: 1,
      pipelineValue: 13750,
      demosGenerated: 21,
      demosSent: 9,
      openInvoicesAmount: 0
    },

    top3Hebel: [
      {
        id: "hebel-1",
        rank: 1,
        text: "Saridis SHK & Fünfer Werner Spenglerei anrufen (Saxer Opener & Erlaubnis für WhatsApp Demo-Link)",
        category: "Akquise",
        isDone: false,
        leadId: "lead-001"
      },
      {
        id: "hebel-2",
        rank: 2,
        text: "Loom-Video für Faschingbauer Haustechnik aufnehmen (60s Smartphone Tour mit Branchenrechner)",
        category: "Akquise",
        isDone: false,
        leadId: "lead-009"
      },
      {
        id: "hebel-3",
        rank: 3,
        text: "BGB-Projektvertrag & AVV für nächste Verhandlung aus 'Nexbot Organisation' prüfen",
        category: "Recht/SLA",
        isDone: true,
        docId: "doc-002"
      }
    ],

    leads: [
      {
        id: "lead-001",
        companyName: "Saridis SHK",
        ownerName: "Herr Saridis",
        category: "Sanitär & Heizung",
        city: "Ingolstadt",
        street: "Geibelstraße 22",
        phone: "+49 1523 7384702",
        googleRating: 5.0,
        reviewCount: 12,
        topReviewQuote: "Schnellster Notdienst und saubere Arbeit beim Heizungstausch.",
        status: "pitch_versendet",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://saridis-shk.vercel.app",
        localDemoPath: "../saridis-shk/index.html",
        loomUrl: "https://loom.com/share/saridis-shk-demo-tour",
        contractFile: "../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Sehr freundlich am Telefon. Chef ist abends ab 18:00 Uhr via WhatsApp erreichbar. Fokus: Badsanierung & Heizungs-Rechner.",
        createdAt: "2026-09-10",
        lastContactAt: "2026-09-15"
      },
      {
        id: "lead-002",
        companyName: "Fünfer Werner Spenglerei Meisterbetrieb",
        ownerName: "Werner Fünfer",
        category: "Dachdecker & Spenglerei",
        city: "Ingolstadt",
        street: "Einbogen 2",
        phone: "+49 841 9711378",
        googleRating: 5.0,
        reviewCount: 7,
        topReviewQuote: "Zuverlässiger Spenglermeister. Schnelle Reparatur am Dach nach Sturm.",
        status: "verhandlung",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://bauspenglerei-pospisil.vercel.app",
        localDemoPath: "../bauspenglerei-pospisil/index.html",
        loomUrl: "https://loom.com/share/fuenfer-spenglerei-pitch",
        contractFile: "../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Haben aktuell keine Website. War positiv überrascht, dass Entwurf bereits steht. BGB-Vertrag vorbereitet.",
        createdAt: "2026-09-11",
        lastContactAt: "2026-09-16"
      },
      {
        id: "lead-003",
        companyName: "Bauspenglerei Pospisil",
        ownerName: "Herr Pospisil",
        category: "Bauspenglerei",
        city: "Ingolstadt",
        street: "Münchener Str. 14",
        phone: "+49 841 931200",
        googleRating: 4.9,
        reviewCount: 18,
        topReviewQuote: "Präzise Spenglerarbeiten und faire Festpreise.",
        status: "demo_live",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://bauspenglerei-pospisil.vercel.app",
        localDemoPath: "../bauspenglerei-pospisil/index.html",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Demo ist live auf Vercel Edge. Loom-Tour für WhatsApp vorbereiten.",
        createdAt: "2026-09-12",
        lastContactAt: "2026-09-14"
      },
      {
        id: "lead-004",
        companyName: "Bauhandwerk Stey",
        ownerName: "Markus Stey",
        category: "Bauunternehmen & Sanierung",
        city: "Ingolstadt",
        street: "Gaimersheimer Str. 45",
        phone: "+49 841 493012",
        googleRating: 4.8,
        reviewCount: 22,
        topReviewQuote: "Solides Handwerk, termingerechte Fertigstellung der Sanierung.",
        status: "demo_live",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://bauhandwerk-stey.vercel.app",
        localDemoPath: "../bauhandwerk-stey/index.html",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Demo mit m²-Kostenrechner fertig. Kontaktversuch morgen früh.",
        createdAt: "2026-09-13",
        lastContactAt: "2026-09-14"
      },
      {
        id: "lead-005",
        companyName: "Robert Protzmann",
        ownerName: "Robert Protzmann",
        category: "Dachdecker",
        city: "Augsburg",
        street: "Zur Inninger Mühle 4",
        phone: "+49 821 995407",
        googleRating: 4.5,
        reviewCount: 26,
        topReviewQuote: "Sehr gute Dachneueindeckung, eingespieltes Team.",
        status: "recherchiert",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "",
        localDemoPath: "",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Etablierter Dachdecker mit 26 Rezensionen. Braucht moderne mobile Präsenz für 15k€ Sanierungsanfragen.",
        createdAt: "2026-09-14",
        lastContactAt: "2026-09-14"
      },
      {
        id: "lead-006",
        companyName: "Baugeschäft Sipala Antonino Meisterbetrieb",
        ownerName: "Antonino Sipala",
        category: "Bauunternehmen",
        city: "Augsburg Umgebung",
        street: "Siedlerweg 92",
        phone: "+49 821 74799460",
        googleRating: 4.8,
        reviewCount: 11,
        topReviewQuote: "Exzellente Rohbauarbeiten, saubere Baustelle.",
        status: "demo_in_produktion",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "",
        localDemoPath: "",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Website-Generator v3.2 baut gerade die Demo.",
        createdAt: "2026-09-15",
        lastContactAt: "2026-09-15"
      },
      {
        id: "lead-007",
        companyName: "Samir Zogaj - Bodenbeläge",
        ownerName: "Samir Zogaj",
        category: "Bodenleger & Parkett",
        city: "Ingolstadt",
        street: "Hainbuchenstraße 8",
        phone: "+49 1523 7901695",
        googleRating: 5.0,
        reviewCount: 13,
        topReviewQuote: "Perfekt verlegtes Parkett, termintreu und sauber.",
        status: "recherchiert",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "",
        localDemoPath: "",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "13 Top-Bewertungen, aber keine Website. Hoher Vorher-Nachher Bilder-Bedarf.",
        createdAt: "2026-09-15",
        lastContactAt: "2026-09-15"
      },
      {
        id: "lead-008",
        companyName: "DKS Hausmeisterservice & GalaBau",
        ownerName: "Herr DKS",
        category: "Garten- & Landschaftsbau",
        city: "Regensburg",
        street: "Dr.-Gessler-Straße 12a",
        phone: "+49 176 43671680",
        googleRating: 5.0,
        reviewCount: 11,
        topReviewQuote: "Gartenumgestaltung und Pflasterung auf höchstem Niveau.",
        status: "demo_live",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://gaertnerei-josef-brunner.vercel.app",
        localDemoPath: "../gaertnerei-josef-brunner/index.html",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Regensburg B2B Markt. Dauerverträge für Objektbetreuung & Privatgärten.",
        createdAt: "2026-09-13",
        lastContactAt: "2026-09-15"
      },
      {
        id: "lead-009",
        companyName: "Faschingbauer Haustechnik",
        ownerName: "Josef Faschingbauer",
        category: "Sanitär & Estrich",
        city: "Ingolstadt",
        street: "Eichenwaldstraße 55",
        phone: "+49 171 8914790",
        googleRating: 4.4,
        reviewCount: 5,
        topReviewQuote: "Gute Beratung beim Heizungstausch.",
        status: "verhandlung",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://faschingbauer-haustechnik.vercel.app",
        localDemoPath: "../faschingbauer-haustechnik/index.html",
        loomUrl: "",
        contractFile: "../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Hatte Bedenken wegen Zeitaufwand ('Baustelle voll'). Bumerang-Einwand erfolgreich: 'Arbeit ist schon getan!'",
        createdAt: "2026-09-12",
        lastContactAt: "2026-09-16"
      },
      {
        id: "lead-010",
        companyName: "Heizung Mantsch",
        ownerName: "Herr Mantsch",
        category: "Heizungs- & Klimatechnik",
        city: "Ingolstadt",
        street: "Kurt-Huber-Straße 19",
        phone: "+49 8458 3465357",
        googleRating: 4.2,
        reviewCount: 10,
        topReviewQuote: "Schnelle Hilfe als die Heizung im Winter ausfiel.",
        status: "pitch_versendet",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://heizung-mantsch.vercel.app",
        localDemoPath: "../heizung-mantsch/index.html",
        loomUrl: "https://loom.com/share/heizung-mantsch-tour",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Alte HTTP-Website aus 2008 ersetzt durch Highspeed-Vercel-Edge Auftritt.",
        createdAt: "2026-09-10",
        lastContactAt: "2026-09-15"
      },
      {
        id: "lead-011",
        companyName: "MHG Heiztechnik",
        ownerName: "Herr MHG",
        category: "Sanitär & Heizung",
        city: "Ingolstadt",
        street: "Münchener Str. 205",
        phone: "+49 841 8869755",
        googleRating: 5.0,
        reviewCount: 3,
        topReviewQuote: "Sehr freundlicher Kundendienst.",
        status: "demo_live",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://mhg-heiztechnik.vercel.app",
        localDemoPath: "../mhg-heiztechnik/index.html",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Demo steht. Kaltakquise-Anruf geplant.",
        createdAt: "2026-09-14",
        lastContactAt: "2026-09-14"
      },
      {
        id: "lead-012",
        companyName: "Ulrich Pokorny Sanitärtechnik",
        ownerName: "Ulrich Pokorny",
        category: "Sanitärtechnik",
        city: "Ingolstadt",
        street: "Tulpenstraße 6",
        phone: "+49 841 71918",
        googleRating: 5.0,
        reviewCount: 2,
        topReviewQuote: "Zuverlässiger Meister, prompte Abwicklung.",
        status: "pitch_versendet",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://ulrich-pokorny-sanitaertechnik.vercel.app",
        localDemoPath: "../ulrich-pokorny-sanitaertechnik/index.html",
        loomUrl: "https://loom.com/share/pokorny-sanitaer",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "WhatsApp Micro-Commitment erhalten. Follow-Up Call am Donnerstag 10:00 Uhr.",
        createdAt: "2026-09-11",
        lastContactAt: "2026-09-15"
      },
      {
        id: "lead-013",
        companyName: "Weidlich Malermeister",
        ownerName: "Klaus Weidlich",
        category: "Maler & Lackierer",
        city: "Augsburg",
        street: "Ulmer Str. 78",
        phone: "+49 821 441020",
        googleRating: 4.9,
        reviewCount: 15,
        topReviewQuote: "Fassadenanstrich sieht fantastisch aus. Pünktlich und sauber.",
        status: "demo_live",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://weidlich-malermeister.vercel.app",
        localDemoPath: "../weidlich-malermeister/index.html",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Demo mit Farbfächer-Interaktion fertiggestellt.",
        createdAt: "2026-09-14",
        lastContactAt: "2026-09-15"
      },
      {
        id: "lead-014",
        companyName: "Wilhelm Lippl Handwerk",
        ownerName: "Wilhelm Lippl",
        category: "Allround-Handwerk & Montage",
        city: "Ingolstadt",
        street: "Regensburger Str. 210",
        phone: "+49 841 36681",
        googleRating: 5.0,
        reviewCount: 3,
        topReviewQuote: "Echtes bayerisches Handwerk, ehrlich und schnell.",
        status: "demo_live",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://wilhelm-lippl-handwerk.vercel.app",
        localDemoPath: "../wilhelm-lippl-handwerk/index.html",
        loomUrl: "",
        contractFile: "",
        invoiceStatus: "noch_nicht_faellig",
        notes: "Übungs-Lead. Fokus: Schneller Einstieg ohne Nervosität.",
        createdAt: "2026-09-13",
        lastContactAt: "2026-09-14"
      },
      {
        id: "lead-015",
        companyName: "Musterkunde Bayern GmbH",
        ownerName: "Max Mustermann",
        category: "B2B Mittelstand / Handwerk",
        city: "Ingolstadt",
        street: "Musterstraße 12",
        phone: "+49 841 998877",
        googleRating: 5.0,
        reviewCount: 20,
        topReviewQuote: "Ausgezeichnete Zusammenarbeit mit Nexbot Webdesign. Ladezeit unter 1s!",
        status: "gewonnen",
        dealValue: 1250,
        monthlyRetainer: 39,
        demoUrl: "https://nexbot.info",
        localDemoPath: "../../Nexbot Organisation/INDEX_NEXBOT_ORGANISATION.html",
        loomUrl: "https://loom.com/share/musterkunde-showcase",
        contractFile: "../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html",
        invoiceStatus: "bezahlt",
        notes: "Erster erfolgreicher Abschluss nach Businessplan! 1.250 € erhalten, monatlicher Retainer 39 € per SEPA aktiv.",
        createdAt: "2026-03-01",
        lastContactAt: "2026-09-01"
      }
    ],

    clients: [
      {
        id: "client-001",
        leadId: "lead-015",
        companyName: "Musterkunde Bayern GmbH",
        contactPerson: "Max Mustermann (Geschäftsführer)",
        domain: "musterkunde-bayern.de",
        startDate: "2026-03-01",
        contractType: "Modern UI Pro Webdesign + Care Retainer",
        oneTimePrice: 1250,
        monthlyRetainer: 39,
        paymentMethod: "SEPA-Lastschrift",
        status: "aktiv",
        supportBudgetMinutes: 30,
        usedMinutesThisMonth: 10,
        contractFile: "../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html",
        avvFile: "../../Nexbot Organisation/02_Verträge/02_AVV_Datenschutz_DSGVO.html",
        acceptanceFile: "../../Nexbot Organisation/02_Verträge/03_Abnahmeprotokoll_Webdesign_BGB.html",
        latestInvoiceNumber: "RE-2026-001",
        invoiceStatus: "bezahlt"
      }
    ],

    documents: [
      {
        id: "doc-001",
        title: "Nexbot Musterangebot Webdesign",
        category: "01_Angebote",
        clientName: "Musterkunde Bayern GmbH",
        leadId: "lead-015",
        amount: "1.250 € + 39 €/Mtl.",
        status: "angenommen",
        date: "2026-02-20",
        filePath: "../../Nexbot Organisation/01_Angebote/Nexbot_Musterangebot_Webdesign.html",
        description: "Verbindliches Festpreisangebot mit 0 € Vorab-Risiko Klausel nach Businessplan."
      },
      {
        id: "doc-002",
        title: "01 Webdesign Projektvertrag BGB",
        category: "02_Verträge",
        clientName: "Musterkunde Bayern GmbH",
        leadId: "lead-015",
        amount: "1.250 €",
        status: "unterzeichnet",
        date: "2026-02-28",
        filePath: "../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html",
        description: "Werkvertrag nach §§ 631 ff. BGB mit digitaler Signatur & Urheberrechtsklausel."
      },
      {
        id: "doc-003",
        title: "02 AVV Auftragsverarbeitung (Art. 28 DSGVO)",
        category: "02_Verträge",
        clientName: "Musterkunde Bayern GmbH",
        leadId: "lead-015",
        amount: "Inklusive",
        status: "unterzeichnet",
        date: "2026-02-28",
        filePath: "../../Nexbot Organisation/02_Verträge/02_AVV_Datenschutz_DSGVO.html",
        description: "Rechtssicherer Datenschutz-Vertrag gem. Art. 28 DSGVO inklusive Bitkom TOM Anlage."
      },
      {
        id: "doc-004",
        title: "03 Abnahmeprotokoll Webdesign (§ 640 BGB)",
        category: "02_Verträge",
        clientName: "Musterkunde Bayern GmbH",
        leadId: "lead-015",
        amount: "Fälligkeit ausgelöst",
        status: "abgenommen",
        date: "2026-03-05",
        filePath: "../../Nexbot Organisation/02_Verträge/03_Abnahmeprotokoll_Webdesign_BGB.html",
        description: "Rechtsverbindliche Abnahme nach § 640 BGB – löst Werklohnfälligkeit aus."
      },
      {
        id: "doc-005",
        title: "Kleinunternehmer-Rechnung RE-2026-001",
        category: "03_Rechnungen",
        clientName: "Musterkunde Bayern GmbH",
        leadId: "lead-015",
        amount: "1.250,00 €",
        status: "bezahlt",
        date: "2026-03-05",
        dueDate: "2026-03-19",
        filePath: "../../Nexbot Organisation/03_Rechnungen/Nexbot_Kleinunternehmer_Rechnung.html",
        description: "Rechnung nach §§ 14, 14a UStG i.V.m. § 19 UStG (14 Tage Zahlungsziel)."
      },
      {
        id: "doc-006",
        title: "Retainer-Rechnung RE-2026-002 (März)",
        category: "03_Rechnungen",
        clientName: "Musterkunde Bayern GmbH",
        leadId: "lead-015",
        amount: "39,00 €",
        status: "bezahlt",
        date: "2026-03-15",
        dueDate: "2026-03-29",
        filePath: "../../Nexbot Organisation/03_Rechnungen/Nexbot_Kleinunternehmer_Rechnung.html",
        description: "Monatlicher Retainer für Vercel Edge Hosting, SSL & Wartungsservice."
      },
      {
        id: "doc-007",
        title: "EÜR Rechner 2026 Web-App",
        category: "04_Buchhaltung_EÜR",
        clientName: "Nexbot Webdesign (Eigenbeleg)",
        leadId: null,
        amount: "Übersicht",
        status: "aktiv",
        date: "2026-09-15",
        filePath: "../../Nexbot Organisation/04_Buchhaltung_EÜR/Nexbot_EUER_Rechner_2026.html",
        description: "Interaktiver EÜR-Rechner mit Grenzwert-Radar für 25.000 € Kleinunternehmer-Reform."
      },
      {
        id: "doc-008",
        title: "Gewerbeanmeldung Manching (GewA1)",
        category: "05_Behörden_Unterlagen",
        clientName: "Gemeinde Manching / Finanzamt",
        leadId: null,
        amount: "Amtlich",
        status: "bestätigt",
        date: "2026-09-15",
        filePath: "../../Nexbot Organisation/05_Behörden_Unterlagen/Gewerbemeldung.pdf",
        description: "Offizielle Gewerbeanmeldung für Nexbot Webdesign & Softwareentwicklung."
      },
      {
        id: "doc-009",
        title: "ELSTER USt-IdNr. & Steuerunterlagen",
        category: "05_Behörden_Unterlagen",
        clientName: "Finanzamt Pfaffenhofen / BZSt",
        leadId: null,
        amount: "Amtlich",
        status: "bestätigt",
        date: "2026-09-15",
        filePath: "../../Nexbot Organisation/05_Behörden_Unterlagen/ELSTER-USt-IdNr.pdf",
        description: "Umsatzsteuer-Identifikationsnummer & Fragebogen zur steuerlichen Erfassung."
      }
    ],

    tasks: [
      {
        id: "task-001",
        title: "5 Kaltakquise-Pitches via Saxer-Leitfaden führen",
        description: "Fokus: Saridis SHK, Fünfer Werner Spenglerei, Faschingbauer Haustechnik. Ziel: Micro-Commitment für WhatsApp Demo-Link.",
        category: "Akquise",
        priority: "P0",
        status: "offen",
        dueDate: "Heute",
        leadId: "lead-001"
      },
      {
        id: "task-002",
        title: "Loom-Video für Faschingbauer Haustechnik aufnehmen",
        description: "Smartphone-Ansicht (375px), 60-90 Sekunden. Wärmepumpen-Rechner und Rezensionen zeigen.",
        category: "Akquise",
        priority: "P0",
        status: "in_arbeit",
        dueDate: "Heute",
        leadId: "lead-009"
      },
      {
        id: "task-003",
        title: "Demo Robert Protzmann (Augsburg Dachdecker) fertigstellen",
        description: "Lead aus top_15. Dach-Rechner und Google-Rezensionen einbauen.",
        category: "Technik",
        priority: "P1",
        status: "offen",
        dueDate: "Morgen",
        leadId: "lead-005"
      },
      {
        id: "task-004",
        title: "DNS & Domain-Aufschaltung für Stey Bauhandwerk vorbereiten",
        description: "Vercel CNAME Records und SSL-Zertifikat prüfen.",
        category: "Technik",
        priority: "P1",
        status: "offen",
        dueDate: "18.09.2026",
        leadId: "lead-004"
      },
      {
        id: "task-005",
        title: "EÜR-Buchhaltung Q1-Q3 2026 Belege archivieren",
        description: "Belege Hetzner, Vercel Pro, Telekom mit Nexbot_EUER_Buchhaltung_2026.csv abgleichen.",
        category: "Verwaltung",
        priority: "P2",
        status: "erledigt",
        dueDate: "15.09.2026",
        leadId: null
      }
    ],

    coldCallScript: {
      gatekeeper: {
        title: "Phase A: Gatekeeper-Überwindung (Sekretariat / Büro)",
        speaker: "Raphael",
        dialogue: "Guten Tag, Raphael Neumeier hier. Es geht um die digitale Außendarstellung der Firma und die Gewinnung junger Fachkräfte in der Region. Bitte geben Sie mich kurz zu Herrn [Nachname Chef] durch.",
        responseExample: "Rezeption: 'Worum geht es da genau?'",
        counter: "Raphael: 'Genau darum: Ich habe hierzu bereits ein fertiges, interaktives Konzept spezifisch für Ihren Betrieb programmiert und stimme mit ihm nur kurz ab, wohin ich ihm den Direktlink senden darf. Bitte klemmen Sie mich kurz an.'"
      },
      opener: {
        title: "Phase B: Inhaber-Opener (Lob & Micro-Commitment)",
        speaker: "Raphael",
        dialogue: "Guten Tag Herr [Nachname Chef], Raphael Neumeier hier aus Ingolstadt. Herr [Nachname Chef], ich rufe Sie an, weil mir Ihre exzellenten 5,0 Sterne auf Google aufgefallen sind. Mir fällt bei Handwerksbetrieben in Ihrer Größenordnung oft auf, dass diese Qualität online überhaupt nicht sichtbar ist – und Sie dadurch lukrative Privatkunden oder junge Gesellen an Konkurrenten verlieren. Wie zufrieden sind Sie aktuell damit, wie Ihr Betrieb im Netz wahrgenommen wird?",
        pauseNotice: "(Pausieren. Kunde antworten lassen).",
        hook: "Genau aus diesem Grund habe ich auf eigenes Risiko bereits einen fertigen, interaktiven Entwurf für Sie programmiert, der Ihre 5-Sterne-Arbeit perfekt aufs Smartphone bringt. Ich möchte Ihnen das gar nicht am Telefon erklären – Sie müssen das auf Ihrem Handy sehen. Senden wir den Link am besten auf die Nummer, unter der wir gerade sprechen, oder haben Sie dafür ein Geschäftshandy mit WhatsApp?"
      },
      loomStructure: [
        { step: "0–15 Sek", title: "Gesicht & Entwurf", desc: "Gesicht zeigen, lockere persönliche Ansprache, fertigen Entwurf auf Desktop zeigen." },
        { step: "15–45 Sek", title: "Conversion-Feature", desc: "Live-Klick auf den interaktiven Rechner, die Google-Bewertungen und den WhatsApp-Button." },
        { step: "45–65 Sek", title: "Mobile DevTools", desc: "DevTools 375px: 'So sieht das aus, wenn ein Kunde abends auf der Couch nach Ihnen sucht.'" },
        { step: "65–90 Sek", title: "Call to Action", desc: "Klares Angebot: 'Wenn es Ihnen gefällt, schalten wir Ihre Domain in 24h auf. Ich rufe Sie am [Tag] kurz an.'" }
      ],
      bumerang: [
        {
          objection: "„Wir haben schon eine Agentur / macht mein Neffe“",
          reply: "„Hervorragend! Betriebe, die online schon betreut werden, nutzen meinen Entwurf extrem gerne als kostenlose Zweitmeinung, um zu prüfen, ob die aktuelle Agentur wirklich das Maximum herausholt. Schauen Sie es sich einfach unverbindlich als Benchmark an.“"
        },
        {
          objection: "„Wir haben keine Zeit / sind auf der Baustelle voll“",
          reply: "„Dass Sie auf der Baustelle voll eingespannt sind, verstehe ich völlig. Genau deshalb habe ich die Arbeit ja bereits im Vorfeld komplett erledigt, statt Ihre Zeit mit Terminen zu stehlen. Tippen Sie einfach heute Abend auf der Couch auf den Link.“"
        },
        {
          objection: "„Wir brauchen keine neuen Aufträge, wir suchen Leute“",
          reply: "„Genau deshalb ist die Seite so aufgebaut. Junge Azubis und Gesellen bewerben sich heute nicht per Postmappe – sie googeln Ihren Betrieb auf dem Smartphone. Wenn die Seite top aussieht und ein 1-Klick-Bewerbungsformular hat, gewinnen Sie die besten Leute der Region.“"
        },
        {
          objection: "„Was soll das Ganze kosten?“",
          reply: "„Genau 1.250 € einmaliger Festpreis – und Sie gehen null Vorab-Risiko ein, weil die Website ja bereits fix und fertig für Sie programmiert ist. Ein einziger neuer Handwerksauftrag refinanziert das sofort.“"
        }
      ]
    },

    callLogs: [
      {
        id: "call-001",
        date: "2026-09-15 11:30",
        companyName: "Saridis SHK",
        contactName: "Herr Saridis",
        status: "WhatsApp-Zustimmung",
        notes: "Chef erreicht. War anfangs skeptisch, aber von den Google-Rezensionen angetan. Link per WhatsApp versendet."
      },
      {
        id: "call-002",
        date: "2026-09-15 14:15",
        companyName: "Faschingbauer Haustechnik",
        contactName: "Josef Faschingbauer",
        status: "Follow-Up vereinbart",
        notes: "Sekretärin hat durchgestellt. Baustelle war laut, bat um Anruf morgen nach 17 Uhr."
      }
    ]
  };

  /* ─── 2. REAKTIVES STATE-MANAGEMENT ─────────────────────────────────── */
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
        console.warn('LocalStorage nicht lesbar (z.B. Dateisystem-Schutz), nutze Memory-State:', err);
      }
      return JSON.parse(JSON.stringify(INITIAL_DATA));
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (err) {}
    }

    subscribe(listener) {
      if (typeof listener === 'function') this.listeners.push(listener);
    }

    notify(changeType = 'update', payload = null) {
      this.saveState();
      this.listeners.forEach(fn => {
        try { fn(this.state, changeType, payload); } catch (e) { console.error(e); }
      });
    }

    recalculateMetrics() {
      const leads = this.state.leads || [];
      const clients = this.state.clients || [];

      const closedLeads = leads.filter(l => l.status === 'gewonnen');
      const closedCount = closedLeads.length;
      const closedRevenue = closedLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 1250), 0);

      const activeClients = clients.filter(c => c.status === 'aktiv');
      const totalMRR = activeClients.reduce((sum, c) => sum + (Number(c.monthlyRetainer) || 39), 0);

      const pipelineLeads = leads.filter(l => l.status !== 'gewonnen');
      const pipeValue = pipelineLeads.reduce((sum, l) => sum + (Number(l.dealValue) || 1250), 0);

      const sentCount = leads.filter(l => ['pitch_versendet', 'verhandlung', 'gewonnen'].includes(l.status)).length;

      this.state.metrics.currentRevenue = closedRevenue;
      this.state.metrics.closedDealsCount = closedCount;
      this.state.metrics.currentMRR = totalMRR;
      this.state.metrics.pipelineValue = pipeValue;
      this.state.metrics.demosSent = sentCount;
    }

    getMetrics() { return this.state.metrics; }
    getLeads() { return this.state.leads; }
    getLeadById(id) { return this.state.leads.find(l => l.id === id); }
    getClients() { return this.state.clients; }
    getDocuments() { return this.state.documents; }
    getTasks() { return this.state.tasks; }
    getTop3Hebel() { return this.state.top3Hebel; }
    getColdCallScript() { return this.state.coldCallScript; }
    getCallLogs() { return this.state.callLogs; }

    updateLeadStatus(leadId, newStatus) {
      const lead = this.state.leads.find(l => l.id === leadId);
      if (!lead) return false;
      const oldStatus = lead.status;
      lead.status = newStatus;
      lead.lastContactAt = new Date().toISOString().split('T')[0];

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
        monthlyRetainer: Number(newLead.monthlyRetainer) || 39,
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
        monthlyRetainer: lead.monthlyRetainer || 39,
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

    resetAllData() {
      this.state = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.recalculateMetrics();
      this.notify('state_reset');
    }
  }

  const state = new StateManager();
  window.nexbotState = state;

  /* ─── 3. TOAST & MODAL SERVICES ────────────────────────────────────── */
  function showToast(message, type = 'success') {
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
      if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.close());
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.backdrop.classList.contains('is-open')) this.close();
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
            <button class="btn btn-secondary btn-sm" id="btnModalPrintDoc">🖨️ Drucken / PDF</button>
            <a href="${srcUrl}" target="_blank" class="btn btn-primary btn-sm">Neues Fenster ↗</a>
          </div>
        </div>
        <iframe src="${srcUrl}" id="modalDocIframe" class="modal-iframe"></iframe>
      `;
      document.getElementById('btnModalPrintDoc')?.addEventListener('click', () => {
        const iframe = document.getElementById('modalDocIframe');
        if (iframe && iframe.contentWindow) {
          iframe.contentWindow.focus();
          iframe.contentWindow.print();
        }
      });
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
          <div style="width:375px; height:680px; max-height:calc(86vh - 80px); background:#000; border:4px solid #333; border-radius:36px; overflow:hidden; position:relative; box-shadow:0 15px 40px rgba(0,0,0,0.9); display:flex; flex-direction:column;">
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
        showToast(`✓ Lead „${newLead.companyName}“ angelegt!`);
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
        showToast('✓ Aufgabe erfolgreich erstellt!');
      });
      this.backdrop.classList.add('is-open');
    }
  }

  const modal = new ModalManager();
  window.nexbotModal = modal;

  /* ─── 4. SLIDE-OVER DRAWER (LEAD DETAILAKTE) ───────────────────────── */
  const PIPELINE_COLUMNS = [
    { id: 'recherchiert', title: '1. Recherchiert' },
    { id: 'demo_in_produktion', title: '2. Demo in Bau' },
    { id: 'demo_live', title: '3. Demo Live' },
    { id: 'pitch_versendet', title: '4. Pitch raus' },
    { id: 'verhandlung', title: '5. Verhandlung' },
    { id: 'gewonnen', title: '6. Gewonnen 🎉' }
  ];

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
        if (e.target === this.backdrop) this.close();
      });
      document.getElementById('drawerCloseBtn')?.addEventListener('click', () => this.close());
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.backdrop.classList.contains('is-open')) this.close();
      });
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

      const encodedPitch = encodeURIComponent(
        `Hallo Herr ${lead.ownerName || ''},\n\nwie besprochen sende ich Ihnen hier den fertigen, interaktiven Website-Entwurf für ${lead.companyName}:\n👉 ${lead.demoUrl || 'https://nexbot.info'}\n\nTippen Sie einfach kurz auf dem Smartphone darauf.\n\nBeste Grüße,\nRaphael Neumeier\nNexbot Webdesign`
      );
      const waLink = `https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodedPitch}`;

      body.innerHTML = `
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
                Demo noch nicht generiert — Website-Generator aufrufen
              </div>
            `}
          </div>
        </div>

        <div class="drawer-section">
          <span class="drawer-section-title">03 // Verträge & Rechnungen (Nexbot Organisation)</span>
          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <div style="background:rgba(255,255,255,0.025); border:1px solid var(--border-subtle); padding:0.6rem 0.85rem; border-radius:var(--radius-xs); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div class="table-cell-title" style="font-size:0.8rem;">01 Musterangebot Webdesign</div>
                <div class="table-cell-sub">1.250 € Festpreis + 39 €/Mtl.</div>
              </div>
              <button class="btn btn-secondary btn-sm" data-action="preview-doc" data-path="../../Nexbot Organisation/01_Angebote/Nexbot_Musterangebot_Webdesign.html" data-title="Musterangebot Webdesign">
                Vorschau
              </button>
            </div>

            <div style="background:rgba(255,255,255,0.025); border:1px solid var(--border-subtle); padding:0.6rem 0.85rem; border-radius:var(--radius-xs); display:flex; justify-content:space-between; align-items:center;">
              <div>
                <div class="table-cell-title" style="font-size:0.8rem;">02 BGB-Projektvertrag & AVV</div>
                <div class="table-cell-sub">§§ 631 ff. BGB + Art. 28 DSGVO</div>
              </div>
              <button class="btn btn-secondary btn-sm" data-action="preview-doc" data-path="../../Nexbot Organisation/02_Verträge/01_Webdesign_Projektvertrag_BGB.html" data-title="BGB Werkvertrag">
                Vorschau
              </button>
            </div>

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

      document.getElementById('drawerStatusSelect')?.addEventListener('change', (e) => {
        state.updateLeadStatus(lead.id, e.target.value);
        showToast(`✓ Status aktualisiert auf [${e.target.value.toUpperCase()}]`);
      });

      document.getElementById('btnSaveDrawerNotes')?.addEventListener('click', () => {
        const text = document.getElementById('drawerNotesTextarea')?.value;
        state.updateLeadNotes(lead.id, text);
        showToast('✓ Notiz erfolgreich gespeichert!');
      });

      body.querySelectorAll('[data-action="preview-doc"]').forEach(btn => {
        btn.addEventListener('click', () => {
          modal.openIframe(btn.getAttribute('data-path'), btn.getAttribute('data-title'));
        });
      });

      document.getElementById('btnPreviewDemoInside')?.addEventListener('click', (e) => {
        modal.openDeviceSimulator(e.target.getAttribute('data-url'), lead.companyName);
      });
    }
  }

  const drawer = new DrawerManager();
  window.nexbotDrawer = drawer;

  /* ─── 5. MODUL-RENDERER (COCKPIT, PIPELINE, KUNDEN, DOKUS, TASKS, CALL) ── */

  // 5.1 COCKPIT
  function renderCockpit() {
    const metrics = state.getMetrics();
    const top3Hebel = state.getTop3Hebel();
    const leads = state.getLeads();
    const percent5k = Math.min(100, Math.round((metrics.currentRevenue / metrics.revenueTarget) * 100));
    const percentMRR = Math.min(100, Math.round((metrics.currentMRR / metrics.targetMRR) * 100));
    const conversionRate = metrics.demosSent > 0 ? Math.round((metrics.closedDealsCount / metrics.demosSent) * 100) : 0;

    return `
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-tag">[ 01 // OVERVIEW ]</span>
          <h1 class="section-title">Solo Business Cockpit</h1>
          <p class="section-desc">Operatives Kontrollzentrum für Nexbot Webdesign — Raphael Neumeier (Manching / Ingolstadt)</p>
        </div>
        <div class="section-actions">
          <button class="btn btn-secondary" id="btnRefreshCockpit">[ SYNC ]</button>
          <button class="btn btn-primary" id="btnOpenNewLeadModal">+ NEUER LEAD</button>
        </div>
      </div>

      <div class="metrics-grid">
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
            <span>${state.getClients().length} aktive Verträge</span>
            <span style="color:var(--text-silver)">ARR: ${(metrics.currentMRR * 12).toLocaleString('de-DE')} €</span>
          </div>
        </div>

        <div class="metric-card">
          <div class="metric-card-top">
            <span class="metric-label">Pipeline-Potenzial</span>
            <span class="badge badge-blue">AKTIVE LEADS</span>
          </div>
          <div class="metric-val-wrap">
            <span class="metric-val">${metrics.pipelineValue.toLocaleString('de-DE')} €</span>
          </div>
          <div class="metric-bottom">
            <span>In Pitch / Verhandlung</span>
            <span style="color:var(--status-blue)">21 Demos bereit</span>
          </div>
        </div>

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

      <div class="focus-card">
        <div class="focus-header">
          <div class="focus-title-group">
            <span class="badge badge-emerald">PRIORITÄT HEUTE</span>
            <div>
              <h2 class="focus-heading">Top 3 Hebel für Raphael Neumeier</h2>
              <p class="focus-subtitle">Konzentrierter Fokus als Solo-Unternehmer — Größter Umsatzhebel heute</p>
            </div>
          </div>
          <span class="badge badge-blue font-mono">SOLO-MODUS AKTIV</span>
        </div>

        <div class="focus-items-list">
          ${top3Hebel.map(h => `
            <div class="focus-item ${h.isDone ? 'is-done' : ''}" data-hebel-id="${h.id}">
              <input type="checkbox" class="focus-checkbox" ${h.isDone ? 'checked' : ''} data-hebel-action="toggle" data-id="${h.id}">
              <span class="focus-rank">#${h.rank}</span>
              <div class="focus-item-content">
                <span class="focus-item-text">${h.text}</span>
                <div style="display:flex; align-items:center; gap:0.5rem;">
                  <span class="badge badge-${h.category === 'Akquise' ? 'danger' : 'blue'}">${h.category}</span>
                  ${h.leadId ? `<button class="btn btn-secondary btn-sm" data-action="open-lead" data-id="${h.leadId}">[ AKTE ]</button>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
        <div class="task-column">
          <div class="task-col-header">
            <span class="task-col-title">[ HEISSE LEADS // NÄCHSTER ABSCHLUSS ]</span>
            <span class="badge badge-amber">PRIO AKQUISE</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${leads.filter(l => ['verhandlung', 'pitch_versendet'].includes(l.status)).slice(0, 4).map(l => `
              <div class="task-card" style="cursor: pointer;" data-action="open-lead" data-id="${l.id}">
                <div class="task-card-header">
                  <span class="table-cell-title">${l.companyName}</span>
                  <span class="badge ${l.status === 'verhandlung' ? 'badge-amber' : 'badge-blue'}">${l.status.toUpperCase()}</span>
                </div>
                <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.72rem; color:var(--text-silver);">
                  <span>${l.city} · ${l.category}</span>
                  <span style="color:var(--text-pure); font-weight:700;">${l.dealValue} €</span>
                </div>
                <div style="font-size:0.75rem; color:var(--text-silver); font-style:italic; line-height:1.35; background:rgba(255,255,255,0.02); padding:0.35rem 0.5rem; border-left:2px solid var(--border-bright);">
                  „${l.topReviewQuote || l.notes}“
                </div>
                <div style="display:flex; justify-content:flex-end; gap:0.4rem; padding-top:0.3rem;">
                  <a href="https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=Hallo%20Herr%20${encodeURIComponent(l.ownerName || '')}%2C%20hier%20der%20fertige%20Website-Entwurf%3A%20${encodeURIComponent(l.demoUrl || '')}" 
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

        <div class="task-column">
          <div class="task-col-header">
            <span class="task-col-title">[ NEXBOT ORGANISATION // VORLAGEN ]</span>
            <span class="badge badge-emerald">§ 5 DDG & BGB</span>
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
  }

  function initCockpitEvents(container) {
    container.querySelectorAll('[data-hebel-action="toggle"]').forEach(cb => {
      cb.addEventListener('change', (e) => state.toggleHebel(e.target.getAttribute('data-id')));
    });

    container.querySelectorAll('[data-action="open-lead"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        drawer.open(btn.getAttribute('data-id'));
      });
    });

    container.querySelectorAll('[data-action="preview-doc"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        modal.openIframe(btn.getAttribute('data-path'), btn.getAttribute('data-title'));
      });
    });

    container.querySelector('#btnRefreshCockpit')?.addEventListener('click', () => {
      state.recalculateMetrics();
      state.notify('sync');
      showToast('✓ Kennzahlen synchronisiert!');
    });

    container.querySelector('#btnOpenNewLeadModal')?.addEventListener('click', () => {
      modal.openNewLeadModal();
    });
  }

  // 5.2 PIPELINE (KANBAN)
  function renderPipeline(q = '', cat = 'all', city = 'all') {
    let leads = state.getLeads();
    if (q) {
      const s = q.toLowerCase();
      leads = leads.filter(l => l.companyName.toLowerCase().includes(s) || l.city.toLowerCase().includes(s));
    }
    if (cat !== 'all') leads = leads.filter(l => l.category && l.category.toLowerCase().includes(cat.toLowerCase()));
    if (city !== 'all') leads = leads.filter(l => l.city && l.city.toLowerCase().includes(city.toLowerCase()));

    const allLeads = state.getLeads();
    const categories = [...new Set(allLeads.map(l => l.category).filter(Boolean))];
    const cities = [...new Set(allLeads.map(l => l.city).filter(Boolean))];

    return `
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-tag">[ 02 // SALES PIPELINE ]</span>
          <h1 class="section-title">Demo-First Akquise-Trichter</h1>
          <p class="section-desc">Vollständiger Verkaufszyklus vom Google-Places-Scraping über die fertige Vercel-Demo bis zum Abschluss</p>
        </div>
        <div class="section-actions">
          <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
            <input type="text" id="pipelineSearchInput" class="form-input" style="width: 180px;" placeholder="Suchen..." value="${q}">
            <select id="pipelineCategorySelect" class="form-select" style="width: 140px;">
              <option value="all">Alle Gewerke</option>
              ${categories.map(c => `<option value="${c}" ${cat === c ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
            <select id="pipelineCitySelect" class="form-select" style="width: 130px;">
              <option value="all">Alle Regionen</option>
              ${cities.map(ct => `<option value="${ct}" ${city === ct ? 'selected' : ''}>${ct}</option>`).join('')}
            </select>
            <button class="btn btn-primary" id="pipelineBtnNewLead">+ Neuer Lead</button>
          </div>
        </div>
      </div>

      <div class="kanban-board-container">
        <div class="kanban-board">
          ${PIPELINE_COLUMNS.map(col => {
            const colLeads = leads.filter(l => l.status === col.id);
            const sumVal = colLeads.reduce((s, l) => s + (Number(l.dealValue) || 1250), 0);
            return `
              <div class="kanban-column" data-col-id="${col.id}">
                <div class="kanban-col-header">
                  <div class="kanban-col-title-wrap">
                    <span class="kanban-col-title">${col.title}</span>
                    <span class="kanban-col-count">${colLeads.length}</span>
                  </div>
                  <span class="kanban-col-sum">${sumVal.toLocaleString('de-DE')} €</span>
                </div>

                <div class="kanban-cards-wrap" data-dropzone="${col.id}">
                  ${colLeads.map(l => `
                    <div class="kanban-card" draggable="true" data-lead-id="${l.id}">
                      <div class="kanban-card-header">
                        <span class="kanban-card-title">${l.companyName}</span>
                        <span class="badge ${col.id === 'gewonnen' ? 'badge-emerald' : col.id === 'verhandlung' ? 'badge-amber' : 'badge-blue'}">${l.dealValue} €</span>
                      </div>
                      <div class="kanban-card-meta">
                        <span>${l.city} · ${l.category}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span class="kanban-card-rating">★ ${l.googleRating ? l.googleRating.toFixed(1) : '5.0'} <span style="color:var(--text-muted); font-size:0.65rem;">(${l.reviewCount || 0})</span></span>
                        <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--text-muted);">${l.ownerName || 'Inhaber'}</span>
                      </div>
                      ${l.topReviewQuote ? `<div class="kanban-card-quote">„${l.topReviewQuote.length > 70 ? l.topReviewQuote.slice(0, 70) + '...' : l.topReviewQuote}“</div>` : ''}
                      <div class="kanban-card-footer">
                        <span class="kanban-card-deal">+${l.monthlyRetainer} €/Mtl.</span>
                        <div class="kanban-card-actions">
                          ${l.demoUrl ? `<a href="${l.demoUrl}" target="_blank" class="kanban-action-btn" onclick="event.stopPropagation();">🌐 Demo</a>` : ''}
                          ${l.phone ? `<a href="https://wa.me/${l.phone.replace(/[^0-9]/g, '')}?text=Hallo%20${encodeURIComponent(l.ownerName || '')}%2C%20hier%20der%20Entwurf%3A%20${encodeURIComponent(l.demoUrl || '')}" target="_blank" class="kanban-action-btn btn-wa" onclick="event.stopPropagation();">💬 WA</a>` : ''}
                        </div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  function initPipelineEvents(container) {
    const searchInput = container.querySelector('#pipelineSearchInput');
    const catSelect = container.querySelector('#pipelineCategorySelect');
    const citySelect = container.querySelector('#pipelineCitySelect');

    function filterNow() {
      const q = searchInput?.value.trim() || '';
      const cat = catSelect?.value || 'all';
      const city = citySelect?.value || 'all';
      container.innerHTML = renderPipeline(q, cat, city);
      initPipelineEvents(container);
    }

    searchInput?.addEventListener('input', filterNow);
    catSelect?.addEventListener('change', filterNow);
    citySelect?.addEventListener('change', filterNow);
    container.querySelector('#pipelineBtnNewLead')?.addEventListener('click', () => modal.openNewLeadModal());

    // Clicks on card
    container.querySelectorAll('.kanban-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('a') || e.target.closest('button')) return;
        drawer.open(card.getAttribute('data-lead-id'));
      });

      // Drag & Drop
      card.addEventListener('dragstart', (e) => {
        card.classList.add('is-dragging');
        e.dataTransfer.setData('text/plain', card.getAttribute('data-lead-id'));
      });
      card.addEventListener('dragend', () => card.classList.remove('is-dragging'));
    });

    container.querySelectorAll('.kanban-cards-wrap').forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-over');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'));
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-over');
        const leadId = e.dataTransfer.getData('text/plain');
        const targetStatus = zone.getAttribute('data-dropzone');
        if (leadId && targetStatus) {
          state.updateLeadStatus(leadId, targetStatus);
          showToast(`✓ Lead verschoben nach [${targetStatus.toUpperCase()}]`);
        }
      });
    });
  }

  // 5.3 KUNDEN & MRR
  function renderClients() {
    const clients = state.getClients();
    const totalMRR = clients.reduce((sum, c) => sum + (Number(c.monthlyRetainer) || 39), 0);
    return `
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-tag">[ 03 // CLIENTS & MRR ]</span>
          <h1 class="section-title">Kunden & Retainer-Manager</h1>
          <p class="section-desc">Verwaltung gewonnener Handwerkskunden, monatlicher 39-€-Serviceverträge und 30-Minuten-Supportzeit-Budgets</p>
        </div>
        <div class="section-actions">
          <div class="badge badge-emerald font-mono">MRR: ${totalMRR} € / Monat (ARR: ${(totalMRR * 12).toLocaleString('de-DE')} €)</div>
        </div>
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Kunde / Betrieb</th>
              <th>Domain</th>
              <th>Vertragsbeginn</th>
              <th>Retainer</th>
              <th>Support-Budget</th>
              <th>Status</th>
              <th style="text-align: right;">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            ${clients.map(c => {
              const pct = Math.min(100, Math.round((c.usedMinutesThisMonth / c.supportBudgetMinutes) * 100));
              return `
                <tr style="cursor: pointer;" data-action="open-lead" data-id="${c.leadId}">
                  <td>
                    <div class="table-cell-title">${c.companyName}</div>
                    <div class="table-cell-sub">${c.contactPerson}</div>
                  </td>
                  <td>
                    <a href="https://${c.domain}" target="_blank" class="table-cell-title" style="color:var(--status-blue); text-decoration:none;" onclick="event.stopPropagation();">
                      ${c.domain}
                    </a>
                  </td>
                  <td><span class="font-mono">${c.startDate}</span></td>
                  <td><span class="font-mono" style="color:var(--status-emerald); font-weight:700;">${c.monthlyRetainer} € / Mtl.</span></td>
                  <td style="min-width: 140px;">
                    <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.68rem; margin-bottom:0.2rem;">
                      <span>${c.usedMinutesThisMonth} / ${c.supportBudgetMinutes} Min</span>
                      <span>${pct}%</span>
                    </div>
                    <div style="height: 5px; background: rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
                      <div style="height:100%; width:${pct}%; background:var(--status-emerald);"></div>
                    </div>
                  </td>
                  <td><span class="badge badge-emerald">${c.status.toUpperCase()}</span></td>
                  <td style="text-align: right;">
                    <button class="btn btn-secondary btn-sm" data-action="preview-doc" data-path="${c.contractFile}" data-title="BGB-Projektvertrag" onclick="event.stopPropagation();">[ VERTRAG ]</button>
                    <button class="btn btn-primary btn-sm" data-action="open-lead" data-id="${c.leadId}" onclick="event.stopPropagation();">[ AKTE ]</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  function initClientsEvents(container) {
    container.querySelectorAll('[data-action="open-lead"]').forEach(el => {
      el.addEventListener('click', () => drawer.open(el.getAttribute('data-id')));
    });
    container.querySelectorAll('[data-action="preview-doc"]').forEach(el => {
      el.addEventListener('click', () => modal.openIframe(el.getAttribute('data-path'), el.getAttribute('data-title')));
    });
  }

  // 5.4 DOKUMENTE & RECHT
  function renderDocuments(activeFilter = 'all') {
    let docs = state.getDocuments();
    if (activeFilter !== 'all') docs = docs.filter(d => d.category === activeFilter);
    const categories = [
      { id: 'all', label: 'Alle Dokumente' },
      { id: '01_Angebote', label: '01 Angebote' },
      { id: '02_Verträge', label: '02 Verträge & AVV' },
      { id: '03_Rechnungen', label: '03 Rechnungen' },
      { id: '04_Buchhaltung_EÜR', label: '04 EÜR Buchhaltung' },
      { id: '05_Behörden_Unterlagen', label: '05 Behörden' }
    ];

    return `
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-tag">[ 04 // DOKUMENTE & RECHT ]</span>
          <h1 class="section-title">Nexbot Organisation & Verträge</h1>
          <p class="section-desc">Nahtloser Zugriff auf Angebote, BGB-Werkverträge, DSGVO-AVVs und Kleinunternehmer-Rechnungen</p>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 1.25rem; overflow-x: auto; padding-bottom: 0.4rem;">
        ${categories.map(cat => `
          <button class="btn btn-sm ${activeFilter === cat.id ? 'btn-primary' : 'btn-secondary'}" data-doc-filter="${cat.id}">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 1rem;">
        ${docs.map(doc => `
          <div class="task-card" style="padding: 1.1rem;">
            <div class="task-card-header" style="margin-bottom: 0.35rem;">
              <span class="badge badge-purple font-mono">${doc.category.replace('_', ' ')}</span>
              <span class="badge badge-emerald font-mono">${doc.status.toUpperCase()}</span>
            </div>
            <h3 class="table-cell-title" style="font-size: 0.95rem; margin-bottom: 0.25rem;">${doc.title}</h3>
            <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.72rem; color:var(--text-silver); margin-bottom:0.5rem;">
              <span>Kunde: <strong style="color:var(--text-pure);">${doc.clientName}</strong></span>
              <span style="color:var(--status-emerald); font-weight:700;">${doc.amount}</span>
            </div>
            <p style="font-size: 0.76rem; color: var(--text-silver); line-height: 1.4; margin-bottom: 0.75rem;">${doc.description}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06);">
              <span class="table-cell-sub font-mono">${doc.date}</span>
              <div style="display: flex; gap: 0.4rem;">
                <a href="${doc.filePath}" target="_blank" class="btn btn-secondary btn-sm">Öffnen ↗</a>
                <button class="btn btn-primary btn-sm" data-action="preview-doc" data-path="${doc.filePath}" data-title="${doc.title}">Vorschau</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  function initDocumentsEvents(container) {
    container.querySelectorAll('[data-doc-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        container.innerHTML = renderDocuments(btn.getAttribute('data-doc-filter'));
        initDocumentsEvents(container);
      });
    });
    container.querySelectorAll('[data-action="preview-doc"]').forEach(btn => {
      btn.addEventListener('click', () => modal.openIframe(btn.getAttribute('data-path'), btn.getAttribute('data-title')));
    });
  }

  // 5.5 SOLO TASKS
  function renderTasks(filterCategory = 'all') {
    let tasks = state.getTasks();
    if (filterCategory !== 'all') tasks = tasks.filter(t => t.category.toLowerCase() === filterCategory.toLowerCase());
    const categories = [
      { id: 'all', label: 'Alle Aufgaben' },
      { id: 'akquise', label: '📞 Akquise & Sales' },
      { id: 'technik', label: '⚡ Technik & Build' },
      { id: 'verwaltung', label: '📋 Recht & Verwaltung' }
    ];

    return `
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-tag">[ 05 // SOLO TASKS ]</span>
          <h1 class="section-title">Persönliches Aufgaben-Board</h1>
          <p class="section-desc">Priorisierte To-Dos für den heutigen Arbeitstag — Fokus auf Umsatzhebel & operative Exzellenz</p>
        </div>
        <div class="section-actions">
          <button class="btn btn-primary" id="btnAddNewTask">+ Neue Aufgabe</button>
        </div>
      </div>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; overflow-x: auto; padding-bottom: 0.3rem;">
        ${categories.map(cat => `
          <button class="btn btn-sm ${filterCategory === cat.id ? 'btn-primary' : 'btn-secondary'}" data-task-filter="${cat.id}">
            ${cat.label}
          </button>
        `).join('')}
      </div>

      <div class="tasks-columns">
        <div class="task-column">
          <div class="task-col-header">
            <span class="task-col-title">Offen (${tasks.filter(t => t.status === 'offen').length})</span>
            <span class="badge badge-amber">TO-DO</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${tasks.filter(t => t.status === 'offen').map(t => renderTaskCard(t)).join('')}
          </div>
        </div>

        <div class="task-column">
          <div class="task-col-header">
            <span class="task-col-title">In Bearbeitung (${tasks.filter(t => t.status === 'in_arbeit').length})</span>
            <span class="badge badge-blue">AKTIV</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${tasks.filter(t => t.status === 'in_arbeit').map(t => renderTaskCard(t)).join('')}
          </div>
        </div>

        <div class="task-column">
          <div class="task-col-header">
            <span class="task-col-title">Erledigt (${tasks.filter(t => t.status === 'erledigt').length})</span>
            <span class="badge badge-emerald">DONE</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            ${tasks.filter(t => t.status === 'erledigt').map(t => renderTaskCard(t)).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderTaskCard(t) {
    const isDone = t.status === 'erledigt';
    const prioClass = t.priority === 'P0' ? 'task-prio-p0' : t.priority === 'P1' ? 'task-prio-p1' : 'task-prio-p2';
    return `
      <div class="task-card ${isDone ? 'is-done' : ''}">
        <div class="task-card-header">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <input type="checkbox" class="focus-checkbox" ${isDone ? 'checked' : ''} data-action="toggle-task" data-id="${t.id}">
            <span class="badge ${prioClass} font-mono">${t.priority}</span>
            <span class="badge font-mono" style="font-size:0.62rem;">${t.category}</span>
          </div>
          <span class="table-cell-sub font-mono">${t.dueDate}</span>
        </div>
        <div class="table-cell-title" style="font-size:0.85rem; ${isDone ? 'text-decoration:line-through; color:var(--text-muted);' : ''}">${t.title}</div>
        ${t.description ? `<div style="font-size:0.73rem; color:var(--text-silver); line-height:1.4;">${t.description}</div>` : ''}
        ${t.leadId ? `<div style="display:flex; justify-content:flex-end; padding-top:0.35rem;"><button class="btn btn-secondary btn-sm" data-action="open-lead" data-id="${t.leadId}">[ LEAD-AKTE ]</button></div>` : ''}
      </div>
    `;
  }

  function initTasksEvents(container) {
    container.querySelectorAll('[data-task-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        container.innerHTML = renderTasks(btn.getAttribute('data-task-filter'));
        initTasksEvents(container);
      });
    });
    container.querySelectorAll('[data-action="toggle-task"]').forEach(cb => {
      cb.addEventListener('change', () => state.toggleTaskStatus(cb.getAttribute('data-id')));
    });
    container.querySelectorAll('[data-action="open-lead"]').forEach(btn => {
      btn.addEventListener('click', () => drawer.open(btn.getAttribute('data-id')));
    });
    container.querySelector('#btnAddNewTask')?.addEventListener('click', () => modal.openNewTaskModal());
  }

  // 5.6 COLD-CALL TRAINER
  function renderColdCall() {
    const script = state.getColdCallScript();
    const logs = state.getCallLogs();
    return `
      <div class="section-header">
        <div class="section-title-wrap">
          <span class="section-tag">[ 06 // SALES TRAINING ]</span>
          <h1 class="section-title">Cold-Call-Zentrale (Saxer-Methode)</h1>
          <p class="section-desc">Interaktiver Gesprächsleitfaden, Bumerang-Einwandbehandlung & Trainings-Protokoll</p>
        </div>
      </div>

      <div class="script-grid">
        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="script-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 class="table-cell-title">${script.gatekeeper.title}</h3>
              <span class="badge badge-amber font-mono">SEKRETARIAT</span>
            </div>
            <div class="script-box">
              <span class="script-speaker">● Raphael (Opener):</span>
              <p class="script-dialogue">„${script.gatekeeper.dialogue}“</p>
            </div>
            <div style="background:rgba(255,255,255,0.02); border-left:2px solid var(--status-amber); padding:0.6rem 0.8rem;">
              <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--status-amber);">${script.gatekeeper.responseExample}</div>
              <div class="script-dialogue" style="font-size:0.82rem;">„${script.gatekeeper.counter}“</div>
            </div>
          </div>

          <div class="script-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 class="table-cell-title">${script.opener.title}</h3>
              <span class="badge badge-emerald font-mono">CHEF AM TELEFON</span>
            </div>
            <div class="script-box">
              <span class="script-speaker">● Raphael:</span>
              <p class="script-dialogue">„${script.opener.dialogue}“</p>
            </div>
            <div class="script-cue">${script.opener.pauseNotice} — Lass den Handwerker reden!</div>
            <div class="script-box" style="border-color:var(--border-bright);">
              <span class="script-speaker" style="color:var(--status-emerald);">● Der Übergang zum WhatsApp Micro-Commitment:</span>
              <p class="script-dialogue">„${script.opener.hook}“</p>
            </div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="script-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 class="table-cell-title">Bumerang-Einwandbehandlung</h3>
              <span class="badge badge-danger font-mono">SCHLAGFERTIGKEIT</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.85rem;">
              ${script.bumerang.map(b => `
                <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:0.85rem;">
                  <div style="font-family:var(--font-display); font-size:0.82rem; font-weight:700; color:var(--status-danger); margin-bottom:0.35rem;">${b.objection}</div>
                  <div style="font-size:0.78rem; color:var(--text-pure); line-height:1.45; background:rgba(16,185,129,0.04); border-left:2px solid var(--status-emerald); padding:0.4rem 0.65rem;">${b.reply}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="script-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h3 class="table-cell-title">Anruf-Log & Trainings-Notiz</h3>
              <span class="badge badge-blue font-mono">CALL-LOG</span>
            </div>
            <form id="callLogForm" style="display:flex; flex-direction:column; gap:0.75rem;">
              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                <div>
                  <label class="form-label">Betrieb:</label>
                  <input type="text" id="callLogCompany" class="form-input" placeholder="z. B. Saridis SHK" required>
                </div>
                <div>
                  <label class="form-label">Ansprechpartner:</label>
                  <input type="text" id="callLogContact" class="form-input" placeholder="Herr Saridis">
                </div>
              </div>
              <div>
                <label class="form-label">Ergebnis:</label>
                <select id="callLogStatus" class="form-select">
                  <option value="WhatsApp-Zustimmung">WhatsApp-Erlaubnis erhalten 🎉</option>
                  <option value="Follow-Up vereinbart">Follow-Up Termin vereinbart</option>
                  <option value="Chef nicht erreichbar">Chef auf Baustelle</option>
                  <option value="Übungs-Call">Übungs-Simulation</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary" style="justify-content:center;">[ ANRUF PROTOKOLLIEREN ]</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  function initColdCallEvents(container) {
    container.querySelector('#callLogForm')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const comp = container.querySelector('#callLogCompany')?.value.trim();
      const cont = container.querySelector('#callLogContact')?.value.trim();
      const st = container.querySelector('#callLogStatus')?.value;
      if (comp) {
        state.addCallLog({ companyName: comp, contactName: cont, status: st });
        showToast(`✓ Call für „${comp}“ protokolliert!`);
        container.innerHTML = renderColdCall();
        initColdCallEvents(container);
      }
    });
  }

  /* ─── 6. ROUTER & GLOBAL INITIALISIERUNG ───────────────────────────── */
  let currentRoute = 'cockpit';

  function updateHeaderKPIs() {
    const metrics = state.getMetrics();
    const fillElem = document.getElementById('kpiProgressFill');
    const valElem = document.getElementById('kpiTrackerVal');

    if (fillElem && valElem) {
      const pct = Math.min(100, Math.round((metrics.currentRevenue / metrics.revenueTarget) * 100));
      fillElem.style.width = `${pct}%`;
      valElem.textContent = `${metrics.currentRevenue.toLocaleString('de-DE')} € / ${metrics.revenueTarget.toLocaleString('de-DE')} € (${pct}%)`;
    }

    const countPipe = document.getElementById('cntPipeline');
    if (countPipe) countPipe.textContent = state.getLeads().filter(l => l.status !== 'gewonnen').length;

    const countClients = document.getElementById('cntClients');
    if (countClients) countClients.textContent = state.getClients().length;

    const countDocs = document.getElementById('cntDocs');
    if (countDocs) countDocs.textContent = state.getDocuments().length;

    const countTasks = document.getElementById('cntTasks');
    if (countTasks) countTasks.textContent = state.getTasks().filter(t => t.status === 'offen').length;
  }

  function navigateTo(route) {
    currentRoute = route;
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      item.classList.toggle('is-active', item.getAttribute('data-route') === route);
    });

    const mainArea = document.getElementById('appMainArea');
    if (!mainArea) return;

    if (route === 'cockpit') {
      mainArea.innerHTML = renderCockpit();
      initCockpitEvents(mainArea);
    } else if (route === 'pipeline') {
      mainArea.innerHTML = renderPipeline();
      initPipelineEvents(mainArea);
    } else if (route === 'clients') {
      mainArea.innerHTML = renderClients();
      initClientsEvents(mainArea);
    } else if (route === 'documents') {
      mainArea.innerHTML = renderDocuments();
      initDocumentsEvents(mainArea);
    } else if (route === 'tasks') {
      mainArea.innerHTML = renderTasks();
      initTasksEvents(mainArea);
    } else if (route === 'coldcall') {
      mainArea.innerHTML = renderColdCall();
      initColdCallEvents(mainArea);
    } else {
      mainArea.innerHTML = renderCockpit();
      initCockpitEvents(mainArea);
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function initApp() {
    // 1. Clock
    const clockElem = document.getElementById('hudClock');
    if (clockElem) {
      const updateClock = () => {
        const now = new Date();
        clockElem.textContent = `[ MANCHING / INGOLSTADT ${now.toLocaleTimeString('de-DE')} ]`;
      };
      updateClock();
      setInterval(updateClock, 1000);
    }

    // 2. Navigation
    document.querySelectorAll('[data-route]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const r = link.getAttribute('data-route');
        window.location.hash = r;
        navigateTo(r);
        document.getElementById('appSidebar')?.classList.remove('mobile-open');
        document.getElementById('sidebarBackdrop')?.classList.remove('active');
      });
    });

    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '') || 'cockpit';
      if (h !== currentRoute) navigateTo(h);
    });

    document.getElementById('btnHeaderQuickAdd')?.addEventListener('click', () => modal.openNewLeadModal());
    document.getElementById('hudMenuBtn')?.addEventListener('click', () => {
      document.getElementById('appSidebar')?.classList.toggle('mobile-open');
      document.getElementById('sidebarBackdrop')?.classList.toggle('active');
    });
    document.getElementById('sidebarBackdrop')?.addEventListener('click', () => {
      document.getElementById('appSidebar')?.classList.remove('mobile-open');
      document.getElementById('sidebarBackdrop')?.classList.remove('active');
    });

    document.getElementById('btnResetData')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Möchtest du alle Daten wirklich auf den Original-Bestand zurücksetzen?')) {
        state.resetAllData();
        showToast('✓ Datenbestand erfolgreich zurückgesetzt!');
      }
    });

    state.subscribe(() => {
      updateHeaderKPIs();
      navigateTo(currentRoute);
    });

    updateHeaderKPIs();
    const initHash = window.location.hash.replace('#', '') || 'cockpit';
    navigateTo(initHash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
