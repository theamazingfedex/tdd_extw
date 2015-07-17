  import {writeFile, exists, stat, open, read, close} from "fs";

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

  export var loadFile = (filename) => {
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
	else
	  reject("file does not exist");
      });
    });
  };    
