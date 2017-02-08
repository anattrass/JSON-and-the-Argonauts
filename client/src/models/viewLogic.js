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
	},

	playerDeath: function(callBack){
		var player = document.querySelector("#player");
		console.log('dying');
		console.log(player);
		var currentStyle = window.getComputedStyle(player);
		var startingBottomMargin = currentStyle.marginBottom;
		var height = (parseInt(currentStyle.height.replace("px", "")));
		var levelNow = (parseInt(currentStyle.bottom.replace("px", "")));

		console.log("height: " + height);
		console.log("nadir: " + nadir);
		console.log("levelNow: " + levelNow);
		var nadir = (-2*height);

		var descend = function(){
			levelNow -= 5;
			player.style.bottom = (levelNow + "px");
			if(parseInt(player.style.bottom.replace("px", "")) <= nadir){
				clearInterval(startDeath);
				callBack();
			}
		}
		var startDeath = setInterval(descend, 20);
	}
}

module.exports = ViewLogic;