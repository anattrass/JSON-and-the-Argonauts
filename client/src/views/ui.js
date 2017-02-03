var Logic = require('../models/logic');
var MythFacts = require('../models/mythFacts');

var UI = function () {
  this.counter = 0;
  this.logic = new Logic();
  this.mythFacts = new MythFacts();
  this.nextCharacter();
}

UI.prototype = {
  render: function(mythInfo){
    var infoDiv = document.querySelector("#info");
    var mythParagraph = document.createElement("p");
    mythParagraph.innerText = mythInfo;

    infoDiv.appendChild(mythParagraph);
    this.createButton();
      },

  createButton: function(){
    var button = document.createElement("button");
    button.innerText = "presss meee";
    var info = document.querySelector("#info")
    info.appendChild(button);
    button.onclick = this.nextCharacter.bind(this);
    console.log(this);

  },

  nextCharacter: function(){
    this.mythFacts.getWiki(this.logic.characters[this.counter].name, this.render.bind(this));
    this.counter ++;

  }
  }

module.exports = UI;