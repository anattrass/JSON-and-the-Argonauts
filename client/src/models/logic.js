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

  buildPlayer: function(){
    var player = document.querySelector("#player");
    player.innerHTML = null;
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

    // infoDiv.style.position = 'absolute';
  },

  infoButtonOnClick: function(){
    var button = document.querySelector(".info-button");
    var infoDiv = document.querySelector(".info-div");
    button.onclick = function(){
      this.continue();
      infoDiv.style.display = 'none';
    }.bind(this);
  },

  // quizButton has the on click function that first gets the answer for the question then checks if it is equal to the false/true button clicked. It then calls to check the game state and evaluates if the player has won and will quit its function. If the player hasn't won it will call the scroll function,increase the question counter and create the next quiz question. If the player got the answer wrong it will call the failQuizDiv function.

  quizButtonOnClick : function(choice){
    // console.log(this.questionCounter);
    // console.log(this.character.questions[this.questionCounter]);
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

  // checkGameState is the function used to check if the player has won by evaluating if the questionCounter reached the last question by comparing the length to the characters amount of questions

  checkGameState : function(){
    // console.log(this.questionCounter);
    // console.log(this.character.questions.length);
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

// winDiv creates the win box returning a gracious message and a button that returns to the character select screen to begin the quiz again
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
  // var input = document.createElement("input");
  var button = document.createElement("button");
  div.innerText = "You have completed your 12 labours and your climb to Olympus! \n You are welcome at the table of the gods Olympian";
  button.innerText = "Start new game!";

  //returntohome was here
  button.onclick = this.returnToHome.bind(this);
  div.appendChild(button);
  // div.appendChild(input);
  this.container.appendChild(div);
},

failDiv: function(){
  var quizDiv = document.querySelector(".fact-box");
  quizDiv.parentNode.removeChild(quizDiv);
  var div = document.createElement("div");
  div.className = "fact-box";
  var button = document.createElement("button");
  div.innerText = "You have failed the Gods and now you must suffer in Hades' frosty bosom";
  button.innerText = "Back to the Underworld";
  button.className = "answerButton";
  button.onclick = function(){
    this.view.scrollLeft = 0;
    this.questionCounter = 0;
    this.quizCreator(this.characterName);
  }.bind(this);
  this.container.appendChild(div);
  div.appendChild(button);
}

}

module.exports = Logic;