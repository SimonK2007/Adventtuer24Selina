/**
 * easter-eggs.js - Tracking & Trigger für die 5 versteckten Easter Eggs
 */

(function (window) {
  'use strict';

  var keyBuffer = '';
  var sealClickCount = 0;
  var sealClickTimer = null;

  var EasterEggs = {
    init: function () {
      this.bindTriggers();
      this.updateCounterBadge();
    },

    bindTriggers: function () {
      var self = this;

      // 1. Tastatur-Code: Lauschen auf "LOVE" oder "24"
      window.addEventListener('keydown', function (e) {
        if (!e.key || e.key.length > 1) return;
        if (e.target && e.target.id === 'secret-code-input') return;
        if (window.AdventApp && typeof window.AdventApp.isTimeUnlocked === 'function' && !window.AdventApp.isTimeUnlocked()) return;

        var char = e.key.toUpperCase();
        keyBuffer += char;
        if (keyBuffer.length > 20) {
          keyBuffer = keyBuffer.slice(-20);
        }

        if (keyBuffer.indexOf('LOVE') !== -1 || keyBuffer.indexOf('24') !== -1) {
          keyBuffer = '';
          self.triggerEgg('egg-code');
        }
      });

      // 2. Klick auf den Easter-Egg-Badge im Header -> öffnet Übersicht
      var badgeBtn = document.getElementById('easter-egg-badge');
      if (badgeBtn) {
        badgeBtn.addEventListener('click', function () {
          self.openEggModal();
        });
      }

      // 3. Event-Delegation für dynamische Klick-Trigger
      document.addEventListener('click', function (e) {
        // Buch-Siegel / Ex-Libris Etikett (Easter Egg #1)
        var stampTarget = e.target.closest('[data-egg-trigger="egg-stamp"]');
        if (stampTarget) {
          e.preventDefault();
          self.triggerEgg('egg-stamp');
          return;
        }

        // Eselsohr / Papierecke (Easter Egg #2)
        var cornerTarget = e.target.closest('[data-egg-trigger="egg-corner"]');
        if (cornerTarget) {
          e.preventDefault();
          self.triggerCornerSecret(cornerTarget);
          return;
        }

        // Glitzernde Washi-Klammer (Easter Egg #3)
        var pinTarget = e.target.closest('[data-egg-trigger="egg-pin"]');
        if (pinTarget) {
          e.preventDefault();
          self.triggerEgg('egg-pin');
          return;
        }

        // Mehrfach-Klick auf das Mini-Siegel im Header (Easter Egg #5)
        var sealTarget = e.target.closest('[data-egg-trigger="egg-seal"]');
        if (sealTarget) {
          sealClickCount++;
          if (sealClickTimer) clearTimeout(sealClickTimer);
          
          if (sealClickCount >= 5) {
            sealClickCount = 0;
            self.triggerEgg('egg-seal');
          } else {
            sealClickTimer = setTimeout(function () {
              sealClickCount = 0;
            }, 2500);
          }
        }
      });
    },

    // Spezieller Ablauf für das Eselsohr: Realistisches Aufklappen & Geheimnis-Briefchen
    triggerCornerSecret: function (cornerEl) {
      if (cornerEl) {
        cornerEl.classList.add('is-peeled');
      }

      // Ton & Partikel
      if (window.AdventApp && window.AdventApp.sound) {
        window.AdventApp.sound.playSealBreak();
      }

      // Egg triggern
      this.triggerEgg('egg-corner');

      // Nach kurzer Entfalt-Animation das geheime Liebesbriefchen öffnen
      setTimeout(function () {
        var secretModal = document.getElementById('secret-corner-modal');
        if (secretModal) {
          secretModal.classList.add('is-open');
        }
      }, 350);
    },

    getEggData: function (eggId) {
      var eggs = (window.ADVENT_CONFIG && window.ADVENT_CONFIG.easterEggs) || [];
      for (var i = 0; i < eggs.length; i++) {
        if (eggs[i].id === eggId) return eggs[i];
      }
      return null;
    },

    triggerEgg: function (eggId) {
      if (window.AdventApp && typeof window.AdventApp.isTimeUnlocked === 'function' && !window.AdventApp.isTimeUnlocked()) {
        return;
      }
      var eggData = this.getEggData(eggId);
      if (!eggData) return;

      var isNew = window.AdventStorage.unlockEasterEgg(eggId);

      // Sound & Konfetti
      if (window.AdventApp && window.AdventApp.sound) {
        window.AdventApp.sound.playChime();
      }
      if (window.AdventApp && window.AdventApp.triggerHeartBurst) {
        window.AdventApp.triggerHeartBurst(45);
      }

      this.updateCounterBadge();
      this.showToast(eggData, isNew);

      // Prüfen, ob jetzt alle 5 gefunden wurden!
      var discovered = window.AdventStorage.getDiscoveredEasterEggs();
      var total = (window.ADVENT_CONFIG && window.ADVENT_CONFIG.easterEggs) ? window.ADVENT_CONFIG.easterEggs.length : 5;
      if (isNew && discovered.length >= total) {
        var self = this;
        setTimeout(function () {
          self.showAllDiscoveredCelebration();
        }, 1200);
      }
    },

    updateCounterBadge: function () {
      var badge = document.getElementById('easter-egg-badge');
      if (!badge) return;

      var discovered = window.AdventStorage.getDiscoveredEasterEggs();
      var total = (window.ADVENT_CONFIG && window.ADVENT_CONFIG.easterEggs) ? window.ADVENT_CONFIG.easterEggs.length : 5;

      var countEl = badge.querySelector('.badge-count');
      if (countEl) {
        countEl.textContent = discovered.length + '/' + total;
      }
      if (discovered.length >= total) {
        badge.classList.add('all-unlocked');
      }
    },

    showToast: function (eggData, isNew) {
      var container = document.getElementById('toast-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
      }

      var toast = document.createElement('div');
      toast.className = 'scrapbook-toast' + (isNew ? ' new-discovery' : ' already-known');
      toast.innerHTML =
        '<div class="toast-icon">' + eggData.icon + '</div>' +
        '<div class="toast-content">' +
          '<div class="toast-badge">' + (isNew ? '✨ Neues Geheimnis gelüftet!' : '🗝️ Bereits entdeckt') + '</div>' +
          '<h4 class="toast-title">' + eggData.title + '</h4>' +
          '<p class="toast-text">' + eggData.reward + '</p>' +
        '</div>' +
        '<button class="toast-close" aria-label="Schließen">&times;</button>';

      var closeBtn = toast.querySelector('.toast-close');
      closeBtn.addEventListener('click', function () {
        toast.classList.add('toast-hide');
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      });

      container.appendChild(toast);

      // Auto-Remove nach 6 Sekunden
      setTimeout(function () {
        if (toast.parentNode) {
          toast.classList.add('toast-hide');
          setTimeout(function () {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
          }, 300);
        }
      }, 6000);
    },

    openEggModal: function () {
      var discovered = window.AdventStorage.getDiscoveredEasterEggs();
      var allEggs = (window.ADVENT_CONFIG && window.ADVENT_CONFIG.easterEggs) || [];
      var modal = document.getElementById('easter-egg-modal');
      if (!modal) return;

      var listEl = modal.querySelector('.egg-list');
      if (listEl) {
        listEl.innerHTML = '';
        allEggs.forEach(function (egg, index) {
          var isFound = discovered.indexOf(egg.id) !== -1;
          var item = document.createElement('div');
          item.className = 'egg-list-item ' + (isFound ? 'found' : 'locked');
          item.innerHTML =
            '<div class="egg-item-icon">' + (isFound ? egg.icon : '🔒') + '</div>' +
            '<div class="egg-item-details">' +
              '<div class="egg-item-header">' +
                '<span class="egg-number">Geheimnis #' + (index + 1) + '</span>' +
                '<span class="egg-status-tag">' + (isFound ? 'Gelüftet' : 'Noch verborgen') + '</span>' +
              '</div>' +
              '<h4 class="egg-item-title">' + (isFound ? egg.title : 'Versteckter Hinweis...') + '</h4>' +
              '<p class="egg-item-desc">' + (isFound ? egg.reward : '💡 Hinweis: ' + egg.hint) + '</p>' +
            '</div>';
          listEl.appendChild(item);
        });
      }

      var progressText = modal.querySelector('.egg-modal-progress');
      if (progressText) {
        progressText.textContent = discovered.length + ' von ' + allEggs.length + ' Geheimnissen gefunden';
      }

      modal.classList.add('is-open');
    },

    showAllDiscoveredCelebration: function () {
      if (window.AdventApp && window.AdventApp.triggerHeartBurst) {
        window.AdventApp.triggerHeartBurst(150);
      }
      var modal = document.getElementById('all-eggs-modal');
      if (modal) {
        modal.classList.add('is-open');
      }
    }
  };

  window.AdventEasterEggs = EasterEggs;
})(window);
