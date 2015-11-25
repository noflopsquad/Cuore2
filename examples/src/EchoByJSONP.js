EchoByJSONP = CUORE.Class(CUORE.Service, {
    init: function() {
        EchoByJSONP.parent.init.call(this);
        this.name = 'JSONP';
    },

    echo: function (payload, eventName) {
        endpoint = 'http://www.pureexample.com/backend/ajax_crossdomain.aspx';
        this.request(endpoint, payload, eventName);
    },

   	_doRequest: function (url, paramsData, callback) {
        CUORE.Requests.JSONP(url, paramsData, callback);
    },

    wrapResponse: function(callback) {
        return JSON.parse(callback)[0];
    },

});