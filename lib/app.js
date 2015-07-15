#! /usr/bin/env node
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialize = initialize;

var _esbumpToolkitJs = require("./esbump-toolkit.js");

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
var initial_data = "none";
//Initializes the application

function initialize() {
  console.log("initializing");
  try {
    initial_data = (0, _esbumpToolkitJs.parseArgs)(process.argv);
  } catch (e) {
    return e;
  }

  return (0, _esbumpToolkitJs.loadFile)(filename).then(function (fileData) {
    return (0, _esbumpToolkitJs.bumpVersion)(fileData, initial_data);
  }).then(function (bumped) {
    version = bumped.version;
    console.log("bumped version::: " + version);
    return (0, _esbumpToolkitJs.saveFile)(bumped, "package.json");
  }).then(function () {
    return (0, _esbumpToolkitJs.commitToLocalGit)(version);
  }).then(function () {
    return (0, _esbumpToolkitJs.addGitTag)(version);
  }).then(function () {
    return (0, _esbumpToolkitJs.pushToRemote)(null, null, null);
  })["catch"](function (err) {
    return 1;
  });
}

;