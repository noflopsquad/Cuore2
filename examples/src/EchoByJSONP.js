EchoByJSONP = CUORE.Class(CUORE.Services.JSONP, {
    init: function() {
        EchoByJSONP.parent.init.call(this);
        this.name = 'JSONP';
    },

    echo: function (payload, eventName) {
        endpoint = 'http://www.pureexample.com/backend/ajax_crossdomain.aspx';
        this.request(endpoint, payload, eventName);
    },

   	wrapResponse: function(callback) {
        return JSON.parse(callback)[0];
    },
});