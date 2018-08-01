const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");

//万年历api
router.post("/calendar", (req, res) => {
  const filename = `./routes/fengshui/past/${req.body.date}.json`;
  if (fs.existsSync(filename)) {
    var obj = JSON.parse(fs.readFileSync(filename));
    res.send(obj);
  } else {
    const jiuweiurl = "https://open-api.9vdata.com/get_perpetual_calendar";
    if (req.body.date && req.body.secret) {
      request.post(
        {
          url: jiuweiurl,
          form: {
            date: req.body.date,
            secret: req.body.secret
          }
        },
        function(error, response, body) {
          fs.writeFile(filename, body);
          res.send(JSON.parse(body));
        }
      );
    } else {
      res.send({
        error: "Parameters of date and secret required"
      });
    }
  }
});

module.exports = router;
