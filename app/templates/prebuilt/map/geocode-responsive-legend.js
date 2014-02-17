/*
GEOCODE & RESPONSIVE LEGEND
*/


/*
GEOCODE
*/
require(['jquery.geocodify', 'async!http://maps.google.com/maps/api/js?sensor=false', 'leaflet.awesome-markers'], function () {

	/* GEOCODE */

    // Geocodify
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
// Close require
});


/*
RESPONSIVE LEGEND
*/

require(['jquery'], function () {
    'use strict';

    // Toggle for description and X buttons
    // Only visible on mobile
    var isVisibleDescription = false;
    // Grab legend content
    var legendContentHeader = $('#legend_mobile_header').html() + $('#legend-text').html();
    var legendContentEtc = <% if (templateColors) { %>$('#legend_mobile_colors').html() + <% } %>$('#credits').html();
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
}); // Close require