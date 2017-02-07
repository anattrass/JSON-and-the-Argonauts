var CharacterInfo = require("./characterInfo");

var CharacterSelect = function(){
  this.characterInfo = new CharacterInfo();
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
    var playButton = document.createElement("div");
    playButton.className = "play-button";
    playButton.onclick = function() {
      alert("you clicked me");
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
    sideBar.appendChild(playButton);
    var container = document.querySelector("#container");
    container.appendChild(selectPageContainer);
  },

  displayInfo: function(character) {
    this.displayBigBoy(character.image);
    // this.mythInfo.getWiki(character.name, this.displayWiki);
    // this.setPlayButton(character);
  },

  displayBigBoy: function(image) {
    var bigBoy = document.createElement("img");
    bigBoy.src = image;
    var bigCharacterContainer = document.querySelector(".big-character-container");
    bigCharacterContainer.innerHTML = null;
    bigCharacterContainer.appendChild(bigBoy);
  }
}

module.exports = CharacterSelect;

















