EchoByPost = CUORE.Class(CUORE.Services.POST, {
    init: function() {
        EchoByPost.parent.init.call(this);
        this.name = 'POST';
    },

    echo: function (payload, eventName) {
        endpoint = 'http://httpbin.org/post';
        this.request(endpoint, payload, eventName);
    },

});