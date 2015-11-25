MissingRenderer = CUORE.Class(CUORE.Component, {

    _prepareData: function(){
      return  {};
    },

    onEnvironmentUp: function(page) {
      this.draw();
    },
});