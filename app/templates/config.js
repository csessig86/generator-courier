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
		'underscore': {
			exports: '_'
		},
		'leaflet-providers' : ['leaflet'],
		'leaflet.awesome-markers' : ['leaflet-providers'],
		'jquery.geocodify': ['jquery']<% } %><% if (templateHandlebars) { %>,
		'tabletop': ['handlebars']<% } %><% if (templateMarkerCluster) { %>,
		'leaflet.markercluster-custom-src': ['leaflet']<% } %>,
		'backbone': {
			deps: ['json2', 'underscore', 'jquery'],
			exports: 'Backbone'
		}
	}
});

// Load up necessary modules
// All contained in separate file
require(['domReady!'], function(doc){
	require(['../require-load'], function(){ });
});