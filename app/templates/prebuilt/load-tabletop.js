// Page information that we will build on
var json_data = {
    "body": []
};

define(['jquery', 'tabletop'<% if (templateMap) { %>, 'leaflet.awesome-markers', <% } %><% if (templateMarkerCluster) { %>, 'leaflet.markercluster-custom-src'<% } %>], function () {
    return {
        initializeTabletopLoad: function() {
            // Here's the Tabletop feed
            // First we'll initialize Tabletop with our spreadsheet
            var jqueryNoConflict = jQuery;
            jqueryNoConflict(document).ready(function(){
                initializeTabletopObject('0As3JvOeYDO50dF9NWWRiaTdqNmdKQ1lCY3dpdDhZU3c');
            });

            // Pull data from Google spreadsheet
            // And push to our pullDataFromTabletop function
            function initializeTabletopObject(dataSpreadsheet){
                Tabletop.init({
                    key: dataSpreadsheet,
                    callback: pullDataFromTabletop,
                    debug: false
                });
            }

            // This function gets our data from our spreadsheet
            function pullDataFromTabletop(tabletopData, tabletop) {
                // console.log(tabletop.key);
                var dataTabletop = tabletopData[tabletop.foundSheetNames]["elements"];
                // Go through our Google spreadsheet
                // Stored in tabletopData variable
                // tabletopData = Worksheet
                for (var num = 0; num < dataTabletop.length; num ++) {
                    json_data["body"].push(dataTabletop[num]);
                // Close Tabletop data loop
                }
                
                <% if (templateHandlebars) { %>// Load templates after Tabletop data is loaded
                require(['app/load-handlebars'], function(handlebars){
                    handlebars.loadHandlebarsTemplate();
                });<% } %>
            // Close pullDataFromTabletop
            };
        // Close initialTabletopLoad
        }
    // Close return
    }
// Close require
});