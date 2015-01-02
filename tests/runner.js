'use strict';

var chai = require('chai'),
	fs = require('fs'),
	walk = require('walk'),
	themesFiles = [],
	walker = walk.walkSync('./themes', {
		listeners: {
			file: function(root, fileStats, next) {
				themesFiles.push(fileStats);
			}
		}
	});

// I know globals are never a good idea
// but in this case they work pretty well
global.themesFiles = themesFiles;
global.expect = chai.expect;
global.themesJSON = [];

// Load and validate themes.json
describe('Check the themes.json file', function() {
	it('The themes.json is a valid json file', function() {
		global.themesJSON = require('../themes.json');
		expect(themesJSON).to.be.an('array');
	});
});

require('./jsonlint.spec');
require('./themes-exist.spec');
require('./themes-parsing.spec');
