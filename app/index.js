'use strict';

var _ = require('underscore');
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

// Blank bases that we will append to
var baseCSS = [];
// Blank includes that we will append to
var includesCSS = [];

var CourierGenerator = module.exports = function CourierGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(CourierGenerator, yeoman.generators.Base);


CourierGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
    // Basic information on app
    {
        name: 'nameProject',
        message: 'What is the name of your project (uppercase) ?',
        validate: function (input) {
            if (!input) {
                return 'Please enter a name for this project.';
            }
            return true;
        }
    },
    {
        name: 'nameFolder',
        message: 'What is the name of your folder (used with public folder) ?',
        validate: function (input) {
            if (!input) {
                return 'Please enter a name for this folder.';
            }
            return true;
        }
    },
    {
        name: 'nameDescription',
        message: 'Give a description of this project (Used for social meta data)',
        default: '\n',
        validate: function (input) {
            if (!input) {
                return 'Please enter a description for this project.';
            }
            return true;
        }
    },
    {
        name: 'nameDescriptionShortened',
        message: 'Give a shortened description of this project (Used for social meta data)',
        default: '\n',
        validate: function (input) {
            if (!input) {
                return 'Please enter a shortened description for this project.';
            }
            return true;
        }
    },
    // Map options
    {
        type: 'confirm',
        name: 'templateMap',
        message: 'Would you like to use the map template?',
        default: false,
        when: function (answers) {
            if (answers.prebuilt) {
                return false;
            }
            return true;
        }
    },
    // GeoJSON options
    {
        when: function (answers) {
            return answers.templateMap;
        },
        type: 'confirm',
        name: 'templateGeoJSON',
        message: 'Do you want to use a GeoJSON file with the map?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateGeoJSON;
        },
        type: 'confirm',
        name: 'templateMultipleGeoJSON',
        message: 'Do you want to use multiple GeoJSON files?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateGeoJSON;
        },
        type: 'confirm',
        name: 'templateLargePopupGeoJSON',
        message: 'Do you want the popup for the GeoJSON data to take up the full screen?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateGeoJSON;
        },
        type: 'confirm',
        name: 'templateDropdownGeoJSONAttributes',
        message: 'Do you want a drop down menu to filter through GeoJSON properties?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateMap;
        },
        type: 'confirm',
        name: 'templateColors',
        message: 'Do you want to use colors in your legend?',
        default: false
    },
    // Data options: JSON or Tabletop?
    {
        type: 'confirm',
        name: 'templateTabletop',
        message: 'Would you like to use Tabletop?',
        default: false,
        when: function (answers) {
            if (answers.prebuilt) {
                return false;
            }
            return true;
        }
    },
    // JSON data for map
    {
        when: function (answers) {
            return answers.templateGeoJSON && !answers.templateTabletop;
        },
        type: 'confirm',
        name: 'templateJSONMap',
        message: 'Would you like to use JSON data?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateMap && !answers.templateGeoJSON && !answers.templateTabletop || answers.templateMap && answers.templateJSONMap;
        },
        type: 'confirm',
        name: 'templateMultipleJSONMap',
        message: 'Would you like to use multiple JSON files?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateMultipleJSONMap;
        },
        type: 'confirm',
        name: 'templateMultipleJSONMapCheckbox',
        message: 'Do you want a check box menu to display JSON files?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateMultipleJSONMap && !answers.templateMultipleJSONMapCheckbox;
        },
        type: 'confirm',
        name: 'templateMultipleJSONMapDropdown',
        message: 'Do you want a drop down menu to filter through JSON files?',
        default: false
    },
    // More map options
    {
        when: function (answers) {
            return answers.templateMap && answers.templateJSONMap || answers.templateMap && !answers.templateGeoJSON || answers.templateMap && answers.templateTabletop;
        },
        type: 'confirm',
        name: 'templateCircleMarkers',
        message: 'Do you want to use circle markers on the map?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateMap && answers.templateJSONMap || answers.templateMap && !answers.templateGeoJSON || answers.templateMap && answers.templateTabletop;
        },
        type: 'confirm',
        name: 'templateMarkerCluster',
        message: 'Do you want to cluster the markers?',
        default: false
    },
    {
        when: function (answers) {
            return answers.templateMap && answers.templateJSONMap || answers.templateMap && !answers.templateGeoJSON;
        },
        type: 'confirm',
        name: 'templateLargePopupNonGeoJSON',
        message: 'Do you want the popup for the JSON data to take up the full screen?',
        default: false
    },
    // Templating option: Handlebars
    {
        when: function (answers) {
            return !answers.templateMap;
        },
        type: 'confirm',
        name: 'templateDataTables',
        message: 'Would you like to make a searchable database?',
        default: false,

    },
    // Templating option: Handlebars
    {
        when: function (answers) {
            return !answers.templateMap && !answers.templateTabletop;
        },
        type: 'confirm',
        name: 'templateHandlebars',
        message: 'Would you like to use Handlebars?',
        default: false,

    },
    // Sass option
    {
        type: 'confirm',
        name: 'templateSASS',
        message: 'Would you like to use Sass?',
        default: true,
        when: function (answers) {
            if (answers.prebuilt) {
                return false;
            }
            return true;
        }
    }];

    this.prompt(prompts, function (props) {
        // Answers from our prompt
        // Basic project information
        this.nameProject = props.nameProject;
        this.nameFolder = props.nameFolder;
        this.nameDescription = props.nameDescription;
        this.nameDescriptionShortened = props.nameDescriptionShortened;
        
        // Map options
        this.templateMap = props.templateMap;
        this.templateColors = props.templateColors;
        
        // GeoJSON options
        this.templateGeoJSON = props.templateGeoJSON;
        this.templateMultipleGeoJSON = props.templateMultipleGeoJSON;
        this.templateDropdownGeoJSONAttributes = props.templateDropdownGeoJSONAttributes;
        this.templateLargePopupGeoJSON = props.templateLargePopupGeoJSON;
        
        // Non-GeoJSON options
        this.templateJSONMap = props.templateJSONMap;
        this.templateMultipleJSONMap = props.templateMultipleJSONMap;
        this.templateMultipleJSONMapCheckbox = props.templateMultipleJSONMapCheckbox;
        this.templateMultipleJSONMapDropdown = props.templateMultipleJSONMapDropdown;

        this.templateLargePopupNonGeoJSON = props.templateLargePopupNonGeoJSON;
        this.templateCircleMarkers = props.templateCircleMarkers;
        this.templateMarkerCluster = props.templateMarkerCluster;

        // DataTables
        this.templateDataTables = props.templateDataTables;

        // Misc
        this.templateTabletop = props.templateTabletop;
        this.templateHandlebars = props.templateHandlebars;
        this.templateSASS = props.templateSASS;

        // Use Handelbars by default if not using map but using Tabletop
        if (this.templateMap === false && this.templateTabletop === true) {
            this.templateHandlebars = true;
        }

        // Use JSON by default on maps if no GeoJSON or Tabletop use
        if (this.templateMap === true && this.templateGeoJSON === false && this.templateTabletop === false) {
            this.templateJSONMap = true;
        }
        
        this.baseCSS = baseCSS;
        this.includesCSS = includesCSS;

        // Default pages
        // The following build up our index.html page
        this.templateIndex = 'index.html';
        this.templateIndexiFrame = 'iframe.html';
        this.baseSASS = 'css/styles.scss';

        
        // USED FOR INDEX.HTML

        // Default custom CSS files
        baseCSS.push({ name: 'base.css' });

        // Default lib CSS files
        includesCSS.push({ name: 'lib/bootstrap-responsive.css' });
        includesCSS.push({ name: 'lib/bootstrap.css' });
        includesCSS.push({ name: 'lib/font-awesome.css' });
        
        // Push DataTables styles
        if (props.templateDataTables) {
            // Lib files
            includesCSS.push({ name: 'lib/datatables-demo-page-table.css' });
            // Custom files
            baseCSS.push({ name: 'styles-datatables.css' });
        }

        // Push map styles if selected
        if (props.templateMap) {
            // Lib files
            includesCSS.push({ name: 'lib/leaflet.css' });
            includesCSS.push({ name: 'lib/leaflet.awesome-markers.css' });
            // Custom files
            baseCSS.push({ name: 'styles-map.css' });

            // Marker cluster CSS
            if (props.templateMarkerCluster) {
                includesCSS.push({ name: 'lib/leaflet-marker-custom-cluster.css' });
            }
        // Push non-map styles
        } else {
            baseCSS.push({ name: 'styles-not-map.css' });
        }

         // Default CSS media attributes
         baseCSS.push({ name: 'base-media.css' });

        cb();
    }.bind(this));
};


CourierGenerator.prototype.appFiles = function appFiles() {
    // Readme
    this.template('_README.md', 'README.md');
    // Grunt
    this.template('_Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');
    // Bower
    this.template('_bower.json', 'bower.json');
    // Makefileƒ
    this.template('_Makefile', 'Makefile');
};


CourierGenerator.prototype.publicFiles = function publicFiles() {
    this.mkdir('app');
    this.mkdir('app/css');
    this.mkdir('app/scss');
    // this.mkdir('app/css/lib');
    this.mkdir('app/js');
    // this.mkdir('app/js/lib');
    this.mkdir('app/imgs');
    this.mkdir('app/data');

    // Main template
    this.template(this.templateIndex, 'app/index.html');
    this.template(this.templateIndexiFrame, 'app/iframe.html');
    
    // Default CSS base
    this.copy('css/base.scss', 'app/scss/base.scss');

    // Copy over map styles if selected
    if (this.templateMap) {
        this.copy('prebuilt/map/map.js', 'app/js/app/map.js');
        this.copy('prebuilt/map/lib/jquery.geocodify.js', 'app/js/lib/jquery.geocodify.js');
        this.copy('prebuilt/map/styles-map.scss', 'app/scss/styles-map.scss');
        this.directory('prebuilt/map/awesome-markers/images', 'app/css/lib/images');
        this.copy('prebuilt/map/awesome-markers/leaflet.awesome-markers.css', 'app/css/lib/leaflet.awesome-markers.css');
    } else {
        this.copy('prebuilt/styles-not-map.scss', 'app/scss/styles-not-map.scss');
    }

    if (this.templateGeoJSON) {
        this.copy('prebuilt/map/geojson/polygons.geojson', 'app/json/polygons.geojson');
    }
    if (this.templateMultipleGeoJSON) {
        this.copy('prebuilt/map/geojson/polygons_two.geojson', 'app/json/polygons_two.geojson');
    }

    if (this.templateMarkerCluster) {
        this.copy('prebuilt/map/cluster/leaflet-marker-custom-cluster.css', 'app/css/lib/leaflet-marker-custom-cluster.css');
        this.copy('prebuilt/map/cluster/leaflet.markercluster-custom-src.js', 'app/js/lib/leaflet.markercluster-custom-src.js');
    }

    // DataTables
    if (this.templateDataTables) {
        this.copy('prebuilt/datatables/lib/datatables-demo-page-table.css', 'app/css/lib/datatables-demo-page-table.css');
        this.copy('prebuilt/datatables/styles-datatables.scss', 'app/scss/styles-datatables.scss');
        this.copy('prebuilt/datatables/load-datatables.js', 'app/js/app/load-datatables.js');
    }

    // Tabletop, non-Tabletop JS files
    if (this.templateTabletop) {
        this.copy('prebuilt/load-tabletop.js', 'app/js/app/load-tabletop.js');
    }

    if (this.templateTabletop || this.templateHandlebars) {
        this.copy('prebuilt/load-handlebars.js', 'app/js/app/load-handlebars.js');
    }

    if (!this.templateTabletop && !this.templateHandlebars && !this.templateJSONMap) {
        this.copy('prebuilt/load-json.js', 'app/js/app/load-json.js');
    }

    if (!this.templateTabletop && !this.templateGeoJSON || this.templateJSONMap) {
        this.copy('prebuilt/no-tabletop-data.json', 'app/json/no-tabletop-data.json');     
    }
    if (this.templateMultipleJSONMap) {
        this.copy('prebuilt/no-tabletop-data-two.json', 'app/json/no-tabletop-data-two.json');     
    }

    // Default CSS media attributes
    this.copy('css/base-media.scss', 'app/scss/base-media.scss');

    // Blank JS file
    this.copy('js/script.js', 'app/js/app/script.js');

    // Blank CSS file
    // Determine if we're using SCSS or CSS
    if (this.templateSASS) {
        this.copy('css/styles.scss', 'app/scss/styles.scss');
    } else {
        this.copy('css/styles.css', 'app/css/styles.css');
    }

    // RequireJS config
    this.copy('config.js', 'app/js/config.js');
    this.copy('require-load.js', 'app/js/require-load.js');
    this.copy('domReady.js', 'app/js/lib/domReady.js');

    // Copy over logo
    this.copy('imgs/WCFCourier_LOGO_BW_300px.png', 'app/imgs/WCFCourier_LOGO_BW_300px.png');

    // Etc
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('.ftppass', '.ftppass');
};