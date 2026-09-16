# Rechtsgutachten & Leitfaden: Gültigkeit digitaler Signaturen im B2B-Webdesign

**Autor:** Raphael Neumeier – Nexbot Webdesign & Software-Entwicklung  
**Stand:** September 2026  
**Rechtsgebiet:** Deutsches Zivilrecht (BGB), Europäisches Datenschutzrecht (DSGVO), Europäische Vertrauensdiensteverordnung (eIDAS)  

---

## 📌 Zusammenfassung der Rechtslage

| Dokument | Gilt gesetzliche Schriftform (§ 126 BGB)? | Ist eine einfache digitale Signatur (Canvas/Schreibschrift) ausreichend? | Ist eine Qualifizierte Elektronische Signatur (QES) zwingend? | Rechtsgrundlage |
|---|:---:|:---:|:---:|---|
| **1. Angebot & Annahme** | ❌ Nein | ✅ **JA (100% rechtswirksam)** | ❌ Nein | §§ 145 ff. BGB (Formfreiheit) |
| **2. Werkvertrag Webdesign** | ❌ Nein | ✅ **JA (100% rechtswirksam)** | ❌ Nein | §§ 631 ff. BGB (Formfreiheit) |
| **3. Auftragsverarbeitung (AVV)** | ❌ Nein | ✅ **JA (100% rechtskonform)** | ❌ Nein | Art. 28 Abs. 9 DSGVO („elektronisches Format“) |

> **Kernfazit:**  
> Für deine tägliche Praxis als Webdesigner & Software-Entwickler ist die in deine Vorlagen integrierte **einfache digitale Signatur (Canvas-Zeichnen oder getippte Schreibschrift) rechtlich vollkommen ausreichend und wirksam**. Du benötigst **keine** teure Software für qualifizierte elektronische Signaturen (QES).

---

## ⚖️ Detailprüfung nach Dokumententyp

### 1. Angebot & Auftragserteilung (§§ 145 ff. BGB)
* **Grundsatz:** Im deutschen Zivilrecht gilt für Angebote und deren Annahme der Grundsatz der **Formfreiheit**. Ein Vertrag kommt durch zwei übereinstimmende Willenserklärungen (Angebot und Annahme) zustande.
* **Formvorschrift:** Das Gesetz schreibt für Angebote im Dienstleistungs- und Werkvertragsbereich keine Schriftform vor. Ein Angebot kann mündlich, per E-Mail, per WhatsApp, durch Klick auf einen Button („Zahlungspflichtig bestellen“) oder eben durch eine digitale Signatur verbindlich angenommen werden.
* **Ergebnis:** Sobald dein Kunde das Angebot digital unterschreibt oder das signierte PDF an dich zurücksendet, ist der Vertrag **rechtsgültig und verbindlich geschlossen**.

---

### 2. Webdesign-Projektvertrag (§§ 631 ff. BGB Werkvertrag)
* **Grundsatz:** Ein Webdesignvertrag ist nach ständiger Rechtsprechung des Bundesgerichtshofs (BGH) werkvertraglicher Natur (§ 631 BGB), da ein konkreter Erfolg geschuldet wird (die funktionierende Website).
* **Keine gesetzliche Schriftform:** Das Bürgerliche Gesetzbuch (BGB) sieht für Werkverträge über Software und Webseiten **keinerlei gesetzliches Schriftformerfordernis** vor. Die strenge Schriftform (§ 126 BGB mit eigenhändiger Unterschrift auf Papier) gilt nur für wenige, gesetzlich ausdrücklich genannte Ausnahmefälle (z. B. Kündigung von Arbeitsverträgen § 623 BGB, Verbraucherdarlehen § 492 BGB, Bürgschaftserklärungen § 766 BGB oder notarielle Grundstücksverträge § 311b BGB).
* **Gültigkeit der einfachen elektronischen Signatur:** Nach Art. 25 Abs. 1 der EU-Verordnung Nr. 910/2014 (eIDAS-VO) darf einer elektronischen Signatur die Rechtswirkung und die Zulässigkeit als Beweismittel in Gerichtsverfahren nicht allein deshalb abgesprochen werden, weil sie in elektronischer Form vorliegt.
* **Ergebnis:** Der Werkvertrag mit digitaler Unterschrift (gezeichnet oder als Signaturschriftzug) ist **vollständig rechtsgültig**.

---

### 3. Auftragsverarbeitungsvertrag (Art. 28 DSGVO)
* **Wortlaut Art. 28 Abs. 9 DSGVO:**  
  *„Der Vertrag oder das andere Rechtsinstrument im Sinne der Absätze 3 und 4 ist schriftlich abzufassen, was auch in einem elektronischen Format erfolgen kann.“*
* **Auslegung durch die Datenschutzbehörden:**  
  Die Datenschutzkonferenz (DSK – Gremium der deutschen Aufsichtsbehörden) sowie der Branchenverband BITKOM haben klargestellt, dass der europäische Begriff des „elektronischen Formats“ **nicht** mit der deutschen strengen Schriftform (§ 126 BGB) gleichzusetzen ist.
* **Anforderung:** Es genügt, dass die Vereinbarung in Textform dokumentiert, unveränderbar archiviert und den Parteien zugänglich ist (z. B. als PDF-Datei).
* **Ergebnis:** Eine qualifizierte elektronische Signatur (QES) ist für den AVV **nicht vorgeschrieben**. Das digital signierte PDF-Dokument erfüllt die Voraussetzungen von Art. 28 Abs. 9 DSGVO vollumfänglich.

---

## 🔍 Beweiswert vor Gericht: EES vs. FES vs. QES

Die eIDAS-Verordnung unterscheidet drei Stufen von elektronischen Signaturen:

1. **Einfache elektronische Signatur (EES):**  
   *Was du nutzt:* Im Canvas gezeichnete Unterschrift oder getippter Name im Dokument.  
   *Rechtswirkung:* Vertrag ist 100% wirksam.  
   *Beweiswert vor Gericht:* Freie richterliche Beweiswürdigung (§ 286 ZPO). Im Bestreitensfall wird geprüft, ob die E-Mail-Korrespondenz, die IP-Adresse, das Angebot und die nachfolgende Zusammenarbeit den Vertragsschluss belegen. Bei B2B-Projekten ist dies durch die begleitende Kommunikation (WhatsApp, E-Mail, Domainfreigabe) in der Praxis fast immer unstrittig.

2. **Fortgeschrittene elektronische Signatur (FES):**  
   Verknüpft mit Prüfdaten (z. B. DocuSign, Adobe Sign mit SMS-Verifikation). Höherer Beweiswert, aber kostenpflichtig.

3. **Qualifizierte elektronische Signatur (QES):**  
   Erfordert Identitätsprüfung via VideoIdent/Personalausweis. Ersetzt nach § 126a BGB die gesetzliche Schriftform (§ 126 BGB).  
   *Für Webdesigner NICHT nötig*, da das Gesetz für deine Verträge gar keine Schriftform verlangt!

---

## 💡 Best-Practice-Empfehlung für Nexbot Webdesign

Um im Ernstfall maximal abgesichert zu sein:

1. **Sende das Angebot / den Vertrag als PDF per E-Mail** mit klarem Begleittext an den Kunden.
2. **Lass den Kunden digital signieren** (oder die Annahme per E-Mail bestätigen: *„Hiermit nehme ich das Angebot ANG-2026-001 verbindlich an“*).
3. **Archiviere das signierte PDF zusammen mit der E-Mail** des Kunden im Ordner `01_Angebote/` bzw. `02_Verträge/`.
4. **Dokumentiere die Anzahlung oder die Freigaben:** Sobald der Kunde Inhalte liefert oder die Website nach Fertigstellung freigibt, ist der Vertragsschluss auch durch schlüssiges Handeln (*konkludentes Verhalten*) unumstößlich bestätigt.
