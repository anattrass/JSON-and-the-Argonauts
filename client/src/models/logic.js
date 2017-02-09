var Character = require('./character');
var CharacterInfo = require('./characterInfo');
var ViewLogic = require('./viewLogic');

var Logic = function() {
  this.character = null;
  this.characterInfo = new CharacterInfo();
  this.viewLogic = new ViewLogic();
  this.questionCounter = 0;
  this.characterName = null;
  this.view = document.querySelector('#view');
  this.container = document.querySelector('#container');
}

Logic.prototype = {

  buildFactBox: function(){
    var factBox = document.querySelectorAll(".fact-box");
    for (var i = 0; i< factBox.length; i++){
      factBox[i].parentNode.removeChild(factBox[i]);
    };

    var innerFactBox = document.createElement("div");
    innerFactBox.className = "inner-fact-box"

    var quizDiv = document.createElement("div");
    quizDiv.innerHTML = null;
    quizDiv.className = "fact-box";
    quizDiv.appendChild(innerFactBox);
    quizDiv.appendChild(this.buildQuestionCount());

    var container = document.querySelector("#container");
    container.appendChild(quizDiv);

    return innerFactBox;
  },

  buildQuizDiv: function(){
    var quizContent = document.createElement("div");
    quizContent.innerText = this.character.questions[this.questionCounter].question;

    var falseButton = document.createElement("button");
    falseButton.className = "false-button";
    falseButton.onclick = function(){this.quizButtonOnClick(false)
    }.bind(this);
    falseButton.value = false;
    falseButton.innerText = "False"

    var trueButton = document.createElement("button");
    trueButton.className = "true-button";
    trueButton.onclick = function(){this.quizButtonOnClick(true)
    }.bind(this);
    trueButton.value = true;
    trueButton.innerText = "True"

    var innerFactBox = this.buildFactBox();

    innerFactBox.appendChild(quizContent);
    innerFactBox.appendChild(falseButton);
    innerFactBox.appendChild(trueButton);
  },

  buildRestartButton: function(){
    var restartButton = document.createElement("div");
    restartButton.className = "restart-button";
    restartButton.onclick = this.returnToHome;

    var restartButtonContainer = document.createElement("div");
    restartButtonContainer.className = "restart-button-container";
    restartButtonContainer.appendChild(restartButton);

    var container = document.querySelector("#container");
    container.appendChild(restartButtonContainer);
  },

  buildQuestionCount: function(){
    var questionCountDisplay = document.querySelector(".question-count-display") || document.createElement("div");
    questionCountDisplay.className = "question-count-display";
    var text = document.createElement("p");
    text.innerText = "" + (this.questionCounter + 1) + " / 12"
    questionCountDisplay.appendChild(text);
    return questionCountDisplay;
  },

  buildPlayer: function(){
    var player = document.querySelector("#player");
    player.innerHTML = null;
    player.style.bottom = "7%";
    var playerImage = document.createElement("img");
    playerImage.src = this.character.image;
    playerImage.style.backgroundRepeat = "no-repeat"
    player.appendChild(playerImage);
  },

  buildWorld: function(){
    var content = document.querySelector("#content");
    content.style.backgroundImage = "url(" + this.character.walkway + ")";
    var container = document.querySelector("#container");
    container.style.backgroundImage = "url(" + this.character.background + ")";
  },

  quizCreator: function(characterName){
    this.characterName = characterName;
    this.character = this.characterInfo.retrieveCharacter(characterName);
    this.buildQuizDiv();
    this.buildRestartButton();
    this.buildPlayer();
    this.buildWorld();
  },

  createInfoDiv: function() {
    var infoDiv = document.createElement('div');
    infoDiv.style.display = 'visible';
    infoDiv.className = "info-div";
    console.log(this.character.questions[this.questionCounter -1].info);
    infoDiv.innerText = this.character.questions[this.questionCounter -1].info;

    var factBox = document.querySelector('.inner-fact-box');

    var falseButton = document.querySelector('.false-button');
    falseButton.style.display = 'none';
    var trueButton = document.querySelector('.true-button');
    trueButton.style.display = 'none';

    var button = document.createElement('button');
    button.className = "info-button";
    button.innerText = "Next Question";

    factBox.appendChild(button);
    factBox.appendChild(infoDiv);
    this.infoButtonOnClick();
  },

  infoButtonOnClick: function(){
    var button = document.querySelector(".info-button");
    var infoDiv = document.querySelector(".info-div");
    button.onclick = function(){
      this.continue();
      infoDiv.style.display = 'none';
    }.bind(this);
  },

  quizButtonOnClick : function(choice){
    var answer = this.character.questions[this.questionCounter].answer;

    if ( answer === choice){
      console.log("your right!");
      this.questionCounter ++;
      this.checkGameState();
    } else {
      console.log("you failed ya numpty");
      this.failDiv();
    }
  },

  checkGameState : function(){
    if (this.questionCounter === this.character.questions.length){
      console.log("hits first part of if statement")
      this.winDiv();
    } else {
      console.log("hit createInfoDiv function");
      this.createInfoDiv();
    }
  },

  continue : function () {
    var quizDiv = document.querySelector(".fact-box");
    quizDiv.parentNode.removeChild(quizDiv);
    this.viewLogic.move(this.view.scrollLeft+500, function(){
      this.quizCreator(this.characterName)
    }.bind(this));
  },

  returnToHome: function(){
    console.log(this)
    this.questionCounter = 0;
    this.view = document.querySelector('#view');
    this.view.scrollLeft = 0;
    var view = document.querySelector("#view");
    var content = document.querySelector("#content");
    var player = document.querySelector("#player");
    view.style.display = "none";
    content.style.display = "none";
    player.style.display = "none";
    var CharacterSelect = require('./characterSelect');
    var characterSelect = new CharacterSelect();
    characterSelect.createSelectPage();
  },

  winDiv : function(){
    var quizDiv = document.querySelector(".fact-box");
    quizDiv.parentNode.removeChild(quizDiv);
    var div = document.createElement("div");
    div.className = "fact-box";
    var button = document.createElement("button");
    div.innerText = "You have completed your 12 labours and your climb to Olympus! \n You are welcome at the table of the gods, Olympian";
    button.innerText = "Start new game!";
    button.onclick = this.returnToHome.bind(this);
    div.appendChild(button);
    this.container.appendChild(div);
  },

  failDiv: function(){
    var quizDiv = document.querySelector(".fact-box");
    quizDiv.parentNode.removeChild(quizDiv);
    var div = document.createElement("div");
    div.className = "fact-box";
    var button = document.createElement("button");
    div.innerText = "You have failed the Gods and now you must suffer in Hades' frosty bosom!";
    button.innerText = "Restart your quest";
    button.className = "answerButton";
    button.style.visibility =  "hidden";
    button.className = "lose-button";
    button.onclick = function(){
      this.view.scrollLeft = 0;
      this.questionCounter = 0;
      this.quizCreator(this.characterName);
    }.bind(this);
    this.container.appendChild(div);
    div.appendChild(button);
    this.viewLogic.playerDeath(this.showFailButton);
  },

  showFailButton(){
    var button = document.querySelector(".lose-button");
    button.style.visibility = "visible";
  }
}

module.exports = Logic;