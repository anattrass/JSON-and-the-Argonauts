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
          var response = JSON.parse(this.responseText);
          var pages = response.query.pages;
          console.log(response.query.pages);
                  pagesArray = [];
                  for(key in pages) {pagesArray.push(pages[key])};
           console.log(pagesArray);
          callback(pagesArray[0].title);
        }
      });
}

}

module.exports = MythFacts;
