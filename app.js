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
  --bumpmajor : Bump the major version to the next version
  --bumpminor : Bump the minor version to the next version
  --bumppatch : Bump the patch version to the next version
  --pre-release : Make the current release push as a beta version
***/
var version = "0.0.0";
var filename = "package.json";
var vargs = "none";
//Initializes the application

console.log("initializing");
(0, _libArgparserJs.parseArgs)(process.argv, function (results) {
	vargs = results;
});
(0, _libArgparserJs.loadFile)(filename, function (results) {
	(0, _libArgparserJs.bumpVersion)(results, vargs, function (results2) {
		version = results2.version;
		(0, _libArgparserJs.saveFile)(results2, filename, function (results3) {
			if (!results3) console.log("failed to bump the module version to " + version);else {
				console.log("succeeded in bumping the module version to " + version);
				(0, _libArgparserJs.commitToLocalGit)(version, function (results4) {
					if (!results4) console.log("failed to commit to local git repository; Is one set-up?");else {
						(0, _libArgparserJs.addGitTag)(version, "ESBump added git Tag v" + version, function (results5) {
							(0, _libArgparserJs.pushToRemote)(null, vargs.username, vargs.password, function (results6) {
								console.log("completed pushing to remote:\n" + results6);
							});
						});
					}
				});
			}
		});
	});
});
