const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const SongLyrics = require("../../models/SongLyrics");

router.get("/", (req, res) => {
  //Fetch all items from the database
  SongLyrics.find()
    .sort({ date: -1 })
    .then(songs => res.json(songs));
});

// Add item
router.post("/saveSongLyrics", (req, res) => {
  const { songName, artistName, songImageArt, songLyrics } = req.body;
  console.log("SaveSongLyrics Body");
  console.log(req.body);

  const newRecord = new SongLyrics({
    songName,
    artistName,
    songImageArt,
    songLyrics
  });

  newRecord
    .save()
    .then(record => res.json(record))
    .catch(err => res.json(err));
});

// Delete item
router.delete("/:id", auth, (req, res) => {
  SongLyrics.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
