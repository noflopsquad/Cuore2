MissingLabel = CUORE.Class(CUORE.Component, {

    _declareRenderer: function(){
      this.renderer = Renderers.display();
    },

    _wireEvents: function() {
      this.dispatchUsing("update","JSONP_echo_EXECUTED");
    },

    _prepareData: function(){
      return  {
                  "label": this.getText(this.label),
                  "text": this.echoed
              };
    },

    update: function(response) {
      this.updateRender();
    },

    obtain: function(response) {
      return response.Manufacturer;
    },

    _echoed: function(echo) {
      this.echoed = echo;
    },

    onEnvironmentUp: function(page) {
      this.draw();
    },

    _internationalize: function(){
      this.label="missing.label";
      this.setI18NKey(this.label);
    },
});