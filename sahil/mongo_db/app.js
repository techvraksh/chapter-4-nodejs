//importing express to handle the request made at the client side
var express = require("express");
var expressSession = require("express-session");
var app = express();
var port = 3000;
//body-parser (middleware to covert data to jsondata)
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  expressSession({ secret: "sahil", saveUninitialized: false, resave: false })
);
//connecting to mongodb
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/node-demo1", {
  useNewUrlParser: true,
});
//creating schema
var nameSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  telno: { type: String, required: true },
  email: { type: String, required: true },
  comments: { type: String, required: true },
  // checkintime: { type: String, required: true },
  checkouttime: { type: String, required: true },
});
//initializing schema
var User = mongoose.model("User", nameSchema);
//get request(reading html file)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.htm");
});
function time1() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = date + " " + hours + ":" + minutes + " " + ampm;
  return strTime;
}
//creating enteries in database
app.post("/addname", (req, res) => {
  var name = req.body.Name;
  var email = req.body.email;
  var telno = req.body.telno;
  var checkouttime = time1();
  var myData = new User({
    email,
    Name: name,
    telno,
    checkouttime,
    comments: "hello",
  });

  myData
    .save()
    .then((item) => {
      res.send("<h1>Name saved to database</h1>");
    })
    .catch((err) => {
      res.status(400).send("Unable to save to database");
    });
});
//creating localhost port to run it by node server
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
