var Logic = require('../models/logic');
var ViewLogic = require('../models/viewLogic')
var MythFacts = require('../models/mythFacts');

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
  this.infoDiv = null;
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
      this.infoDiv.innerHTML = null;
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