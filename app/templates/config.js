// Config for Require
require.config({
	baseUrl: 'js/lib',
	paths: {
		'app': '../app'
	},
	shim: {
		'jquery': {
			exports: 'jQuery'
		}<% if (templateMap) { %>,
		'leaflet': {
			exports: 'L'
		},
		'leaflet.awesome-markers' : ['leaflet'],
		'jquery.geocodify': ['jquery']<% } %><% if (templateHandlebars) { %>,
		'tabletop': ['handlebars']<% } %><% if (templateHandlebars) { %>,
		'jquery.dataTables': ['jquery']<% } %><% if (templateMarkerCluster) { %>,
		'leaflet.markercluster-custom-src': ['leaflet']<% } %>
	}
});

// Load up necessary modules
// All contained in separate file
require(['domReady'], function(domReady){
	domReady(function () {
		require(['../require-load'], function(){ });
	});
});