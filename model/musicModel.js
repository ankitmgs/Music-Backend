const mongoose = require("mongoose");
const genres = [
  "Classical",
  "Folk",
  "Western",
  "Blues",
  "Jazz",
  "Rock",
  "HipHop",
  "Electronic",
  "Pop",
];

const model = new mongoose.Schema({
  title: {
    type: String,
    default: "default title name",
  },
  thumbnail: {
    type: String,
    default: "2Q.jpg",
  },
  musicfile: {
    type: String,
    default: "sample-6s.mp3",
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "artist",
    default: "63c80ea551437146fa088426",
  },
  playCount: {
    type: Number,
    default: Math.floor(Math.random() * 901) + 100,
  },
  composer: {
    type: String,
    default: "default composer name",
  },
  producer: {
    type: String,
    default: "default producer name",
  },
  writer: {
    type: String,
    default: "default writer name",
  },
  genre: {
    type: String,
    default: function () {
      return genres[Math.floor(Math.random() * genres.length)];
    },
  },
  description: {
    type: String,
    default: "default description name",
  },
  contibutor: {
    type: String,
    default: "default contributor name",
  },
  language: {
    type: String,
    default: "default language name",
  },
  copyrightYear: {
    type: String,
    default: 2012,
  },
  copyrightHolder: {
    type: String,
    default: "default copyrightHolder name",
  },
  ISRCcode: {
    type: String,
    default: "default IRSC code",
  },

  Bpm: {
    type: Number,
    default: Math.floor(Math.random() * 60),
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("music", model);
