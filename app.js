#! /usr/bin/env node
"use strict";

require("./lib/argparser.js");

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
	parseArgs(process.argv, function (results) {
		version = results;
	});
	loadFile(filename, function (results) {
		bumpVersion(results, version, function (results2) {
			saveFile(results2, filename, function (results) {
				if (!results2) console.err("failed to bump the module version to " + version);else {
					console.log("succeeded in bumping the module version to " + version);
					commitToLocalGit(version, function (results3) {
						if (!results3) console.err("failed to commit to local git repository; Is one set-up?");else {
							addGitTag(version, message, function (results4) {
								pushToRemote(null, function (results) {
									console.log("completed pushing to remote:\n" + results);
								});
							});
						}
					});
				}
			});
		});
	});
});
