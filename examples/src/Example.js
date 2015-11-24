var Example = CUORE.Class(CUORE.Page, {

  initializeServices: function() {
      this.addService(new Names());
      this.addService(new EchoByGet());
  },

  initializeComponents: function() {
    this.addComponent(new Involved(),'first_example');
    this.addComponent(new Get(),'second_example');
  },

});