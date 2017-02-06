var Logic = require('../models/logic');
var MythFacts = require('../models/mythFacts');

var UI = function (){
  this.counter = 0;
  this.logic = new Logic();
  this.mythFacts = new MythFacts();
  this.view = document.querySelector('#view');
  this.content = document.querySelector("#content");
  this.body = document.querySelector('body');
  this.infoDiv = document.createElement("div");
  this.logic.quizCreator("Apollo");
}

UI.prototype = {  
// When next character called it calls function getWiki in mythFacts and passes it character name and the render function from this module while binding this module.
//   nextCharacter: function(){
//     this.mythFacts.getWiki(this.logic.characters[this.counter].name, this.render.bind(this));
//     this.counter ++;
//   }
}

module.exports = UI;