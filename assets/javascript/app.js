
// run this when page loads
$(function() {
    populateButtons(searchArray, 'searchButton', '#buttonsArea'); 
    console.log("Page loaded!")
})


// GLOBAL VARIABLES
// -----------------------------------------------------------------------

    // Store list of buttons
    var searchArray = ['Dog', 'Cat', 'Bird'];

// FUNCTIONS
// -----------------------------------------------------------------------

    // Populate the area where buttons will be with... buttons!
    function populateButtons(searchArray,classToAdd,areaToAddTo) {

        // empty out existing buttons every time a new search result button is added 
        $(areaToAddTo).empty();

        for (var i=0; i < searchArray.length; i++) {
            var a = $('<button>'); // for search results, create a button
            a.addClass(classToAdd); // add a class to whatever search result button is created
            a.attr('data-type', searchArray[i]); // add attribute 'data type' to selected item in the array that matches item from array
            a.text(searchArray[i]); // set text of button to selected item in the array
            $(areaToAddTo).append(a); // update HTML to add the button
        }
    }

    // store data elements so those elements can be used to modify an API call
    $(document).on('click', '.searchButton', function () {
        $('#searches').empty();
        var type = $(this).data('type');
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q='+type+'&api_key=K0SOL7kG9qKDhnNtILgDDhCtGD70yTV5&limit=10';
        $.ajax({
            url : queryURL, 
            method: 'GET',
        })
        .done(function(response){
            for(var i=0; i<response.data.length; i++) { // loop through the array
                var searchDiv = $('<div class="search-item>');
                var rating = response.data[i].rating;  // store the rating that is shown to the user
                var p = $('<p>').text('Rating: ' +rating);
                var animated = response.data[i].images.fixed_height.url; // to reference the API response when moving
                var still = response.data[i].images.fixed_height_still.url; // to reference the API response to be responsive to being still
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still):
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p); // identify rating of the gif
                searchDiv.append(image);
                $('#searches').append(searchDiv); -- 1720
        
            } 
        })
    })

// MAIN OPERATIONS
// -----------------------------------------------------------------------