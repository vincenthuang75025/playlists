const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  googleid: String,
  url: String,
  Name: String,
}, {strict: false});

// compile model from schema
module.exports = mongoose.model("song", SongSchema);
