"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cltags = require("cltags");

var _fs = require("fs");

var shell = require("shelljs");

var defaults = {
    major: -1,
    minor: -1,
    patch: -1,
    repository: "",
    remote: "origin",
    branch: "master"
};
var replacements = {
    "M": "major",
    "m": "minor",
    "p": "patch",
    "P": "patch",
    "r": "repository",
    "R": "repository",
    "user": "username",
    "u": "username",
    "pass": "password"
};

var parseArgs = function parseArgs(args, done) {
    var targs = ["bogus"].concat(args);
    var results = (0, _cltags.parse)(targs, defaults, replacements);
    return done(results);
};

exports.parseArgs = parseArgs;
var saveFile = function saveFile(data, filename, done) {
    (0, _fs.writeFile)(filename, JSON.stringify(data), function (err) {
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
                        console.log("data: " + JSON.stringify(data));
                        return done(JSON.parse(data));
                    });
                });
            });
        }
    });
};

exports.loadFile = loadFile;
var bumpVersion = function bumpVersion(data, newversion, done) {

    var results = data.version.split(".");
    if (newversion.major >= 0) results[0] = newversion.major;
    if (newversion.minor >= 0) results[1] = newversion.minor;
    if (newversion.patch >= 0) results[2] = newversion.patch;
    if (newversion.patch == -1) results[2] = +results[2] + 1;
    data.version = results[0] + "." + results[1] + "." + results[2];
    console.log("DataVersion:: " + data.version);
    return done(data);
};

exports.bumpVersion = bumpVersion;
var commitToLocalGit = function commitToLocalGit(message, done) {
    var command = "git commit -a -m \"ESBump commit: " + message + "\"";
    if (shell.exec(command).code !== 0) {
        shell.echo("Error: Git commit failed");
        shell.exit(1);
        return done(false);
    }
    return done(true);
};

exports.commitToLocalGit = commitToLocalGit;
var addGitTag = function addGitTag(version, message, done) {
    var command = "git tag -a v" + version + " -m \"" + message + "\"";
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
