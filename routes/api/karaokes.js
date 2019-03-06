const express = require("express");
const router = express.Router();
const Karaoke = require("../../models/Karaoke");
const ytdl = require('ytdl-core');
const fs = require('fs');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const YD = new YoutubeMp3Downloader({
    "ffmpegPath": "ffmpeg",        // Where is the FFmpeg binary located?
    "outputPath": "./karaoke",    // Where should the downloaded and encoded files be stored?
    "youtubeVideoQuality": "highest",       // What video quality should be used?
    "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
    "progressTimeout": 2000                 // How long should be the interval of the progress reports
});
const sox = require('sox-stream');

//@route   GET api/karaoke/all
//@desc    Test karaoke route
//@access  Public
router.get("/all", (req, res) => {
    Karaoke.find({}).then(karaokes => {
        if (!karaokes) {
            errors.votes = "No karaoke exists";
            return res.status(400).json(errors);
        } else {
            res.json(karaokes);
        }
    });
});

//@route   POST api/karaoke/create
//@desc    create karaoke host
//@access  Public
router.post("/create", (req, res) => {
    const roomid = req.body.roomid;
    Karaoke.find({roomid:roomid}).then(karaokes => {
        console.log(karaokes)
        if (karaokes.length === 0) {
            const newKaraoke = new Karaoke({
                current: "placeholder",
                queue: [],
                roomid: req.body.roomid
              });
              newKaraoke.save().then(karaoke => {
                res.json(karaoke);
              });
        } else {
            res.json(karaokes);
        }
    });
    
});

//@route   POST api/karaoke/order
//@desc    order karaoke host
//@access  Public
router.post("/order", (req, res) => {
    const roomid = req.body.roomid;
    const order = req.body.order;
    const link = order.link;
    const path = "karaoke/" + link + ".mp3"
    if (!fs.existsSync(path)){
        YD.download(link,link+".mp3");
        YD.on("finished", function(err, data) {
            Karaoke.findOne({roomid:roomid}).then(karaoke => {
                if (karaoke.current === "placeholder"){
                    karaoke.current = order
                }else{
                    karaoke.queue.push( order )
                }
                karaoke.save()
                .then(karaoke => res.json(karaoke))
                .catch(err=>{
                    res.json({
                        success: false,
                        err
                    });
                })
            });
        });
        YD.on("error", function(err, data) {
            console.log(err)
        });
    }else{
        Karaoke.findOne({roomid:roomid}).then(karaoke => {
            if (karaoke.current === "placeholder"){
                karaoke.current=order
            }else{
                karaoke.queue.push(order)
            }
            karaoke.save()
            .then(karaoke => res.json(karaoke))
            .catch(err=>{
                res.json({
                    success: false,
                    err
                });
            })
        });
    }
    
    
});



//@route   GET api/karaoke/order
//@desc    order karaoke host
//@access  Public
router.get("/audio/:url", (req, res) => {
    const url = req.params.url
    const path = "karaoke/" + url + ".mp3"
    if (fs.existsSync(path)){
        const transform = sox({
            soxPath : "sox/sox",
            input: { type: 'mp3' },
            output: { type: 'mp3' },
            effects: 'oops'
        })
        fs.createReadStream(path)
        // .pipe( transform ).on("error",e=>{
        //     console.log(e)
        // })
        .pipe(res);
    }else{
        res.send({failed:true})
    }
});

//@route   POST api/karaoke/room
//@desc    room karaoke host
//@access  Public
router.post("/room", (req, res) => {
    const roomid = req.body.roomid;
    Karaoke.findOne({roomid}).then(karaoke => {
        if (!karaoke) {
            errors.votes = "No karaoke exists";
            return res.status(400).json(errors);
        } else {
            res.json(karaoke);
        }
    }).catch(err=>{
        console.log(err)
    });
});

//@route   POST api/karaoke/next
//@desc    next karaoke host
//@access  Public
router.post("/next", (req, res) => {
    const roomid = req.body.roomid;
    Karaoke.findOne({roomid:roomid}).then(karaoke => {
        if (karaoke.queue.length > 0){
            karaoke.current = karaoke.queue[0]
            karaoke.queue.shift()
        }else{
            karaoke.current = "placeholder"
        }
        karaoke.save()
        .then(karaoke => res.json(karaoke))
        .catch(err=>{
            res.json({
                success: false,
                err
          });
        })
      });
});

//@route   DELETE api/karaoke
//@desc    delete karaoke host
//@access  Public
router.delete("/", (req, res) => {
  let errors = {};
  const roomid = req.body.roomid;
  Karaoke.findOneAndRemove({roomid:roomid}).then(() => {
    res.json({
      success: true
    });
  });
})


//@route   DELETE api/karaoke/all
//@desc    delete karaoke host
//@access  Public
router.delete("/all",  (req, res) => {
    Karaoke.find().then(async karaokes => {
        console.log(karaokes)
        await Promise.all(karaokes.forEach(karaoke =>{
            karaoke.remove()
        }))
        res.send("done")
    });
  })
module.exports = router;
