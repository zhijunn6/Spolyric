const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SongLyricSchema = new Schema({
  songName: {
    type: String,
    required: true
  },
  artistName: {
    type: String,
    required: true
  },
  songLyrics: {
    type: String,
    required: true
  },
  songImageArt: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// 'Lyrics' is the model name for accessing the schema
module.exports = SongLyrics = mongoose.model("songLyrics", SongLyricSchema);
