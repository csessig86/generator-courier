// Template sources and what DIVs they will appear in
var templates = [
    {
        "templatesource": "#sections-template",
        "templatehtml": "#content-box"
    }
];

// Load up our templates
define(['jquery', 'handlebars'], function ($, handlebars) {
    return {
        loadHandlebarsTemplate: function() {
            // This loop will spit out all the template
            for (num = 0; num < templates.length; ++num) {
                var source = $(templates[num]["templatesource"] + "").html();
                var handlebarscompile = Handlebars.compile(source);

                // Determine if we are rendering the template at the beginning
                // Or the end of the DIV
                <% if (!templateTabletop && !templateJSONMap && templateGeoJSON) { %>
                $(templates[num]["templatehtml"] + "").append(handlebarscompile(polygons.features));
                <% } else { %>
                $(templates[num]["templatehtml"] + "").append(handlebarscompile(json_data));
                <% } %>
            // Close for loop inside loadHandlebarsTemplate
            }

            <% if (templateDataTables) { %>// Datatables load
            require(['app/load-datatables'], function(datatables){
                datatables.loadDataTables();
                // For mobile load
                if ($(window).width() < 476) {
                    datatables.mobileDatatablesOptions();
                }
            });<% } else if (templateRegularTable) { %>
            // Load fixed header
            require(['app/load-table-header'], function(header){
                header.offsetTableHeader();
                header.reloadOffsetTableHeader();
            });<% } %>
        // Close loadHandlebarsTemplate
        }
    // Close return
    }
});