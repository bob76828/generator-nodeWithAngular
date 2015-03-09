'use strict';

exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'test/e2e/*_spec.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },
    onPrepare: function () {
        // The require statement must be down here, since jasmine-reporters
        // needs jasmine to be in the global and protractor does not guarantee
        // this until inside the onPrepare function.
        var HtmlReporter = require('protractor-html-screenshot-reporter');
        var jasmineReporters = require('jasmine-reporters');

        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
                consolidateAll: true,
                filePrefix: 'e2e',
                savePath: 'test_output'
            }));
        jasmine.getEnv().addReporter(new HtmlReporter({
            baseDirectory: 'test_output/e2e_coverage'
        }));
    },

    baseUrl: 'http://localhost:8000/release/',

    framework: 'jasmine2',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
