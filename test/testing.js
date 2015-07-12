var expect = require("chai").expect;
var bumper = require("../lib/argparser.js");


describe("ESBump", function(){
    describe("#parseArgs()", function(){
        it("should parse args to returned object", function(done){
            var args = ["-M=65","--major=4", "-m=2", "-p=1"];
	    setTimeout(function(){
		
	    
            var results = bumper.parseArgs(args, function(results){

		expect(results).to.have.a.property("major", 4);
		expect(results).to.have.a.property("minor", 2);
		expect(results).to.have.a.property("patch", 1);
	    });
            done();
	    }, 200);
            
        });
    });
    describe("#loadFile(filename)", function(){
	it("should load the filename and return the obj representation", function(done){
	    setTimeout(function(){
	    bumper.loadFile("package.json", function(result){
		    expect(result).to.exist;
    		});
	    done();
	    }, 200);
	}); 
    });



    describe("#bumpVersion(data, version, done)", function(){
	it("should bump the package version by values passed in", function(done){
	    var data = bumper.loadFile("package.json", function(result1){
		var version = {"major":4, "minor":2, "patch":1};
		console.log("version bumped data:: " + result1);
		setTimeout(function(){
		    bumper.bumpVersion(result1, version, function(result){
			expect(result).to.be.above(result1.version);
			console.log("Data.updatedVersion:: " + result.version);
		    });
		    done();
		}, 200);
	    });
	});
    });

    describe("#commitToLocalGit(message, done)", function(){
	ít("should commit changes with the provided message to the local git repo", function(done){
	    setTimeout(function(){
		vargs.commitToLocalGit("updating with ESBump to newest version", function(results){
		    expect(results).to.exist;
		});
		done();
	    }, 200);
	});
    });
    describe("#addGitTag(tagMessage, done)", function(){
	it("should add a git tag to the local repository with the tagID", function(done){
	    setTimeout(function(){
		bumper.addGitTag(tagMessage, function(results){
		    expect(results).to.exist;
		});
		done();
	    }, 200);
	});
    });
    describe("#pushToRemote(remote, branch, done)", function(){
	it("should push the changes to the remote git repo with defined branch", function(done){
	    setTimeout(function(){
		bumper.pushToRemote(null, null, function(result){
		    expect(results).to.exist;
		});
		done();
	    }, 200);
	});
    });
});

