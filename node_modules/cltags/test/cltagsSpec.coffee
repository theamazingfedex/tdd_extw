expect = require("chai").expect
cltags = require("../cltags.js")


describe "ClTags", ->

    describe "#parse()", ->

        it "should parse the first non-tagged/script string as a command", ->
            args = ["node", "script_name", "test_command"]
            results = cltags.parse args
            expect(results).to.have.a.property("command", "test_command")

        it "should collect other string tags as a query", ->
            args = ["script", "cmd", "hello", "world", "!"]
            results = cltags.parse args
            expect(results.query).to.equal("hello world !")

        it "should collect long formed tags", ->
            args = ["script", "--foo=bar"]
            results = cltags.parse args
            expect(results).to.have.a.property("foo", "bar")

        it "should collect empty tags as booleans", ->
            args = ["script", "--foo"]
            results = cltags.parse args
            expect(results).to.have.a.property("foo", true)

        it "should accept defaults", ->
            args = ["script", "--foo=bar"]
            defaults = { foo: "baz", hello: "world" }
            results = cltags.parse args, defaults
            expected = { command: "", query: "", foo: "bar", hello: "world" }
            expect(results).to.deep.equal(expected);

        it "should replace short formed tags", ->
            args = ["script", "-fgh=world"]
            replacements = { f: "foo", h: "hello" }
            results = cltags.parse args, {}, replacements
            expected = {
                command: "",
                query: "",
                foo: true,
                g: true,
                hello: "world"
            }
            expect(results).to.deep.equal(expected);

        it "should convert numeric tag values to ints", ->
            args = ["script", "--port=4040"]
            results = cltags.parse args
            expect(results).to.have.a.property("port", 4040);

