var expect = require("chai").expect;
var vargs = require("../lib/argparser.js");

describe("Tags", function(){
    describe("#parse()", function(){
        it("should parse args to returned object", function(){
            var args = ["-M=65","--major=4", "-m=2", "-p=1"];
            console.log("args:: "+ args);
            var results = vargs.parse(args);
            
            expect(results).to.have.a.property("major", 4);
            expect(results).to.have.a.property("minor", 2);
            expect(results).to.have.a.property("patch", 1);
            
            
        });
    });
});
