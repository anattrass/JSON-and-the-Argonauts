/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	
	var app = function() {
	  var ui = new UI();
	  
	}
	
	window.onload = app;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Logic = __webpack_require__(2);
	var ViewLogic = __webpack_require__(4)
	var MythFacts = __webpack_require__(5);
	
	var UI = function (){
	  this.counter = 0;
	  this.logic = new Logic();
	  this.mythFacts = new MythFacts();
	  // this.nextCharacter();
	  this.viewLogic = new ViewLogic();
	  this.view = document.querySelector('#view');
	  this.content = document.querySelector("#content");
	  // this.button = document.createElement('button');
	  this.body = document.querySelector('body');
	  this.infoDiv = document.createElement("div");
	  // this.inputButton = document.createElement("input");
	  // this.inputButton.value = 700;
	  // this.body.appendChild(this.inputButton);
	  // this.body.appendChild(this.button);
	  // this.button.innerText = "test movement";
	  // this.button.onclick = 
	  this.createButton();
	}
	
	UI.prototype = {
	  // exampleInfo: function(){
	  //   var divvy = document.createElement('div');
	  //   divvy.innerHTML = "<p>I am some fascinating facts</p>";
	  //   var container = document.querySelector("#container");
	  //   container.appendChild(divvy);
	  //   divvy.className = "fact-box";
	  // },
	
	  render: function(mythInfo){
	    var container = document.querySelector("#container");
	    this.infoDiv = document.createElement("div");
	    this.infoDiv.innerHTML = null; 
	    var mythParagraph = document.createElement("p");
	    mythParagraph.innerText = mythInfo;
	    this.infoDiv.className = "fact-box";
	    this.infoDiv.appendChild(mythParagraph);
	    container.appendChild(this.infoDiv);
	    var buttonDiv = document.querySelector('#button-div')
	    buttonDiv.innerHTML = null;
	    if (this.counter !== this.logic.characters.length){
	      this.createButton();
	    }
	  },
	
	  createButton: function(){
	    var buttonDiv = document.querySelector('#button-div')
	    buttonDiv.innerHTML = null;
	    var button = document.createElement("button");
	    button.innerText = "presss meee";
	    // var info = document.querySelector("#info")
	    buttonDiv.appendChild(button);
	    
	    button.onclick = function(){
	      this.infoDiv.visibility = "hidden";
	      var currentScrollPos = document.querySelector("#view").scrollLeft;
	      this.viewLogic.scrollMaster(currentScrollPos + 400, this.nextCharacter.bind(this));
	    }.bind(this);
	  },
	
	  nextCharacter: function(){
	    this.mythFacts.getWiki(this.logic.characters[this.counter].name, this.render.bind(this));
	    this.counter ++;
	  }
	}
	
	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Character = __webpack_require__(3);
	
	var Logic = function() {
	  this.generateCharacter();
	}
	
	Logic.prototype = {
	  generateCharacter: function(){
	    this.characters = [];
	    this.characters.push(new Character("Heracles"));
	    this.characters.push(new Character("Apollo"));
	    this.characters.push(new Character("Athena"));
	    this.characters.push(new Character("Jason"));
	  }
	}
	
	module.exports = Logic;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Character = function(name){
	  this.name = name;
	}
	
	Character.prototype = {
	
	}
	
	module.exports = Character;

/***/ },
/* 4 */
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/***/ function(module, exports) {

	var MythFacts = function(){
	
	}
	
	MythFacts.prototype = {
	  makeRequest: function(url, callback){
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.onload = callback;
	    request.send();
	  },
	
	  getWiki: function(mythQuery, callback){
	    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + mythQuery + "&origin=*";
	    this.makeRequest(url, function(){
	      if (this.status !== 200){
	        return;
	      } else {
	        var info = JSON.parse(this.responseText).query.pages;
	        var pageKey = Object.keys(info)[0];
	        var page = info[pageKey].extract;
	        callback(page);
	      }
	    });
	  }
	
	}
	
	module.exports = MythFacts;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map