var semver = require("./lib/argparser.js");
import * as semver from "./lib/argparser.js";
/***
launch this app from the command line.
use the following parameters to update the version following semver guidelines as desired:
  -M : --Major : Major version
***/
function startApp(){
    var version = semver.parseArgs(process.argv);
    var filename = "package.json";

    
}
