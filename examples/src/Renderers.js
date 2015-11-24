Renderers={

  display: function(){
       return {
        doRender: function(container_id, data){
          var message = data.label +": "+data.text;
          var container = document.getElementById(container_id);
          container.innerHTML = message;
        }
      }
  },
}