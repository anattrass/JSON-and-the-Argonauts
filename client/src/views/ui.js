var Logic = require('../models/logic');
var MythFacts = require('../models/mythFacts');
var CharacterSelect = require("../models/characterSelect");

var UI = function (){
  // this.logic = new Logic();
  // this.logic.quizCreator("Jason");
  this.characterSelect = new CharacterSelect();
  this.characterSelect.createSelectPage();
}

UI.prototype = {  
// When next character called it calls function getWiki in mythFacts and passes it character name and the render function from this module while binding this module.
//   nextCharacter: function(){
//     this.mythFacts.getWiki(this.logic.characters[this.counter].name, this.render.bind(this));
//     this.counter ++;
//   }
}

module.exports = UI;