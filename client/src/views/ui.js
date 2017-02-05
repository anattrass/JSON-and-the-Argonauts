var Logic = require('../models/logic');
var ViewLogic = require('../models/viewLogic')
var MythFacts = require('../models/mythFacts');

//   render: function(mythInfo){
//     var infoDiv = document.querySelector("#info");
//     infoDiv.innerHTML = null; 
//     var mythParagraph = document.createElement("p");
//     mythParagraph.innerText = mythInfo;

//     infoDiv.appendChild(mythParagraph);

//     if (this.counter !== this.logic.characters.length){
//       this.createButton();
//     }
//   },

//   createButton: function(){
//     var button = document.createElement("button");
//     button.innerText = "presss meee";
//     var info = document.querySelector("#info")
//     info.appendChild(button);
//     button.onclick = this.nextCharacter.bind(this);
//     console.log(this);

//   },

//   nextCharacter: function(){
//     this.mythFacts.getWiki(this.logic.characters[this.counter].name, this.render.bind(this));
//     this.counter ++;
//   }
// }

var UI = function (){
  this.counter = 0;
  this.logic = new Logic();
  this.mythFacts = new MythFacts();
  // this.nextCharacter();
  this.viewLogic = new ViewLogic();
  this.view = document.querySelector('#view');
  this.content = document.querySelector("#content");
  this.button = document.createElement('button');
  this.body = document.querySelector('body');
  this.inputButton = document.createElement("input");
  this.inputButton.value = 700;
  this.body.appendChild(this.inputButton);
  this.body.appendChild(this.button);
  this.button.innerText = "test movement";
  this.button.onclick = function(){
    this.viewLogic.scrollMaster(400, this.exampleInfo);
  }.bind(this);
}

UI.prototype = {
  exampleInfo: function(){
    var divvy = document.createElement('div');
    divvy.innerHTML = "<p>I am some fascinating facts</p>";
    var container = document.querySelector("#container");
    container.appendChild(divvy);
    divvy.className = "fact-box";
  },
}

module.exports = UI;