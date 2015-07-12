"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cltags = require("cltags");

var _fs = require("fs");

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
