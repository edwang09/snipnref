const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const snippets = require("./routes/api/snippets");
const references = require("./routes/api/references");

const app = express();

const mongoURI = require("./config/keys").mongoURI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongo DB connected"))
  .catch(err => console.log(err));

//add body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport
app.use(passport.initialize());

require("./config/passport")(passport);

app.use("/api/users", users);
app.use("/api/snippets", snippets);
app.use("/api/references", references);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("my-app/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "my-app", "build", "index.html"));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server running on port ${port}`));
