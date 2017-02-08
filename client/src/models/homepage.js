var CharacterSelect = require("./characterSelect");
var CharacterInfo = require("./characterInfo");
var Logic = require("./logic");
var MythFacts = require("./mythFacts");

var HomePage = function(){

}

HomePage.prototype = {

  createHomePage: function(){
    var selectHomePageContainer = document.createElement("div");
    selectHomePageContainer.className = "select-home-page-container";
    var container = document.querySelector("#container");
    container.appendChild(selectHomePageContainer);

    var enterButton = document.createElement("div");
    enterButton.className = "enter-button";
    enterButton.innerText = "enter";
    enterButton.onclick = this.setEnterButton
    selectHomePageContainer.appendChild(enterButton);

  },

  setEnterButton: function() {

    var selectHomePageContainer = document.querySelector(".select-home-page-container");
    selectHomePageContainer.parentNode.removeChild(selectHomePageContainer);
    var characterSelect = new CharacterSelect();
    characterSelect.createSelectPage();
  }
}


module.exports = HomePage;