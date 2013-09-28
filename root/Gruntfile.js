module.exports = function(grunt) {
    'use strict';

    // load custom tasks
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-imageoptim');

    // initialize the configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        files: {
            grunt: 'Gruntfile.js',
            build: '_build',
            css: 'css',
            sass: 'sass',
            js: 'js',
            img: 'images',
            sourceMap: 'main.min.map'
        },

        connect: {
            server: {
                options: {
                    port: 9000
                }
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
                    livereload: true
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
                dest: '<%= files.css %>/main.min.css'
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
                options: {
                    sourceMap: '<%= files.js %>/<%= files.sourceMap %>',
                    sourceMappingURL: '<%= files.sourceMap %>',
                    sourceMapPrefix: 1
                },
                files: {
                    '<%= files.js %>/main.min.js': [
                        '<%= files.js %>/libs/jquery/jquery-2.0.3.min.js',
                        '<%= files.js %>/*.js'
                    ]
                }
            }
        },

        imageoptim: {
            files: ['_build/images'],
            // files: ['<%= files.img %>'],
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
        }
    });

    // default task
    grunt.registerTask('default', ['connect', 'watch']);
    grunt.registerTask('deploy', ['compass:dist', 'cssmin', 'jshint', 'uglify', 'copy', 'imageoptim']);
};