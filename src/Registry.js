CUORE.Registry = CUORE.Class(null, {

    init: function() {
        this.components = [];
    },

    register: function(component) {
        if (!this._contains(component)) {
            this.components.push(component);
        }
    },

    _contains: function(component) {
        return (this.components.indexOf(component) !== -1);
    },

    _size: function() {
        return this.components.length;
    },

    _each: function(callback) {
        var componentsLength = this._size();

        for (var position = 0; position < componentsLength; position++) {
            callback(this.components[position]);
        }
    },

    filterByName: function(name) {
        var selectedComponent = null;
        this._each(function(component) {
            if(component.getName() === name) selectedComponent = component;
        });
        return selectedComponent;
    },

    onEnvironmentUp: function(page){
        this._each(function(component) {
            component.onEnvironmentUp(page);
        });
    },

    drawAll: function(){
        this.components._each(function(component) {
            component.draw();
        });
    }
});