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
      makeRequest(url, function(){
        if (this.status !== 200){
          return;
        } else {
          var response = JSON.parse(this.responseText);
          console.log(response);
          callback(response);
        }
      });
}

}

module.exports = MythFacts;
