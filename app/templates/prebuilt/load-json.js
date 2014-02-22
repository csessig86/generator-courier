define(['jquery'], function ($) {
    return {
        loadJSONdata: function() {
            // This loop will spit out JSON data
            for (num_json = 0; num_json < json_data.length; ++num_json) {

                // Determine if we are rendering the template at the beginning
                // Or the end of the DIV
                var output_json = "<tr>";
                output_json += "<td>" + json_data[num_json]["brewery"] + "</td>";
                output_json += "<td>" + json_data[num_json]["address"] + "</td>";
                output_json += "<td>" + json_data[num_json]["city"] + "</td>";
                output_json += "<td>" + json_data[num_json]["phone"] + "</td>";
                output_json += "</tr>";

                $("#content-box tbody").append( output_json );
            // Close for loop inside loadHandlebarsTemplate
            }

            <% if (templateDataTables) { %>// Datatables load
            require(['app/load-datatables'], function(datatables){
                datatables.loadDataTables();
            });<% } %>
        // Close loadJSONdata
        }
    // Close return
    }
});