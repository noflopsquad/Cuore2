var Example = CUORE.Class(CUORE.Page, {

  initializeServices: function() {
      this.addService(new Names());
      this.addService(new EchoByGet());
      this.addService(new EchoByPost());
      this.addService(new EchoByJSONP());
  },

  initializeComponents: function() {
    this.addComponent(new Involved(),'first_example');
    this.addComponent(new Get(),'second_example');
    this.addComponent(new Post(),'third_example');
    this.addComponent(new JSONP(),'fourth_example');
    this.addComponent(new MissingRenderer(),'fifth_example');
  },

});