/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
// const crypto = require("crypto-random-string");
const crypto2 = require("crypto");

// import models so we can interact with the database
const User = require("./models/user");
const Attribute = require("./models/attribute");
const Song = require("./models/song");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();


router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});


// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.get("/attributes", (req, res) => {
  Attribute.find({ googleid: req.query.googleid }).then((attr) => res.send(attr));
});

router.post("/findsongs", (req, res) => {
  Song.find(req.body).then((songs) => res.send(songs));
});

router.post("/newattribute", (req, res) => {
  const newAttr = new Attribute({
    attribute: req.body.attribute,
    googleid: req.body.googleid,
    type: req.body.type,
  });
  newAttr.save().then((newAttr) => res.send(newAttr));
});

router.get("/randomsong", (req, res) => {
  Song.aggregate([{$sample: {size: 1}}, {$match: {googleid: req.query.googleid}}]).then((song) => res.send(song));
})

router.get("/findsong", (req, res) => {
  Song.findOne({googleid: req.query.googleid, Name: req.query.Name}).then((song) => res.send(song));
})

router.post("/newsong", (req,res) => {
  const newSong = new Song(req.body);
  newSong.save().then((newSong) => res.send(newSong));
})

router.post("/replacesong", (req, res) => {
  const newSong = new Song(req.body.new);
  Song.findByIdAndDelete(req.body.old).then(() => {
      newSong.save().then((newSong) => res.send(newSong));
    }
  );
})

router.get("/finduser", (req, res) => {
  User.findById(req.query.id).then((user) => {
    if (user.publicid) {
      res.send(user);
    }
    else {
      User.findByIdAndUpdate(req.query.id, {publicid: crypto2.randomBytes(16).toString("hex")}).then((user2) => 
        {
          User.findById(req.query.id).then((user3) => res.send(user3));
        }
      );
    }
  })
})

router.post("/getuser", (req, res) => {
  User.findOne({publicid: req.body.publicid}).then((user) => res.send(user));
})

router.post("/makepublicid", (req, res) => {
  User.findByIdAndUpdate(req.body.id, {publicid: req.body.publicid}).then((user) => res.send(user));
})

router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
