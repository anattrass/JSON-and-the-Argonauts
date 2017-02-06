var ViewLogic = function(){
	
}

ViewLogic.prototype = {
	move: function(destination, event){
	    var scroller = function(destination){

	      var view = document.querySelector('#view'); 
	      console.log(view.scrollLeft);

	      if (view.scrollLeft <= destination){
	        var y = view.scrollLeft;
	        view.scrollLeft = y+5;

	        if(view.scrollLeft >= destination){
	          event();
	          clearInterval(smoothScroll);
	        } 
	      } else if (view.scrollLeft >= destination){
	        var y = view.scrollLeft;
	        view.scrollLeft = y-5;

	        if(view.scrollLeft <= destination){
	          event();
	          clearInterval(smoothScroll);
	        }
	      }
	    }

	    var smoothScroll = setInterval(function(){scroller(destination)}, 20);
	    console.log(view.scrollLeft);
	  },
	  scrollMaster: function(destination, event){
	    this.move(destination, event);
	    console.log("back");
	  }
}

module.exports = ViewLogic;