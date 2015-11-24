EchoByGet = CUORE.Class(CUORE.Service, {
    init: function() {
        EchoByGet.parent.init.call(this);
        this.name = 'GET';
    },

    echo: function (payload, eventName) {
        endpoint = 'http://urlecho.appspot.com/echo';
        this.request(endpoint, {body: payload}, eventName);
    },

    _doRequest: function (url, paramsData, callback){
        CUORE.Core.requestGet(url, paramsData, callback);
    },

});