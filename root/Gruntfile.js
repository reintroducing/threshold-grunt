'use strict';

var LIVERELOAD_PORT = 35729,
    SERVER_PORT = 9000,
    lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT}),
    mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = {
        grunt: 'Gruntfile.js',
        dist: '_dist',
        dev: '',
        css: 'css',
        sass: 'sass',
        js: 'js',
        img: 'images',
        compassSprites: 'sprite'
    };

    // initialize the configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        files: config,

        connect: {
            options: {
                port: SERVER_PORT,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function(connect) {
                        return [lrSnippet, mountFolder(connect, config.dev)];
                    }
                }
            },
            dist: {
                options: {
                    base: '<%= files.dist %>',
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
                    force: true
                }
            },
            dev: {
                options: {
                    environment: 'development',
                    debugInfo: true
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

        useminPrepare: {
            html: 'index.html',
            options: {
                dest: '<%= files.dist %>'
            }
        },

        usemin: {
            html: ['<%= files.dist %>/**/*.html'],
            css: ['<%= files.dist %>/<%= files.css %>/**/*.css'],
            options: {
                assetsDirs: ['<%= files.dist %>']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            files: [
                'Gruntfile.js',
                '<%= files.js %>/**/*.js',
                '!<%= files.js %>/libs/**/*.js',
                '!<%= files.js %>/**/*.min.js'
            ]
        },

        imageoptim: {
            src: [
                '<%= files.dist %>/<%= files.img %>',
                '!<%= files.img %>/<%= files.compassSprites %>/*.png'
            ],
            options: {
                jpegMini: true,
                imageAlpha: true,
                quitAfter: true
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, src: '<%= files.js %>/libs/html5shiv/**', dest: '<%= files.dist %>'},
                    {expand: true, src: '<%= files.img %>/**', dest: '<%= files.dist %>'},
                    {expand: true, src: ['**/*.{html,php}', '!node_modules/**'], dest: '<%= files.dist %>'}
                ]
            }
        },

        clean: {
            dist: ['<%= files.dist %>'],
            sprites: ['<%= files.dist %>/<%= files.img %>/<%= files.compassSprites %>']
        }
    });

    // default task
    grunt.registerTask('default', [
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'jshint',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'copy:dist',
        'clean:sprites',
        'usemin',
        'imageoptim'
    ]);

    grunt.registerTask('preview', [
        'build',
        'connect:dist'
    ]);
};