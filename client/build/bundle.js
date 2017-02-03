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

	var Logic = __webpack_require__(3);
	var MythFacts = __webpack_require__(2);
	
	var UI = function () {
	  var counter = 0;
	  this.logic = new Logic();
	  this.mythFacts = new MythFacts();
	  this.mythFacts.getWiki(this.logic.characters[0].name, this.render.bind(this));
	}
	
	UI.prototype = {
	  render: function(mythInfo){
	    var infoDiv = document.querySelector("#info");
	    var mythParagraph = document.createElement("p");
	    mythParagraph.innerText = mythInfo;
	
	    infoDiv.appendChild(mythParagraph);
	      }
	  }
	
	module.exports = UI;

/***/ },
/* 2 */
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Character = __webpack_require__(4);
	
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
/* 4 */
/***/ function(module, exports) {

	var Character = function(name){
	  this.name = name;
	}
	
	Character.prototype = {
	
	}
	
	module.exports = Character;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map