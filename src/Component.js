CUORE.Component = CUORE.Class(null, {

    init: function() {
        this.eventHandler = new CUORE.EventHandler();
        this.name = this._generateUUID();
        this.procedure = 'nullProcedure';
        this.SEPARATOR = '_';
        this.labels = {};
        this.enabled = true;
        this.initialize();
    },

    initialize: function() {
        this._startState();
        this._internationalize();
        this._wireEvents();
        this._declareRenderer();
    },

    setDirectory: function(directory) {
        this.services = directory;
        this.requestLabelText();
    },

    draw: function() {
    },

    updateRender: function() {
        if(!this.container) return;
        this.draw();
    },


    destroy: function() {
        CUORE.Bus.unsubscribe(this, this.getManagedEvents());
    },

    execute: function(theService, theProcedure, params, asynchronous) {
        if (!this.services) throw new Error("Cannot call service. A service directory is not configured");
        this.services.execute(theService, theProcedure, params, asynchronous);
    },

    eventDispatch: function(eventName, params) {
        this.eventHandler.notify(eventName, params);
    },

    dispatchWith: function(callback, eventName) {
        this.eventHandler.register(eventName, callback);
        CUORE.Bus.subscribe(this, eventName);
    },

    dispatchUsing: function(procedureName, eventName) {
        this.dispatchWith(this.generateCallback(procedureName), eventName);
    },

    generateCallback: function(procedureName){
        var self = this;
        var callback = function(response) {
            self[procedureName].call(self, response);
        };
        return callback;
    },

    getText: function(key) {
        if(!key) return null;

        return this.labels[key];
    },

    getName: function() {
        return this.name;
    },

    setName: function(aName) {
        this.name = aName;
    },

    setContainer: function(container) {
      this.container=container
    },

    getManagedEvents: function() {
        return this.eventHandler.getManagedEvents();
    },

    setText: function(aKey, aText) {
        this.labels[aKey] = aText;
        this.updateRender();
    },

    setI18NKey: function(key) {
        if (!key) return;

        this.setText(key, key);

        var self = this;
        var callback = function(response) {
            self.updateTextFrom(response);
        };
        this.dispatchWith(callback, 'LABELS_getLabel_EXECUTED_' + key);
        this.requestLabelText(key);
    },

    updateTextFrom: function(response){
        var text = response.text;
        var key = response.key;

        if (text && key) this.setText(key, text);
    },

    requestLabelText: function(aKey) {

        if(!aKey){
            for(var key in this.labels){
                this._executeLabelsService(key);
            }
        }
        else{
           this._executeLabelsService(aKey);
        }
    },

    _executeLabelsService:function(aKey){
        if (!this.services) return;
         this.services.execute("LABELS", 'getLabel', {
                key: aKey
            }, true);
    },

    isEnabled: function() {
        return this.enabled;
    },

    enable: function() {
        this.enabled = true;
        this.updateRender();
    },

    disable: function() {
        this.enabled = false;
        this.updateRender();
    },


    onEnvironmentUp: function() {},

    _generateUUID: function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    _startState: function() {
    },

    _internationalize: function() {
    },

    _wireEvents: function() {
    },

    _declareRenderer: function(){
        this.renderer = {
            doRender: function(){
                throw "you need to implement 'doRender' in your Component renderers";
            }
        };
    }

});