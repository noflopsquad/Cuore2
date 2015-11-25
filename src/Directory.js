CUORE.Directory = CUORE.Class(null, {

    init: function() {
        this.listing = [];
        this.services = {};

        this._addBuiltinServices();
    },

    add: function(aService) {
        var serviceName = aService.getName();
        this.listing.push(serviceName);

        this.services[serviceName] = aService;
    },

    execute: function(serviceName, procedureName, params) {
        this.getService(serviceName).execute(procedureName, params);
    },

    getService: function(serviceName) {
        var service = this._findService(serviceName);
        return service || new CUORE.Null();
    },

    _findService: function(serviceName) {
        return this.services[serviceName];
    },

    _addBuiltinServices: function() {
        this.add(new CUORE.Label());
    }
});