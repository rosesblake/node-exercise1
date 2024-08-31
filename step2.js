// ## **Step 2**

// Copy over your ***step1.js*** code to ***step2.js***

// Add a new function, ***webCat***. This should take a URL and, using [axios](https://github.com/axios/axios#installing), should read the content of that URL and print it to the console.

// Modify the code that invoked ***cat*** so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either ***cat*** or ***webCat***, respectively.

const fs = require("fs");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}:\n ${err}`);
      process.exit(1);
    }
    console.log(`Data: ${data}`);
  });
}

async function webCat(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.log(`Error fetching ${url}:\n ${err}`);
    process.exit(1);
  }
}

const filePath = process.argv[2];

if (filePath.startsWith("http")) {
  webCat(filePath);
} else cat(filePath);
