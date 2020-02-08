var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/examples",
      data: JSON.stringify(example)
    });
  },

  updateExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "PUT",
      url: "/api/search",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "/api/examples",
      type: "GET",
      async: false,
    }).responseJSON;
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "/api/examples/" + id,
      type: "DELETE"
    });
  }
};

function randomShuffle(array) {
  for (i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

$(document).ready(function () {
  $("#userScores").hide();
  $("#statsContainer").hide();
  $("#statsHeader").hide();
  $("#userId").html(userId);
  var timer = new easytimer.Timer();
  timer.addEventListener('secondsUpdated', function (e) {
    $('#basicUsage').html(timer.getTimeValues().toString());
  });

  Notiflix.Notify.Init({ position: "top-left", distance: "40px" });

  $("#play").on("click", function () {
    $("#header").hide();
    $("#image").empty();
    $(".input-group").hide();
    $("#play").hide();
    timer.reset();
    timer.start();

    var searchResult = $("#searchField").val().trim();
    var queryURL = "https://www.googleapis.com/customsearch/v1?q=" + searchResult + "&cx=017582625438444294087%3Aly6xfvmxhni&filter=1&imgSize=medium&imgType=photo&num=8&searchType=image&start=1&key=AIzaSyAHj9i08kkTs-82kUdXILGLyRmX3Fwfzro"

    $.ajax({
      url: queryURL,
    }).then(function (response) {
      console.log(response);
      var photoUrls = [];

      for (i = 0; i < response.items.length; i++) {
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

      var count = 0;
      var click1 = true;
      var click1Flipper;
      var click1Result;
      var clickCount = 0;


      for (i = 0; i < photoUrls.length; i++) {
        var result = photoUrls[i];

        if (currentRowSize % rowLimit == 0) {
          currentRow = $("<div class='row'>").appendTo("#image");
        }

        var column = $("<div class='col-xs'>").appendTo(currentRow);
        var card = $("<div class='card' style='width: 10rem; height: 10rem;'>").appendTo(column);
        var flipperDiv = $("<div class='flipper'>").appendTo(card)
        $("<img src='/images/logo.png' class='card-img-top game-card front' style='width: 10rem;height: 10rem;'>").appendTo(flipperDiv);
        $("<img src='" + result + "' class='card-img-top game-card back' style='width: 10rem;height: 10rem;'>").appendTo(flipperDiv);

        currentRowSize++;
      }



      $(".game-card").on("click", function () {

        $("#userScores").show();
        // Disable clicks while handling stuff to prevent double clicks.
        $(".game-card").addClass("no-clicks");

        // Get the closest flipper (the one from this card)
        var flipper = $(this).closest(".flipper");
        // Toggle it (actually flip to the other side)
        flipper.toggleClass("is-flipped");
        // Get the image url from the card
        var imageUrl = flipper.children(".back").attr("src");

        console.log(imageUrl);

        if (click1 == true) {
          click1Result = imageUrl;
          click1Flipper = flipper;
          click1 = false;
          $(".game-card").removeClass("no-clicks");
        } else {
          clickCount++;
          $("#scoreClick").html(clickCount);
          console.log(clickCount);
          if (click1Result == imageUrl) {
            Notiflix.Notify.Success('Oh Yeesss! Its a Match!');

            click1Flipper.children("img").off("click");
            flipper.children("img").off("click");
            $(".game-card").removeClass("no-clicks");
            count++;

            if (count == 8) {
              // This shows  win crap
              var userTime = timer.getTimeValues().toString();
              console.log("Its a win!")
              timer.stop();


              // Display the fireworks
              $("#fireworks-overlay").css("display", "block");

              // Set a timeout (how long to show the fireworks)
              setTimeout(function () {
                // Hide the fireworks
                $("#fireworks-overlay").css("display", "none");

                API.updateExample({ userId: userId, timeScore: userTime, clickScore: clickCount });
                printStats(); //PRINT STATS AND OFFER TO GO TO THE 1ST PAGE AGAIN

                // Here you can display whatever you want for reset game.
              }, 3000);

            }

          } else {
            Notiflix.Notify.Failure('Keep trying ...');
            setTimeout(function () {
              click1Flipper.toggleClass("is-flipped");
              flipper.toggleClass("is-flipped");
              $(".game-card").removeClass("no-clicks");
            }, 1500);
          }
          click1 = true;
        }



      });

    });

    function printStats() {
      $("#userScores").hide();
      $("#header").hide();
      $("#image").hide();
      $(".input-group").hide();
      $("#play").hide();
      timer.stop();
      $("#scoreClick").html(0);
      $("#statsHeader").show();
      $("#statsContainer").show();
      console.log(API.getExamples());
      var data = API.getExamples();
      for (i = 0; i < data.length; i++) {
        var row = $("<tr>");
        $("<td>" + data[i].userId + "</td>").appendTo(row);
        $("<td>" + data[i].timeScore + "</td>").appendTo(row);
        $("<td>" + data[i].clickScore + "</td>").appendTo(row);
        row.appendTo($("#statsTable"));
        console.log(row);
      }


    }
  });
});
