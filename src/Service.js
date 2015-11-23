CUORE.Service = CUORE.Class(null, {

    init: function () {
        this.name = 'ABSTRACT';
        this.executionPrefix = 'EXECUTED';
        this.SEPARATOR = '_';
        this.baseURL = '';
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
        CUORE.Core.request(url, paramsData, callback);
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

    getBaseURL: function () {
        return this.baseURL;
    },

    setBaseURL: function (baseURL) {
        this.baseURL = baseURL;
    },

    _responseCallback: function(eventName) {
        var emit = this.emit;

        var callback= function(response) {
            this.emit(eventName, response);
        }
        return CUORE.Core.bind(this,callback);;
    }
});