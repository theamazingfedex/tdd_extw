var tagger = require("cltags");
var fs = require("fs");

var defaults = {
    major:-1,
    minor:-1,
    patch:-1,
    repository: ""
};
var replacements = {
    "M":"major",
    "m":"minor",
    "p":"patch",
    "P":"patch",
    "r":"repository",
    "R":"repository"
};

module.exports.parseArgs = function(args, done){
    var targs = ["bogus"].concat(args);
    console.log("parsed args:: \n" + targs);
    var results = tagger.parse(targs, defaults, replacements);
//    console.log("and the results are...." + results);
    return done(results);
};

module.exports.saveFile = function(data, filename, done){
    var dataname = data.name;
    fs.writeFile(filename, data, function (err) {
        if (err) {
            return done(false);
        }
        console.log(dataname + " saved " + filename + " with an updated version");
	return done(true);
	//        done(null, true);
    });
};

module.exports.loadFile = function(filename, done) {
    
    fs.exists(filename, function (exists) {
    if (exists) {
        fs.stat(filename, function (error, stats) {
            fs.open(filename, "r", function (error, fd) {
                var buffer = new Buffer(stats.size);
	fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer){
            var data = buffer.toString("utf8", 0, buffer.length);
	    data = JSON.parse(data);
		   // console.log("loaded data:: " + data);
                    fs.close(fd);
	    return done(data);
		    
                });
            });
        });
    }
    });
};

module.exports.bumpVersion = function (data, newversion, done){

    console.log("Data.Version:: " + data.version);
    var results = data.version.split(".");
    if (newversion.major >= 0)
	results[0] = newversion.major;
    if (newversion.minor >= 0)
	results[1] = newversion.minor;
    if (newversion.patch >= 0)
	results[2] = newversion.patch;
    if (newversion.patch == -1)
	results[2] = +results[2]+1;
    data.version = results[0] + "."+results[1]+"."+results[2];
    return done(data);
};

