"use strict";

CUORE.StatePersister = {
  save: function(key, value) {
    window.localStorage.setItem(key, value);
  },

  retrieve: function(key) {
    var value = window.localStorage.getItem(key);

    if (value === null) {
      return;
    }

    return value;
  },

  remove: function(key) {
    window.localStorage.removeItem(key);
  }
};