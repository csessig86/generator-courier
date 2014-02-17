/*
MAP TEMPLATE, FUNCTIONS & MOUSE EVENTS GO HERE
*/

/* global $:false, L:false, google: false, navigator: false, location: false */

/*
BASE MAP
*/

// Add commas to numbers
function numberFormat(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    return x1 + x2;
}
<% if (templateGeoJSON) { %>/*
GEOJSON STYLES
*/

// Highlight style
function highlightPolygons(e) {
    var layer_geojson = e.target;
    layer_geojson.setStyle({
        "color": "#333",
        "weight": 2,
        "fillOpacity": 0.95,
        "opacity": 1,
     });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer_geojson.bringToFront();
    }
};

// Reset the polygon styles
function resetHighlightPolygons(e) {
    var layer_geojson = e.target;
    layer_geojson.setStyle({
        "color": "#FFFFFF",
        "weight": 1,
        "opacity": 0.8,
        "fillOpacity": 0.85,
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer_geojson.bringToBack();
    }
};

// Set colors based on their likelihood numbers
function getColor(m) {
    return m < 3 ? "#FEF0D9" :
    m < 6 ? "#FDD49E" :
    m < 9 ? "#FDBB84" :
    m < 12 ? "#FC8D59" :
    m < 15 ? "#EF6548" :
    m < 18 ? "#D7301F" :
    m < 100 ? "#990000" :
    "#CCC" ;
}

<% if (templateLargePopupGeoJSON) { %>// Our popup
function popup(e) {
    var layer_geojson = e.target;
    var properties = layer_geojson.feature.properties;

    $('.popup_cover').show();
    $('.toggle_popup').show();
    $('.popup').show();
    
    var popup_header = '<div class="popup_header">' + properties.NAMELSAD10 + '</div>';
    var popup_content = '<div class="popup_content_box">'
    
    popup_content += '<p>Percentage of population in poverty: ' + numberFormat(parseInt(properties.PERCENTBEL)) + '%</p>';
    popup_content += '<p>Percentage of males in poverty: ' + numberFormat(parseInt(properties.PERCENTBE3)) + '%</p>';
    popup_content += '<p>Percentage of females in poverty: ' + numberFormat(parseInt(properties.PERCENTBE5)) + '%</p>';
    popup_content += '</div>';
    
    $('.popup_header').html(popup_header);
    $('.popup_content').html(popup_content);
// End popup function
} <% } %>

// Set the mouseover, mouseout events
function onEachFeature(feature, layer_geojson) {
    layer_geojson.on({
        mouseover: highlightPolygons,
        mouseout: resetHighlightPolygons,
        <% if (templateLargePopupGeoJSON) { %>click: popup<% } %>
    });
    
    <% if (!templateLargePopupGeoJSON) { %>var properties = layer_geojson.feature.properties;
    var popup_content = '<div class="popup_box" ' + ' id= "' + properties.NAMELSAD10 + '">';
    popup_content = '<div class="popup_box_header">' + properties.NAMELSAD10 + '</div>';
    popup_content += '<hr />';
    popup_content += '<strong>Percentage of population in poverty:</strong> ' + numberFormat(parseInt(properties.PERCENTBEL)) + '%<br />';
    popup_content += '<strong>Percentage of males in poverty:</strong> ' + numberFormat(parseInt(properties.PERCENTBE3)) + '%<br />';
    popup_content += '<strong>Percentage of females in poverty:</strong> ' + numberFormat(parseInt(properties.PERCENTBE5)) + '%';
    popup_content += '</div>';
    layer_geojson.bindPopup(popup_content);<% } %>
};

// Set color of each polygon
function styleGeoJSON(feature) {
    <% if (templateDropdownGeoJSONAttributes) { %>// Determine which item is selected in dropdown menu
    // And show appropriate GeoJSON attributes
    if ( $('#dropdownSelectAttributes_desktop').val() === 'option_one' ) {
        var fill_color = getColor( parseInt(feature.properties.PERCENTBEL) );
    } else if ( $('#dropdownSelectAttributes_desktop').val() === 'option_two' ) {
        var fill_color = getColor( parseInt(feature.properties.PERCENTBE3) );
    } else if ( $('#dropdownSelectAttributes_desktop').val() === 'option_three' ) {
        var fill_color = getColor( parseInt(feature.properties.PERCENTBE5) );
    }
    <% } else { %>// Use one attribute in GeoJSON file to color
    var fill_color = getColor( parseInt(feature.properties.PERCENTBEL) );
    
    <% } %>// Return our colors
    return {
        "color": "#FFFFFF",
        "weight": 1,
        "opacity": 0.8,
        "fillOpacity": 0.85,
        "fillColor": fill_color
    }
};<% } %>

<% if (templateMarkerCluster && templateTabletop) { %>
define(['jquery', 'jquery.geocodify', 'async!http://maps.google.com/maps/api/js?sensor=false', 'leaflet.awesome-markers', 'leaflet.markercluster-custom-src', 'tabletop'], function ($, leaflet, cluster, tabletop) {
<% } else if (templateTabletop) { %>
define(['jquery', 'jquery.geocodify', 'async!http://maps.google.com/maps/api/js?sensor=false', 'leaflet.awesome-markers', 'tabletop'], function ($, leaflet, tabletop) {
<% } else if (templateMarkerCluster) { %>
define(['jquery', 'jquery.geocodify', 'async!http://maps.google.com/maps/api/js?sensor=false', 'leaflet.awesome-markers', 'leaflet.markercluster-custom-src'], function ($, leaflet, cluster) {
<% } else { %>
define(['jquery', 'jquery.geocodify', 'async!http://maps.google.com/maps/api/js?sensor=false', 'leaflet.awesome-markers'], function ($, leaflet) {
<% } %>

    var map;
    <% if (templateJSONMap) { %>var json_group = new L.FeatureGroup();<% } %>
    <% if (templateMultipleJSONMap) { %>var json_group_two = new L.FeatureGroup();<% } %>
    <% if (templateMarkerCluster) { %>var marker_cluster_group = new L.MarkerClusterGroup();<% } %>
    L.Icon.Default.imagePath = 'css/images'

    return {
        // Set intial view of map
        baseMap: function() {
            if ($(window).width() < 626) {
              // Mobile
              map = new L.Map('map').setView([42,-93.5],6);
            } else {
              // Desktop
              map = new L.Map('map').setView([42,-92.25],7);
            }

            // Information for the base tile via Cloudmade
            var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/02ef99510f374abb911e6a0260145820/72392/256/{z}/{x}/{y}.png'
            var cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 10, minZoom: 4});
            // Add to map
            map.addLayer(cloudmade);

            <% if (templateGeoJSON) { %>// Set view on mobile
            $( document ).ready(function() {
                if ($(window).width() < 626) {
                    map.fitBounds(geojson.getBounds())
                }
            });<% } %>
        }<% if (templateGeoJSON) { %>,
        // Add GeoJSON to map
        geoJSON: function() {
            // Set view of Leaflet map based on screen size
            // Our geoJSON variable
            geojson = L.geoJson(polygons, {
                style: styleGeoJSON,
                onEachFeature: onEachFeature
            }).addTo(map);
        }<% if (templateMultipleGeoJSON) { %>,
        // Add GeoJSON to map
        geoJSONTwo: function() {
            // Set view of Leaflet map based on screen size
            // Our geoJSON variable
            geojson_two = L.geoJson(polygons_two, {
                style: styleGeoJSON,
                onEachFeature: onEachFeature
            }).addTo(map);
        },
        removeSecondGeoJSON: function() {
            map.removeLayer(geojson_two);
        }<% } %>,
        // Remove GeoJSON layer
        resetMap: function() {
            map.removeLayer(geojson);
            <% if (templateMultipleGeoJSON) { %>map.removeLayer(geojson_two);<% } %>
        }<% } %><% if (templateDropdownGeoJSONAttributes || templateMultipleJSONMapDropdown || templateMultipleJSONMapCheckbox) { %>,
        // Change map with dropdown
        styleChange: function (location, dropdown_option) {
            // Make sure selection options are set the same
            // For desktop and mobile
            <% if (templateDropdownGeoJSONAttributes) { %>if (location === 'desktop' &&  dropdown_option === 'attributes') {
                var dropdownSelectAttributes = $('#dropdownSelectAttributes_desktop').val();
                $('#dropdownSelectAttributes_mobile').val(dropdownSelectAttributes);
            } else if (location === 'mobile' &&  dropdown_option === 'attributes') {
                var dropdownSelectAttributes = $('#dropdownSelectAttributes_mobile').val();
                $('#dropdownSelectAttributes_desktop').val(dropdownSelectAttributes);
            } <% if (templateMultipleGeoJSON) { %>else if (location === 'desktop' &&  dropdown_option === 'multiple') {
                var dropdownSelectMultiple = $('#dropdownSelectMultiple_desktop').val();
                $('#dropdownSelectMultiple_mobile').val(dropdownSelectMultiple);
            } else if (location === 'mobile' &&  dropdown_option === 'multiple') {
                var dropdownSelectMultiple = $('#dropdownSelectMultiple_mobile').val();
                $('#dropdownSelectMultiple_desktop').val(dropdownSelectMultiple);
            }<% } %><% } %>

            <% if (templateMultipleJSONMapDropdown) { %>if (location === 'desktop' &&  dropdown_option === 'multiple') {
                var dropdownSelectMultipleJSON = $('#dropdownSelectMultipleJSON_desktop').val();
                $('#dropdownSelectMultipleJSON_mobile').val(dropdownSelectMultipleJSON);
            } else if (location === 'mobile' &&  dropdown_option === 'multiple') {
                var dropdownSelectMultipleJSON = $('#dropdownSelectMultipleJSON_mobile').val();
                $('#dropdownSelectMultipleJSON_desktop').val(dropdownSelectMultipleJSON);
            }<% } %>

        }<% } %><% if (templateJSONMap || templateTabletop) { %>,
        // Mapping data from JSON file
        loadJSON: function() {
            <% if (templateMarkerCluster) { %>// Cluster the markers
            // By adding the markers into this group
            marker_cluster_group = new L.MarkerClusterGroup({
                disableClusteringAtZoom: 12,
                maxClusterRadius: 40,
                polygonOptions: {
                    color: '#252525',
                    weight: 2,
                    opacity: 1,
                    fillColor: '#252525',
                    fillOpacity: 0.5
                }
            });<% } %>

            <% if (templateTabletop) { %>// Here's the Tabletop feed
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
                var json_data = tabletopData[tabletop.foundSheetNames]["elements"];
                // Go through our Google spreadsheet
                // Stored in tabletopData variable
                // tabletopData = Worksheet
            <% } %>

            function LoadToMap(context, fill_color) {
                // Pull map information from JSON file
                for (var num = 0; num < context.length; num ++) {
                    var dataLat = context[num].latitude;
                    var dataLong = context[num].longitude;

                    // Add to our marker
                    var marker_location = new L.LatLng(dataLat, dataLong);

                    <% if (templateCircleMarkers) { %>// Options for our circle marker
                    var layer_marker = L.circleMarker(marker_location, {
                        radius: 7,
                        fillColor: fill_color,
                        color: "#FFFFFF",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    });

                    // Add events to marker
                    layer_marker.on({
                        // What happens when mouse hovers markers
                        mouseover: function(e) {
                            var layer_marker = e.target;
                            layer_marker.setStyle({
                                radius: 7,
                                fillColor: "#FFFFFF",
                                color: "#000000",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 1
                            });
                            if (!L.Browser.ie && !L.Browser.opera) {
                                layer_marker.bringToFront();
                            }
                        },
                        // What happens when mouse leaves the marker
                        mouseout: function(e) {
                            var layer_marker = e.target;
                            layer_marker.setStyle({
                                radius: 7,
                                fillColor: fill_color,
                                color: "#FFFFFF",
                                weight: 1,
                                opacity: 1,
                                fillOpacity: 0.8
                            });
                            if (!L.Browser.ie && !L.Browser.opera) {
                                layer_marker.bringToBack();
                            }
                        }
                    });
                    <% } else { %>// Create the regular marker
                    var layer_marker = new L.Marker(marker_location);
                    <% } %>

                    <% if (!templateLargePopupNonGeoJSON) { %>// Decide format of popup data
                    // Depending on which JSON file were are looping through
                    // And decide which set of
                    <% if (templateMultipleJSONMap) { %>if ( context === json_data ) {<% } %>
                        // Change 'Address', 'City', etc.
                        // To match table column names in your table
                        var popup_content = '<div class="popup_box" ' + ' id= "popup-' + num + '">';
                        popup_content += '<div class="popup_box_header">' + context[num].brewery + '</div>';
                        popup_content += '<hr />';
                        popup_content += '<strong>Address:</strong> ' + context[num].address + '<br />';
                        popup_content += '<strong>City:</strong> ' + context[num].city + '<br />';
                        popup_content += '<strong>Phone:</strong> ' + context[num].phone + '<br />';
                        popup_content += '<strong>Website:</strong> ' + context[num].website + '<br />';
                        popup_content += '</div>';

                        // Bind popup to the variable we created
                        layer_marker.bindPopup(popup_content);
                        // Add to our feature group
                        json_group.addLayer(layer_marker);
                    <% if (templateMultipleJSONMap) { %>// Go through second JSON file
                    // And create popups
                    } else if (context === json_data_two ) {
                        // Change 'Address', 'City', etc.
                        // To match table column names in your table
                        var popup_content_two = '<div class="popup_box" ' + ' id= "popup-' + num + '">';
                        popup_content_two += '<div class="popup_box_header">' + context[num].winery + '</div>';
                        popup_content_two += '<hr />';
                        popup_content_two += '<strong>Address:</strong> ' + context[num].address_city + '<br />';
                        popup_content_two += '<strong>Phone:</strong> ' + context[num].phone + '<br />';
                        popup_content_two += '</div>';

                        // Bind popup to the variable we created
                        layer_marker.bindPopup(popup_content_two);
                        // Add to our feature group
                        json_group_two.addLayer(layer_marker);
                    }<% } %>
                    
                    <% } else if (templateLargePopupNonGeoJSON) { %>// Create the large popup
                    // This will open a separate window for the popup
                    // That is nearly full screen
                    (function (num){
                        function popup(e) {
                            var layer_marker = e.target;

                            $('.popup_cover').show();
                            $('.toggle_popup').show();
                            $('.popup').show();
                            
                            <% if (templateMultipleJSONMap) { %>if ( context === json_data ) {<% } %>// Go through first JSON file
                                // And create popups
                                var popup_header = '<div class="popup_header">' + context[num].brewery + ' County</div>';
                                var popup_content = '<div class="popup_content_box">'
                                popup_content += "<strong>Address:</strong> " + context[num].address + "<br />";
                                popup_content += "<strong>City:</strong> " + context[num].city + "<br />";
                                popup_content += "<strong>Phone:</strong> " + context[num].phone + "<br />";
                                popup_content += "<strong>Website:</strong> " + context[num].website + "<br />";
                                popup_content += '</div>';
                            <% if (templateMultipleJSONMap) { %>// Go through second JSON file
                                // And create popups
                            } else if (context === json_data_two ) {
                                var popup_header = '<div class="popup_header">' + context[num].winery + ' County</div>';
                                var popup_content = '<div class="popup_content_box">'
                                popup_content += "<strong>Address:</strong> " + context[num].address_city + "<br />";
                                popup_content += "<strong>Phone:</strong> " + context[num].phone + "<br />";
                                popup_content += '</div>';
                            }<% } %>
                            
                            $('.popup_header').html(popup_header);
                            $('.popup_content').html(popup_content);
                        // End popup function
                        }
                        // Open the popup function when one of our markers is clicked
                        layer_marker.on({ click: popup });
                        
                        <% if (templateMultipleJSONMap) { %>if ( context === json_data ) {<% } %>
                            json_group.addLayer(layer_marker);
                        <% if (templateMultipleJSONMap) { %>
                        } else if (context === json_data_two ) {
                            json_group_two.addLayer(layer_marker);
                        }<% } %>

                    // Close popup function
                    })(num) <% } %>
                    
                    <% if (templateMarkerCluster && !templateMultipleJSONMap) { %>// Add marker to our cluster group
                    marker_cluster_group.addLayer(json_group)
                    <% } %>// Add marker to our to map
                    <% if (!templateMultipleJSONMap) { %>
                    json_group.addLayer(layer_marker);
                    map.addLayer(json_group);<% } %>
                    <% if (templateMultipleJSONMap && !templateMultipleJSONMapDropdown && !templateMultipleJSONMapCheckbox && !templateMarkerCluster) { %>
                    map.addLayer(json_group);
                    map.addLayer(json_group_two);<% } %>
                    <% if (templateMultipleJSONMap && !templateMultipleJSONMapDropdown && !templateMultipleJSONMapCheckbox && templateMarkerCluster) { %>
                    marker_cluster_group.addLayer(json_group);
                    marker_cluster_group.addLayer(json_group_two);<% } %>
                    <% if (templateMultipleJSONMapDropdown) { %>// Display map data based on dropdown
                    if ( $('#dropdownSelectMultipleJSON_desktop').val() === 'json_one') {
                        <% if (!templateMarkerCluster) { %>map.addLayer(json_group);
                        <% } else { %>marker_cluster_group.addLayer(json_group);<% } %>
                    } else if ( $('#dropdownSelectMultipleJSON_desktop').val() === 'json_two') {
                        <% if (!templateMarkerCluster) { %>map.addLayer(json_group_two);
                        <% } else { %>marker_cluster_group.addLayer(json_group_two);<% } %>
                    }<% } %>
                    <% if (templateMultipleJSONMapCheckbox) { %>// Display map data based on checkbox
                    if ( $('#json_one').prop('checked') === true) {
                        <% if (!templateMarkerCluster) { %>map.addLayer(json_group);
                        <% } else { %>marker_cluster_group.addLayer(json_group);<% } %>
                    }
                    if ( $('#json_two').prop('checked') === true) {
                        <% if (!templateMarkerCluster) { %>map.addLayer(json_group_two);
                        <% } else { %>marker_cluster_group.addLayer(json_group_two);<% } %>
                    }<% } %>
                // Close context for loop
                }
            // Close LoadToMap function
            }
            // Fire function that puts the markers on the map
            LoadToMap(json_data, "#B30000");
            <% if (templateMultipleJSONMap) { %>LoadToMap(json_data_two, "#00b3b3");<% } %>

            <% if (templateTabletop) { %>// Close Tabletop function
            }<% } %>
            <% if (templateMarkerCluster) { %>// Add cluster group to map
            map.addLayer(marker_cluster_group);<% } %>
        // Close loadJSON method
        }<% } %><% if (templateMultipleJSONMapDropdown || templateMultipleJSONMapCheckbox) { %>,
        removeJSON: function() {
            <% if (templateMarkerCluster && !templateMultipleJSONMap) { %>// First remove layers
            marker_cluster_group.clearLayers();<% } %>
            
            <% if (templateMultipleJSONMapDropdown) { %>// Display map data based on dropdown
            if ( $('#dropdownSelectMultipleJSON_desktop').val() === 'json_one') {
                <% if (!templateMarkerCluster) { %>map.addLayer(json_group);
                <% } else { %>marker_cluster_group.addLayer(json_group);<% } %>
            } else {
                <% if (!templateMarkerCluster) { %>map.removeLayer(json_group);
                <% } else { %>marker_cluster_group.removeLayer(json_group);<% } %>
            }

            if ( $('#dropdownSelectMultipleJSON_desktop').val() === 'json_two') {
                <% if (!templateMarkerCluster) { %>map.addLayer(json_group_two);
                <% } else { %>marker_cluster_group.addLayer(json_group_two);<% } %>
            } else {
                <% if (!templateMarkerCluster) { %>map.removeLayer(json_group_two);
                <% } else { %>marker_cluster_group.removeLayer(json_group_two);<% } %>
            }<% } %>
            
            <% if (templateMultipleJSONMapCheckbox) { %>// Display map data based on checkbox
            if ( $('#json_one').prop('checked') === true) {
                <% if (!templateMarkerCluster) { %>map.addLayer(json_group);
                <% } else { %>marker_cluster_group.addLayer(json_group);<% } %>
            } else {
                <% if (!templateMarkerCluster) { %>map.removeLayer(json_group);
                <% } else { %>marker_cluster_group.removeLayer(json_group);<% } %>
            }
            
            if ( $('#json_two').prop('checked') === true) {
                <% if (!templateMarkerCluster) { %>map.addLayer(json_group_two);
                <% } else { %>marker_cluster_group.addLayer(json_group_two);<% } %>
            } else {
                <% if (!templateMarkerCluster) { %>map.removeLayer(json_group_two);
                <% } else { %>marker_cluster_group.removeLayer(json_group_two);<% } %>
            }<% } %>
        }<% } %>,
        // Geocodify
        geocode: function() {
            var maxY = 43.749935;
            var minY = 40.217754;
            var minX = -96.459961;
            var maxX = -90.175781;

            var searchMarker;

            var searchIcon = L.AwesomeMarkers.icon({
                icon: 'icon-circle',
                color: 'green'
            });

            $('#geocoder').geocodify({
                onSelect: function (result) {
                    // Extract the location from the geocoder result
                    var location = result.geometry.location;
                    // Center the map on the result
                    map.setView(new L.LatLng(location.lat(), location.lng()), 14);
                    // Remove marker if one is already on map
                    if (searchMarker) {
                        map.removeLayer(searchMarker);
                    }
                    // Create marker
                    searchMarker = L.marker([location.lat(), location.lng()], {
                        clickable: false,
                        icon: searchIcon
                    });
                    // Add marker to the map
                    searchMarker.addTo(map);
                },
                initialText: 'Zip code, city, etc...',
                regionBias: 'US',
                // Lat, long information for Cedar Valley enter here
                viewportBias: new google.maps.LatLngBounds(
                    new google.maps.LatLng(40.217754, -96.459961),
                    new google.maps.LatLng(43.749935, -90.175781)
                ),
                width: 300,
                height: 26,
                fontSize: '14px',
                filterResults: function (results) {
                    var filteredResults = [];
                    $.each(results, function (i, val) {
                        var location = val.geometry.location;
                        if (location.lat() > minY && location.lat() < maxY) {
                            if (location.lng() > minX && location.lng() < maxX) {
                                filteredResults.push(val);
                            }
                        }
                    });
                    return filteredResults;
                }
            });

            // Find my location button
            $('#find_me').on('click', function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var lat = position.coords.latitude;
                    var lng = position.coords.longitude;
                    map.setView(new L.LatLng(lat, lng, 8));
                    // Remove marker if one is already on map
                    if (searchMarker) {
                        map.removeLayer(searchMarker);
                    }
                    // Create marker
                    searchMarker = L.marker([location.lat(), location.lng()], {
                        clickable: false,
                        icon: searchIcon
                    });
                    // Add marker to the map
                    searchMarker.addTo(map);
                }, function (error) {
                    alert("Sorry! We couldn't find your address. Please try again.");
                });
            });
        // Close geocode
        },
        // The legend
        responsiveLegend: function() {
            // Toggle for description and X buttons
            // Only visible on mobile
            var isVisibleDescription = false;
            // Grab legend content
            var legendContentHeader = $('#legend_mobile_header').html() + $('#legend-text').html();
            var legendContentEtc = $('#legend_mobile_colors').html() + $('#credits').html();
            $('.toggle_description').click(function () {
                // console.log('isVisibleDescription: ', isVisibleDescription);
                if (isVisibleDescription === false) {
                    $('.description_box_cover').show();
                    $('.description_box_text_header').html(legendContentHeader);
                    $('.description_box_text_etc').html(legendContentEtc + '<br />');
                    $('.description_box').show();
                    isVisibleDescription = true;
                } else {
                    $('.description_box').hide();
                    $('.description_box_cover').hide();
                    isVisibleDescription = false;
                }
            });


            // Toggle for show, hide legend
            // Only visible on desktop
            var isHideButton = true;
            $('#hide_show_legend').click(function () {
                // console.log(isHideButton);
                if (isHideButton === true) {
                    $('.hide_legend').hide();
                    $('.show_legend').show();
                    $('#legend').stop(true, false).slideUp();
                    $('#hide_show_legend').addClass('box-shadow');
                    $('.hide_show_legend').show();
                    isHideButton = false;
                } else {
                    $('.show_legend').hide();
                    $('.hide_legend').show();
                    $('#legend').stop(true, false).slideDown();
                    $('#hide_show_legend').removeClass('box-shadow');
                    $('.hide_show_legend').show();
                    isHideButton = true;
                }
            });

            // Close popup button
            $('.toggle_popup').click(function () {
                $('.popup_cover').hide();
                $('.toggle_popup').hide();
                $('.popup').hide();
            });
        // Close responsive legend
        }
    // Close return
    }
// Close require
});