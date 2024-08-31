// ## **Step 3**

// Copy over your ***step2.js*** code to ***step3.js***.

// Add a feature where, on the command line, you can *optionally* provide an argument to output to a file instead of printing to the console. The argument should look like this: `--out output-filename.txt readfile-or-url`.

// Current features should still work the same:

const fs = require("fs");
const axios = require("axios");

function handleOutput(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", (err) => {
      if (err) {
        console.log(`Couldn't write ${out}:\n  ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

function cat(path, out) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}:\n  ${err}`);
      process.exit(1);
    }
    handleOutput(data, out);
  });
}

async function webCat(url, out) {
  try {
    const response = await axios.get(url);
    handleOutput(response.data, out);
  } catch (err) {
    console.log(`Error fetching ${url}:\n  ${err}`);
    process.exit(1);
  }
}

// Command-line argument parsing
let path;
let out;

// Check if the first argument is `--out`
if (process.argv[2] === "--out") {
  out = process.argv[3]; // The output file name
  path = process.argv[4]; // The file path or URL
} else {
  path = process.argv[2]; // The file path or URL
}

// Check if the argument is a URL (starts with "http" or "https")
if (path.startsWith("http")) {
  webCat(path, out);
} else {
  cat(path, out);
}
