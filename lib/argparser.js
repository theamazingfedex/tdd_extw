"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cltags = require("cltags");

var _fs = require("fs");

//import  from "child_process" as shell;
var shell = require("shelljs");
var defaults = {
    repository: "",
    remote: "origin",
    branch: "master"
};
var replacements = {
    "M": "bumpmajor",
    "m": "bumpminor",
    "p": "bumppatch",
    "P": "bumppatch",
    "pre": "prerelease",
    "pre-release": "prerelease"
};

//parseArgs parses the command line args passed to it into a single object and returns it.
var parseArgs = function parseArgs(args, done) {
    //adding in a bogus value into the args array because CLTags drops the first arg.
    var targs = ["bogus"].concat(args);
    var results = (0, _cltags.parse)(targs, defaults, replacements);
    return done(results);
};

exports.parseArgs = parseArgs;
var saveFile = function saveFile(data, filename, done) {
    (0, _fs.writeFile)(filename, JSON.stringify(data, null, 4), function (err) {
        if (err) {
            return done(false);
        }
        return done(true);
    });
};

exports.saveFile = saveFile;
var loadFile = function loadFile(filename, done) {

    (0, _fs.exists)(filename, function (exists) {
        if (exists) {
            (0, _fs.stat)(filename, function (error, stats) {
                (0, _fs.open)(filename, "r", function (error, fd) {
                    var buffer = new Buffer(stats.size);
                    (0, _fs.read)(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer) {
                        var data = buffer.toString("utf8", 0, buffer.length);
                        (0, _fs.close)(fd);
                        //console.log(`data: ${JSON.stringify(data)}`);
                        return done(JSON.parse(data));
                    });
                });
            });
        }
    });
};

exports.loadFile = loadFile;
//update the version based off the args parsed from parseArgs
var bumpVersion = function bumpVersion(data, newversion, done) {
    var passthrough = false;
    var ifhaspre = data.version.split("-");
    var results = data.version.split(".");
    var prereleaseinfo = 0;
    if (ifhaspre[1]) {
        results = ifhaspre[0].split(".");
        prereleaseinfo = +ifhaspre[1].split(".")[1] + 1;
    }
    if (newversion.major >= 0) results[0] = newversion.majorv;
    if (newversion.minor >= 0) results[1] = newversion.minorv;
    if (newversion.patch >= 0) results[2] = newversion.patchv;

    if (newversion.bumpmajor) {
        results[0] = +results[0] + 1;
        passthrough = true;
    }
    if (newversion.bumpminor) {
        results[1] = +results[1] + 1;
        passthrough = true;
    }
    if (newversion.bumppatch) {
        results[2] = +results[2] + 1;
        passthrough = true;
    }

    data.version = results[0] + "." + results[1] + "." + results[2];

    if (newversion.prerelease && !passthrough) {
        var presults = "-" + newversion.prerelease + "." + prereleaseinfo;
        data.version = results[0] + "." + results[1] + "." + results[2] + presults;
    }

    console.log("DataVersion:: " + data.version);
    return done(data);
};

exports.bumpVersion = bumpVersion;
var commitToLocalGit = function commitToLocalGit(message, done) {
    console.log("===Newest Version :: " + message + "===");
    var command = "git pull && git commit -a";
    if (shell.exec(command).code !== 0) {
        shell.echo("Error: Git commit failed");
        shell.exit(1);
        return done(false);
    }
    return done(true);
};

exports.commitToLocalGit = commitToLocalGit;
var addGitTag = function addGitTag(version, message, done) {
    var command = "git tag -a v" + version;
    console.log(shell.exec(command).output);
    return done("v" + version);
};

exports.addGitTag = addGitTag;
var pushToRemote = function pushToRemote(remote, user, pass, done) {

    var command = "git push origin --tags";
    if (shell.exec(command).code !== 0) {
        shell.echo("Error: Git commit failed");
        shell.exit(1);
        return done(false);
    }
    return done(true);
};
exports.pushToRemote = pushToRemote;
