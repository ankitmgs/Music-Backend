const router = require("express").Router();
const multer = require("multer");

const filestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({ storage: filestorage });

router.post("/uploadfile", uploadFile.single("myfile"), (req, res) => {
  console.log(req.body);
  res.json({ message: "File upload success" });
});


const uploadThumbnail = multer({ storage: filestorage });

router.post("/uploadthumbnail", uploadThumbnail.single("myfile"), (req, res) => {
  console.log(req.body);
  res.json({ message: "Thumbnail upload success" });
});


const uploadArtistAvatar = multer({ storage: filestorage });

router.post("/uploadartistavatar", uploadArtistAvatar.single("myfile"), (req, res) => {
  console.log(req.body);
  res.json({ message: "Avatar upload success" });
});


module.exports = router;
