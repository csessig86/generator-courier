define(['jquery'], function ($) {
    return {
        loadJSONdata: function() {
            // This loop will spit out JSON data
            for (num = 0; num < json_data.length; ++num) {

                // Determine if we are rendering the template at the beginning
                // Or the end of the DIV
                $("#content-box").append("<p>" + json_data[num]["brewery"] + "</p>");
            // Close for loop inside loadHandlebarsTemplate
            }
        // Close loadHandlebarsTemplate
        }
    // Close return
    }
});