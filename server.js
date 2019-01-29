const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const snippets = require("./routes/api/snippets");
const references = require("./routes/api/references");
const votes = require("./routes/api/votes");
const fengshui = require("./routes/fengshui/api");

const app = express();

const mongoURI = require("./config/keys").mongoURI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongo DB connected"))
  .catch(err => console.log(err));

//add body parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

//Permissions Control (will be deleted)
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  var allowedOrigins = [
    "http://localhost:4200/",
    "http://localhost:3000/",
    "http://localhost:8080/",
    "https://clientpanelprod-e52bd.firebaseapp.com/",
    "https://www.amethystfs891.com/"
  ];
  var origin = req.headers.origin;
  if (origin && allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    console.log(origin + "allowed")
  }else if ( origin ){
    //res.setHeader("Access-Control-Allow-Origin", origin);
    console.log(origin + "not allowed")
  }
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Requested-With, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//passport
app.use(passport.initialize());

require("./config/passport")(passport);

var request = require("request");
setInterval(async function() {
  await request.get("http://www.yoshio.space");
}, 300000); // every 5 minutes (300000)



app.use("/api/users", users);
app.use("/api/snippets", snippets);
app.use("/api/references", references);
app.use("/api/votes", votes);

//万年历api
app.use("/api/fengshui", fengshui);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("my-app/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "my-app", "build", "index.html"));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server running on port ${port}`));
