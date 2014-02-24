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
		'tabletop': ['handlebars']<% } %><% if (templateDataTables) { %>,
		'jquery.dataTables': ['jquery'],
		'dataTables.bootstrap': ['jquery.dataTables'],<% } %><% if (templateMarkerCluster) { %>,
		'leaflet.markercluster-custom-src': ['leaflet']<% } %>
	}
});

// Load up necessary modules
// All contained in separate file
require(['domReady!'], function(doc){
	require(['../require-load'], function(){ });
});