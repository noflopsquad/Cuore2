MissingRenderer = CUORE.Class(CUORE.Component, {

    draw: function(){
      this.renderer.doRender(this.container, this._prepareData());
    },

    _prepareData: function(){
      return  {};
    },

    onEnvironmentUp: function(page) {
      this.draw();
    },
});