var expect = require("chai").expect;
var bumper = require("../lib/argparser.js");

describe("ESBump", function(){
    describe("#parseArgs()", function(){
        it("should parse args to returned object", function(done){
            var args = ["-M","-m", "-p"];
            var results = bumper.parseArgs(args, function(results){
		vargs = results;
		expect(results).to.have.a.property("bumpmajor");
		expect(results).to.have.a.property("bumpminor");
		expect(results).to.have.a.property("bumppatch");
	    });
            done();
        });
    });
    describe("#loadFile(filename)", function(){
	it("should load the filename and return the obj representation", function(done){
	    bumper.loadFile("package.json", function(result){
		    expect(result).to.exist;
    		});
	    done();
	}); 
    });



    describe("#bumpVersion(data, version, done)", function(){
	it("should bump the package version by values passed in", function(done){
	    var data = bumper.loadFile("package.json", function(result1){
		var version = {"major":4, "minor":2, "patch":1};
		console.log("version bumped data:: " + result1);
		    bumper.bumpVersion(result1, version, function(result){
			expect(result).to.be.above("0.0.0");
			console.log("Data.updatedVersion:: " + result.version);
		    });
		    done();
	    });
	});
    });

    describe("#commitToLocalGit(message, done)", function(){
	it("should commit changes with the provided message to the local git repo", function(done){
		bumper.commitToLocalGit("updating with ESBump to newest version", function(results){
		    expect(results).to.exist;
		});
		done();
	});
    });
    describe("#addGitTag(tagMessage, done)", function(){
	it("should add a git tag to the local repository with the tagID", function(done){
	    var tagMessage = "mocha/chai testing message";
		bumper.addGitTag(tagMessage, function(results){
		    expect(results).to.exist;
		});
		done();
	});
    });
    describe("#pushToRemote(remote, branch, done)", function(){
	it("should push the changes to the remote git repo with defined branch", function(done){
	//	bumper.pushToRemote(null, null, function(result){
	//	    expect(results).to.exist;
	//	});
		done();
	});
    });
});

