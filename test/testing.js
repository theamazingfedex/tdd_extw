var expect = require("chai").expect;
var vargs = require("../lib/argparser.js");


describe("Tags", function(){
    describe("#parse()", function(){
        it("should parse args to returned object", function(){
            var args = ["-M=65","--major=4", "-m=2", "-p=1"];
            console.log("args:: "+ args);
            var results = vargs.parse(args, function(results){

	    });
            
            expect(results).to.have.a.property("major", 4);
            expect(results).to.have.a.property("minor", 2);
            expect(results).to.have.a.property("patch", 1);
            
            
        });
    });
    describe("#loadFile(filename)", function(){
	it("should load the filename and return the obj representation", function(done){
	    setTimeout(function(){
		vargs.loadFile("package.json", function(err, result){
		    expect(result).to.exist;
    		});
		done();
	    }, 200);
	}); 
    });
//  describe("#update(data)", function(){
//      it("should update update the version number and return the object", function(done)
//	 {
//	     setTimeout(function(){
//		 vargs.loadFile("package.json", function(err, result){
//		     vargs.saveFile(result, "package.json", function(err, complete){
//			 expect(complete).to.equal("true");
//		     });
//		 });
//	     }, 200);
//	});
  //  });


});
function check(done, f){
    try {
	f();
	done();
    } catch (e) {
	done(e);
    }
}
