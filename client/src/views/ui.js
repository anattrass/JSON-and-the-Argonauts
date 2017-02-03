var Logic = require('../models/logic');
var MythFacts = require('../models/mythFacts');

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