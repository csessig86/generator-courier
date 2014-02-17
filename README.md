#generator-courier

A [Yeoman](http://yeoman.io) generator for data journalists, map-makers and others.

## Background
This is generator is used at the [Waterloo-Cedar Falls Courier](http://wcfcourier.com) to scaffold out simple, one-page apps. Here's [an example of a map](http://wcfcourier.com/app/special/hemp-laws-public/) and here's an example of [a single-page app](http://wcfcourier.com/app/special/election2013/) that were created with this generator.

Included are several options for making maps with [Leaflet](leafletjs.com). For instance, you can use JSON files with latitude and longitude coordinates in them to create a map. This generator will also scaffold out a map that uses GeoJSON file(s). You are also given the options for using [Tabletop](https://github.com/jsoma/tabletop) to pull data from a Google spreadsheet or [Handlebars](http://handlebarsjs.com/) to template the data. 

NOTE: This generator uses [Require.JS](http://requirejs.org/), so it's probably best to familiarize yourself with that library before using this generator. Also, you can use [SASS](http://sass-lang.com/) with your projects if you like.

## Install
To install the generator, run this command on your command line:

	npm install -g generator-courier

## Usage
You can then start the generator by running:

    yo courier

## Prebuilt options
Once you run this command, Yeoman will ask you several questions related to your project. The first set of questions will ask you the basics on the project. Some of this information will become metadata for Twitter and Facebook. It will then ask you if you want to create a map or not.

Depending on what you choose, you will be asked more questions. If you decide to create a map, you will be asked about how you want the data formatted. For instance, you can use GeoJSON file(s) and create a drop-down menu to filter through GeoJSON properties ([example:](http://wcfcourier.com/app/special/fatalcrashes/)). You will also be asked a few questions about how you want the map to look. You can use circle markers, large popups boxes with your markers ([example:](http://wcfcourier.com/app/special/hemp-laws-public/)) and marker clusters courtesy of the [Leafet cluster plugin](https://github.com/Leaflet/Leaflet.markercluster).

If you decide you don't want to create a map, you will be given fewer options.

## Testing
Once you have selected your options, you can run your the project locally:

	grunt app

A prebuilt project will now be created in the 'app' folder. Sample data and all the necessary dependencies will also be created. You can then delete the data and replace it with your own. If you are using Tabletop, you can switch out the sample spreadsheet key in JS file with your own key.

This generator uses [live reload](https://github.com/gruntjs/grunt-contrib-livereload), so when you make changes to your files, the project be automatically re-loaded on your local server.

If you are using SASS, the .scss files will be automatically [compiled to CSS files](https://github.com/gruntjs/grunt-contrib-compass) whenever you re-save your project. If you are having trouble with compiling your CSS files, you can run:

	grunt server

## Getting the project ready
When you are ready to deploy your app, run this command:
	
	grunt public

A new folder will be created that ends in "-public". All your CSS and JS files will be combined and minified into that folder. All other files (like image files, for instance) will be copied to that folder as well. A local server will open your index.html file so you can make sure everything looks right.


## Deploying
We use an SFTP server to deploy our apps. If you want to do the same, change the [sftp-deploy](https://github.com/thrashr888/grunt-sftp-deploy) options in your Gruntfile. Then add a .ftppass file with your user/pass information.

## Courier stuff
The generator assumes you are deploying to the Courier's server. You will want to change all references to "http://wcfcourier.com/..." in the index.html page.

A Courier logo is also used with the app, which you will want to delete or replace.

Also, the tweet button references our Twitter handle, which you will want to change.

## License
[MIT License](http://en.wikipedia.org/wiki/MIT_License)