var Character = require('character');

var Logic = function() {

}

Logic.prototype = {
  generateCharacter: function(){
    this.characters = [];
    this.characters.push(new Character("Heracles"));
    this.characters.push(new Character("Apollo"));
    this.characters.push(new Character("Athena"));
    this.characters.push(new Character("Jason"));
  }
}