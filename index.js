// TODO: Initialize variables (set port variable, and import http, httpStatus, fs, path modules)

// Import resources for API
const port = 8000;
const resources = require("./models/resources");
const http = require("http");
const fs = require("fs");
const path = require("path");
const httpStatus = require("http-status-codes");

// Create error handling / response
const sendErrorResponse = (res) => {
  res.writeHead(httpStatus.NOT_FOUND, {
    "Content-Type": "text/html",
  });
  // TODO: Implement res.end with error message in h1 tags with text "Resource not found"
  let responseMessage = "<h1>Resource not found.</h1>";
  res.end(responseMessage);
};


// Create Web Server
const server = http.createServer(function (req, res) {
  // Implement healthcheck URL at /healthcheck
  if (req.url === "/healthcheck") {
    // TODO: Implement healthcheck code here
    res.writeHead(httpStatus.OK, {
      "Content-Type": "text/html",
    });
    // TODO: Implement res.end with error message in h1 tags with text "Resource not found"
    let healthMessage = "<h1>Server is running.</h1>";
    res.end(healthMessage);
  }

  // Implement static file system and serve /views/index.html
  // ** OPTIONAL: Setup dynamic reading and serving of other static files (Hint: see lesson 6.1 Wexxler)
  else if (req.url === "/views/index.html") {
    fs.readFile(path.join(__dirname, "views", "index.html"), (error, data) => {
      if (error) {
        sendErrorResponse(res);
      }
      // TODO: Implement res.writehead to send header information - 200 response content type html
      // TODO: Implement res.end to send data
      res.writeHead(httpStatus.OK, {
        'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
    });
  }

  // Add a basic api to serve resources.js
  else if (req.url == "/api/resources") {
    // TODO: Implement res.writeHead to send httpStatus.OK with JSON content type
    res.writeHead(httpStatus.OK, {
      'Content-Type': 'application/json'
  });
    // TODO: Implement res.end and use JSON.stringify to return resources
    console.log(`Name: ${getJSONString(resources[0].name)}`);
    console.log(`Provider: ${getJSONString(resources[0].provider)}`);
    console.log(`URL: ${getJSONString(resources[0].url)}`);

    console.log(`Name: ${getJSONString(resources[1].name)}`);
    console.log(`Provider: ${getJSONString(resources[1].provider)}`);
    console.log(`URL: ${getJSONString(resources[1].url)}`);

    console.log(`Name: ${getJSONString(resources[2].name)}`);
    console.log(`Provider: ${getJSONString(resources[2].provider)}`);
    console.log(`URL: ${getJSONString(resources[2].url)}`);

    console.log(`Name: ${getJSONString(resources[3].name)}`);
    console.log(`Provider: ${getJSONString(resources[3].provider)}`);
    console.log(`URL: ${getJSONString(resources[3].url)}`);

    console.log(`Name: ${getJSONString(resources[4].name)}`);
    console.log(`Provider: ${getJSONString(resources[4].provider)}`);
    console.log(`URL: ${getJSONString(resources[4].url)}`);
    res.end();
  } else {
    sendErrorResponse(res);
  }
});

const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
}

server.listen(port); // listen for any incoming requests;

console.log(`The server has started and is listening on port number: ${port}`);
