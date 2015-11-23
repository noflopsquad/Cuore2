CUORE.Dom.ready(function() {
  var currentLocale = (navigator.language || navigator.browserLanguage);
  
  document.labels = {};
  document.labels[currentLocale] = {
      "for.name": "That's a randomly generated name" 
  };
  
  CUORE.Bus.enableDebug();

  document.page = new Example();

  document.page.draw();
});
