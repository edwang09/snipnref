const express = require("express");
const router = express.Router();
const request = require("request");

//万年历api
router.post("/calendar", (req, res) => {
    const jiuweiurl = "https://open-api.9vdata.com/get_perpetual_calendar"
    if (req.body.date && req.body.secret) {
        request.post({
                url: jiuweiurl,
                form: {
                    date: req.body.date,
                    secret: req.body.secret
                }
            },
            function (error, response, body) {
                res.send(JSON.parse(body));
            }
        );
    } else {
        res.send({
            error: "Parameters of date and secret required"
        });
    }
});

module.exports = router;