CUORE.Directory = CUORE.Class(null, {

    init: function(baseURL) {
        this.listing = [];
        this.services = {};

        this.setBaseURL(baseURL);
        this._addBuiltinServices();
    },

    add: function(aService) {
        var serviceName = aService.getName();
        this.listing.push(serviceName);

        aService.setBaseURL(this.baseURL);
        this.services[serviceName] = aService;
    },

    execute: function(serviceName, procedureName, params) {
        this.getService(serviceName).execute(procedureName, params);
    },

    getService: function(serviceName) {
        var service = this._findService(serviceName);
        return service || new CUORE.Null();
    },

    setBaseURL: function(baseURL) {
        this.baseURL = baseURL || '';
        var serviceNames = this.listing;
        var numberOfServices = serviceNames.length;

        for (var i = 0; i < numberOfServices; i++) {
            this._findService(serviceNames[i]).setBaseURL(this.baseURL);
        }
    },

    _findService: function(serviceName) {
        return this.services[serviceName];
    },

    _addBuiltinServices: function() {
        this.add(new CUORE.Label());
    }
});