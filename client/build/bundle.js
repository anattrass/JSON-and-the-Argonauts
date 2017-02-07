/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	
	var app = function() {
	  var ui = new UI();
	  
	}
	
	window.onload = app;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Logic = __webpack_require__(2);
	var MythFacts = __webpack_require__(6);
	
	var UI = function (){
	  this.counter = 0;
	  this.logic = new Logic();
	  this.mythFacts = new MythFacts();
	  this.view = document.querySelector('#view');
	  this.content = document.querySelector("#content");
	  this.body = document.querySelector('body');
	  this.infoDiv = document.createElement("div");
	  this.logic.quizCreator("Apollo");
	}
	
	UI.prototype = {  
	// When next character called it calls function getWiki in mythFacts and passes it character name and the render function from this module while binding this module.
	//   nextCharacter: function(){
	//     this.mythFacts.getWiki(this.logic.characters[this.counter].name, this.render.bind(this));
	//     this.counter ++;
	//   }
	}
	
	module.exports = UI;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Character = __webpack_require__(3);
	var CharacterInfo = __webpack_require__(4);
	var ViewLogic = __webpack_require__(5);
	
	var Logic = function() {
	  this.character = null;
	  this.characterInfo = new CharacterInfo();
	  this.viewLogic = new ViewLogic();
	  this.generateCharacter();
	  this.questionCounter = 0;
	  this.characterName = null;
	  this.view = document.querySelector('#view');
	  this.container = document.querySelector('#container');
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
	  // console.log(characterName);
	  this.characterName = characterName;
	  this.character = this.characterInfo.retrieveCharacter(characterName);
	  // console.log(this.character);
	  var container = document.querySelector("#container");
	  var factBox = document.querySelectorAll(".fact-box");
	  for (var i = 0; i< factBox.length; i++){
	    factBox[i].parentNode.removeChild(factBox[i]);
	  };
	  var quizDiv = document.createElement("div");
	  
	  quizDiv.innerHTML = "";
	  quizDiv.className = "fact-box";
	
	  container.appendChild(quizDiv);
	
	  var quizContent = document.createElement("div");
	  // console.log(this.character);
	  // console.log(this.characterName);
	  quizContent.innerText = this.character.questions[this.questionCounter].question;
	  quizDiv.appendChild(quizContent);
	
	  var falseButton = document.createElement("button");
	  falseButton.className = "answerButton";
	  var trueButton = document.createElement("button");
	  trueButton.className = "answerButton";
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
	
	
	  createInfoDiv: function() {
	    var infoDiv = document.createElement('div');
	    infoDiv.style.display = 'visible';
	    infoDiv.className = "info-div";
	    console.log(this.character.questions[this.questionCounter -1].info);
	    infoDiv.innerText = this.character.questions[this.questionCounter -1].info;
	
	    var factBox = document.querySelector('.fact-box');
	
	    var falseButton = document.querySelector('.answerButton');
	    falseButton.style.display = 'none';
	    var trueButton = document.querySelector('.answerButton');
	    trueButton.style.display = 'none';
	    
	    var button = document.createElement('button');
	    button.className = "info-button";
	    button.innerText = "Next Question";
	
	    factBox.appendChild(infoDiv);
	    infoDiv.appendChild(button);
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
	    this.viewLogic.move(this.view.scrollLeft+100, function(){
	      this.quizCreator(this.characterName)
	    }.bind(this));
	  },
	
	// winDiv creates the win box returning a gracious message and a button that returns to the character select screen to begin the quiz again
	
	winDiv : function(){
	  var quizDiv = document.querySelector(".fact-box");
	  quizDiv.parentNode.removeChild(quizDiv);
	  var div = document.createElement("div");
	  div.className = "fact-box";
	  var input = document.createElement("input");
	  var button = document.createElement("button");
	  div.innerText = "You have completed your 12 labours and your climb to Olympus! \n You are welcome at the table of the gods Olympian";
	  button.innerText = "Start new game!";
	  var returnToHome = function(){
	    this.questionCounter = 0;
	    // this.character = null;
	    // this.characterName = "Athena";
	    this.view = document.querySelector('#view');
	    this.view.scrollLeft = 0;
	    this.quizCreator(input.value);
	  }
	  button.onclick = returnToHome.bind(this);
	  div.appendChild(button);
	  div.appendChild(input);
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

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Character = function(name){
	  this.name = name;
	}
	
	Character.prototype = {
	
	}
	
	module.exports = Character;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var CharacterInfo = function(){ 
	this.characters = {
	 jason : { 
	    name: "Jason",
	    questions: [{
	      question: "Jason was the leader of the Argonauts",
	      answer: true,
	      info: "Correct! And what a leader he was"
	    },
	    {
	      question: "Jason was married to a sorceress",
	      answer: true,
	      info: "Yes, she was called Medea"
	    },
	    {
	      question: "Jason and his men were hunting for a black fleece",
	      answer: false,
	      info: "Right again, of course the fleece in question was golden"
	    },
	    {
	      question: "On their travels, the Argonauts encountered a tribe of giants called the Gegeines, who had 6 arms",
	      answer: true,
	      info: "Do you have 6 brains? You're well on your way now"
	    },
	    {
	      question: "Jason and his Argonauts once accidentally killed lots of their allies because they didn't recognise them in the dark.",
	      answer: true,
	      info: "That's right, if you were friends with Jason, it was best to keep the lights on."
	    },
	    {
	      question: "The Harpies were monsters with the face of a woman and the wings of a bat.",
	      answer: false,
	      info: "Half way! The Harpies had bird wings"
	    },
	    {
	      question: "After surviving the wrath of the gods, 6-armed giants, and a jealous sorceress, Jason was eventually killed by his own boat.",
	      answer: true,
	      info: "That's right! Not even a super magic death boat, just his own boat"
	    },
	    {
	      question: "Jason was once voiced by William Shatner",
	      answer: true,
	      info: "Well done! Captain Kirk and Jason too, what a range"
	    },
	    {
	      question: "Jason was raised by a Satyr",
	      answer: false,
	      info: "So close now! Jason was raised by a Centaur, Chiron, to keep him safe from his murderous half-uncle."
	    },
	    {
	      question: "To retrieve the Golden Fleece, Jason was required to complete three tasks. One of these was to plough a field with fire-breathing oxen.",
	      answer: true,
	      info: "Yes! Jason, a talented man on the waves and in the fields."
	    },
	    {
	      question: "Another task was to defeat the Cyclopes.",
	      answer: false,
	      info: "You're correct, not one of his three tasks"
	    },
	    {
	      question: "The magical warriors called Spartoi appeared when Jason sowed a field with a dragon's teeth.",
	      answer: true,
	      info: "That's it! Defeating the Spartoi was his second task, the final task was to kill the fleece's dragon guardian which never slept and to steal the fleece"
	    }]
	  },
	
	  athena : {
	    name: "Athena", 
	    questions: [{
	      question: "Athena was born from zeus.",
	      answer: true,
	      info: "Well done! She was born fully armed from his forehead"
	    },
	    {
	      question: "Athena is the goddess of war.",
	      answer: true,
	      info: "Yes! She is the goddess of wisdom, craft and war"
	    },
	    {
	      question: " Athena wields the aegis and thunderbolt for zeus.",
	      answer: true,
	      info: "That's Right! She was very powerful!"
	    },
	    {
	      question: "Her mother was Aphrodite.",
	      answer: false,
	      info: "Correct! Metis was Athena’s mother, Zeus swallowed Metis to try and stop Athena from being born"
	    },
	    {
	      question: "Athena was a patron of the arts and crafts, especially when it came to spinning and weaving.",
	      answer: true,
	      info: "True that! That girl could sew like a dream!"
	    },
	    {
	      question: "Athena served as a guardian of Crete, where the Parthenon served as her temple.",
	      answer: false,
	      info: "Well done! The Parthenon is in Athens where it stands to this day"
	    },
	    {
	      question: "The hawk was her bird and the willow tree was hers.",
	      answer: false,
	      info: "Correct! The owl was her bird, she must have been a real hoot!"
	    },
	    {
	      question: "Athena invented the harp but never played it.",
	      answer: false,
	      info: "Right again! Athena invented the flute but never played it"
	    },
	    {
	      question: "Athena is one of the four virgin goddess.",
	      answer: true,
	      info: "Excellent! Athena's children are literally born from her thoughts"
	    },
	    {
	      question: "Athena is a shapeshifter.",
	      answer: true,
	      info: "Nearly there! Athena could shift some serious shapes!"
	    },
	    {
	      question: "Athena was born from zeus on the island of Crete.",
	      answer: false,
	      info: "One more to go! Zeus was walking along the shore of Lake Tritonis when Athena was born, from his forhead, fully grown and wearing armor"
	    },
	    {
	      question: "Odysseus was Athena’s uncle.",
	      answer: false,
	      info: "Woo, well done! Athena is the patron and helper of many heroes, including Odysseus, Jason, and Heracles"
	    }]
	  },
	
	
	
	
	  heracles : {
	    name: "Heracles", 
	    questions: [{
	      question: "There were 10 Labors of Heracles.",
	      answer: false,
	      info: "False indeed, there were 12 Labors"
	    },
	    {
	      question: "Heracles was the last mortal son of Zeus.",
	      answer: true,
	      info: "Correct! Zeus had many children both divine and mortal but yes Heracles was his last mortal son"
	    },
	    {
	      question: " Heracles' mother was the Godess Hera.",
	      answer: false,
	      info: "That's Right! Heracles was the son of the affair Zeus had with the mortal woman Alcmene. Zeus made love to her after disguising himself as her husband"
	    },
	    {
	      question: "Athena was the person who issued Heracles with the 12 Labors.",
	      answer: false,
	      info: "Well done! Heracles was required to carry out 12 labors set by his archenemy, Eurystheus"
	    },
	    {
	      question: "Slaying the Lernaean Hydra was Heracles final Labor.",
	      answer: false,
	      info: "Correct! The slaying of the Hydra was the second Labor"
	    },
	    {
	      question: "Heracles had a twin brother, who had a different father.",
	      answer: true,
	      info: "Hard to believe right? A case of heteropaternal superfecundation, where a woman carries twins sired by different fathers"
	    },
	    {
	      question: "The reason Heracles had to perform the 12 Labors was because he had murdered his own children.",
	      answer: true,
	      info: "Sad but true! Driven mad by Hera, Heracles slew his own children"
	    },
	    {
	      question: "One of Heracles' 12 Labors was to kill Medusa.",
	      answer: false,
	      info: "Hoorah! Perseus was the one who killed Medusa"
	    },
	    {
	      question: "Heracles' iconic weapon of choice was a sword.",
	      answer: false,
	      info: "You're as sharp as that sword we made up! He did have an iconic weapon, but it was a huge club"
	    },
	    {
	      question: "As a symbol of masculinity and warriorship, Heracles had a number of male lovers.",
	      answer: true,
	      info: "Well done! This was the case in Acient Greece,  Plutarch, in his Eroticos, maintains that Heracles' male lovers were beyond counting"
	    },
	    {
	      question: "Heracles was a god during his life.",
	      answer: false,
	      info: "Correct! Heracles was mortal"
	    },
	    {
	      question: "Heracles died from poison.",
	      answer: true,
	      info: "Congratulations! he was given a shirt covered in the Hydra's blood from Heracles' own arrows, and this poisons him, tearing his skin and exposing his bones"
	    }]},
	
	    apollo : {
	      name: "Apollo",
	      questions: [{
	        question: "Zeus and Hera were the parents of Apollo",
	        answer: false,
	      info: "Yes! Apollo is the son of Zeus and Leto"
	      },
	      {
	        question: "Apollo was the patron of Delphi",
	        answer: true,
	      info: "Indeed this is true!"
	      },
	      {
	        question: "Asclepius is the son of Apollo",
	        answer: true,
	      info: "Correct! Aesculapius was a hero and god of medicine in ancient Greek religion and mythology"
	      },
	      {
	        question: "Artemis is the twin sister of Apollo",
	        answer: true,
	      info: "Yes, the twin sister of Apollo and the Goddess of the Hunt, Forests and Hills, the Moon, Archery"
	      },
	      {
	        question: "The lyre Apollo carries was created and given to him by Hermes",
	        answer: true,
	      info: "Correct! Apollo functioned as the patron god of music and poetry. Hermes created the lyre for him, and the instrument became a common attribute of Apollo"
	      },
	      {
	        question: "Apollo was born in Mount Olympus",
	        answer: false,
	      info: "False indeed! Apollo's birthplace was Mount Cynthus on the island of Delos"
	      },
	      {
	        question: "Python was defeated by Apollo",
	        answer: true,
	      info: "That is right! Apollo's first triumph, he slew the serpent Python with his bow and arrows"
	      },
	      {
	        question: "Apollo aided Paris in killing Achilles by guiding the arrow of his bow to Achilles heel",
	        answer: true,
	      info: "Correct! One interpretation of his motive is that it was in revenge for Achilles' sacrilege in murdering Troilus"
	      },
	      {
	        question: "Apollo had three sons to Cyrene",
	        answer: false,
	      info: "Nice one! By Cyrene, Apollo had one son named Aristaeus, who became the patron god of cattle, fruit trees, hunting, husbandry and bee-keeping"
	      },
	      {
	        question:"Apollo won the musical challenge of Pan",
	        answer: true,
	      info: "True that! He whooped Pan and his stupid pipes"
	      },
	      {
	        question: "Hera sent the Chimera to hunt Apollo",
	        answer: false,
	      info: "One more left to go! Hera actually sent Python to hunt Apollo’s mother"
	      },
	      {
	        question: "Apollo was leader of the Muses",
	        answer: true,
	      info: "Finished! As the leader of the Muses and director of their choir, Apollo functioned as the patron god of music and poetry"
	      }
	      ]
	    }
	  }
	}
	
	  CharacterInfo.prototype = {
	    retrieveCharacter: function(characterName){
	      console.log(this.characters);
	      for(var key in this.characters){
	        if(this.characters[key].name === characterName){
	          return this.characters[key];
	        }
	      }
	    }
	  }
	
	  module.exports = CharacterInfo;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var ViewLogic = function(){
		
	}
	
	ViewLogic.prototype = {
		move: function(destination, event){
		    var scroller = function(destination){
	
		      var view = document.querySelector('#view'); 
		      console.log(view.scrollLeft);
	
		      if (view.scrollLeft <= destination){
		        var y = view.scrollLeft;
		        view.scrollLeft = y+5;
	
		        if(view.scrollLeft >= destination){
		          event();
		          clearInterval(smoothScroll);
		        } 
		      } else if (view.scrollLeft >= destination){
		        var y = view.scrollLeft;
		        view.scrollLeft = y-5;
	
		        if(view.scrollLeft <= destination){
		          event();
		          clearInterval(smoothScroll);
		        }
		      }
		    }
	
		    var smoothScroll = setInterval(function(){scroller(destination)}, 20);
		    console.log(view.scrollLeft);
		  },
		  scrollMaster: function(destination, event){
		    this.move(destination, event);
		    console.log("back");
		  }
	}
	
	module.exports = ViewLogic;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var MythFacts = function(){
	
	}
	
	MythFacts.prototype = {
	  makeRequest: function(url, callback){
	    var request = new XMLHttpRequest();
	    request.open("GET", url);
	    request.onload = callback;
	    request.send();
	  },
	
	  getWiki: function(mythQuery, callback){
	    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + mythQuery + "&origin=*";
	    this.makeRequest(url, function(){
	      if (this.status !== 200){
	        return;
	      } else {
	        var info = JSON.parse(this.responseText).query.pages;
	        var pageKey = Object.keys(info)[0];
	        var page = info[pageKey].extract;
	        callback(page);
	      }
	    });
	  }
	
	}
	
	module.exports = MythFacts;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map