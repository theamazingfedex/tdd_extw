import {exec} from "child-process-promise";

  export var commitToLocalGit = (message) => {
    return new Promise((resolve, reject) => {
      console.log(`===newest version :: ${message}===`);
	let command = `git pull && git commit package.json`;
	exec(command)
	    .then( () => resolve(true))
	    .catch( err => reject(err));
    });
  };

  export var addGitTag = (version) => {
    return new Promise((resolve, reject) => {
      let command = `git tag -a v${version}`;
	exec(command)
	    .then( () => resolve(`v${version}`))
	    .catch( err => reject(err) );
    });
  };

  export var pushToRemote = () => {
    return new Promise((resolve, reject) => {
      let command = `git push --follow-tags`;
	exec(command)
	    .then( () => resolve(true) )
	    .catch( err => reject(err) );
    });
  };
