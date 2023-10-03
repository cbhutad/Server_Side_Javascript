# NodeJs

### Core Modules

Module is javascript file which contains functions, objects or variables even which we can reuse in other javascript codes to simplify development. NodeJs being a Javascript runtime based on google v8 engine, provides us with some core modules inbuilt for various tasks such file processing, operating systems stuff etc.

Checkout the following codes to read and write data from a given file on the system using module known as `fs`.

``` Javascript

const fs = require(`fs`);

// Reading from a file synchronously
const textRead = fs.readFileSync(`input.txt`, `utf-8`);
console.log(textRead);

// Writing to a file synchronously
const writeText = `This shit hard!!!`;
fs.writeFileSync(`output.txt`, writeText);

```
