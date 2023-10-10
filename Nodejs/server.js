/* Way to create a simple http server with routing ability added as well */

const http = require("http");
const url = require("url")
const fs = require("fs");

//Reading data from data.json file synchronously. Since data is being read only once hence done synchronously.
const data = fs.readFileSync("./data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((request, response) => {
    const {query, pathname} = url.parse(request.url, true);

    if(pathname == "/" || pathname == "/index") {
        response.end("Hello this is index page");
    } 
    //returns the data in data.json as result to call to
    else if(pathname == "/data") {
        response.writeHead(200, {"Content-type" : "application/json"});
        response.end(data);
    } else if(pathname == "/product") {
        console.log(query);
        response.writeHead(200, {"Content-type" : "application/json"});
        response.end(JSON.stringify(dataObj[query.id]));
    } else {
        response.end("Page not found");
    }
})

server.listen(8000, "127.0.0.1", () => {
    console.log("Server is up and running");
})