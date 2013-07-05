module.exports = function(grunt) {
    'use strict';

    // load custom tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // initialize the configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        files: {
            grunt: 'Gruntfile.js',
            root: 'deploy',
            css: '<%= files.root %>/css',
            sass: 'sass',
            js: '<%= files.root %>/js',
            img: '<%= files.root %>/img',
            sourceMap: 'main.min.map'
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
                files: ['<%= files.root %>/**/*.{html,php}'],
                options: {
                    livereload: true
                }
            },
            livereload: {
                files: ['<%= files.css %>/**/*.css'],
                options: {
                    livereload: true
                }
            }
        },

        compass: {
            dist: {
                options: {
                    sassDir: '<%= files.sass %>',
                    cssDir: '<%= files.css %>',
                    imagesDir: '<%= files.img %>',
                    httpGeneratedImagesPath: '../img',
                    environment: 'production',
                    outputStyle: 'compressed',
                    debugInfo: false,
                    noLineComments: true,
                    force: true
                }
            },
            dev: {
                options: {
                    sassDir: '<%= files.sass %>',
                    cssDir: '<%= files.css %>',
                    imagesDir: '<%= files.img %>',
                    httpGeneratedImagesPath: '../img',
                    outputStyle: 'expanded',
                    debugInfo: true
                }
            }
        },

        cssmin: {
            minify: {
                src: [
                    '<%= files.css %>/normalize.css',
                    '<%= files.css %>/main.css'
                ],
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
                jquery: true,
                devel: true,
                maxerr: 50,
                globals: {
                    DISQUS: true
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
        }
    });

    // default task
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['compass:dist', 'cssmin', 'jshint', 'uglify']);
};