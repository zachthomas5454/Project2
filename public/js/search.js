function randomShuffle(array) {
    for(i=array.length-1; i > 0; i--) {
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
      }
}

$(document).ready(function() {

function gameStart() {


}

$("#play").on("click", function() {
$("#image").empty();
  var searchResult = $("#searchField").val().trim();
    var queryURL = "https://www.googleapis.com/customsearch/v1?q=" + searchResult + "&cx=017582625438444294087%3Aly6xfvmxhni&filter=1&imgSize=medium&imgType=photo&num=8&searchType=image&start=1&key=AIzaSyAHj9i08kkTs-82kUdXILGLyRmX3Fwfzro"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response);
      var photoUrls = [];

    for (i = 0; i< response.items.length; i++) {
        var result = response.items[i].link;
        photoUrls.push(result);
        photoUrls.push(result);
    }
    randomShuffle(photoUrls);
    randomShuffle(photoUrls);
    randomShuffle(photoUrls);

    var rowLimit = 4;
    var currentRowSize = 0;
    var currentRow;
    for (i=0; i<photoUrls.length; i++) {
        var result = photoUrls[i];

        if (currentRowSize % rowLimit == 0) {
            currentRow = $("<div class='row'>").appendTo("#image");
        }

        var column = $("<div class='col-xs'>").appendTo(currentRow);
        var card = $("<div class='card' style='width: 10rem;'>").appendTo(column);
        $("<img src='" + result + "' class='card-img-top' style='width: 10rem;height: 10rem;'>").appendTo(card);
        
        currentRowSize++;
    }
    
        

  });


});
});
  