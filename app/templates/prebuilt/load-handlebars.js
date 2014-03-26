// Template sources and what DIVs they will appear in
var templates = [
    {
        "templatesource": "#sections-template",
        "templatehtml": "#content-box"
    }
];

// Load up our templates
define([
    'jquery',
    'handlebars',
    'underscore',
    'backbone'
], function ($, handlebars, _, Backbone) {
    // This loop will spit out all the template
    _.each(templates, function(element, num_templates) {
        // Create a view for every object in templates array
        HandlebarsView = Backbone.View.extend({
            // What DIV the view will be placed in
            // Determined by templates array
            el: element["templatehtml"],

            initialize: function(){
                this.render();
            },
            render: function(){
                var el = this.$el;
                // Compile the template using Handlebars
                var source = $(element["templatesource"] + "").html();
                var handlebarscompile = Handlebars.compile(source);
                // Render the templates
                <% if (!templateTabletop && !templateJSONMap && templateGeoJSON) { %>
                el.append(handlebarscompile(polygons.features));
                <% } else { %>
                el.append(handlebarscompile(json_data));
                <% } %>
                return this;
            }
        });
        
        // This puts view on the page
        handlebarsview = new HandlebarsView();
    // Close each statement
    }, this);

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
});