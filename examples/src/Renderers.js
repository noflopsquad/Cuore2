Renderers={

	involved: function(){
    	return {
    		doRender: function(container_id, data){
    			var message = data.label +": "+data.name;
    			var container = document.getElementById(container_id);
    			container.innerHTML = message;
    			console.log(container_id);
    			console.log(data);
    		}
    	}

  },
}