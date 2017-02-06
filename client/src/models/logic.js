var Character = require('./character');
var CharacterInfo = require('./characterInfo');

var Logic = function() {
  this.character = null;
  this.characterInfo = new CharacterInfo();
  this.generateCharacter();
  this.questionCounter = 0;
  this.characterName = null;

}

Logic.prototype = {
  generateCharacter: function(){
    this.characters = [];
    this.characters.push(new Character("Heracles"));
    this.characters.push(new Character("Apollo"));
    this.characters.push(new Character("Athena"));
    this.characters.push(new Character("Jason"));
  },


// This creates the character select screen with 4 button images each if the value of the character key and click function that calls to create the quiz
// charSelected = null;

// var characterSelectCreator = function(quizData){
//   mainDiv = document.querySelector("#info")
//   // wipe all children from div this is assigned to
//   mainDiv.innerHTML = null;
//   // require in UI the quiz json data to be used
//   for (character of quizData){
//     button = document.createElement("button")
//     button.id = "charButton"
//     button.type = character.image;
//     button.value = character;
//     button.onclick = quizCreator(this.value);
//     mainDiv.appendChild(button);
//   }
// };

// This creates the quiz getting the main div and parenting it with a new quiz div that holds the characters questions. This also creates a false/true button and appends it to the quiz div.


quizCreator: function(characterName){
  console.log(characterName);
  this.characterName = characterName;
  this.character = this.characterInfo.retrieveCharacter(characterName);
console.log(this.character);
  var quizDiv = document.createElement("div");
  var container = document.querySelector("#container");
  quizDiv.className = "fact-box";
  container.appendChild(quizDiv);

  var quizContent = document.createElement("div");
  quizContent.innerText = this.character.questions[this.questionCounter].question;
  quizDiv.appendChild(quizContent);

  var falseButton = document.createElement("button");
  var trueButton = document.createElement("button");
  falseButton.onclick = function(){this.quizButtonOnClick(false)
  }.bind(this);
  falseButton.value = false;
  falseButton.innerText = "False"
  trueButton.onclick = function(){this.quizButtonOnClick(true)
  }.bind(this);
  trueButton.value = true;
  trueButton.innerText = "True"

  quizDiv.appendChild(falseButton);
  quizDiv.appendChild(trueButton);
},

  // quizButton has the on click function that first gets the answer for the question then checks if it is equal to the false/true button clicked. It then calls to check the game state and evaluates if the player has won and will quit its function. If the player hasn't won it will call the scroll function,increase the question counter and create the next quiz question. If the player got the answer wrong it will call the failQuizDiv function.

  quizButtonOnClick : function(choice){
    var answer = this.character.questions[this.questionCounter].answer;

    if ( answer === choice){
      console.log("your right!");
     // if (checkGameState() === true){
      // return;} else {
     // call moveCharacter function
    this.questionCounter ++;
    // return new quiz div
  } else {
  console.log("you failed ya numpty");
// return failed quest div
}
}

// checkGameState is the function used to check if the player has won by evaluating if the questionCounter reached the last question by comparing the length to the characters amount of questions

// var checkGameState = function(){
//   if (questionCounter === quiz.character.questions.length){
//     div = document.querySelector("#index");
//     div.innerHTML = null;
//     winDiv;
//     // update leaderboard database with character passed for player
//     return true
//   } else {
//     return false;
//   }
// }

// winDiv creates the win box returning a gracious message and a button that returns to the character select screen to begin the quiz again

// var winDiv = function(){
//   div = document.createElement("div");
//   button = document.createElement("button");
//   div.innerText = "You have completed your 12 labours and your climb to Olympus! \n You are welcome at the table of the gods Olympian";
//   var returnToHome = function(){
//     characterSelectCreator(quizData);
//   }
//   button.onclick = returnToHome;
//   div.appendChild(button);
// }
}

module.exports = Logic;