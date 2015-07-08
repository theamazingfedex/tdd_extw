var tagger = require("cltags");
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

module.exports.parse = function(args){
    var targs = ["bogus"].concat(args);
    console.log("parsed args:: \n" + targs);
    var results = tagger.parse(targs, defaults, replacements);
    console.log(results);
    return results;
};