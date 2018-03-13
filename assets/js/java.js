var ogGifs = ["Surfing","Skateboarding","Snowboarding"];
    
    function renderButtons(){
        $("#newButtons").empty();
        for (let i = 0 ; i < ogGifs.length ; i++){
            var bttn = $("<button>");
            bttn.addClass("gif");
            bttn.attr("data-name",ogGifs[i]);
            bttn.text(ogGifs[i]);
            $("#newButtons").append(bttn);
        }
    }
        $("#addGif").on("click", function(event){
            event.preventDefault();
            var gif = $("#gifInput").val();
            if ( gif === "" ) {
                alert("You didn't write anything bozo!")
            } else {
                ogGifs.push(gif)
                renderButtons()
            }
            $("#gifInput").val("");
    });

    renderButtons();
    
    $("#newButtons").on("click", ".gif", function() {
        event.preventDefault()
        $("#gifPropogator").empty()
        var getGiphy = $(this).attr("data-name")
        // var rating = $(this).attr("data-name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=gWO40SIQa1EcWO2gcH3VGy9Yc2BFN7ni&q=" + getGiphy + "&limit=10&offset=0&rating=G&lang=en";
        $.ajax({
        url: queryURL,
        method: "GET"
        })
        .then(function(response) {
            for (let i = 0 ; i < response.data.length ; i++){
                console.log(response.data[i].images.original.url)
                $("#gifPropogator").append(`<img src = "${response.data[i].images.original_still.url}"
                    data-still = "${response.data[i].images.original_still.url}"
                    data-animate = "${response.data[i].images.original.url}"
                    data-state = "still" height = "250px" width = "300px" class = "gif"> <figcaption width = "350px" > Rating : ${response.data[i].rating}</figcaption>`)
            }
            $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
            });
        });
    });