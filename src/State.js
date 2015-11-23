CUORE.State = CUORE.Class(null, {

    keys: undefined,
    map: undefined,
    persister: undefined,

    init: function() {
        this.keys = [];
        this.map = {};
        this.persister = CUORE.StatePersister;
    },

    hasKey: function(key) {
        return this.keys.indexOf(key) != -1;
    },

    delete: function(key) {
        this._removeKey(key);
        this.persister.remove(key);
    },

    retrieve: function(key) {
        if (!this.hasKey(key)) {
            return this._retrieve_from_persitence(key);
        }
        return this.map[key];
    },

    save: function(key, value) {
        if (key === undefined) return;

        if (should_delete(value)) {
            this.delete(key);
            return;
        }

        this._save_in_memory(key, value);
        this._persist(key, value);

        function should_delete(value) {
            return value === undefined || value === null;
        }
    },

    _addKey: function(key) {
        if (this.hasKey(key)) return;
        this.keys.push(key);
    },

    _removeKey: function(key) {
        this.keys.splice(this.keys.indexOf(key), 1);
    },

    _save_in_memory: function(key, value) {
        this._addKey(key);
        this.map[key] = value;
    },

    _persist: function(key, value) {
        this.persister.save(key, value);
    },

    _retrieve_from_persitence: function(key) {
        var value = this.persister.retrieve(key);
        this._save_in_memory(key, value);
        return value;
    }
});