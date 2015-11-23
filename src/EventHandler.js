CUORE.EventHandler = CUORE.Class(null, {

    init: function() {
        this.eventNames = [];
        this.callbackFor = {};
    },

    register: function(eventName, callback) {
        if (!this._contains(eventName)) {
            this.eventNames.push(eventName);
        }

        var callbackFor = this.callbackFor[eventName] || (this.callbackFor[eventName] = []);
        callbackFor.push(callback);
    },

    getManagedEvents: function() {
        return this.eventNames;
    },
    
    notify: function(eventName, eventData) {
        var toNotify = this.callbackFor[eventName];
        if (toNotify) this._notify(toNotify,eventData);
    },
    
    _notify: function(toNotify, eventData) {
        for (var i = 0, len = toNotify.length; i < len; i++) {
            this._safeNotification(toNotify[i], eventData);
        }
    },
    
    _safeNotification: function(callback, eventData) {
        callback(eventData);
    },

    _contains: function(eventName) {
        var result = false;

        for (var i = 0, len = this.eventNames.length; i < len; i++) {
            if (this.eventNames[i] === eventName) {
                result = true;
                break;
            }
        }
        return result;
    }
});