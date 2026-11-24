/**
 * storage.js - Verwaltung von localStorage für Gutscheine, Easter Eggs & Buch-Status
 * Enthält ein sicheres In-Memory Fallback, falls Cookies/Storage deaktiviert sind.
 */

(function (window) {
  'use strict';

  var STORAGE_PREFIX = 'advent24_';
  var memoryFallback = {};

  var storageAvailable = (function () {
    try {
      var testKey = '__advent_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      console.warn('localStorage nicht verfügbar, verwende In-Memory-Speicher.', e);
      return false;
    }
  })();

  function setItem(key, value) {
    var fullKey = STORAGE_PREFIX + key;
    var serialized = JSON.stringify(value);
    if (storageAvailable) {
      try {
        window.localStorage.setItem(fullKey, serialized);
        return;
      } catch (e) {
        console.error('Fehler beim Schreiben in localStorage:', e);
      }
    }
    memoryFallback[fullKey] = serialized;
  }

  function getItem(key, defaultValue) {
    var fullKey = STORAGE_PREFIX + key;
    var raw = null;
    if (storageAvailable) {
      try {
        raw = window.localStorage.getItem(fullKey);
      } catch (e) {
        console.error('Fehler beim Lesen aus localStorage:', e);
      }
    }
    if (raw === null && Object.prototype.hasOwnProperty.call(memoryFallback, fullKey)) {
      raw = memoryFallback[fullKey];
    }
    if (raw === null || raw === undefined) {
      return defaultValue !== undefined ? defaultValue : null;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error('Fehler beim Parsen der gespeicherten Daten für ' + key, e);
      return defaultValue !== undefined ? defaultValue : null;
    }
  }

  function removeItem(key) {
    var fullKey = STORAGE_PREFIX + key;
    if (storageAvailable) {
      try {
        window.localStorage.removeItem(fullKey);
      } catch (e) {
        console.error(e);
      }
    }
    delete memoryFallback[fullKey];
  }

  var AdventStorage = {
    // Zeitschloss-Bypass per geheimem Codewort
    isTimeLockBypassed: function () {
      return !!getItem('time_lock_bypassed', false);
    },
    setTimeLockBypassed: function (bypassed) {
      setItem('time_lock_bypassed', !!bypassed);
    },

    // Buch-Schloss Status (ob bereits entriegelt)
    isBookUnlocked: function () {
      return !!getItem('book_unlocked', false) || !!getItem('envelope_opened', false);
    },
    setBookUnlocked: function (unlocked) {
      setItem('book_unlocked', !!unlocked);
      setItem('envelope_opened', !!unlocked);
    },
    // Rückwärtskompatibilität
    isEnvelopeOpened: function () {
      return this.isBookUnlocked();
    },
    setEnvelopeOpened: function (opened) {
      this.setBookUnlocked(opened);
    },

    // Zuletzt besuchte Buchseite
    getLastPage: function () {
      return getItem('last_page', 0);
    },
    setLastPage: function (pageIndex) {
      setItem('last_page', pageIndex);
    },

    // Gutscheine
    getRedeemedVouchers: function () {
      return getItem('redeemed_vouchers', []);
    },
    isVoucherRedeemed: function (voucherId) {
      var list = this.getRedeemedVouchers();
      for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i].id === voucherId) {
          return true;
        }
      }
      return false;
    },
    getRedeemedVoucherInfo: function (voucherId) {
      var list = this.getRedeemedVouchers();
      for (var i = 0; i < list.length; i++) {
        if (list[i] && list[i].id === voucherId) {
          return list[i];
        }
      }
      return null;
    },
    redeemVoucher: function (voucherId) {
      var list = this.getRedeemedVouchers();
      if (this.isVoucherRedeemed(voucherId)) {
        return false;
      }
      var now = new Date();
      var dateStr = now.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
      list.push({
        id: voucherId,
        redeemedAt: dateStr,
        timestamp: Date.now()
      });
      setItem('redeemed_vouchers', list);
      return true;
    },
    unredeemVoucher: function (voucherId) {
      var list = this.getRedeemedVouchers();
      var filtered = list.filter(function (item) {
        return item.id !== voucherId;
      });
      setItem('redeemed_vouchers', filtered);
      return true;
    },

    // Easter Eggs
    getDiscoveredEasterEggs: function () {
      return getItem('easter_eggs', []);
    },
    isEasterEggDiscovered: function (eggId) {
      var eggs = this.getDiscoveredEasterEggs();
      return eggs.indexOf(eggId) !== -1;
    },
    unlockEasterEgg: function (eggId) {
      var eggs = this.getDiscoveredEasterEggs();
      if (eggs.indexOf(eggId) === -1) {
        eggs.push(eggId);
        setItem('easter_eggs', eggs);
        return true; // neu freigeschaltet
      }
      return false; // war bereits bekannt
    },

    // Date-Night Favoriten
    getSavedDateNight: function () {
      return getItem('saved_date_night', null);
    },
    saveDateNight: function (dateObj) {
      setItem('saved_date_night', dateObj);
    },

    // Quiz
    getQuizState: function () {
      return getItem('quiz_state', {
        completed: false,
        score: 0,
        answers: {}
      });
    },
    saveQuizState: function (state) {
      setItem('quiz_state', state);
    },

    // Audio-Mute Einstellung
    isMuted: function () {
      return !!getItem('audio_muted', false);
    },
    setMuted: function (muted) {
      setItem('audio_muted', !!muted);
    },

    // Zurücksetzen für Testzwecke
    resetAll: function () {
      removeItem('time_lock_bypassed');
      removeItem('book_unlocked');
      removeItem('envelope_opened');
      removeItem('last_page');
      removeItem('redeemed_vouchers');
      removeItem('easter_eggs');
      removeItem('saved_date_night');
      removeItem('quiz_state');
      removeItem('audio_muted');
    }
  };

  window.AdventStorage = AdventStorage;
})(window);
