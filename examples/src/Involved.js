Involved = CUORE.Class(CUORE.Component, {

    _startState: function() {
      this.storeKey="person.involved.name";
      this._declareRenderer();
      this.involved = "the person involved";
    },

    _declareRenderer: function(){
      this.renderer = Renderers.display();
    },

    _wireEvents: function() {
      this.dispatchUsing("updateInvolved","NAMES_generate_EXECUTED");
    },

    _prepareData: function(){
      return {
                "label": this.getText(this.label),
                "text": this.involved
              };
    },

    updateInvolved: function(response) {
      this._setName(response);
      this.updateRender();
    },

    _setName: function(name) {
      this.involved = name;
      this._saveName();
    },

    _saveName: function(){
      document.page.save(this.storeKey, this.involved);
    },
    
    onEnvironmentUp: function(page) {
      var savedName=page.retrieve(this.storeKey);
      if (savedName){
        this.updateInvolved(savedName);
        return;
      }
      this.execute("NAMES","generate");
    },

    _internationalize: function(){
      this.label="for.name";
      this.setI18NKey(this.label);
    },
});