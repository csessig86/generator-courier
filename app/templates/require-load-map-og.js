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