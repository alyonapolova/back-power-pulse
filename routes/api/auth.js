const express = require("express");
const authCtrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", authCtrl.register);

module.exports = router;
