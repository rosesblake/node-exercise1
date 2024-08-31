// In ***step1.js***, write a function, ***cat***.

// It should take one argument, ***path***, and it should read the file with that path, and print the contents of that file.

const fs = require("fs");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}:\n ${err}`);
      process.exit(1);
    }
    console.log(`Data: ${data}`);
  });
}

const filePath = process.argv[2];
cat(filePath);
