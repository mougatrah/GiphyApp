$(document).ready(function () {
  var terms = ["dragons", "goblins", "werewolves",
      "zombies", "vampires", "centaurs"];

  function addButtons() {
      $("#buttons").empty();

      for (let i in terms) {
          var btn = $("<button>");
          btn.addClass("term btn btn-secondary col-6   col-lg-4 m-auto border");
          btn.attr("data-type", terms[i]);
          btn.text(terms[i]);
          $("#buttons").append(btn);
      }
  }

  $(document).on("click", '.term', function () {

    $("#gifs").empty();
    var type = $(this).attr("data-type").replace(" ", "+");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=SjmJV3il6iVd57sR2lh8nvnaRVFGzvtM&limit=" + $("#limit").val();
    console.log(queryURL);
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
       
        

                for (let i in results) {
                    var gifDiv = $("<div>");
                    gifDiv.addClass("col-sm-6 col-lg-4");

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

$("#stop").on('click', function(){
  console.log("Stopping");
  console.log($(".gif").eq());
 
  $(".gif").each(function(i, obj){
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  });
  


});

  $("#theme").on("click", function(){
    if($("body").hasClass("bg-light")){
      $(this).text("Light Theme")
      $("body").removeClass("bg-light text-dark").addClass("bg-dark text-white");
    }else if($("body").hasClass("bg-dark")){
      $(this).text("Dark Theme");
      $("body").removeClass("bg-dark text-white").addClass("bg-light text-dark")
    }
  });
  
  $("#add-button").on("click", function(event) {
    event.preventDefault();
    var newTerm = $("#input").val().toLowerCase();

    if (newTerm.length > 2 && !terms.includes(newTerm)) {
      terms.unshift(newTerm);
      terms.pop();
    }else{
      alert("invalid term");
    }

    addButtons();

  });


  addButtons();
 

});
