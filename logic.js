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

  $(document).on("click", '.term', function (e) {
    e.preventDefault();
    
    var type = $(this).attr("data-type").replace(" ", "+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=SjmJV3il6iVd57sR2lh8nvnaRVFGzvtM&limit=" + $("#limit").val();
  
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        $("#gifs").empty();
        var results = response.data;
    
        if(results.length != 0){
          
          for (let i in results) {
            var gifDiv = $("<div>");
            gifDiv.addClass("text-center col-sm-6 col-lg-4 border");

            var rating = results[i].rating;
            var top = $("<div>").addClass("row justify-content-center");
            var bottom = $("<div>").addClass("row");
              
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
            
            var gif = $("<img>").attr(
              {
                  "src": still,
                  "data-still": still,
                  "data-animate": animated,
                  "data-state": "still"
              }
          ).addClass("gif");

            var p = $("<button>").text("Rating: " + rating).addClass("btn btn-outline-secondary active col-6");
            var d = $("<button>").text("Save").addClass("btn btn-outline-secondary col-6");

            d.click(function(){
              download(results[i].images.original.url, results[i].title);
             });

           
         

           top.append(gif);
           bottom.append(p);
           bottom.append(d);
 
   

            gifDiv.append(top);
            gifDiv.append(bottom);
           

            $("#gifs").append(gifDiv);
        
}
        }else{
          $("#gifs").html("<h1>No gifs found</h1>");
        }
        

      });
  });

  $(document).on("click", ".gif", function(e) {
    e.preventDefault();
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

$(".stop").on('click', function(e){
  e.preventDefault();

 
  $(".gif").each(function(i, obj){
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  });
  


});

  $("#theme").on("click", function(e){
    e.preventDefault();
    if($("body").hasClass("bg-light")){
      $(this).text("Light Theme")
      $("body").removeClass("bg-light text-dark").addClass("bg-dark text-white");
    }else if($("body").hasClass("bg-dark")){
      $(this).text("Dark Theme");
      $("body").removeClass("bg-dark text-white").addClass("bg-light text-dark")
    }
  });
  
  $("#add-button").on("click", function(e) {
    e.preventDefault();
    var newTerm = $("#input").val().toLowerCase();

    if (newTerm.length > 2 && !terms.includes(newTerm)) {
      terms.unshift(newTerm);
      terms.pop();
    }else{
      alert("Pick another term.");
    }

    addButtons();

  });


  addButtons();
 

});
