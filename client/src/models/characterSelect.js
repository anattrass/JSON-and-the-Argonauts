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
    //imageButton.onclick = this.displayInfo(character).bind(this);
    return imageButton;
  },

  // displayInfo: function(){

  // }

  createSelectPage: function(){
    var selectPageContainer = document.createElement("div");
    selectPageContainer.className = "select-page-container";
    var buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container";
    var bigCharacterContainer = document.createElement("div");
    bigCharacterContainer.className = "big-character-container";
    var wikiContainer = document.createElement("div");
    wikiContainer.className = "wiki-container";
    var characters = [];
    for (name of this.characterNames){
      characters.push(this.characterInfo.retrieveCharacter(name));
    }
    for (character of characters){
      buttonContainer.appendChild(this.createImageButton(character));
    }
    selectPageContainer.appendChild(buttonContainer);
    selectPageContainer.appendChild(bigCharacterContainer);
    selectPageContainer.appendChild(wikiContainer);
    var container = document.querySelector("#container");
    container.appendChild(selectPageContainer);
  }
}

module.exports = CharacterSelect;