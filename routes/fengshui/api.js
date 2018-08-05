const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");
const parse5 = require("parse5");
const circularJSON = require("circular-json");

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

//万年历api
router.post("/birth", (req, res) => {
  //http://www.zhycw.com/pp/bz.aspx
  const URL = "http://www.zhycw.com/pp/bz.aspx";
  const { year, month, day, hour, min, gender } = req.body;
  const Parameters = {
    area: "",
    jd1: "120",
    jd2: "0",
    mode8: "1",
    dyp: "1",
    inp: "1",
    cgp: "1",
    ssp: "1",
    nyp: "1",
    shenshap: "1",
    csp: "1",
    mgp: "1",
    qyp: "1",
    xyp: "1",
    zsp: "1",
    jyssp: "1",
    mode: "pmode8",
    submit: "开始排盘"
  };
  if (year && month && day && hour && min && gender) {
    request.post(
      {
        url: URL,
        form: {
          y: year,
          m: month,
          d: day,
          h: hour,
          min,
          sex: gender,
          ...Parameters
        }
      },
      function(error, response, body) {
        //to be continued
        //const parsed = parse5.parse(response.toJSON().body);
        //console.log(body.indexOf("<table", 548));
        //console.log(body.indexOf("/table>", 548));
        //console.log(body.substring(736, 4582));
        const parsed = parse5.parse(body);
        //console.log(circularJSON.stringify(parsed));
        fs.writeFile("test.html", body);
        //res.send(JSON.parse(circularJSON.stringify(parsed)));
        res.send(body);
      }
    );
  } else {
    res.send({
      error: "Parameters required"
    });
  }
});

module.exports = router;
