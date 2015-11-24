var Example = CUORE.Class(CUORE.Page, {

  initializeServices: function() {
      this.addService(new Names());
      this.addService(new EchoByGet());
      this.addService(new EchoByPost());
  },

  initializeComponents: function() {
    this.addComponent(new Involved(),'first_example');
    this.addComponent(new Get(),'second_example');
    this.addComponent(new Post(),'third_example');
  },

});