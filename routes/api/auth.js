const express = require("express");
const authCtrl = require("../../controllers/auth");
const validateBody = require("../../middlewares/validateBody");
const { registerSchema, loginSchema } = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), authCtrl.register);
router.post("/login", validateBody(loginSchema), authCtrl.login);
module.exports = router;
