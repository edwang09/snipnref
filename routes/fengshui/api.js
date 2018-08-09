const express = require("express");
const router = express.Router();
const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
const circularJSON = require("circular-json");
const extractbasics = require("./functions/extractbasics");
const extractqianzao = require("./functions/extractqianzao");
const extracttiangan = require("./functions/extracttiangan");
const extractdayun = require("./functions/extractdayun");

//万年历api
router.post("/calendar", (req, res) => {
  const filename = `./routes/fengshui/past/${req.body.date}.json`;
  if (fs.existsSync(filename)) {
    console.log("read file");
    var obj = JSON.parse(fs.readFileSync(filename));
    res.send(obj);
  } else {
    console.log("request api");
    const juheURL = "http://v.juhe.cn/calendar/day";
    if (req.body.date && req.body.secret) {
      request.post(
        {
          url: juheURL,
          form: {
            date: req.body.date,
            key: req.body.secret
          }
        },
        function(error, response, body) {
          console.log(body);
          fs.writeFile(filename, JSON.stringify(JSON.parse(body).result));
          res.send(JSON.parse(body).result);
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
  const {
    birthplace,
    longitute1,
    longitute2,
    year,
    month,
    day,
    hour,
    min,
    gender
  } = req.body;
  const Parameters = {
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
  if (
    birthplace &&
    longitute1 &&
    longitute2 &&
    year &&
    month &&
    day &&
    hour &&
    min &&
    gender
  ) {
    request.post(
      {
        url: URL,
        form: {
          area: birthplace,
          jd1: longitute1,
          jd2: longitute2,
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
        const $ = cheerio.load(
          body
            .toString()
            .replace(/<br><br>/g, " twoline ")
            .replace(/<br>/g, " newline ")
        );
        const contents = $("#container")
          .text()
          .replace(/\s\s+/g, " ")
          .replace(/[\[\]:：＝]/g, " ")
          .split(/\s+/g);
        extractdayun;
        const basic = extractbasics(contents);
        const qianzao = extractqianzao(contents);
        const tiangan = extracttiangan(contents);
        const dayun = extractdayun(contents);
        const result = {
          ...basic,
          ...qianzao,
          tiangan,
          ...dayun
        };
        res.send(JSON.parse(JSON.stringify(result)));
      }
    );
  } else {
    res.send({
      error: "Parameters required"
    });
  }
});

module.exports = router;
