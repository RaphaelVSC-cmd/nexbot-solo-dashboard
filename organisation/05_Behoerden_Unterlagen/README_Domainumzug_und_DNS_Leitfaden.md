# Leitfaden für Domain-Umzüge & DNS-Management
*(SOP für Raphael Neumeier – Nexbot Webdesign)*

Dieser Leitfaden stellt sicher, dass Websites von Kunden reibungslos live geschaltet werden, **ohne dass Kunden-E-Mails ausfallen** und ohne unnötige Domain-Transfer-Kosten.

---

## 1. Die goldene Regel: Website auf Vercel, E-Mails beim Provider

> **Wichtigste Regel im Agenturalltag:**  
> Ändere bei bestehenden Kundendomains **ausschließlich den Web-Traffic (A-Record / CNAME)**.  
> Fasse die Mail-Einträge (**MX-Records, SPF, DKIM**) **niemals** an!  
> Wenn ein Kunde für 2 Stunden keine E-Mails empfangen kann, entsteht sofort Panik. Wenn nur die Website umgestellt wird, merkt der Kunde keinen Ausfall.

---

## 2. Szenario A (Standard): Domain bleibt beim Kundenhoster (DNS-Aufschaltung)

Das schnellste, sicherste und kundenfreundlichste Verfahren. Der Kunde behält seinen bestehenden Vertrag (z. B. bei Strato, 1&1 IONOS, All-Inkl, Host Europe, Telekom).

### Schritt-für-Schritt Anleitung:

1. **Vercel Vorbereitung:**
   - Im Vercel-Projekt auf **Settings ➡️ Domains** gehen.
   - Kundendomain eingeben: z. B. `musterkunde-sanitaer.de` und `www.musterkunde-sanitaer.de`.
   - Vercel zeigt die benötigten DNS-Ziele an.

2. **DNS-Einträge beim Kunden-Provider setzen:**
   - Im Kunden-Kundenportal (oder per Auftrag an den Kunden/dessen IT) in die **DNS-Verwaltung** der Domain wechseln:
   - **Eintrag 1 (Hauptdomain / Apex):**
     - **Typ:** `A`
     - **Host / Name:** `@` (oder leer lassen)
     - **Wert / Ziel:** `76.76.21.21`
   - **Eintrag 2 (Subdomain www):**
     - **Typ:** `CNAME`
     - **Host / Name:** `www`
     - **Wert / Ziel:** `cname.vercel-dns.com`

3. **Was UNBERÜHRT bleiben MUSS:**
   - `MX`-Records (z. B. `mail.musterkunde.de` oder Microsoft 365)
   - `TXT`-Records (SPF-Einträge wie `v=spf1 include:...`)
   - Bestehende Mail-Subdomains (`imap`, `smtp`, `mail`)

4. **SSL-Zertifikat:**
   - Sobald die DNS-Einträge aktiv sind (dauert meist 5–30 Minuten), stellt Vercel **vollautomatisch ein kostenloses SSL/TLS-Zertifikat** (Let's Encrypt) aus.

---

## 3. Szenario B: Vollständiger Domainumzug (Transfer mit Auth-Code)

Nur erforderlich, wenn der Kunde seinen alten Vertrag komplett kündigen möchte oder du die Domainverwaltung im monatlichen Retainer komplett übernimmst.

1. **Vorbereitung:**
   - Kunde kündigt den Webspace beim Altanbieter und fordert den **Auth-Code (Transfer-Schlüssel / AuthInfo)** für die Domain an.
   - Vor dem Umzug alle bestehenden DNS-Einträge (insbesondere MX-Records!) abfotografieren/notieren.

2. **Transfer einleiten:**
   - Bei deinem Ziel-Registrar (z. B. Hetzner Robot, Inwx, Cloudflare oder Vercel Domains) den Domain-Transfer mit dem Auth-Code starten.
   - Den Domaininhaber (Owner-C) auf den **Namen der Kundenfirma** ausstellen (der Kunde bleibt immer rechtlicher Eigentümer der Domain!).

3. **Mailbox-Migration:**
   - Falls der Kunde beim alten Hoster Postfächer hatte, müssen diese vor dem Umzug gesichert oder auf einen modernen Anbieter (z. B. Microsoft 365 Business, Google Workspace oder Hetzner Mail) migriert werden.

---

## 4. Profi-Tipp vor dem Livegang: TTL senken

- **Time-to-Live (TTL):** Gibt an, wie viele Sekunden DNS-Server die alten Einträge zwischenspeichern.
- **24 Stunden vor dem Go-Live:** Die TTL der Domain in den DNS-Einstellungen von standardmäßig `86400` (24h) auf `300` (5 Minuten) herabsetzen.
- **Vorteil:** Die Umstellung auf Vercel greift am Go-Live Tag weltweit innerhalb von 5 Minuten ohne Verzögerung.

---

## 5. Vorlage: E-Mail-Text an den Kunden / dessen IT-Dienstleister

```
Betreff: DNS-Einträge für Live-Schaltung der neuen Website [Domain.de]

Hallo Herr/Frau [Name],

unsere neue Hochgeschwindigkeits-Website ist fertiggestellt und bereit für den Livegang.
Damit Ihre geschäftlichen E-Mails und Postfächer vollkommen unterbrechungsfrei weiterlaufen,
stellen wir lediglich die Website-Verbindung um.

Bitte hinterlegen Sie (oder Ihr technischer Betreuer) bei Ihrem Domain-Provider folgende zwei DNS-Einträge:

1. Für die Hauptdomain ([domain.de]):
   - Typ: A
   - Name/Host: @
   - Ziel/Wert: 76.76.21.21

2. Für die Subdomain (www.[domain.de]):
   - Typ: CNAME
   - Name/Host: www
   - Ziel/Wert: cname.vercel-dns.com

Wichtig: Sämtliche MX-, Mail-, SPF- und TXT-Einträge bleiben vollständig unverändert.
Sobald die Einträge hinterlegt sind, aktiviert sich das SSL-Zertifikat automatisch.

Bei Rückfragen stehe ich jederzeit gerne zur Verfügung!

Beste Grüße
Raphael Neumeier
Nexbot Webdesign
```
