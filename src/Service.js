CUORE.Service = CUORE.Class(null, {

    init: function () {
        this.name = 'ABSTRACT';
        this.executionPrefix = 'EXECUTED';
        this.SEPARATOR = '_';
    },

    execute: function (procedure, params) {
        var eventName = this.getEventNameForExecution(procedure);
        this[procedure](params, eventName);
    },

    request: function (url, params, eventName) {
        var paramsData = this.wrapRequest(params)

        var callback = this._responseCallback(eventName);
        this._doRequest(url, paramsData, callback);
    },

    wrapRequest: function(params) {
        return params;
    },

    wrapResponse: function(response) {
        return response;
    },

    _doRequest: function (url, paramsData, callback)
    {
        return undefined;
    },

    emit: function (eventName, response) {
        var theMessage = this.wrapResponse(response);
        CUORE.Bus.emit(eventName, theMessage);
    },

    getEventNameForExecution: function (procedure) {
        return this.getName() + this.SEPARATOR + procedure + this.SEPARATOR + this.executionPrefix;
    },

    getName: function () {
        return this.name;
    },

    _responseCallback: function(eventName) {
        var self = this;

        var callback = function(response) {
            self.emit(eventName, response);
        }

        return callback;
    }
});

CUORE.Services.Get = CUORE.Class(CUORE.Service, {
    _doRequest: function (url, paramsData, callback){
        CUORE.Requests.GET(url, paramsData, callback);
    },
});

CUORE.Services.JSONP = CUORE.Class(CUORE.Service, {
    _doRequest: function (url, paramsData, callback) {
        CUORE.Requests.JSONP(url, paramsData, callback);
    },
});

CUORE.Services.POST = CUORE.Class(CUORE.Service, {
    _doRequest: function (url, paramsData, callback) {
        CUORE.Requests.POST(url, paramsData, callback);
    },
});