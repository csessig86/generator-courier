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
		underscore: {
      		exports: '_'
    	},
    	backbone: {
      		exports: "Backbone"
    	},
		'leaflet-providers' : ['leaflet'],
		'leaflet.awesome-markers' : ['leaflet-providers'],
		'jquery.geocodify': ['jquery']<% } %><% if (templateHandlebars) { %>,
		'tabletop': ['handlebars']<% } %><% if (templateMarkerCluster) { %>,
		'leaflet.markercluster-custom-src': ['leaflet']<% } %>,
		'backbone': ['json2', 'underscore', 'jquery']
	}
});

// Load up necessary modules
// All contained in separate file
require(['domReady!'], function(doc){
	require(['../require-load'], function(){ });
});