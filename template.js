/*
 * grunt-init threshold-grunt
 * https://github.com/reintroducing/threshold-grunt
 *
 * Copyright (c) 2014 Matt Przybylski <matt@reintroducing.com>
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Start a new front end dev project with a Grunt workflow.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Edit the Gruntfile.js file before running grunt and run npm install.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = 'Gruntfile.js';

// The actual init template.
exports.template = function(grunt, init, done) {
    init.process({}, [], function(err, props) {
        // Files to copy (and process).
        var files = init.filesToCopy(props);

        // Actually copy (and process) files.
        init.copyAndProcess(files, props);

        // All done!
        done();
    });
};