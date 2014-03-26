define([
    'jquery',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    // Set up view for JSON data
    JSONDataView = Backbone.View.extend({
        <% if (templateDataTables || templateRegularTable) { %>// What we're appending to
        el: '#content-box tbody',<% } else { %>// What we're appending to
        el: '#content-box',
        <% } %>
        
        initialize: function() {
            this.render();
            <% if (templateDataTables || templateRegularTable) { %>this.tableLoad();<% } %>
        },
        render: function() {
            var el = this.$el;
            // Loop through our JSON file
            _.each(json_data, function(element, num_json) {
                // Build our table
                <% if (templateDataTables || templateRegularTable) { %>var output_json = '<tr>';
                output_json += "<td class='sorting_1'>" + element["brewery"] + "</td>";
                output_json += "<td>" + element["address"] + "</td>";
                output_json += "<td>" + element["city"] + "</td>";
                output_json += "<td>" + element["phone"] + "</td>";
                output_json += '</tr>';<% } else { %>
                var output_json = '<p>' + element["brewery"] + '</p>';<% } %>
                // Append to DOM
                el.append( output_json );
            }, this);
            
            return this;
        },<% if (templateDataTables || templateRegularTable) { %>
        tableLoad: function() {
            <% if (templateDataTables && !templateHandlebars) { %>// Datatables load
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

            return this;
        }<% } %>
    });

    // Fire it off
    jsondataview = new JSONDataView();
});