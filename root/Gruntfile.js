'use strict';

var LIVERELOAD_PORT = 35729,
    lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

module.exports = function(grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    var config = {
        grunt: 'Gruntfile.js',
        build: '_build',
        dev: '',
        css: 'css',
        sass: 'sass',
        js: 'js',
        img: 'images',
        compassSprites: 'sprite',
        sourceMap: 'main.min.map'
    };

    // initialize the configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        files: config,

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [lrSnippet, mountFolder(connect, config.dev)];
                    }
                }
            },
            build: {
                options: {
                    base: '<%= files.build %>',
                    open: true,
                    keepalive: true
                }
            }
        },

        open: {
            dev: {
                path: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>'
            }
        },

        watch: {
            scripts: {
                files: [
                    '<%= files.grunt %>',
                    '<%= files.js %>/**/*.js'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            scss: {
                files: ['<%= files.sass %>/**/*.scss'],
                tasks: ['compass:dev']
            },
            markup: {
                files: ['**/*.{html,php}'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                files: ['<%= files.css %>/**/*.css'],
                tasks: ['autoprefixer'],
                options: {
                    livereload: LIVERELOAD_PORT
                }
            }
        },

        compass: {
            dist: {
                options: {
                    environment: 'production',
                    force: true,
                    config: 'config.rb'
                }
            },
            dev: {
                options: {
                    environment: 'development',
                    debugInfo: true,
                    config: 'config.rb'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', '> 1%', 'ie 8']
            },
            prefix: {
                '<%= files.css %>/main.css': '<%= files.css %>/main.css'
            }
        },

        cssmin: {
            minify: {
                src: '<%= files.css %>/main.css',
                dest: '<%= files.build %>/<%= files.css %>/main.min.css'
            }
        },

        jshint: {
            files: ['<%= files.js %>/**/*.js'],
            options: {
                forin: true,
                noarg: true,
                noempty: true,
                eqeqeq: true,
                bitwise: true,
                strict: true,
                undef: true,
                curly: true,
                expr: true,
                browser: true,
                devel: true,
                maxerr: 50,
                globals: {
                    jQuery: true
                },
                ignores: [
                    '<%= files.js %>/libs/**/*.js',
                    '<%= files.js %>/**/*.min.js'
                ]
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            deploy: {
                // options: {
                //     sourceMap: '<%= files.js %>/<%= files.sourceMap %>',
                //     sourceMappingURL: '<%= files.sourceMap %>',
                //     sourceMapPrefix: 1
                // },
                files: {
                    '<%= files.build %>/<%= files.js %>/main.min.js': [
                        '<%= files.js %>/libs/jquery/jquery-2.0.3.min.js',
                        '<%= files.js %>/*.js'
                    ]
                }
            }
        },

        imageoptim: {
            files: [
                '<%= files.build %>/<%= files.img %>',
                '!images/sprite/*.png'
            ],
            options: {
                jpegMini: true,
                imageAlpha: true,
                quitAfter: true
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: '<%= files.css %>/**', dest: '<%= files.build %>'},
                    {expand: true, src: '<%= files.js %>/**', dest: '<%= files.build %>'},
                    {expand: true, src: '<%= files.img %>/**', dest: '<%= files.build %>'},
                    {expand: true, src: ['**/*.{html,php}', '!node_modules/**'], dest: '<%= files.build %>'},
                    {expand: true, src: '.htaccess', dest: '<%= files.build %>'}
                ]
            }
        },

        clean: {
            dist: ['<%= files.build %>'],
            sprites: ['<%= files.build %>/<%= files.img %>/<%= files.compassSprites %>']
        }
    });

    // default task
    grunt.registerTask('default', ['connect:livereload', 'open', 'watch']);
    grunt.registerTask('deploy', ['clean:dist', 'compass:dist', 'cssmin', 'jshint', 'uglify', 'copy', 'clean:sprites', 'usemin', 'imageoptim', 'connect:build']);
};