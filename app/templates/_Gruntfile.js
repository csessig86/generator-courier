// Generated using <%= pkg.name %> <%= pkg.version %>
'use strict';

var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        // configurable paths
        yeoman: {
            app: 'app',
            dist: '<%= nameFolder %>-public'
        },
        // Sass conversion with Compass
        compass: {
            dev: {
                options: {
                    sassDir: '<%%= yeoman.app %>/scss',
                    cssDir: '<%%= yeoman.app %>/css'
                }
            }
        },
        // Live reload of localhost; Sass conversion
        watch: {
            options: {
                nospawn: true,
                livereload: LIVERELOAD_PORT
            },
            livereload: {
                files: [
                    '<%%= yeoman.app %>/index.html',
                    '<%%= yeoman.app %>/iframe.html',
                    '<%%= yeoman.app %>/*',
                    '<%%= yeoman.app %>/css/*',
                    '<%%= yeoman.app %>/css/lib/*',
                    '<%%= yeoman.app %>/scss/*',
                    '<%%= yeoman.app %>/js/*',
                    '<%%= yeoman.app %>/js/app/*',
                    '<%%= yeoman.app %>/js/lib/*',
                    '<%%= yeoman.app %>/json/*'
                ]
            },
            sass: {
                files: ['<%%= yeoman.app %>/scss/*'],
                tasks: ['compass:dev']
            }
        },
        // Copy bower components when scaffolding app
        bowercopy: {
            basecss: {
                options: {
                    destPrefix: '<%%= yeoman.app %>/css/lib/'
                },
                files: {
                    'bootstrap-responsive.css': 'bootstrap/docs/assets/css/bootstrap-responsive.css',
                    'bootstrap.css': 'bootstrap/docs/assets/css/bootstrap.css',
                    'font-awesome.css': 'font-awesome/css/font-awesome.css',
                    'font-awesome-ie7.min.css': 'font-awesome/css/font-awesome-ie7.min.css'<% if (templateMap) { %>,
                    'leaflet.css': 'leaflet-dist/leaflet.css'<% } %>
                }
            },
            <% if (templateMap) { %>leafletdefaultmarkers: {
                files: {
                    '<%%= yeoman.app %>/css/images': 'leaflet-dist/images'
                }
            },<% } %>
            <% if (templateDataTables) { %>dataTablesimages: {
                files: {
                    '<%%= yeoman.app %>/css/lib/images': 'datatables/media/images'
                }
            },<% } %>
            font: {
                options: {
                    destPrefix: '<%%= yeoman.app %>/css/'
                },
                files: {
                    'font': 'font-awesome/font'
                }
            },
            basejs: {
                options: {
                    destPrefix: '<%%= yeoman.app %>/js/lib/'
                },
                files: {
                    'jquery.js': 'jquery/jquery.js'<% if (templateMap) { %>,
                    'async.js': 'requirejs-plugins/src/async.js',
                    'leaflet.js': 'leaflet-dist/leaflet.js',
                    'leaflet.awesome-markers.js': 'Leaflet.awesome-markers/dist/leaflet.awesome-markers.js'<% } %><% if (templateTabletop) { %>,
                    'tabletop.js': 'tabletop/src/tabletop.js'<% } %><% if (templateDataTables) { %>,
                    'jquery.dataTables.js': 'datatables/media/js/jquery.dataTables.js',
                    'dataTables.bootstrap.js': 'datatables-plugins/integration/bootstrap/2/dataTables.bootstrap.js'<% } %><% if (templateHandlebars) { %>,
                    'handlebars.js': 'handlebars/handlebars.js'<% } %>
                }
            },
            requirejs: {
                options: {
                    destPrefix: '<%%= yeoman.app %>/js/'
                },
                files: {
                    'require.js': 'requirejs/require.js'
                }
            }
        },
        // Prep our HTML, CSS files and send to public directory
        copy: {
            index: {
                src: '<%%= yeoman.app %>/index.html',
                dest: '<%%= yeoman.dist %>/index.html'
            },
            iframe: {
                src: '<%%= yeoman.app %>/iframe.html',
                dest: '<%%= yeoman.dist %>/iframe.html'
            },
            imgs: {
                expand: true,
                flatten: true,
                src: ['<%%= yeoman.app %>/imgs/**'],
                dest: '<%%= yeoman.dist %>/imgs/',
                filter: 'isFile'
            },
            font: {
                expand: true,
                flatten: true,
                src: ['<%%= yeoman.app %>/css/font/**'],
                dest: '<%%= yeoman.dist %>/font/',
                filter: 'isFile'
            },
            data: {
                expand: true,
                flatten: true,
                src: ['<%%= yeoman.app %>/data/**'],
                dest: '<%%= yeoman.dist %>/data/',
                filter: 'isFile'
            }<% if (templateMap || !templateTabletop) { %>,
            json: {
                expand: true,
                flatten: true,
                src: ['<%%= yeoman.app %>/json/**'],
                dest: '<%%= yeoman.dist %>/json/',
                filter: 'isFile'
            }<% } %><% if (templateMap || templateDataTables) { %>,
            csslibimages: {
                expand: true,
                flatten: true,
                src: ['<%%= yeoman.app %>/css/lib/images/**'],
                dest: '<%%= yeoman.dist %>/css/images/',
                filter: 'isFile'
            }<% if (templateMap) { %>,
            cssimages: {
                expand: true,
                flatten: true,
                src: ['<%%= yeoman.app %>/css/images/**'],
                dest: '<%%= yeoman.dist %>/css/images/',
                filter: 'isFile'
            }<% } %><% } %>
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: '<%%= yeoman.dist %>'
            }
        },
        usemin: {
            html: [ '<%%= yeoman.dist %>/index.html' ]
        },
        // Uglify JS files and send to public directory
        requirejs: {
            compile: {
                options: {
                    paths: {
                        'require': '../require',
                        'script': '../app/script'<% if (templateMap) { %>,
                        'map': '../app/map'<% } %><% if (templateTabletop) { %>,
                        'load-tabletop': '../app/load-tabletop'<% } %><% if (templateDataTables) { %>,
                        'load-datatables': '../app/load-datatables'<% } %><% if (templateHandlebars) { %>,
                        'load-handlebars': '../app/load-handlebars'<% } %><% if (!templateTabletop && !templateHandlebars && !templateMap) { %>,
                        'load-json': '../app/load-json'<% } %>
                    },
                    modules: [
                        {
                            name: 'script',
                            include: [
                                'script'<% if (templateMap) { %>,
                                'map'<% } %><% if (templateTabletop) { %>,
                                'load-tabletop'<% } %><% if (templateDataTables) { %>,
                                'load-datatables'<% } %><% if (templateHandlebars) { %>,
                                'load-handlebars'<% } %><% if (!templateTabletop && !templateHandlebars && !templateMap) { %>,
                                'load-json'<% } %>
                            ]
                        }
                    ],
                    baseUrl: '<%%= yeoman.app %>/js/lib',
                    mainConfigFile: "<%%= yeoman.app %>/js/config.js",
                    dir: '<%%= yeoman.dist %>/js/'
                }
            }
        },
        // Wrap our config.js file with call to min script.js
        // For public only
        wrap: {
            basic: {
                src: ['<%%= yeoman.app %>/js/require-load.js'],
                dest: '<%%= yeoman.dist %>/js/config.js',
                options: {
                    wrapper: ['require(["domReady!"], function(doc){\nrequire(["script"], function(script){\n', '\n});\n});']
                }
            }
        },
        // Connect to localhost
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        },
        // Open local host
        open: {
            app: {
                path: 'http://localhost:<%%= connect.options.port %>/<%%= yeoman.app %>',
                app: 'Google Chrome'
            },
            dist: {
                path: 'http://localhost:<%%= connect.options.port %>/<%%= yeoman.dist %>',
                app: 'Google Chrome'
            },
            deployed: {
                path: 'http://wcfcourier.com/app/special/<%%= yeoman.dist %>',
                app: 'Google Chrome'
            }
        },
        // Unit tests
        mochaTest: {
            test: {
                src: ['test/*.js']
            }
        },
        // Deploy to FTP server
        'sftp-deploy': {
            build: {
                auth: {
                    host: 'sftp.wcfcourier.com',
                    port: 122,
                    authKey: 'courierKey'
                },
                src: '<%%= yeoman.dist %>',
                dest: '/special/<%%= yeoman.dist %>'
            }
        }
    });

    // Grunt task to run it all
    grunt.registerTask('app', [
        'bowercopy:basecss',<% if (templateMap) { %>
        'bowercopy:leafletdefaultmarkers',<% } %><% if (templateDataTables) { %>
        'bowercopy:dataTablesimages',<% } %>
        'bowercopy:font',
        'bowercopy:basejs',
        'bowercopy:requirejs',
        'compass:dev',
        'connect:livereload',
        'open:app',
        'watch'
    ]);
    grunt.registerTask('server', [
        'compass:dev',
        'connect:livereload',
        'open:app',
        'watch'
    ]);
    grunt.registerTask('public', [
        'copy:index',
        'copy:iframe',
        'copy:imgs',
        'copy:font',
        'copy:data',<% if (templateMap || !templateTabletop) { %>
        'copy:json',<% } %><% if (templateMap  || templateDataTables) { %>
        'copy:csslibimages',<% if (templateMap)  { %>,
        'copy:cssimages',<% } %><% } %>
        'useminPrepare',
        'concat',
        'cssmin',
        'usemin',
        'requirejs',
        'wrap',
        'connect:livereload',
        'open:dist',
        'watch'
    ]);
    grunt.registerTask('deploy', [
        'sftp-deploy',
        'open:deployed'
    ]);
};
