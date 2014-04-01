<% if (templateTabletop) { %>// Tabletop load
require(['app/load-tabletop'], function(tabletop){
	tabletop.initializeTabletopLoad();
});<% } %>

<% if (templateHandlebars && !templateTabletop) { %>// Handlebars load
require(['app/load-handlebars'], function(){});<% } %>

<% if (!templateTabletop && !templateHandlebars && !templateMap || templateJSONMap) { %>// JSON load
require(['app/load-json'], function(){});<% } %>

<% if (templateMap) { %>// Map options load
require(['app/load-map'], function(map){
	// Base map load
	map.baseMap();
    map.geocode();
	map.legendTableView();

	// GeoJSON load
	<% if (templateGeoJSON) { %>map.geoJSON();<% } %>
	<% if (templateMultipleGeoJSON) { %>map.geoJSONTwo();
	map.removeSecondGeoJSON();<% } %>
	<% if (templateTabletop || templateJSONMap) { %>map.loadJSON();<% } %>
	
	<% if (mapViewOptionsDropdown) { %>// Set change for dropdown attributes
	MapOptionsView = Backbone.View.extend({
		el: 'body',

		events: {
			<% if (mapViewOptionsDropdown) { %>"change .dropdownSelect": "dropdownAttributeChange",<% } %>
			<% if (templateMultipleJSONMapCheckbox) { %>"change .checkbox_json": "dropdownAttributeChange"<% } %>
		},

		<% if (mapViewOptionsDropdown) { %>// Empty array we will append map options to
		map_options: [],
		
		// Variables
		current_id: '',
		current_class: '',
		current_name: '',<% } %>

		// Toggles through view options
		dropdownAttributeChange: function(e) {
			<% if (mapViewOptionsDropdown) { %>map_options = this.map_options;
			current_id = this.current_id;
			current_class = this.current_class;
			current_name = this.current_name;

			// Select attributes of menu options
			// Will use to style map appropriately
			current_id = $(e.target).attr('id') + '';
			current_class = $(e.target).attr('class');
			current_name = $(e.target).attr('name') + '';

			// Determine if desktop or mobile
			if ( current_class === 'dropdownSelect dropdownSelect_desktop') {
				map_options[0] = 'desktop';
			} else if ( current_class === 'dropdownSelect dropdownSelect_mobile') {
				map_options[0] = 'mobile';
			}<% } %>

			<% if (templateDropdownGeoJSONAttributes) { %>// GeoJSON options: Toggle between attributes
			if ( current_name === 'dropdownSelectAttributes' ) {
				// This calls our styleChange function in load-map.js
				map.styleChange(map_options[0], 'attributes');
				// Reset the map
				map.resetMap();

				<% if (templateMultipleGeoJSON) { %>// Call function to display GeoJSON file
				this.geoJSONDisplay();<% } else { %>// Call function to display GeoJSON file
				map.geoJSON();<% } %>
			}<% } %>

			<% if (templateMultipleGeoJSON) { %>// GeoJSON options: Toggle between multiple GeoJSON files
			if ( current_name === 'dropdownGeoJSONFiles' ) {
				// This calls our styleChange function in load-map.js
				map.styleChange(map_options[0], 'multiple');
				// Reset the map
				map.resetMap();

				<% if (templateMultipleGeoJSON) { %>// Call function to display GeoJSON file
				this.geoJSONDisplay();<% } else { %>// Call function to display GeoJSON file
				map.geoJSON();<% } %>
			}<% } %>

			<% if (templateMultipleJSONMapDropdown) { %>// JSON options: Toggle between multiple JSON files
			if ( current_name === 'dropdownJSONFiles' ) {
				// This calls our styleChange function in load-map.js
				map.styleChange(map_options[0], 'multiple');
				// Reset the map
				map.removeJSON();
			}<% } else if (templateMultipleJSONMapCheckbox) { %>map.removeJSON();<% } %>

			return this;
		}<% if (templateMultipleGeoJSON) { %>,
		// Determine whick GeoJSON file to display
		geoJSONDisplay: function() {
			map_options = this.map_options;

			// Determine which GeoJSON file to display
			// Based on if we're on desktop or mobile
			if ( $('#dropdownSelectMultiple_' + map_options[0]).val() === 'geojson_one') {
				map.geoJSON();
			} else if ( $('#dropdownSelectMultiple_' + map_options[0]).val() === 'geojson_two' ) {
				map.geoJSONTwo();
			}
		}<% } %>
	});
	mapoptionsview = new MapOptionsView();<% } %>
});<% } %>

// Script.js load
require(['app/script'], function(){ });

<% if (!templateMap) { %>// Format if page is within iFrame
require(['app/load-iframe'], function(iframe){
	iframe.formatiFrame();
});<% } %>