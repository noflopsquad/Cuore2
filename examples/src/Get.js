Get = CUORE.Class(CUORE.Component, {

    _declareRenderer: function(){
      this.renderer = Renderers.display();
    },

    _wireEvents: function() {
      this.dispatchUsing("update","GET_echo_EXECUTED");
    },
    
    _prepareData: function(){
      return  {
                  "label": this.getText(this.label),
                  "text": this.echoed
              };
    },

    update: function(response) {
      this._echoed(response);
      this.updateRender();
    },

    _echoed: function(echo) {
      this.echoed = echo;
    },

    onEnvironmentUp: function(page) {
      var payload = Math.random().toString().substring(0,5);
      this.execute("GET", "echo", payload);
    },

    _internationalize: function(){
      this.label="for.payload";
      this.setI18NKey(this.label);
    },
});