/*
 * grunt-init threshold
 * https://github.com/reintroducing/threshold
 *
 * Copyright (c) 2013 Matt Przybylski <matt@reintroducing.com>
 */

'use strict';

// Basic template description.
exports.description = 'Start a new project and hit the ground running.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Edit the Gruntfile.js file before grunt and run npm install.';

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