var $exampleText = $("#example-text");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
var $imgs = $("#imgs");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(userObject) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "/api/examples",
      data: JSON.stringify(userObject)
    });
  },
};


var handleFormSubmit = function(event) {
  event.preventDefault();
  console.log("submit");

  var example = {
    userId: $exampleText.val().trim(),
    avatar: $imgs.attr("src")
    
  };

  if (!(example.userId)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    window.location.href = "/search/" + example.userId;
  });

  

  $exampleText.val("");
  
};

$submitBtn.on("click", handleFormSubmit);
