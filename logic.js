$(document).ready(function () {
  var terms = ["dragons", "goblins", "werewolves",
      "zombies", "vampires", "centaurs"];

  function addButtons() {
      $("#buttons").empty();

      for (let i in terms) {
          var btn = $("<button>");
          btn.addClass("btn btn-secondary col-4 m-auto border");
          btn.attr("data-type", terms[i]);
          btn.text(terms[i]);
          $("#buttons").append(btn);
      }
  }

  $(document).on("click", '.btn', function () {

    $("#gifs").empty();
    var type = $(this).attr("data-type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

       
        

                for (let i in results) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("col-4");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating).addClass("border");


                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var gif = $("<img>");
                    gif.attr(
                        {
                            "src": still,
                            "data-still": still,
                            "data-animate": animated,
                            "data-state": "still"
                        }
                    );
                    gif.addClass("gif img-fluid");


                    gifDiv.append(gif);
                    gifDiv.append(p);

                    $("#gifs").append(gifDiv);
                
        }
      });
  });

  $(document).on("click", ".gif", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  
  $("#add").on("click", function(event) {
    event.preventDefault();
    var newTerm = $("#input").val();

    if (newTerm.length > 2) {
      terms.push(newTerm);
    }

    addButtons();

  });

  addButtons();
 

});
