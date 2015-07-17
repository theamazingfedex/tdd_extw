  import {parse} from "cltags";
 
  let defaults = {
      repository: "",
      remote: "origin",
      branch: "master"
  };
  let replacements = {
    "P":"prerelease",
    "M":"major",
    "m":"minor",
    "p":"patch"
  };

  export var parseArgs = (args) => {
    var targs = ["bogus"].concat(args);
    return parse(targs, defaults, replacements);  
  };

//update the version based off the args parsed from parseArgs
export var bumpversion = (data, newversion) => {
  return new Promise((resolve) => {
    var passthrough = false;
    var ifhaspre = data.version.split("-");
    var results = data.version.split(".");
    var prereleaseinfo = 0;
    if (ifhaspre[1]) {
	    results = ifhaspre[0].split(".");
	    prereleaseinfo = +ifhaspre[1].split(".")[1] + 1;
    }
    if (newversion.major){
	    results[0] = +results[0] +1;
      results[1] = 0;
      results[2] = 0;
	    passthrough = true;
    }
    if (newversion.minor){
	    results[1] = +results[1] +1;
      results[2] = 0;
	    passthrough = true;
    }
    if (newversion.patch){
	    results[2] = +results[2] +1;
      passthrough = true;
    }

    data.version = `${results[0]}.${results[1]}.${results[2]}`;
    
    if (newversion.prerelease && !passthrough){
      var presults = `-${newversion.prerelease}.${prereleaseinfo}`;
      data.version = `${results[0]}.${results[1]}.${results[2]}${presults}`;
    }
    
    console.log(`DataVersion:: ${data.version}`);
    resolve(data);
  });
};

 
