var Example = CUORE.Class(CUORE.Page, {

  initializeServices: function() {
      this.addService(new Names());
  },

  initializeComponents: function() {
    this.addComponent(new Involved(),'first_example');
  },

});