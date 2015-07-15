#! /usr/bin/env node

var app = require("../lib/app.js");
console.log("exit code:: "+JSON.stringify(app.initialize()));
