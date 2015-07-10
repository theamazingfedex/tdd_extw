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
    var data = null;
    fs.exists(filename, function (exists) {
    if (exists) {
        fs.stat(filename, function (error, stats) {
            fs.open(filename, "r", function (error, fd) {
                var buffer = new Buffer(stats.size);
	fs.read(fd, buffer, 0, buffer.length, null, function (error, bytesRead, buffer)
    {
                    data = buffer.toString("utf8", 0, buffer.length);
		   // console.log("loaded data:: " + data);
                    fs.close(fd);
		    return data;
//		    done(data);
                });
            });
        });
    }
    });
};

module.exports.updateversion = function (data, newversion, done){
    
};
