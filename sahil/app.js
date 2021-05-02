const http = require("http");
// const fs = require("fs");
function requestHandler(req, res) {
  console.log("Server is Running");
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1> Welcome to Nodejs Tutorial </h1>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="username"><button type="ssubmit">Send</button></form></body>'
    );
    return res.end();
  }
  if (req.url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<h1>Users</h1>");
    res.write("<ol>");
    res.write("<li>User 1</li>");
    res.write("<li>User 2</li>");
    res.write("<li>User 3</li>");
    res.write("<li>User 4</li>");
    res.write("</ol>");
    return res.end();
  }
  if (req.url === "/create-user") {
    console.log("enter this route");
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      console.log(message);
    });
    res.StatusCode = 302;
    res.setHeader("location", "/");
    res.end();
  }
}
server = http.createServer(requestHandler);
server.listen(3000);
