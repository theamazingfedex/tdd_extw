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

console.log("initializing");
(0, _libArgparserJs.parseArgs)(process.argv, function (results) {
	version = results;
});
(0, _libArgparserJs.loadFile)(filename, function (results) {
	(0, _libArgparserJs.bumpVersion)(results, version, function (results2) {
		(0, _libArgparserJs.saveFile)(results2, filename, function (results) {
			if (!results2) console.err("failed to bump the module version to " + version);else {
				console.log("succeeded in bumping the module version to " + version);
				(0, _libArgparserJs.commitToLocalGit)(version, function (results3) {
					if (!results3) console.err("failed to commit to local git repository; Is one set-up?");else {
						(0, _libArgparserJs.addGitTag)(version, "ESBump added git Tag v" + version, function (results4) {
							(0, _libArgparserJs.pushToRemote)(null, function (results) {
								console.log("completed pushing to remote:\n" + results);
							});
						});
					}
				});
			}
		});
	});
});
