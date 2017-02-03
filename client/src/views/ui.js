var MythFacts = require('../models/mythFacts');

var UI = function () {
  this.mythFacts = new MythFacts();
  this.mythFacts.getWiki("zeus", this.render.bind(this));
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