/**
 * ADVENT_CONFIG - Zentrale Konfiguration für das 24. Türchen
 * Alle Texte, Bilder, Gutscheine, Quizfragen und Notfall-Inhalte
 * können hier angepasst und erweitert werden.
 */

window.ADVENT_CONFIG = {
  meta: {
    doorNumber: 24,
    year: "2024",
    title: "Türchen 24 • Das große Finale",
    subtitle: "Unser persönliches Scrapbook & Erinnerungsbuch",
    recipientName: "Mein Schatz",
    senderName: "Dein Simon"
  },

  // Buch-Umschlag & Schloss (Vor dem Öffnen)
  book: {
    coverTitle: "24",
    coverSubtitle: "Unser Erinnerungsbuch",
    coverDedication: "Für das wundervollste Mädchen der Welt",
    lockHint: "Halte deinen Finger auf das Herz, um das Buch zu öffnen ❤️",
    scanSuccessText: "Schloss geöffnet! Willkommen in unserem Buch ✨",
    tableDecorations: {
      coffeeNote: "Für die beste Freundin der Welt ☕",
      dateBadge: "Heiligabend • 24.12."
    }
  },

  // Der persönliche Liebesbrief (Seite 1 im Buch)
  letter: {
    date: "Heiligabend, 24. Dezember",
    greeting: "Mein geliebter Schatz,",
    paragraphs: [
      "23 Türchen liegen hinter uns, und heute ist er endlich da: der 24. Dezember. Ich wollte dir für dieses ganz besondere Türchen kein einfaches Geschenk machen, sondern etwas, das unsere schönsten Momente festhält, dir an jedem Tag ein Lächeln schenkt und dir zeigt, wie unendlich viel du mir bedeutest.",
      "Jeder einzelne Tag mit dir ist ein Geschenk. Deine Art zu lachen, deine Umarmungen, wenn ich einen anstrengenden Tag hatte, dein Blick, der alles um uns herum vergessen lässt – du machst mein Leben so viel wärmer, bunter und schöner.",
      "Dieses Buch gehört ganz dir: Wische nach links, um durch unsere Seiten zu blättern. Dreh unsere Polaroids um, löse deine persönlichen Liebes-Gutscheine ein, lass uns ein Date für das neue Jahr auslosen oder drück den Notfall-Knopf, wann immer du eine Umarmung brauchst.",
      "Danke, dass es dich gibt. Danke für deine Liebe, deine Geduld und all die kleinen Abenteuer, die wir teilen."
    ],
    closing: "In unendlicher Liebe,",
    signature: "Dein Simon",
    ps: "P.S.: In diesem Buch sind 5 kleine Geheimnisse versteckt... Schaffst du es, alle zu finden? 🗝️"
  },

  // Polaroids aufgeteilt auf 2 Seiten (Erinnerungen Teil 1 & Teil 2)
  polaroidsPart1: [
    {
      id: "pol-1",
      title: "Unser schönster Sonnenuntergang",
      date: "Spätsommer-Abend",
      tapeColor: "rose",
      rotation: -2,
      frontEmoji: "🌅",
      frontCaption: "Der Himmel stand in Flammen – und ich hab nur dich angeschaut.",
      backNote: "Weißt du noch, wie kalt der Wind plötzlich wurde und wir uns eine Decke geteilt haben? Deine Hand in meiner Jackentasche war der wärmste Ort der Welt.",
      backDate: "18. August",
      secretEggClue: false
    },
    {
      id: "pol-2",
      title: "Kaffee, Regen & Du",
      date: "Sonntagmorgen",
      tapeColor: "gold",
      rotation: 1.5,
      frontEmoji: "☕",
      frontCaption: "Regentropfen an der Scheibe, warmer Kakao und stundenlange Gespräche.",
      backNote: "Wir wollten eigentlich produktiv sein und haben stattdessen 4 Stunden im Bett über das Universum, unsere Träume und Quatsch gelacht. Einer meiner absoluten Lieblingstage.",
      backDate: "12. Oktober",
      secretEggClue: false
    },
    {
      id: "pol-3",
      title: "Das geheime Koch-Experiment",
      date: "Samstagabend",
      tapeColor: "mint",
      rotation: -1.5,
      frontEmoji: "🍝",
      frontCaption: "Mehr Mehl in den Haaren als in der Schüssel – aber unendlich lecker!",
      backNote: "Die Küche sah aus wie ein Schlachtfeld, die Musik war laut, wir haben getanzt und das Essen hat am Ende wie ein 5-Sterne-Menü geschmeckt.",
      backDate: "03. November",
      secretEggClue: true // Easter Egg trigger #3
    }
  ],

  polaroidsPart2: [
    {
      id: "pol-4",
      title: "Sternschnuppen zählen",
      date: "Klare Sommernacht",
      tapeColor: "floral",
      rotation: 2,
      frontEmoji: "✨",
      frontCaption: "Du hast dir was gewünscht – ich hatte meinen Wunsch schon neben mir.",
      backNote: "Ich habe jede Sternschnuppe gesehen, aber mein schönster Wunsch ist schon in Erfüllung gegangen, als du in mein Leben getreten bist.",
      backDate: "14. Juli",
      secretEggClue: false
    },
    {
      id: "pol-5",
      title: "Unser Spaziergang im Schnee",
      date: "Erster Frost",
      tapeColor: "rose",
      rotation: -2,
      frontEmoji: "❄️",
      frontCaption: "Rote Nasen, kalte Wangen und das wärmste Lächeln der Welt.",
      backNote: "Du hast gesagt: 'Mir ist gar nicht kalt!' – und 2 Minuten später hast du deine eiskalten Hände unter meinen Pullover gesteckt. Ich liebe dich dafür.",
      backDate: "02. Dezember",
      secretEggClue: false
    },
    {
      id: "pol-6",
      title: "Kinoabend Deluxe",
      date: "Freitagabend",
      tapeColor: "gold",
      rotation: 1.5,
      frontEmoji: "🎬",
      frontCaption: "Popcorn geteilt, Film vergessen, dich festgehalten.",
      backNote: "Ich weiß ehrlich gesagt bis heute nicht, wie der Film ausgegangen ist. Ich war viel zu beschäftigt damit, glücklich zu sein, dass du bei mir bist.",
      backDate: "22. September",
      secretEggClue: false
    }
  ],

  // Gutscheine zum Einlösen (Smartphone-optimierte Tickets)
  vouchers: [
    {
      id: "gutschein-1",
      title: "Frühstück im Bett Deluxe",
      icon: "🥐",
      category: "Verwöhnen",
      description: "Frische Croissants, Lieblingstee oder Kaffee, Obstsalat und dein Lieblingslied im Hintergrund – du musst keinen Finger rühren!",
      validUntil: "Unbegrenzt gültig",
      badge: "Klassiker"
    },
    {
      id: "gutschein-2",
      title: "30 Min. Verwöhn-Massage",
      icon: "🕯️",
      category: "Entspannung",
      description: "Entspannende Rücken-, Nacken- oder Fußmassage mit warmem Duftöl, Kerzenschein und deiner Wunsch-Playlist.",
      validUntil: "Unbegrenzt gültig",
      badge: "Bestseller"
    },
    {
      id: "gutschein-3",
      title: "Chefkoch-Abendessen",
      icon: "👩‍🍳",
      category: "Kulinarisch",
      description: "Ein 3-Gänge-Menü deiner Wahl, von mir frisch gekocht, serviert mit Kerzenlicht und anschließendem Spüldienst meinerseits.",
      validUntil: "Unbegrenzt gültig",
      badge: "Gourmet"
    },
    {
      id: "gutschein-4",
      title: "Wunschfilm ohne Meckern",
      icon: "🍿",
      category: "Gemütlichkeit",
      description: "Du wählst den Film – egal wie kitschig, dramatisch oder lang – und ich schaue aufmerksam mit, halte deine Hand und bringe Snacks.",
      validUntil: "Unbegrenzt gültig",
      badge: "Romantik"
    },
    {
      id: "gutschein-5",
      title: "Spontaner Ausflug ins Blaue",
      icon: "🚗",
      category: "Abenteuer",
      description: "Ich plane alles im Geheimen: Ziel, Proviant, Musik. Du musst nur einsteigen und dich überraschen lassen!",
      validUntil: "Unbegrenzt gültig",
      badge: "Überraschung"
    },
    {
      id: "gutschein-6",
      title: "Der 'Ich hab Recht'-Joker",
      icon: "👑",
      category: "Spezial",
      description: "Einmalig einlösbar in jeder harmlosen Diskussion. Sobald du diesen Gutschein zeigst, gebe ich mich bedingungslos geschlagen!",
      validUntil: "Einmalig einsetzbar",
      badge: "Superkraft"
    }
  ],

  // =========================================================================
  // Date-Night-Generator: Riesige Auswahl für Simon zum Auswählen & Anpassen!
  // =========================================================================
  dateNightGenerator: {
    title: "Unser nächstes Date",
    subtitle: "Lass das Schicksal entscheiden oder mixe eure perfekte Date-Night!",
    
    // 24 liebevolle Aktivitäten
    activities: [
      { id: "a1", text: "Sternenhimmel gucken mit Thermoskanne & Kuscheldecke", emoji: "✨" },
      { id: "a2", text: "Eine riesige Höhle aus Kissen & Decken im Wohnzimmer bauen", emoji: "⛺" },
      { id: "a3", text: "Gemeinsam ein völlig neues Rezept kochen & probieren", emoji: "🍳" },
      { id: "a4", text: "Nachtspaziergang mit Taschenlampe & Glühwein / heiße Schokolade", emoji: "🌙" },
      { id: "a5", text: "Heimkino-Marathon mit allen deinen Lieblingsfilmen", emoji: "🎬" },
      { id: "a6", text: "Atelier-Abend: Malen, Zeichnen oder Töpfern bei einem Glas Wein", emoji: "🎨" },
      { id: "a7", text: "Spa-Abend zu Hause mit Gesichtsmasken & Kerzenmeer", emoji: "🛁" },
      { id: "a8", text: "Karaoke-Duell im Wohnzimmer zu unseren Lieblingssongs", emoji: "🎤" },
      { id: "a9", text: "Sonnenaufgangs-Frühstück an unserem Lieblingsort", emoji: "🌅" },
      { id: "a10", text: "Spieleabend Deluxe: Uno, Kniffel & alte Brettspiele", emoji: "🎲" },
      { id: "a11", text: "Blind Tasting: Wir füttern uns gegenseitig mit verbundenen Augen", emoji: "🙈" },
      { id: "a12", text: "Foto-Safari: Ein Spaziergang mit Einwegkamera durch die Stadt", emoji: "📸" },
      { id: "a13", text: "Eislaufen Hand in Hand mit anschließenden heißen Waffeln", emoji: "⛸️" },
      { id: "a14", text: "Planeten-Reise: Besuch im Planetarium oder Sternwarte", emoji: "🪐" },
      { id: "a15", text: "Zusammen ein Fotoalbum oder Scrapbook basteln", emoji: "✂️" },
      { id: "a16", text: "Late-Night-Drive mit lauter Lieblingsmusik & Stadtlichtern", emoji: "🚗" },
      { id: "a17", text: "Bücher-Date: In die Buchhandlung gehen und ein Buch füreinander aussuchen", emoji: "📚" },
      { id: "a18", text: "Indoor-Picknick auf dem weichen Wohnzimmer-Teppich", emoji: "🧺" },
      { id: "a19", text: "Kuchen-Back-Duell: Wer backt das lustigste Cupcake-Gesicht?", emoji: "🧁" },
      { id: "a20", text: "Tanzen im Wohnzimmer bei Kerzenschein ohne Schuhe", emoji: "💃" },
      { id: "a21", text: "Ausflug in ein Thermalbad oder eine Saunalandschaft", emoji: "🌊" },
      { id: "a22", text: "Escape-Room zu zweit lösen (zu Hause oder unterwegs)", emoji: "🔍" },
      { id: "a23", text: "Einen Sonnenuntergang mit Musik auf den Ohren genießen", emoji: "🌇" },
      { id: "a24", text: "Geheimer Wunsch-Abend: Du darfst alles bestimmen!", emoji: "💖" }
    ],

    // 18 köstliche Genüsse
    food: [
      { id: "f1", text: "Selbstgemachte Pizza mit deinen Lieblingszutaten belegt", emoji: "🍕" },
      { id: "f2", text: "Sushi-Platte Deluxe mit frischem Lachs & Edamame", emoji: "🍣" },
      { id: "f3", text: "Gemütliches Käsefondue oder Raclette-Schmaus", emoji: "🧀" },
      { id: "f4", text: "Klassische italienische Pasta mit Bergen von Parmesan", emoji: "🍝" },
      { id: "f5", text: "Fluffige Waffeln mit heißen Kirschen & Vanilleeis", emoji: "🧇" },
      { id: "f6", text: "Tapas-Variation mit knusprigem Baguette, Dips & Oliven", emoji: "🥖" },
      { id: "f7", text: "Süßes Schokofondue mit Erdbeeren, Bananen & Marshmallows", emoji: "🍓" },
      { id: "f8", text: "Selbstgemachte Smash-Burger mit knusprigen Süßkartoffelpommes", emoji: "🍔" },
      { id: "f9", text: "Mexikanische Tacos & Nachos mit viel Guacamole", emoji: "🌮" },
      { id: "f10", text: "Crêpes-Station mit Nutella, Zimt & Zucker", emoji: "🥞" },
      { id: "f11", text: "Wärmende Ramen-Suppe mit weichem Ei & Frühlingszwiebeln", emoji: "🍜" },
      { id: "f12", text: "Edle Käse- & Weintrauben-Platte mit Nüssen", emoji: "🍇" },
      { id: "f13", text: "Zusammen Kekse backen und direkt warm vom Blech naschen", emoji: "🍪" },
      { id: "f14", text: "Knuspriges Popcorn (süß & salzig gemischt!)", emoji: "🍿" },
      { id: "f15", text: "Exotisches Thai-Curry mit cremigem Kokosreis", emoji: "🍛" },
      { id: "f16", text: "Eisbecher-Kreation mit bunten Streuseln & Karamell", emoji: "🍨" },
      { id: "f17", text: "Warmes Bagel-Sandwich mit Räucherlachs & Frischkäse", emoji: "🥯" },
      { id: "f18", text: "Lieblings-Takeaway von unserem Stammlokal gemütlich im Bett", emoji: "🥡" }
    ],

    // 12 Stimmungen & Outfits
    vibes: [
      { id: "v1", text: "Kuscheliger Pyjama, oversized Hoodie & flauschige Wollsocken", emoji: "🧸" },
      { id: "v2", text: "Schick anziehen wie zu unserem ersten großen Date", emoji: "👗" },
      { id: "v3", text: "Nur Kerzenschein, Lichterketten & leise Jazz-Klänge", emoji: "🕯️" },
      { id: "v4", text: "Lagerfeuer-Atmosphäre (auch virtuell auf dem TV-Bildschirm)", emoji: "🔥" },
      { id: "v5", text: "Retro-Nostalgie mit 90er- und 2000er-Lieblingshits", emoji: "📻" },
      { id: "v6", text: "Akustik-Gitarren & sanfte Wohlfühl-Playlist", emoji: "🎸" },
      { id: "v7", text: "Gemütlicher Hoodie-Look & Duftkerze Vanille/Zimt", emoji: "🧣" },
      { id: "v8", text: "Black-Tie Vibe: Gläser klingen lassen wie im Luxushotel", emoji: "🥂" },
      { id: "v9", text: "Festival-Vibe: Lichterketten-Himmel & Partymusik", emoji: "🎉" },
      { id: "v10", text: "Völlige Ruhe: Handys aus, nur wir zwei und die Welt vergessen", emoji: "🤫" },
      { id: "v11", text: "Winter Wonderland mit Blick auf die Lichter der Stadt", emoji: "❄️" },
      { id: "v12", text: "Morning Glow: Sanftes Morgenlicht & Kuschelstimmung", emoji: "🌤️" }
    ]
  },

  // Unser Beziehungs-Quiz (Seite 6)
  quiz: {
    title: "Das Wir-zwei-Quiz",
    subtitle: "Kleine Erinnerungen an unsere gemeinsame Reise. Teste dein Gedächtnis!",
    questions: [
      {
        question: "Weißt du noch, was ich als Erstes dachte, als ich dich sah?",
        options: [
          "Was für ein bezauberndes, wunderschönes Lächeln!",
          "Hoffentlich blamiere ich mich jetzt nicht total...",
          "Sie ist definitiv eine Zehn von Zehn!",
          "Alle drei Optionen auf einmal! ❤️"
        ],
        correctIndex: 3,
        explanation: "Ganz ehrlich: Es war eine Mischung aus totalem Herzklopfen und purem Glück!",
        sweetReaction: "Genau so war es! Du hast mir vom ersten Augenblick den Kopf verdreht."
      },
      {
        question: "Was ist meine absolute Lieblingsbeschäftigung mit dir?",
        options: [
          "Stundenlang nebeneinander liegen und reden",
          "Kochen und die Küche ins Chaos stürzen",
          "Dich beim Lachen beobachten",
          "Egal was – Hauptsache mit dir!"
        ],
        correctIndex: 3,
        explanation: "Jede Sekunde mit dir ist die beste Zeit des Tages.",
        sweetReaction: "100 Punkte! Es ist völlig egal, wo wir sind – solange du da bist."
      },
      {
        question: "Was tun wir, wenn das Wetter draußen ungemütlich ist?",
        options: [
          "Tee/Kakao kochen und in eine Decke einwickeln",
          "Serienmarathon starten",
          "Eng aneinander kuscheln und dem Regen lauschen",
          "Das volle Wohlfühlpaket aus allen dreien!"
        ],
        correctIndex: 3,
        explanation: "Unser perfekter Schlechtwetter-Modus ist legendär.",
        sweetReaction: "Richtig! Kuscheln, Wärme und Gemütlichkeit pur."
      },
      {
        question: "Wie viele Tage im Jahr liebe ich dich?",
        options: [
          "Nur an Feiertagen",
          "365 Tage (bzw. 366 in Schaltjahren)",
          "Jeden einzelnen Herzschlag lang",
          "Mehr als Worte jemals sagen können!"
        ],
        correctIndex: 3,
        explanation: "Nicht mal die Unendlichkeit reicht dafür aus.",
        sweetReaction: "Volltreffer! Es wird von Tag zu Tag nur noch mehr."
      }
    ],
    completionTitle: "Perfekt! Du kennst mein Herz in- und auswendig ❤️",
    completionMessage: "Du bist meine Traumfrau, meine beste Freundin und meine große Liebe. Danke für jeden gemeinsamen Moment!"
  },

  // Der Notfall-Knopf ("Ich vermisse dich" & Der Kuschelbär) (Seite 7)
  emergency: {
    title: "Der 'Ich vermisse dich'-Notfallknopf",
    subtitle: "Für graue Tage, Sehnsucht, Stress oder wenn du einfach sofort Liebe brauchst.",
    badge: "24/7 Kuschel-Garantie",
    phone: "+49 170 1234567", // Hier eigene Telefonnummer eintragen
    phoneDisplay: "+49 170 1234567",
    whatsappNumber: "491701234567", // WhatsApp-Nummer ohne führendes '+'
    whatsappMessage: "Notfall-Alarm aus dem 24. Türchen! 🚨 Ich vermisse dich gerade ganz doll und fordere sofort eine extra Portion Liebe ein! ❤️",
    comfortPhrases: [
      "Atme einmal ganz tief ein und aus. Du bist stark, wundervoll und ich bin so stolz auf dich.",
      "Mach die Augen für 10 Sekunden zu und stell dir vor, wie ich dich ganz fest in den Arm nehme.",
      "Egal was heute passiert ist: Du bist die tollste Person der Welt und morgen wird ein besserer Tag.",
      "Ich denke in diesem Augenblick ganz fest an dich. Du bist niemals allein.",
      "Ein virtueller Kuss auf die Stirn ist soeben bei dir eingetroffen! 💋",
      "Erinnerung: Dein Lächeln ist das Schönste auf der ganzen Erde. Verlier es nicht!"
    ],
    sosList: [
      "1. Mach dir deinen Lieblingstee oder eine heiße Schokolade ☕",
      "2. Kuschel dich in deine weichste Decke 🛋️",
      "3. Klick unten auf den Button und schick mir sofort eine Notfall-Nachricht 📱",
      "4. Ein echter Kuss und eine Riesen-Umarmung sind schon auf dem Weg zu dir!"
    ],
    bearMessage: "Gaaanz fest gedrückt! 🧸❤️ Alles wird gut, mein Schatz. Dein Simon denkt fest an dich!"
  },

  // Die 5 versteckten Easter Eggs
  easterEggs: [
    {
      id: "egg-stamp",
      title: "Das alte Ex-Libris-Buchsiegel",
      hint: "Auf dem Bucheinband gibt es ein kleines goldenes Buchetikett...",
      reward: "Du hast das geheime Buchsiegel entdeckt! Ein Schwarm Herzen fliegt zu dir.",
      icon: "📖"
    },
    {
      id: "egg-corner",
      title: "Das geheime Eselsohr",
      hint: "Auf der Briefseite ist oben rechts die Papierecke umgebogen...",
      reward: "Geheimes Geständnis entfaltet: 'Ich wusste schon beim zweiten Date, dass du die Eine für mich bist!'",
      icon: "💌"
    },
    {
      id: "egg-pin",
      title: "Die glitzernde Washi-Klammer",
      hint: "Beim Polaroid mit dem Koch-Experiment glitzert das Klebeband...",
      reward: "Geheimes Küchen-Geheimnis freigeschaltet: Der Koch bekommt beim nächsten Mal einen Kuss als Trinkgeld!",
      icon: "📌"
    },
    {
      id: "egg-code",
      title: "Das Liebes-Codewort",
      hint: "Tippe das Wort 'LOVE' oder '24' auf der Tastatur...",
      reward: "Liebescode geknackt! Romantischer Sternenregen wurde aktiviert.",
      icon: "✨"
    },
    {
      id: "egg-seal",
      title: "Der Herzschlag des Buchschlosses",
      hint: "Tippe 5 Mal hintereinander auf das Mini-Herz in der oberen Leiste...",
      reward: "Herzschlag synchronisiert! Ein goldener Schutzengel für unsere Liebe begleitet dich.",
      icon: "❤️"
    }
  ]
};
