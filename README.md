# 🎄 24. Türchen Adventskalender – Smartphone-Edition: Das magische Erinnerungsbuch

Ein handgemachtes, romantisches und zu 100% für Smartphones optimiertes Web-Erlebnis für das 24. Türchen eines Adventskalenders, gestaltet als verschlossenes Vintage-Lederbuch auf einem gemütlichen Holztisch mit Lichterkette, Herz-Biometrieschloss, 3D-Seitenblättern, Gestensteuerung, Polaroids, Liebes-Gutscheinen und einem erlebnisreichen Kuschelbären.

---

## 📱 Mobile-First Features & Highlights

1. **Verschlossenes Vintage-Buch auf dem Tisch (statt Umschlag)**:
   - Echtes Leder-Cover mit goldenen Zierecken, geprägtem Titel und Buchrücken.
   - Liegt auf einem warmen Holztisch mit stimmungsvoller Lichterkette.
   - **Herz-Biometrie-Scanner**: Durch Gedrückthalten des Herzens (`❤️`) startet eine Scanline-Animation mit Ladebalken, Entriegelungs-Sound und Goldpartikeln, die das Buch aufschlägt.

2. **Interaktives Blätterwerk (7 Seiten mit Wischgesten)**:
   - **Swipe-Gesten**: Einfach auf dem Smartphone nach links oder rechts wischen, um umzublättern.
   - **Vertikales Scrollen**: Jede Seite kann bei langen Inhalten bequem nach oben/unten gescrollt werden, ohne das Wischen zu blockieren.
   - **Untere Navigationsleiste**: Vor- & Zurück-Buttons sowie interaktive Seitendots (`Seite 1/7`).
   - **Seiden-Lesezeichen (Schnellzugriff oben)**: Farbige Lesezeichen-Bänder am oberen Buchrand ermöglichen den direkten Sprung zu jeder gewünschten Seite (*Brief, Fotos I, Fotos II, Gutscheine, Date, Quiz, Notfall*).

3. **Die 7 Buchseiten**:
   - **Seite 1: Der Liebesbrief**: Vintage-Papier mit zarten Schreiblinien, Datum, Anrede, Text, Unterschrift und P.S.-Notiz.
   - **Seite 2: Erinnerungen (Teil 1)**: Polaroids 1 bis 3 mit Washi-Tape und 3D-Umdrehen bei Fingertipp.
   - **Seite 3: Erinnerungen (Teil 2)**: Polaroids 4 bis 6 mit intimen Geschichten auf den Rückseiten.
   - **Seite 4: Liebes-Gutscheine**: Smartphone-optimierte Abreiß-Tickets mit Perforationskerben, „Jetzt einlösen“-Button und rotem EINGELÖST-Stempel (gespeichert in `localStorage`).
   - **Seite 5: Date-Night-Generator**: Riesige Auswahl aus 24 Aktivitäten, 18 Genüssen und 12 Vibes. Inklusive Zufalls-Würfelanimation und Pinnwand-Funktion.
   - **Seite 6: Unser Beziehungs-Quiz**: 4 liebevolle Erinnerungsfragen mit direktem Feedback und Urkunde.
   - **Seite 7: Notfall-Knopf & Der Kuschelbär**: Taktiler 3D-SOS-Buzzer, Sofort-WhatsApp-Link, Anruf-Button und die **erlebnisreiche Kuschelbär-Umarmung**.

4. **Der Kuschelbär (Erlebnisreiche Umarmung)**:
   - Klick auf *„Virtuelle Umarmung abholen“* startet eine herzerwärmende Vollbild-Sequenz:
     - Ein süßer Kuschelbär watschelt auf den Bildschirm.
     - Er breitet seine Arme aus und drückt sich fest an den Bildschirm.
     - Ein warmer Herz-Glow pulsiert im Takt eines spürbaren Herzschlag-Sounds (`Lub-Dub`).
     - Herzen und Küsse regnen herab, begleitet von einer persönlichen Sprechblase.

5. **Überarbeitetes Eselsohr (Easter Egg #2)**:
   - Der Stift wurde entfernt.
   - Beim Antippen klappt die Papierecke realistisch um und ein geheimes handschriftliches Liebesgeständnis entfaltet sich auf dem Bildschirm.

---

## 📁 Projektstruktur

```text
c:\Simon\Adventskalender\24\
├── index.html              # Semantisches HTML-Skelett (Tisch, Buch, 7 Seiten, Modals, Bär)
├── styles/
│   ├── main.css            # Holztisch-Hintergrund, Lichterkette, Typografie, Toasts & Modals
│   ├── book.css            # Leder-Cover, Herz-Scanner, 7-Seiten-Container, Lesezeichen & Paginierung
│   └── components.css      # Eselsohr, Polaroids (3D-Flip), Tickets, Date-Generator, Quiz, Kuschelbär
├── js/
│   ├── config.js           # ⚙️ ZENTRALE STELLE: Alle Texte, Fotos, Gutscheine, riesige Date-Auswahl & Notfall
│   ├── storage.js          # Persistierung via localStorage (Buchstatus, Gutscheine, Easter Eggs, Quiz)
│   ├── easter-eggs.js      # Tracking & Trigger für die 5 versteckten Geheimnisse
│   └── app.js              # Touch-Wischgesten, Seitensteuerung, Audio-Synthesizer & Kuschelbär-Ablauf
└── README.md
```

---

## 🗝️ Die 5 versteckten Easter Eggs

1. **Das Ex-Libris-Buchsiegel**: Klick auf das Buchetikett oben rechts auf dem geschlossenen Buch.
2. **Das geheime Eselsohr**: Tippen auf die umgeknickte Papierecke oben rechts auf dem Liebesbrief (öffnet das geheime Geständnis).
3. **Die glitzernde Washi-Klammer**: Tippen auf das Washi-Tape des Koch-Polaroids auf Seite 2.
4. **Das Liebes-Codewort**: Tippen von `LOVE` oder `24` auf der Tastatur.
5. **Der Herzschlag des Buchschlosses**: 5-maliges schnelles Antippen des Mini-Siegels in der Kopfzeile.

---

## 💡 Zusätzliche Ideen für die Zukunft

Hier sind ein paar liebevolle Ideen, die du optional noch einbauen kannst:

1. **Echte Fotos einfügen**: In [`js/config.js`](file:///c:/Simon/Adventskalender/24/js/config.js) kannst du bei den Polaroids anstelle der Emojis (`frontEmoji`) Pfade zu echten Fotos (z.B. `assets/foto1.jpg`) hinterlegen.
2. **Sprachnachricht / Audio-Note**: Eine kurze, persönliche Sprachnachricht von dir im Notfall-Bereich abspielbar machen.
3. **Spotify-Song**: Einen direkten Spotify-Link zu „Eurem Song“ als kleinen Button im Liebesbrief einbetten.
4. **Mitternachts-Countdown**: Wenn sie die Seite vor dem 24.12. öffnet, könnte ein kleiner Zähler anzeigen, wie viele Stunden noch bis zur Bescherung fehlen.
