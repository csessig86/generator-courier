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
	map.baseMap();
    map.geocode();
	map.responsiveLegend();
	map.toggleTable();
	<% if (templateGeoJSON) { %>map.geoJSON();<% } %>
	<% if (templateMultipleGeoJSON) { %>map.geoJSONTwo();
	map.removeSecondGeoJSON();<% } %>
	<% if (templateTabletop || templateJSONMap) { %>map.loadJSON();<% } %>
	
	<% if (templateDropdownGeoJSONAttributes) { %>// Set change for dropdown attributes
	$('#dropdownSelectAttributes_desktop').change(function() {
		map.styleChange('desktop', 'attributes');
		map.resetMap();
		<% if (templateMultipleGeoJSON) { %>if ($('#dropdownSelectMultiple_desktop').val() === 'geojson_one') {
			map.geoJSON();
		} else if ($('#dropdownSelectMultiple_desktop').val() === 'geojson_two') {
			map.geoJSONTwo();
		}<% } else { %>
		map.geoJSON();
		<% } %>
	});
	$('#dropdownSelectAttributes_mobile').change(function() {
		map.styleChange('mobile', 'attributes');
		map.resetMap();
		<% if (templateMultipleGeoJSON) { %>if ($('#dropdownSelectMultiple_mobile').val() === 'geojson_one') {
			map.geoJSON();
		} else if ($('#dropdownSelectMultiple_mobile').val() === 'geojson_two') {
			map.geoJSONTwo();
		}<% } else { %>
		map.geoJSON();
		<% } %>
	});<% } %>
	
	<% if (templateMultipleGeoJSON) { %>// Set change for dropdown multiple GeoJSON files
	$('#dropdownSelectMultiple_desktop').change(function() {
		map.styleChange('desktop', 'multiple');
		map.resetMap();
		if ($('#dropdownSelectMultiple_desktop').val() === 'geojson_one') {
			map.geoJSON();
		} else if ($('#dropdownSelectMultiple_desktop').val() === 'geojson_two') {
			map.geoJSONTwo();
		}
	});
	$('#dropdownSelectMultiple_mobile').change(function() {
		map.styleChange('mobile', 'multiple');
		map.resetMap();
		if ($('#dropdownSelectMultiple_mobile').val() === 'geojson_one') {
			map.geoJSON();
		} else if ($('#dropdownSelectMultiple_mobile').val() === 'geojson_two') {
			map.geoJSONTwo();
		}
	});<% } %>
	
	<% if (templateMultipleJSONMapDropdown) { %>// Change JSON files
	$('#dropdownSelectMultipleJSON_desktop').change(function() {
		map.styleChange('desktop', 'multiple');
		map.removeJSON();
	});
	$('#dropdownSelectMultipleJSON_mobile').change(function() {
		map.styleChange('mobile', 'multiple');
		map.removeJSON();
	});<% } else if (templateMultipleJSONMapCheckbox) { %>// Toggle JSON files
	$('.checkbox_json').change(function() {
		map.removeJSON();
	});
	<% } %>
});<% } %>

// Script.js load
require(['app/script'], function(){ });

<% if (!templateMap) { %>// Format if page is within iFrame
require(['app/load-iframe'], function(iframe){
	iframe.formatiFrame();
});<% } %>