const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

require("dotenv").config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "avatar_img",
    allowed_formats: ["jpeg", "png", "jpg"],
    transformation: [
      { width: 250, height: 250 },
      { radius: "max" },
      { fetch_format: "auto" },
    ],
  },
});

const parser = multer({ storage: storage });

module.exports = parser;
