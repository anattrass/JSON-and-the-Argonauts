var CharacterInfo = require("./characterInfo");
var Logic = require("./logic");
var MythFacts = require("./mythFacts");

var CharacterSelect = function(){
  this.characterInfo = new CharacterInfo();
  this.logic = new Logic();
  this.mythFacts = new MythFacts();
  this.characterNames = ["Jason", "Athena", "Heracles", "Apollo"];
}

CharacterSelect.prototype = {

  createImageButton: function(character){
    var imageButton = document.createElement("input");
    imageButton.type = "image";
    imageButton.className = "image-button";
    console.log(character.image);
    imageButton.src = character.image;
    console.log(imageButton.src);
    imageButton.onclick = function(){
      this.displayInfo(character)}.bind(this);
    return imageButton;
  },

  createSelectPage: function(){
    var selectPageContainer = document.createElement("div");
    selectPageContainer.className = "select-page-container";
    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    var bigCharacterContainer = document.createElement("div");
    bigCharacterContainer.className = "big-character-container";
    var sideBar = document.createElement("div");
    sideBar.className = "side-bar";
    var wikiContainer = document.createElement("div");
    wikiContainer.className = "wiki-container";
    wikiContainer.innerText = "Welcome to Myth Behavin'! \n The interactive quiz game that helps you learn about Greek Mythology! \n Select one of the four characters below to being the 12 question odyssey to Mount Olympus. \n Let the winds of Anemoi blow in your favor!"

    var playButton = document.createElement("div");
    playButton.className = "play-button";
    playButton.style.display = "none";
    playButton.onclick = function() {
      alert("Did you pick a character?");
    };
    var characters = [];
    for (name of this.characterNames){
      characters.push(this.characterInfo.retrieveCharacter(name));
    }
    for (character of characters){
      buttonContainer.appendChild(this.createImageButton(character));
    }
    selectPageContainer.appendChild(buttonContainer);
    selectPageContainer.appendChild(bigCharacterContainer);
    selectPageContainer.appendChild(sideBar);
    sideBar.appendChild(wikiContainer);
    selectPageContainer.appendChild(playButton);
    var container = document.querySelector("#container");
    container.appendChild(selectPageContainer);
  },

  displayInfo: function(character) {
    this.displayBigBoy(character.image);
    this.mythFacts.getWiki(character.name, this.displayWiki);
    this.setPlayButton(character);
    this.displayBackground(character.background);
  },

  displayBigBoy: function(image) {
    var playButton = document.querySelector(".play-button");
    playButton.style.display = "block";
    var bigBoy = document.createElement("img");
    bigBoy.src = image;
    var bigCharacterContainer = document.querySelector(".big-character-container");
    bigCharacterContainer.innerHTML = null;
    bigCharacterContainer.appendChild(bigBoy);
  },

  displayBackground: function(image) {
    var selectPageContainer = document.querySelector(".select-page-container");
    selectPageContainer.style.backgroundImage = "url(" + image + ")";
  },

  displayWiki: function(extract) {
    var wikiContainer = document.querySelector(".wiki-container");
    wikiContainer.innerHTML = null;
    var wikiText = document.createElement("p");
    wikiText.className = "wiki-text";
    wikiText.innerText = extract;
    wikiContainer.appendChild(wikiText);
  },

  setPlayButton: function(character) {
    var playButton = document.querySelector(".play-button");
    playButton.onclick = function(){
      var selectPageContainer = document.querySelector(".select-page-container");
      selectPageContainer.parentNode.removeChild(selectPageContainer);
      var view = document.querySelector("#view");
      var content = document.querySelector("#content");
      var player = document.querySelector("#player");
      view.style.display = "block";
      content.style.display = "block";
      player.style.display = "block";
      this.logic.quizCreator(character.name);
    }.bind(this);
  }
}

module.exports = CharacterSelect;

















