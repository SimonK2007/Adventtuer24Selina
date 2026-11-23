/**
 * app.js - Hauptsteuerung für das 24. Türchen (Smartphone-Buch-Edition)
 * Verbindet Seitenblättern, Touch-Wischgesten, Biometrie-Schloss, 
 * Kuschelbär-Umarmung, Web-Audio und dynamisches Scrapbook-Rendering.
 */

(function (window, document) {
  'use strict';

  // =========================================================================
  // 1. Audio-Synthesizer via Web Audio API (keine externen MP3s nötig)
  // =========================================================================
  var SoundEngine = {
    ctx: null,

    init: function () {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    },

    resume: function () {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },

    isMuted: function () {
      return window.AdventStorage.isMuted();
    },

    // Sanfter C-Dur Akkord (Liebeserlebnis)
    playChime: function () {
      if (this.isMuted()) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      var ctx = this.ctx;
      var now = ctx.currentTime;
      var notes = [523.25, 659.25, 783.99, 1046.50];

      notes.forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.0);
      });
    },

    // Klickendes Schloss / Entriegelungs-Sound
    playLockOpen: function () {
      if (this.isMuted()) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      var ctx = this.ctx;
      var now = ctx.currentTime;

      // Klick 1
      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(320, now);
      osc1.frequency.exponentialRampToValueAtTime(60, now + 0.08);
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.12);

      // Klick 2 (Feder springt auf)
      setTimeout(function () {
        if (!ctx) return;
        var now2 = ctx.currentTime;
        var osc2 = ctx.createOscillator();
        var gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(587.33, now2); // D5
        osc2.frequency.exponentialRampToValueAtTime(880, now2 + 0.15); // A5
        gain2.gain.setValueAtTime(0.18, now2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.3);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now2);
        osc2.stop(now2 + 0.35);
      }, 90);
    },

    // Knisterndes Papier / Siegel brechen
    playSealBreak: function () {
      if (this.isMuted()) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      var ctx = this.ctx;
      var now = ctx.currentTime;
      var bufferSize = ctx.sampleRate * 0.08;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      var noise = ctx.createBufferSource();
      noise.buffer = buffer;
      var filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      var gain = ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    },

    // Stempel-Schlag ("Thump")
    playStamp: function () {
      if (this.isMuted()) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      var ctx = this.ctx;
      var now = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    },

    // Sanfter Buchseiten-Blätter-Sound
    playPageTurn: function () {
      if (this.isMuted()) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      var ctx = this.ctx;
      var now = ctx.currentTime;
      var bufferSize = ctx.sampleRate * 0.07;
      var buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      var data = buffer.getChannelData(0);
      for (var i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }

      var noise = ctx.createBufferSource();
      noise.buffer = buffer;
      var filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(1.5, now);
      var gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    },

    // Klick / Tasten-Tick
    playTick: function () {
      if (this.isMuted()) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      var ctx = this.ctx;
      var now = ctx.currentTime;
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    },

    // Herzschlag (für den Kuschelbär / Notfallknopf)
    playHeartbeat: function () {
      if (this.isMuted()) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      var ctx = this.ctx;
      var now = ctx.currentTime;

      // 1. Schlag: "Lub"
      var osc1 = ctx.createOscillator();
      var gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(40, now + 0.12);
      gain1.gain.setValueAtTime(0.25, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.16);

      // 2. Schlag: "Dub"
      setTimeout(function () {
        if (!ctx) return;
        var now2 = ctx.currentTime;
        var osc2 = ctx.createOscillator();
        var gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(95, now2);
        osc2.frequency.exponentialRampToValueAtTime(45, now2 + 0.1);
        gain2.gain.setValueAtTime(0.2, now2);
        gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.12);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(now2);
        osc2.stop(now2 + 0.15);
      }, 180);
    }
  };

  // =========================================================================
  // 2. Partikel & Konfetti-System
  // =========================================================================
  var ParticleSystem = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,

    init: function () {
      this.canvas = document.getElementById('particle-canvas');
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      var self = this;
      window.addEventListener('resize', function () {
        self.resize();
      });
    },

    resize: function () {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    },

    burst: function (count, originX, originY) {
      if (!this.canvas || !this.ctx) return;
      var total = count || 50;
      var x = originX !== undefined ? originX : window.innerWidth / 2;
      var y = originY !== undefined ? originY : window.innerHeight / 2;

      var colors = ['#e63946', '#f4a261', '#e76f51', '#d4a373', '#e8b4b8', '#ffd166', '#a31d24'];
      var shapes = ['heart', 'star', 'circle'];

      for (var i = 0; i < total; i++) {
        var angle = Math.random() * Math.PI * 2;
        var speed = 2 + Math.random() * 7;
        this.particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 2,
          gravity: 0.14 + Math.random() * 0.08,
          size: 7 + Math.random() * 11,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          alpha: 1,
          life: 0.012 + Math.random() * 0.012
        });
      }

      if (!this.animId) {
        this.loop();
      }
    },

    drawHeart: function (ctx, x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      var topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.2);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },

    drawStar: function (ctx, x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      var spikes = 5;
      var outerRadius = size / 2;
      var innerRadius = size / 4;
      var rot = Math.PI / 2 * 3;
      var step = Math.PI / spikes;
      ctx.moveTo(0, -outerRadius);
      for (var i = 0; i < spikes; i++) {
        ctx.lineTo(Math.cos(rot) * outerRadius, Math.sin(rot) * outerRadius);
        rot += step;
        ctx.lineTo(Math.cos(rot) * innerRadius, Math.sin(rot) * innerRadius);
        rot += step;
      }
      ctx.lineTo(0, -outerRadius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    },

    loop: function () {
      var self = this;
      var ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (var i = this.particles.length - 1; i >= 0; i--) {
        var p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.life;

        if (p.alpha <= 0) {
          this.particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        if (p.shape === 'heart') {
          self.drawHeart(ctx, p.x, p.y, p.size, p.color);
        } else if (p.shape === 'star') {
          self.drawStar(ctx, p.x, p.y, p.size, p.color);
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
        }
        ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animId = requestAnimationFrame(function () {
          self.loop();
        });
      } else {
        this.animId = null;
      }
    }
  };

  // =========================================================================
  // 3. Haupt-Applikation & Buch-Steuerung
  // =========================================================================
  var AdventApp = {
    cfg: null,
    sound: SoundEngine,
    currentPage: 0,
    totalPages: 7,
    isUnlocking: false,
    unlockTimer: null,

    // IDs der 7 Buchseiten
    pageIds: [
      'page-letter',        // Seite 1: Liebesbrief
      'page-polaroids-1',   // Seite 2: Erinnerungen Teil 1
      'page-polaroids-2',   // Seite 3: Erinnerungen Teil 2
      'page-vouchers',      // Seite 4: Liebes-Gutscheine
      'page-datenight',     // Seite 5: Date-Night-Generator
      'page-quiz',          // Seite 6: Beziehungs-Quiz
      'page-emergency'      // Seite 7: Notfall-Knopf & Kuschelbär
    ],

    init: function () {
      this.cfg = window.ADVENT_CONFIG;
      if (!this.cfg) {
        console.error('ADVENT_CONFIG nicht gefunden!');
        return;
      }

      ParticleSystem.init();
      this.initHeader();
      this.initBookLock();
      this.renderAllPages();
      this.initBookNavigation();
      this.initTouchSwipe();
      this.initModals();

      // Easter Eggs anbinden
      if (window.AdventEasterEggs) {
        window.AdventEasterEggs.init();
      }

      // Prüfen, ob das Buch bereits geöffnet war
      if (window.AdventStorage.isBookUnlocked()) {
        this.openBookInstantly();
      }
    },

    triggerHeartBurst: function (count, x, y) {
      ParticleSystem.burst(count, x, y);
    },

    // Header & Audio-Mute Schalter
    initHeader: function () {
      var self = this;
      var muteBtn = document.getElementById('audio-toggle-btn');
      if (muteBtn) {
        var isMuted = window.AdventStorage.isMuted();
        this.updateMuteBtnUI(muteBtn, isMuted);

        muteBtn.addEventListener('click', function () {
          var nowMuted = !window.AdventStorage.isMuted();
          window.AdventStorage.setMuted(nowMuted);
          self.updateMuteBtnUI(muteBtn, nowMuted);
          if (!nowMuted) {
            self.sound.playChime();
          }
        });
      }

      var titleEl = document.getElementById('header-door-title');
      if (titleEl && this.cfg.meta) {
        titleEl.textContent = this.cfg.meta.title;
      }
    },

    updateMuteBtnUI: function (btn, isMuted) {
      var icon = btn.querySelector('.icon');
      var label = btn.querySelector('.label');
      if (isMuted) {
        if (icon) icon.textContent = '🔇';
        if (label) label.textContent = 'Ton an';
      } else {
        if (icon) icon.textContent = '🔔';
        if (label) label.textContent = 'Ton aus';
      }
    },

    // =======================================================================
    // 4. Das verschlossene Buch & Herz-Fingerabdruck-Scanner
    // =======================================================================
    initBookLock: function () {
      var self = this;
      var lockBtn = document.getElementById('heart-fingerprint-btn');
      var lockHint = document.getElementById('book-lock-hint');
      var bookCover = document.getElementById('closed-book-cover');

      // Texte aus Config
      var coverTitle = document.getElementById('cover-book-title');
      var coverSub = document.getElementById('cover-book-sub');
      var coverDedication = document.getElementById('cover-book-dedication');

      if (coverTitle && this.cfg.book) coverTitle.textContent = this.cfg.book.coverTitle;
      if (coverSub && this.cfg.book) coverSub.textContent = this.cfg.book.coverSubtitle;
      if (coverDedication && this.cfg.book) coverDedication.textContent = this.cfg.book.coverDedication;
      if (lockHint && this.cfg.book) lockHint.textContent = this.cfg.book.lockHint;

      if (!lockBtn) return;

      // Touch & Hold Interaktion für Smartphone
      function startHold(e) {
        e.preventDefault();
        if (self.isUnlocking) return;
        self.isUnlocking = true;
        lockBtn.classList.add('scanning');
        self.sound.playTick();

        var scanProgress = document.getElementById('scan-progress-bar');
        if (scanProgress) scanProgress.style.width = '100%';

        self.unlockTimer = setTimeout(function () {
          self.unlockBookSequence();
        }, 1100);
      }

      function cancelHold(e) {
        if (!self.isUnlocking) return;
        clearTimeout(self.unlockTimer);
        self.isUnlocking = false;
        lockBtn.classList.remove('scanning');
        var scanProgress = document.getElementById('scan-progress-bar');
        if (scanProgress) scanProgress.style.width = '0%';
      }

      lockBtn.addEventListener('mousedown', startHold);
      lockBtn.addEventListener('touchstart', startHold, { passive: false });

      lockBtn.addEventListener('mouseup', cancelHold);
      lockBtn.addEventListener('mouseleave', cancelHold);
      lockBtn.addEventListener('touchend', cancelHold);
      lockBtn.addEventListener('touchcancel', cancelHold);

      // Klick als Fallback (wenn jemand nur kurz tippt)
      lockBtn.addEventListener('click', function () {
        if (!self.isUnlocking) {
          self.unlockBookSequence();
        }
      });

      // Buch wieder schließen (Button im Footer)
      var relockBtn = document.getElementById('relock-book-btn');
      if (relockBtn) {
        relockBtn.addEventListener('click', function () {
          self.sound.playLockOpen();
          var bookWrapper = document.getElementById('book-wrapper');
          if (bookWrapper) {
            bookWrapper.classList.remove('is-open');
            bookWrapper.scrollIntoView({ behavior: 'smooth' });
          }
          window.AdventStorage.setBookUnlocked(false);
        });
      }
    },

    unlockBookSequence: function () {
      var self = this;
      var lockBtn = document.getElementById('heart-fingerprint-btn');
      var bookWrapper = document.getElementById('book-wrapper');
      var lockHint = document.getElementById('book-lock-hint');

      if (lockBtn) lockBtn.classList.add('unlocked-flash');
      if (lockHint) lockHint.textContent = (this.cfg.book && this.cfg.book.scanSuccessText) || 'Schloss geöffnet! ✨';

      // Sound & Partikel
      this.sound.playLockOpen();
      this.sound.playChime();
      ParticleSystem.burst(60);

      setTimeout(function () {
        if (bookWrapper) {
          bookWrapper.classList.add('is-open');
        }
        window.AdventStorage.setBookUnlocked(true);
        self.goToPage(window.AdventStorage.getLastPage() || 0, false);

        // Sanft zum geöffneten Buch scrollen
        setTimeout(function () {
          var openedEl = document.getElementById('opened-book');
          if (openedEl) {
            openedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }, 700);
    },

    openBookInstantly: function () {
      var bookWrapper = document.getElementById('book-wrapper');
      if (bookWrapper) {
        bookWrapper.classList.add('is-open');
      }
      var savedPage = window.AdventStorage.getLastPage() || 0;
      this.goToPage(savedPage, false);
    },

    // =======================================================================
    // 5. Seitenblättern & Navigation (Umklappen / Blättern)
    // =======================================================================
    initBookNavigation: function () {
      var self = this;

      // 5.1 Blättern-Buttons unten
      var prevBtn = document.getElementById('book-prev-btn');
      var nextBtn = document.getElementById('book-next-btn');

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          self.prevPage();
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          self.nextPage();
        });
      }

      // 5.2 Seiden-Lesezeichen (Schnellzugriff oben)
      var ribbons = document.querySelectorAll('.bookmark-ribbon');
      ribbons.forEach(function (ribbon) {
        ribbon.addEventListener('click', function () {
          var targetIndex = parseInt(ribbon.getAttribute('data-page-index'), 10);
          if (!isNaN(targetIndex)) {
            self.goToPage(targetIndex, true);
          }
        });
      });

      // 5.3 Seitenzahlen / Dots
      this.updatePaginationUI();
    },

    goToPage: function (pageIndex, playSound) {
      if (pageIndex < 0 || pageIndex >= this.totalPages) return;
      var self = this;

      if (playSound !== false) {
        this.sound.playPageTurn();
      }

      var pages = document.querySelectorAll('.book-page');
      pages.forEach(function (page, idx) {
        if (idx === pageIndex) {
          page.classList.add('active');
          // Nach oben scrollen innerhalb der neuen Buchseite
          var scrollable = page.querySelector('.page-scroll-content') || page;
          scrollable.scrollTop = 0;
        } else {
          page.classList.remove('active');
        }
      });

      this.currentPage = pageIndex;
      window.AdventStorage.setLastPage(pageIndex);
      this.updatePaginationUI();

      // Bookmark Ribbons aktiv markieren
      var ribbons = document.querySelectorAll('.bookmark-ribbon');
      ribbons.forEach(function (ribbon) {
        var rIdx = parseInt(ribbon.getAttribute('data-page-index'), 10);
        if (rIdx === pageIndex) {
          ribbon.classList.add('active');
        } else {
          ribbon.classList.remove('active');
        }
      });
    },

    nextPage: function () {
      if (this.currentPage < this.totalPages - 1) {
        this.goToPage(this.currentPage + 1, true);
      }
    },

    prevPage: function () {
      if (this.currentPage > 0) {
        this.goToPage(this.currentPage - 1, true);
      }
    },

    updatePaginationUI: function () {
      var currentEl = document.getElementById('page-indicator-current');
      var totalEl = document.getElementById('page-indicator-total');
      var prevBtn = document.getElementById('book-prev-btn');
      var nextBtn = document.getElementById('book-next-btn');

      if (currentEl) currentEl.textContent = this.currentPage + 1;
      if (totalEl) totalEl.textContent = this.totalPages;

      if (prevBtn) prevBtn.disabled = (this.currentPage === 0);
      if (nextBtn) nextBtn.disabled = (this.currentPage === this.totalPages - 1);

      // Pagination Dots
      var dotsContainer = document.getElementById('page-dots-container');
      if (dotsContainer) {
        dotsContainer.innerHTML = '';
        var self = this;
        for (var i = 0; i < this.totalPages; i++) {
          var dot = document.createElement('button');
          dot.className = 'page-dot' + (i === this.currentPage ? ' active' : '');
          dot.setAttribute('aria-label', 'Gehe zu Seite ' + (i + 1));
          (function (targetIdx) {
            dot.addEventListener('click', function () {
              self.goToPage(targetIdx, true);
            });
          })(i);
          dotsContainer.appendChild(dot);
        }
      }
    },

    // =======================================================================
    // 6. Touch-Wischgesten für Smartphone (Swipe Left / Swipe Right)
    // =======================================================================
    initTouchSwipe: function () {
      var self = this;
      var bookContainer = document.getElementById('opened-book');
      if (!bookContainer) return;

      var startX = 0;
      var startY = 0;
      var startTime = 0;

      bookContainer.addEventListener('touchstart', function (e) {
        if (e.touches.length === 1) {
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          startTime = Date.now();
        }
      }, { passive: true });

      bookContainer.addEventListener('touchend', function (e) {
        if (!startX || !startY) return;
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;
        var diffX = endX - startX;
        var diffY = endY - startY;
        var timeTaken = Date.now() - startTime;

        // Nur werten, wenn horizontale Geste deutlich stärker als vertikales Scrollen ist
        if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.4 && timeTaken < 600) {
          if (diffX < 0) {
            // Nach links gewischt -> Nächste Seite
            self.nextPage();
          } else {
            // Nach rechts gewischt -> Vorherige Seite
            self.prevPage();
          }
        }

        startX = 0;
        startY = 0;
      }, { passive: true });
    },

    // =======================================================================
    // 7. Seiten-Rendering (Brief, Polaroids 1 & 2, Gutscheine, Date, Quiz, Notfall)
    // =======================================================================
    renderAllPages: function () {
      this.renderLetter();
      this.renderPolaroidsPart1();
      this.renderPolaroidsPart2();
      this.renderVouchers();
      this.renderDateNightGenerator();
      this.renderQuiz();
      this.renderEmergencySection();
    },

    // 7.1 Seite 1: Liebesbrief
    renderLetter: function () {
      var letterData = this.cfg.letter;
      if (!letterData) return;

      var dateEl = document.getElementById('letter-date');
      var greetingEl = document.getElementById('letter-greeting');
      var bodyEl = document.getElementById('letter-body');
      var closingEl = document.getElementById('letter-closing');
      var signatureEl = document.getElementById('letter-signature');
      var psEl = document.getElementById('letter-ps');

      if (dateEl) dateEl.textContent = letterData.date;
      if (greetingEl) greetingEl.textContent = letterData.greeting;

      if (bodyEl && letterData.paragraphs) {
        bodyEl.innerHTML = '';
        letterData.paragraphs.forEach(function (p) {
          var pEl = document.createElement('p');
          pEl.textContent = p;
          bodyEl.appendChild(pEl);
        });
      }

      if (closingEl) closingEl.textContent = letterData.closing;
      if (signatureEl) signatureEl.textContent = letterData.signature;
      if (psEl) psEl.textContent = letterData.ps;
    },

    // 7.2 & 7.3 Seiten 2 & 3: Polaroids (aufgeteilt auf 2 Seiten für Mobile!)
    renderPolaroidsPart1: function () {
      var list = this.cfg.polaroidsPart1 || [];
      var grid = document.getElementById('polaroids-grid-part1');
      if (grid) this.fillPolaroidGrid(grid, list);
    },

    renderPolaroidsPart2: function () {
      var list = this.cfg.polaroidsPart2 || [];
      var grid = document.getElementById('polaroids-grid-part2');
      if (grid) this.fillPolaroidGrid(grid, list);
    },

    fillPolaroidGrid: function (gridEl, list) {
      var self = this;
      gridEl.innerHTML = '';

      list.forEach(function (item) {
        var card = document.createElement('div');
        card.className = 'polaroid-card';
        card.style.setProperty('--card-rotation', (item.rotation || 0) + 'deg');

        var tapeEggAttr = item.secretEggClue ? ' data-egg-trigger="egg-pin" title="Klick auf das Band..."' : '';

        card.innerHTML =
          '<div class="polaroid-inner">' +
            '<div class="washi-tape ' + (item.tapeColor || 'rose') + '"' + tapeEggAttr + '></div>' +
            // Vorderseite
            '<div class="polaroid-face polaroid-front">' +
              '<div class="polaroid-photo-area">' +
                '<span class="photo-emoji">' + (item.frontEmoji || '📷') + '</span>' +
              '</div>' +
              '<div class="polaroid-caption">' +
                '<h4 class="polaroid-title">' + item.title + '</h4>' +
                '<p class="polaroid-text">' + item.frontCaption + '</p>' +
                '<div class="polaroid-date-tag">' + item.date + '</div>' +
              '</div>' +
              '<div class="polaroid-flip-hint">↻ Tippen zum Umdrehen</div>' +
            '</div>' +
            // Rückseite
            '<div class="polaroid-face polaroid-back">' +
              '<div class="polaroid-back-content">' +
                '<div class="back-pin">📌</div>' +
                '<span class="back-date">' + (item.backDate || item.date) + '</span>' +
                '<p class="back-note">' + item.backNote + '</p>' +
                '<div class="back-signature">Für immer wir ❤️</div>' +
              '</div>' +
              '<div class="polaroid-flip-hint">↺ Zurückdrehen</div>' +
            '</div>' +
          '</div>';

        card.addEventListener('click', function (e) {
          if (e.target.closest('[data-egg-trigger="egg-pin"]')) return;
          self.sound.playTick();
          card.classList.toggle('is-flipped');
        });

        gridEl.appendChild(card);
      });
    },

    // 7.4 Seite 4: Gutscheine (Smartphone-Tickets)
    renderVouchers: function () {
      var self = this;
      var list = this.cfg.vouchers || [];
      var container = document.getElementById('vouchers-mobile-list');
      if (!container) return;

      container.innerHTML = '';

      list.forEach(function (v) {
        var isRedeemed = window.AdventStorage.isVoucherRedeemed(v.id);
        var info = window.AdventStorage.getRedeemedVoucherInfo(v.id);

        var card = document.createElement('div');
        card.className = 'voucher-card' + (isRedeemed ? ' is-redeemed' : '');
        card.id = 'voucher-card-' + v.id;

        card.innerHTML =
          '<div class="voucher-top">' +
            '<div class="voucher-icon-badge">' + v.icon + '</div>' +
            '<div class="voucher-meta">' +
              '<span class="voucher-category">' + v.category + '</span>' +
              '<h4 class="voucher-title">' + v.title + '</h4>' +
            '</div>' +
            '<span class="voucher-tag">' + v.badge + '</span>' +
          '</div>' +
          '<div class="voucher-perforation"></div>' +
          '<div class="voucher-bottom">' +
            '<p class="voucher-desc">' + v.description + '</p>' +
            '<div class="voucher-action-row">' +
              '<span class="voucher-validity">⏱️ ' + v.validUntil + '</span>' +
              '<button class="voucher-redeem-btn" ' + (isRedeemed ? 'disabled' : '') + '>' +
                (isRedeemed ? '✓ Eingelöst' : 'Jetzt einlösen') +
              '</button>' +
            '</div>' +
            (isRedeemed ? '<button class="voucher-undo-btn">Wieder freigeben</button>' : '') +
          '</div>' +
          // Vintage-Stempel
          '<div class="vintage-stamp ' + (isRedeemed ? 'visible' : '') + '">' +
            '<span class="stamp-border">' +
              '<span class="stamp-text">EINGELÖST</span>' +
              '<span class="stamp-date">' + (info ? info.redeemedAt : '24.12.2024') + '</span>' +
            '</span>' +
          '</div>';

        var redeemBtn = card.querySelector('.voucher-redeem-btn');
        if (redeemBtn && !isRedeemed) {
          redeemBtn.addEventListener('click', function () {
            self.redeemVoucherAction(v, card);
          });
        }

        var undoBtn = card.querySelector('.voucher-undo-btn');
        if (undoBtn) {
          undoBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            window.AdventStorage.unredeemVoucher(v.id);
            self.sound.playTick();
            self.renderVouchers();
          });
        }

        container.appendChild(card);
      });
    },

    redeemVoucherAction: function (v, card) {
      var self = this;
      var success = window.AdventStorage.redeemVoucher(v.id);
      if (!success) return;

      this.sound.playStamp();
      var rect = card.getBoundingClientRect();
      ParticleSystem.burst(50, rect.left + rect.width / 2, rect.top + rect.height / 2);

      card.classList.add('stamping');
      setTimeout(function () {
        self.renderVouchers();
        self.showRedeemNotification(v);
      }, 350);
    },

    showRedeemNotification: function (v) {
      var modal = document.getElementById('redeem-confirm-modal');
      if (!modal) return;

      var titleEl = modal.querySelector('.modal-voucher-title');
      var descEl = modal.querySelector('.modal-voucher-desc');
      if (titleEl) titleEl.textContent = v.title;
      if (descEl) descEl.textContent = 'Gutschein erfolgreich eingelöst! Zeige ihn mir einfach vor – dein Wunsch wird erfüllt ❤️';

      modal.classList.add('is-open');
    },

    // 7.5 Seite 5: Date-Night-Generator (erweiterte riesige Liste)
    renderDateNightGenerator: function () {
      var self = this;
      var genData = this.cfg.dateNightGenerator;
      if (!genData) return;

      var actEl = document.getElementById('dn-activity-text');
      var foodEl = document.getElementById('dn-food-text');
      var vibeEl = document.getElementById('dn-vibe-text');
      var spinBtn = document.getElementById('spin-date-btn');
      var saveBtn = document.getElementById('save-date-btn');
      var savedCard = document.getElementById('saved-date-card');

      var currentRoll = null;

      var saved = window.AdventStorage.getSavedDateNight();
      if (saved && savedCard) {
        this.displaySavedDate(saved);
      }

      if (spinBtn) {
        spinBtn.addEventListener('click', function () {
          self.rollDateNight(genData, actEl, foodEl, vibeEl, function (result) {
            currentRoll = result;
            if (saveBtn) saveBtn.classList.remove('hidden');
          });
        });
      }

      if (saveBtn) {
        saveBtn.addEventListener('click', function () {
          if (!currentRoll) return;
          window.AdventStorage.saveDateNight(currentRoll);
          self.sound.playChime();
          ParticleSystem.burst(50);
          self.displaySavedDate(currentRoll);
          saveBtn.classList.add('hidden');
        });
      }
    },

    rollDateNight: function (genData, actEl, foodEl, vibeEl, onComplete) {
      var self = this;
      var activities = genData.activities || [];
      var foods = genData.food || [];
      var vibes = genData.vibes || [];

      var spinBtn = document.getElementById('spin-date-btn');
      if (spinBtn) spinBtn.disabled = true;

      var step = 0;
      var maxSteps = 16;
      var intervalTime = 50;

      function stepRoll() {
        var rAct = activities[Math.floor(Math.random() * activities.length)];
        var rFood = foods[Math.floor(Math.random() * foods.length)];
        var rVibe = vibes[Math.floor(Math.random() * vibes.length)];

        if (actEl) actEl.innerHTML = '<span class="roll-emoji">' + rAct.emoji + '</span> ' + rAct.text;
        if (foodEl) foodEl.innerHTML = '<span class="roll-emoji">' + rFood.emoji + '</span> ' + rFood.text;
        if (vibeEl) vibeEl.innerHTML = '<span class="roll-emoji">' + rVibe.emoji + '</span> ' + rVibe.text;

        self.sound.playTick();

        step++;
        if (step < maxSteps) {
          setTimeout(stepRoll, intervalTime + step * 10);
        } else {
          if (spinBtn) spinBtn.disabled = false;
          self.sound.playChime();
          ParticleSystem.burst(40);
          if (onComplete) {
            onComplete({
              activity: rAct,
              food: rFood,
              vibe: rVibe,
              dateStr: new Date().toLocaleDateString('de-DE')
            });
          }
        }
      }

      stepRoll();
    },

    displaySavedDate: function (dateObj) {
      var savedCard = document.getElementById('saved-date-card');
      if (!savedCard) return;

      savedCard.innerHTML =
        '<div class="saved-date-header">' +
          '<span class="pin-icon">📌</span>' +
          '<h4>Unser vorgemerkter Date-Plan</h4>' +
          '<button id="clear-saved-date-btn" class="clear-btn" title="Löschen">&times;</button>' +
        '</div>' +
        '<ul class="saved-date-list">' +
          '<li><strong>Aktivität:</strong> ' + dateObj.activity.emoji + ' ' + dateObj.activity.text + '</li>' +
          '<li><strong>Essen:</strong> ' + dateObj.food.emoji + ' ' + dateObj.food.text + '</li>' +
          '<li><strong>Vibe:</strong> ' + dateObj.vibe.emoji + ' ' + dateObj.vibe.text + '</li>' +
        '</ul>';

      savedCard.classList.remove('hidden');

      var self = this;
      var clearBtn = document.getElementById('clear-saved-date-btn');
      if (clearBtn) {
        clearBtn.addEventListener('click', function () {
          window.AdventStorage.saveDateNight(null);
          savedCard.classList.add('hidden');
          self.sound.playTick();
        });
      }
    },

    // 7.6 Seite 6: Beziehungs-Quiz
    renderQuiz: function () {
      var self = this;
      var quizData = this.cfg.quiz;
      if (!quizData) return;

      var container = document.getElementById('quiz-container');
      if (!container) return;

      var state = window.AdventStorage.getQuizState();
      var questions = quizData.questions || [];

      container.innerHTML = '';
      var allCorrect = true;

      questions.forEach(function (q, qIndex) {
        var card = document.createElement('div');
        card.className = 'quiz-question-card';
        card.id = 'quiz-q-' + qIndex;

        var selectedAnswer = state.answers ? state.answers[qIndex] : undefined;
        var isAnswered = selectedAnswer !== undefined;
        var isCorrect = isAnswered && selectedAnswer === q.correctIndex;

        if (!isCorrect) allCorrect = false;

        var optionsHtml = '';
        q.options.forEach(function (opt, optIndex) {
          var isThisSelected = selectedAnswer === optIndex;
          var statusClass = '';
          if (isAnswered) {
            if (optIndex === q.correctIndex) statusClass = 'correct-opt';
            else if (isThisSelected) statusClass = 'wrong-opt';
          }

          optionsHtml +=
            '<button class="quiz-option-btn ' + statusClass + '" data-q="' + qIndex + '" data-opt="' + optIndex + '">' +
              '<span class="option-marker">' + String.fromCharCode(65 + optIndex) + '</span>' +
              '<span class="option-text">' + opt + '</span>' +
            '</button>';
        });

        var feedbackHtml = '';
        if (isAnswered) {
          feedbackHtml =
            '<div class="quiz-feedback ' + (isCorrect ? 'is-correct' : 'is-wrong') + '">' +
              '<span class="feedback-icon">' + (isCorrect ? '❤️' : '💭') + '</span> ' +
              '<span class="feedback-text">' + (isCorrect ? q.sweetReaction : 'Fast! Probier es noch einmal – ich weiß, dass du es weißt!') + '</span>' +
            '</div>';
        }

        card.innerHTML =
          '<div class="quiz-q-header">' +
            '<span class="quiz-q-number">Frage ' + (qIndex + 1) + ' von ' + questions.length + '</span>' +
          '</div>' +
          '<h4 class="quiz-q-title">' + q.question + '</h4>' +
          '<div class="quiz-options-group">' + optionsHtml + '</div>' +
          '<div class="feedback-slot">' + feedbackHtml + '</div>';

        var btns = card.querySelectorAll('.quiz-option-btn');
        btns.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var chosenOpt = parseInt(btn.getAttribute('data-opt'), 10);
            self.handleQuizAnswer(qIndex, chosenOpt);
          });
        });

        container.appendChild(card);
      });

      var banner = document.getElementById('quiz-completion-banner');
      if (banner) {
        if (allCorrect && questions.length > 0) {
          banner.classList.remove('hidden');
          var compTitle = banner.querySelector('.comp-title');
          var compMsg = banner.querySelector('.comp-msg');
          if (compTitle) compTitle.textContent = quizData.completionTitle;
          if (compMsg) compMsg.textContent = quizData.completionMessage;
        } else {
          banner.classList.add('hidden');
        }
      }
    },

    handleQuizAnswer: function (qIndex, optIndex) {
      var quizData = this.cfg.quiz;
      var q = quizData.questions[qIndex];
      var isCorrect = optIndex === q.correctIndex;

      var state = window.AdventStorage.getQuizState();
      state.answers = state.answers || {};
      state.answers[qIndex] = optIndex;
      window.AdventStorage.saveQuizState(state);

      if (isCorrect) {
        this.sound.playChime();
        ParticleSystem.burst(30);
      } else {
        this.sound.playTick();
      }

      this.renderQuiz();
    },

    // 7.7 Seite 7: Notfall-Knopf & Der Kuschelbär
    renderEmergencySection: function () {
      var self = this;
      var emData = this.cfg.emergency;
      if (!emData) return;

      var titleEl = document.getElementById('emergency-title');
      var subtitleEl = document.getElementById('emergency-subtitle');
      var sosBtn = document.getElementById('emergency-sos-button');

      if (titleEl) titleEl.textContent = emData.title;
      if (subtitleEl) subtitleEl.textContent = emData.subtitle;

      if (sosBtn) {
        sosBtn.addEventListener('click', function () {
          self.sound.playChime();
          ParticleSystem.burst(60);
          self.openEmergencyModal();
        });
      }
    },

    openEmergencyModal: function () {
      var self = this;
      var emData = this.cfg.emergency;
      var modal = document.getElementById('emergency-modal');
      if (!modal || !emData) return;

      var phraseEl = modal.querySelector('.emergency-quote-text');
      var nextPhraseBtn = modal.querySelector('.next-quote-btn');
      var callBtn = modal.querySelector('.emergency-call-btn');
      var waBtn = modal.querySelector('.emergency-wa-btn');
      var hugBtn = modal.querySelector('.emergency-hug-btn');
      var listEl = modal.querySelector('.emergency-checklist');

      if (callBtn) {
        callBtn.href = 'tel:' + (emData.phone || '');
        callBtn.textContent = '📞 Anrufen (' + (emData.phoneDisplay || emData.phone) + ')';
      }
      if (waBtn) {
        var encodedMsg = encodeURIComponent(emData.whatsappMessage || 'Ich vermisse dich! ❤️');
        waBtn.href = 'https://wa.me/' + (emData.whatsappNumber || '') + '?text=' + encodedMsg;
        waBtn.target = '_blank';
      }

      if (listEl && emData.sosList) {
        listEl.innerHTML = '';
        emData.sosList.forEach(function (item) {
          var li = document.createElement('li');
          li.textContent = item;
          listEl.appendChild(li);
        });
      }

      var phrases = emData.comfortPhrases || [];
      var phraseIndex = 0;
      function updatePhrase() {
        if (phraseEl && phrases.length > 0) {
          phraseEl.textContent = '„' + phrases[phraseIndex] + '“';
        }
      }
      updatePhrase();

      if (nextPhraseBtn) {
        nextPhraseBtn.onclick = function () {
          self.sound.playTick();
          phraseIndex = (phraseIndex + 1) % phrases.length;
          updatePhrase();
        };
      }

      // Klick auf "Virtuelle Umarmung abholen" -> Startet den Kuschelbären!
      if (hugBtn) {
        hugBtn.onclick = function () {
          modal.classList.remove('is-open');
          self.startBearHugExperience();
        };
      }

      modal.classList.add('is-open');
    },

    // =======================================================================
    // 8. Der erlebnisreiche Kuschelbär (Walks on screen & hugs!)
    // =======================================================================
    startBearHugExperience: function () {
      var self = this;
      var overlay = document.getElementById('bear-hug-overlay');
      if (!overlay) return;

      overlay.classList.add('is-active');
      overlay.classList.remove('fade-out');

      // Herzschlag-Audio starten
      this.sound.playHeartbeat();
      setTimeout(function () { self.sound.playHeartbeat(); }, 1200);
      setTimeout(function () { self.sound.playHeartbeat(); }, 2400);

      var bear = overlay.querySelector('.cuddle-bear-character');
      var bubble = overlay.querySelector('.bear-speech-bubble');
      var heartGlow = overlay.querySelector('.bear-hug-glow');

      // Animation-Sequenz:
      // Schritt 1: Bär watschelt herein
      if (bear) bear.className = 'cuddle-bear-character bear-walk-in';

      // Schritt 2: Nach 1 Sekunde öffnet er die Arme für die Riesen-Umarmung
      setTimeout(function () {
        if (bear) bear.className = 'cuddle-bear-character bear-hugging';
        if (heartGlow) heartGlow.classList.add('glow-pulse');
        ParticleSystem.burst(70);
        self.sound.playChime();
      }, 1100);

      // Schritt 3: Sprechblase erscheint
      setTimeout(function () {
        if (bubble) bubble.classList.add('is-visible');
        ParticleSystem.burst(40);
      }, 1900);

      // Button zum Schließen oder noch einmal umarmen
      var closeBearBtn = document.getElementById('close-bear-btn');
      if (closeBearBtn) {
        closeBearBtn.onclick = function () {
          overlay.classList.add('fade-out');
          setTimeout(function () {
            overlay.classList.remove('is-active', 'fade-out');
            if (bubble) bubble.classList.remove('is-visible');
            if (heartGlow) heartGlow.classList.remove('glow-pulse');
            if (bear) bear.className = 'cuddle-bear-character';
          }, 500);
        };
      }
    },

    // =======================================================================
    // 9. Modals & Popups
    // =======================================================================
    initModals: function () {
      var self = this;
      var closeBtns = document.querySelectorAll('.modal-close, .modal-backdrop');
      closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          var modal = btn.closest('.scrapbook-modal');
          if (modal) {
            modal.classList.remove('is-open');
            self.sound.playTick();
          }
        });
      });

      window.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          var openModals = document.querySelectorAll('.scrapbook-modal.is-open');
          openModals.forEach(function (m) {
            m.classList.remove('is-open');
          });
        }
      });
    }
  };

  window.AdventApp = AdventApp;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      AdventApp.init();
    });
  } else {
    AdventApp.init();
  }

})(window, document);
