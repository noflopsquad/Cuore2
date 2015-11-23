CUORE.Label = CUORE.Class(CUORE.Service, {

    init: function() {
        CUORE.Label.parent.init.call(this);

        this.name = 'LABELS';
        this.cache = document.labels || {};
        this.setLocale(navigator.language || navigator.browserLanguage);
    },

    setLocale: function(aLocale) {
        if (!aLocale) return;

        this.locale = aLocale;
        this.cache[this.locale] = this.cache[this.locale] || {};
    },

    getLabel: function(params, eventName) {
        if (!(params && params.key)) return;

        var eventNameWithKey = eventName + this.SEPARATOR + params.key;
        var cachedLabel = this.fromCache(params.key);

        if (cachedLabel) {
            var cachedResponse = {
                key: params.key,
                text: cachedLabel
            };
            
            CUORE.Label.parent.emit.call(this, eventNameWithKey, cachedResponse);
        } else {
            if (!params.locale) params.locale = this.locale;
            var url = this.getBaseURL() + '/labels/get';
            this.request(url, params, eventNameWithKey);
        }
    },

    fromCache: function(key) {
        return this.cache[this.locale][key];
    },

    feedCache: function(theKey, value) {
        if (value) {
            this.cache[this.locale][theKey] = value;
        }
    },

    emit: function(eventName, response) {
        var theKey = this.extractKey(eventName);
        if (!theKey) return;
        this.feedCache(theKey, response.text);
        var text = response.text || theKey;
        CUORE.Label.parent.emit.call(this, eventName, response);
    },

    extractKey: function(eventName) {
        var match = eventName.match(/_([a-zA-Z\.]*)$/);
        var theKey = match ? match[1] : null;

        return theKey;
    },

});