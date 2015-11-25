EchoByGet = CUORE.Class(CUORE.Services.Get, {
    init: function() {
        EchoByGet.parent.init.call(this);
        this.name = 'GET';
    },

    echo: function (payload, eventName) {
        endpoint = 'http://urlecho.appspot.com/echo';
        this.request(endpoint, {body: payload}, eventName);
    },

});