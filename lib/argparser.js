"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _cltags = require("cltags");

var _fs = require("fs");

var _shelljsGlobal = require("shelljs/global");

var shell = _interopRequireWildcard(_shelljsGlobal);

var defaults = {
    major: -1,
    minor: -1,
    patch: -1,
    repository: ""
};
var replacements = {
    "M": "major",
    "m": "minor",
    "p": "patch",
    "P": "patch",
    "r": "repository",
    "R": "repository"
};

var parseArgs = function parseArgs(args, done) {
    var targs = ["bogus"].concat(args);
    var results = (0, _cltags.parse)(targs, defaults, replacements);
    return done(results);
};

exports.parseArgs = parseArgs;
var saveFile = function saveFile(data, filename, done) {
    (0, _fs.writeFile)(filename, data, function (err) {
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
                        data = JSON.parse(data);
                        (0, _fs.close)(fd);
                        return done(data);
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
    return done(data);
};

exports.bumpVersion = bumpVersion;
var commitToLocalGit = function commitToLocalGit(message, done) {
    try {
        var command = "git commit -a -m \"ESBump commit: " + message + "\"";
        shell.exec(command).output;
        return done(true);
    } catch (e) {
        return done(false);
    }
};

exports.commitToLocalGit = commitToLocalGit;
var addGitTag = function addGitTag(version, message, done) {
    var command = "git tag -a v" + version + " -m \"" + message + "\"";
    shell.exec(command).output;
    return done("v" + version);
};
exports.addGitTag = addGitTag;
