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
