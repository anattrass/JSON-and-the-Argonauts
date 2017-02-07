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
    // imageButton.onclick = this.displayInfo(character).bind(this);
    return imageButton;
  },

  createSelectPage: function(){
    var pageDiv = document.createElement("div")
    var buttonContainer = document.createElement("div");
    var characters = [];
    for (name of this.characterNames){
      characters.push(this.characterInfo.retrieveCharacter(name));
    }
    for (character of characters){
      buttonContainer.appendChild(this.createImageButton(character));
    }
    pageDiv.appendChild(buttonContainer);
    var container = document.querySelector("#container");
    container.appendChild(pageDiv);
  }
}

module.exports = CharacterSelect;