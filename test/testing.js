var expect = require("chai").expect;
var vargs = require("../lib/argparser.js");


describe("Tags", function(){
    describe("#parseArgs()", function(){
        it("should parse args to returned object", function(done){
            var args = ["-M=65","--major=4", "-m=2", "-p=1"];
	    setTimeout(function(){
		
	    
            var results = vargs.parseArgs(args, function(results){

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
	    vargs.loadFile("package.json", function(result){
		    expect(result).to.exist;
    		});
	    done();
	    }, 200);
	}); 
    });



    describe("#bumpVersion(data, version, done)", function(){
	it("should bump the package version by values passed in", function(done){
	    var data = vargs.loadFile("package.json", function(result1){
		var version = {"major":4, "minor":2, "patch":1};
		console.log("version bumped data:: " + result1);
		setTimeout(function(){
		    vargs.bumpVersion(result1, version, function(result){
			expect(result).to.be.above(result1.version);
			console.log("Data.updatedVersion:: " + result.version);
		    });
		    done();
		}, 200);
	    });
	});
    });
    


});
function check(done, f){
    try {
	f();
	done();
    } catch (e) {
	done(e);
    }
}
