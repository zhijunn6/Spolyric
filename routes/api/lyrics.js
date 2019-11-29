const express = require("express");
const axios = require("axios");
const router = express.Router();

const apikey =
  "0ADozHTiy1E1xRSK47KbtZaGQfJKh3G10pQTYAwyVBJDUrWFB3l2ME7xrGRT9bKI";

const SongLyrics = require("../../models/SongLyrics");

router.post("/", (req, res) => {
  const { name, artistName } = req.body;
  console.log("Body");
  console.log(req.body);

  const querystr = `https://orion.apiseeds.com/api/music/lyric/${artistName}/${name}?apikey=${apikey}`;

  axios
    .get(querystr)
    .then(response => {
      res.status(200).json(response.data.result.track.text);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

module.exports = router;
