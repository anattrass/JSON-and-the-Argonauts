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
    wikiContainer.innerText = "Welcome to Myth Behavin'! \n \n The interactive quiz game that helps you learn about Greek Mythology! \n Select one of the four characters below to begin the 12 question odyssey to Mount Olympus. \n Let the winds of Anemoi blow in your favour!"

    var urlLinkContainer = document.createElement("div");
    urlLinkContainer.className = "url-link-container";
    sideBar.appendChild(urlLinkContainer);

    var playButton = document.createElement("div");
    playButton.className = "play-button";
    playButton.innerHTML = null;
    var playText = document.createElement("p");
    playText.className = "play-button-text";
    playText.innerText = "Play"
    playButton.style.display = "none";
    playButton.appendChild(playText);
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
    this.displayUrlLink(character);
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
    wikiContainer.scrollTop = 0;
    var wikiText = document.createElement("p");
    wikiText.className = "wiki-text";
    wikiText.innerText = extract;
    wikiContainer.appendChild(wikiText);
  },

  displayUrlLink: function(character){
    var urlLinkContainer = document.querySelector(".url-link-container");
    urlLinkContainer.innerHTML = null;
    var urlLink = document.createElement("a")
    urlLink.className = "link-button"
    urlLink.href = character.url;
    var image = document.createElement('img')
    image.src = "./images/learn-more-button-3.png"
    urlLink.appendChild(image);
    urlLinkContainer.appendChild(urlLink);
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

















