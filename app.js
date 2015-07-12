#! /usr/bin/env node
"use strict";

var _libArgparserJs = require("./lib/argparser.js");

/***
launch this app from the command line.
use the following parameters to update the version following semver guidelines as desired:
 SemVer Standards: 1.0.2 : Major.Minor.Patch
  -M : --major : Major version
  -m : --minor : Minor version
  -p : -P : --patch : Patch version
***/
var version = "0.0.0";
var filename = "package.json";

//Initializes the application
(function () {
	(0, _libArgparserJs.parseArgs)(process.argv, function (results) {
		version = results;
	});
	(0, _libArgparserJs.loadFile)(filename, function (results) {
		(0, _libArgparserJs.bumpVersion)(results, version, function (results2) {
			(0, _libArgparserJs.saveFile)(results2, filename, function (results) {
				if (results) console.err("failed to bump the module version to " + version);else console.log("succeeded in bumping the module version to " + version);
			});
		});
	});
});
