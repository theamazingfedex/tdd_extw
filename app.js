#! /usr/bin/env node

import {parseArgs, loadFile, saveFile, bumpVersion} from "./lib/argparser.js";
/***
launch this app from the command line.
use the following parameters to update the version following semver guidelines as desired:
 SemVer Standards: 1.0.2 : Major.Minor.Patch
  -M : --major : Major version
  -m : --minor : Minor version
  -p : -P : --patch : Patch version
***/
let version = "0.0.0";
let filename = "package.json";

//Initializes the application
() =>
{
    parseArgs(process.argv, (results) => {
	version = results;
    });
    loadFile(filename, (results) => {
	bumpVersion(results, version, (results2) => {
	    saveFile(results2, filename, (results) => {
		if (results)
		    console.err(`failed to bump the module version to ${version}`);
		else
		    console.log(`succeeded in bumping the module version to ${version}`);
	    });
	});
    });
    
}
