  import {parse} from "cltags";
  import {writeFile, exists, stat, open, read, close} from "fs";
  import * as shell from "shelljs";
  //var shell = require("shelljs");
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
  export var saveFile = (data, filename) => {
    return new Promise((resolve, reject) => {
      writeFile(filename, JSON.stringify(data, null, 4), (err) => {
        if (err) {
          console.log("Error: Failed to save the file\n"+err);
          reject(Error("Error: Failed to saveFile\n  "+err));
        }
        else{
          console.log("saved the data:: \n"+JSON.stringify(data));
          resolve(true);
        }
      });
    });
  };

  export var loadFile = (filename, done) => {
    return new Promise((resolve, reject) => {
      exists(filename, (exists) => {
        if (exists) {
          stat(filename, (error, stats) => {
            open(filename, "r", (error, fd) => {
              var buffer = new Buffer(stats.size);
	            read(fd, buffer, 0, buffer.length, null, (error, bytesRead, buffer) => {
                var data = buffer.toString("utf8", 0, buffer.length);
                close(fd);
    	          resolve(JSON.parse(data));
                });
            });
          });
        }
      });
    });
  };
    

//update the version based off the args parsed from parseArgs
export var bumpVersion = (data, newversion, done) => {
  return new Promise((resolve, reject) => {
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

  export var commitToLocalGit = (message, done) => {
    return new Promise((resolve, reject) => {
      console.log(`===newest version :: ${message}===`);
      let command = `git pull && git commit package.json`;
  	  if (shell.exec(command).code !== 0) {
  	    reject(Error("Error: failed to commit to local git repo"));
  	  }
   	  resolve(true);
    });
  };

  export var addGitTag = (version, message, done) => {
    return new Promise((resolve, reject) => {
      let command = `git tag -a v${version}`;
      shell.exec(command).output;
      resolve(`v${version}`);
    });
  };

  export var pushToRemote = (remote, user, pass, done) => {
    return new Promise((resolve, reject) => {
      let command = `git push --follow-tags`;
  	  if (shell.exec(command).code !== 0) {
  	    shell.echo('Error: Git commit failed');
  	    shell.exit(1);
  	    reject(false);
  	  }
   	  resolve(true);
    });
  };
