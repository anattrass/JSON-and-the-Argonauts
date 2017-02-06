var CharacterInfo = function(){ 
this.characters = {
 jason : { 
    name: "Jason",
    questions: [{
      question: "Jason was the leader of the Argonauts",
      answer: true
    },
    {
      question: "Jason was married to a sorceress",
      answer: true
    },
    {
      question: "Jason and his men were hunting for a black fleece",
      answer: false
    },
    {
      question: "On their travels, the Argonauts encountered a tribe of giants called the Gegeines, who had 6 arms",
      answer: true
    },
    {
      question: "Jason and his Argonauts once accidentally killed lots of their allies because they didn't recognise them in the dark.",
      answer: true
    },
    {
      question: "The Harpies were monsters with the face of a woman and the wings of a bat.",
      answer: false
    },
    {
      question: "After surviving the wrath of the gods, 6-armed giants, and a jealous sorceress, Jason was eventually killed by his own boat.",
      answer: true
    },
    {
      question: "Jason was once voiced by William Shatner",
      answer: true
    },
    {
      question: "Jason was raised by a Satyr",
      answer: false
    },
    {
      question: "To retrieve the Golden Fleece, Jason was required to complete three tasks. One of these was to plough a field with fire-breathing oxen.",
      answer: true
    },
    {
      question: "Another task was to defeat the Cyclopes.",
      answer: false
    },
    {
      question: "The magical warriors called Spartoi appeared when Jason sowed a field with a dragon's teeth.",
      answer: true
    }]
  },

  athena : {
    name: "Athena", 
    questions: [{
      question: "Athena was born from zeus.",
      answer: true
    },
    {
      question: "Athena is the goddess of war.",
      answer: true
    },
    {
      question: " Athena wields the aegis and thunderbolt for zeus.",
      answer: true
    },
    {
      question: "Her mother was Aphrodite.",
      answer: false
    },
    {
      question: "Athena was a patron of the arts and crafts, especially when it came to spinning and weaving.",
      answer: true
    },
    {
      question: "Athena served as a guardian of Crete, where the Parthenon served as her temple.",
      answer: false
    },
    {
      question: "The hawk was her bird and the willow tree was hers.",
      answer: false
    },
    {
      question: "Athena invented the harp but never played it.",
      answer: false
    },
    {
      question: "Athena is one of the four virgin goddess.",
      answer: false
    },
    {
      question: "Athena is a shapeshifter.",
      answer: true
    },
    {
      question: "Athena was born from zeus on the island of Crete.",
      answer: false
    },
    {
      question: "Odysseus was Athena’s uncle.",
      answer: false
    }]
  },




  heracles : {
    name: "Heracles", 
    questions: [{
      question: "There were 10 Labors of Heracles.",
      answer: false
    },
    {
      question: "Heracles was the last mortal son of Zeus.",
      answer: true
    },
    {
      question: " Heracles' mother was the Godess Hera.",
      answer: false
    },
    {
      question: "Athena was the person who issued Heracles with the 12 Labors.",
      answer: false
    },
    {
      question: "Slaying the Lernaean Hydra was Heracles final Labor.",
      answer: false
    },
    {
      question: "Heracles had a twin brother, who had a different father.",
      answer: true
    },
    {
      question: "The reason Heracles had to perform the 12 Labors was because he had murdered his own children.",
      answer: true
    },
    {
      question: "One of Heracles' 12 Labors was to kill Medusa.",
      answer: false
    },
    {
      question: "Heracles' iconic weapon of choice was a sword.",
      answer: false
    },
    {
      question: "As a symbol of masculinity and warriorship, Heracles had a number of male lovers.",
      answer: true
    },
    {
      question: "Heracles was a god during his life.",
      answer: false
    },
    {
      question: "Heracles died from poison.",
      answer: true
    }]},

    apollo : {
      name: "Apollo",
      questions: [{
        question: "Zeus and Hera were the parents of Apollo",
        answer: false
      },
      {
        question: "Apollo was the patron of Delphi",
        answer: true
      }
      // {
      //   question: "Asclepius is the son of Apollo",
      //   answer: true
      // },
      // {
      //   question: "Artemis is the twin sister of Apollo",
      //   answer: true
      // },
      // {
      //   question: "The lyre Apollo carries was created and given to him by Hermes",
      //   answer: true
      // },
      // {
      //   question: "Apollo was born in Mount Olympus",
      //   answer: false
      // },
      // {
      //   question: "Python was defeated by Apollo",
      //   answer: true
      // },
      // {
      //   question: "Apollo aided Paris in killing Achilles by guiding the arrow of his bow to Achilles heel",
      //   answer: true
      // },
      // {
      //   question: "Apollo had three sons to Cyrene",
      //   answer: false
      // },
      // {
      //   question:"Apollo won the musical challenge of Pan",
      //   answer: true
      // },
      // {
      //   question: "Hera sent the Chimera to hunt Apollo",
      //   answer: false
      // },
      // {
      //   question: "Apollo was leader of the Muses",
      //   answer: true
      // }
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