$(document).ready(function() {
    // Page load
    // When the page loads, you will query the TV Maze API to get the list of shows using an AJAX request
    $.ajax({
        url: "http://api.tvmaze.com/shows",
        method: "GET"
    }).done(function(responseMsg) {
        for(show of responseMsg){
            $("#showList").append(`<li><a href= ${show._links.self.href}>${show.name}</a></li>`);
        }
        $("#showList").show();
        $("#show").hide();
    });

    // Search form submission
    $("#searchForm").submit(function(event) {
        event.preventDefault();
        const search_term = $("#search_term").val();

        if(!search_term){
            $("#error").text("Error: search term undefined.");
            $("#error").show();
        }
        else if(search_term.trim() == ''){
            $("#error").text("Error: search term cannot be whitespace.");
            $("#error").show();            
        }
        else{
            // Clearing the show list and search box
            $("#error").hide();
            $("#searchForm").hide();
            $("#show").hide();
            $("#showList").empty();

            // AJAX call
            $.ajax({
                url: `http://api.tvmaze.com/search/shows?q='${search_term}`,
                method: "GET"
            }).done(function(responseMsg) {
                for(show of responseMsg){
                    $("#showList").append(`<li><a href= ${show.show._links.self.href}>${show.show.name}</a></li>`);
                }
                $("#showList").show();
                $("#homeLink").show();
            });                
        }

    });

    // Link clicked
    // For the link, calls a function on the click event of the link and not the default link behavior
    $("#showList").on('click', 'li a:focus', function(event) {
        event.preventDefault();

        $("#showList").hide();
        $("#show").empty();
        $("#error").hide();
        $("#searchForm").hide();

        $.ajax({
            url: $("#showList li a:focus").attr("href"),
            method: "GET"
        }).done(function(show) {
            let showName = show.name;
            let showImage = show.image.medium;
            let showLanguage = show.language;
            let showGenre = show.genres;
            let showRating = show.rating.average;
            let showNetwork = show.network.name;
            let showSummary = show.summary;

            if(!showName) showName = 'N/A';
            if(!showImage) showImage = '../images/no_image.jpeg';
            if(!showLanguage) showLanguage = 'N/A';
            if(!showGenre) showGenre = ['N/A'];
            if(!showRating) showRating = 'N/A';
            if(!showNetwork) showNetwork = 'N/A';
            if(!showSummary) showSummary = 'N/A';

            // Regex to remove HTML tags from summary string
            // https://stackoverflow.com/questions/11229831/regular-expression-to-remove-html-tags-from-a-string
            showSummary = showSummary.replace(/<[^>]*>/g, '');

            $("#show").append(`<h1>${showName}</h1>`);
            $("#show").append(`<img src=${showImage} alt=${showName}>`);
            $("#show").append('<dl></dl>');
            $("#show dl").append('<dt>Language</dt>');
            $("#show dl").append(`<dd>${showLanguage}</dd>`);

            $("#show dl").append('<dt>Genres</dt>');
            $("#show dl").append('<dd><ul id="genre"></ul></dd>');
            for(genre of showGenre){
                $("#show dl #genre").append(`<li>${genre}</li>`);
            }

            $("#show dl").append('<dt>Average Rating</dt>');
            $("#show dl").append(`<dd>${showRating}</dd>`);
            $("#show dl").append(`<dt>Network Name</dt>`);
            $("#show dl").append(`<dd>${showNetwork}</dd>`);
            $("#show dl").append(`<dt>Summary</dt>`);
            $("#show dl").append(`<dd>${showSummary}</dd>`);

            $("#show").show();
            $("#homeLink").show();            
        });

    });
});