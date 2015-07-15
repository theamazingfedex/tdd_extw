#! /usr/bin/env node
import {parseArgs, loadFile, bumpVersion, saveFile, commitToLocalGit, addGitTag, pushToRemote}
  from "./esbump-toolkit.js";
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

let version = "0.0.0";
let filename = "package.json";
let initial_data = "none";
//Initializes the application
export function initialize(){
  console.log(`initializing`);
  try {
    initial_data = parseArgs(process.argv);
  } catch(e) {
    return e;
  }

  return loadFile(filename)
    .then(fileData => bumpVersion(fileData, initial_data))
    .then(bumped => {
      version = bumped.version;
      console.log(`bumped version::: ${version}`);
      return saveFile(bumped, "package.json");
    })
    .then(() => commitToLocalGit(version))
    .then(() => addGitTag(version))
    .then(() => pushToRemote(null,null,null))
    .catch(err => 1);
  
};
