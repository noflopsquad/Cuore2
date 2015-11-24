Post = CUORE.Class(CUORE.Component, {

    _declareRenderer: function(){
      this.renderer = Renderers.display();
    },

    _wireEvents: function() {
      this.dispatchUsing("update","POST_echo_EXECUTED");
    },

    draw: function(){
      this.renderer.doRender(this.container, this._prepareData());
    },

    _prepareData: function(){
      return  {
                  "label": this.getText(this.label),
                  "text": this.echoed
              };
    },

    update: function(response) {
      this._echoed(this.obtain(response));
      this.updateRender();
    },

    obtain: function(response) {
      return response.data;
    },

    _echoed: function(echo) {
      this.echoed = echo;
    },

    onEnvironmentUp: function(page) {
      var payload = Math.random().toString().substring(0,5);
      this.execute("POST", "echo", payload);
    },

    _internationalize: function(){
      this.label="for.payload";
      this.setI18NKey(this.label);
    },
});