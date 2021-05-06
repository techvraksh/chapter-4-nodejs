const express = require("express");
const app = express();

app.use("/users", (req, res, next) => {
  console.log("second middleware");
  res.send("<h1>hello everyone</h1>");
});

app.use("/", (req, res, next) => {
  console.log("first middleware");
  // next();
  res.send("<h1>this is home route</h1>");
});
app.listen(3000);
