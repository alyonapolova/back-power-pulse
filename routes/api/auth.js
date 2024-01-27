const express = require("express");
const authCtrl = require("../../controllers/auth");
const authenticate = require("../../middlewares/authenticate");
const parser = require("../../middlewares/cloudinary");
const validateBody = require("../../middlewares/validateBody");
const validateFormats = require("../../middlewares/validateFormats");
const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/register", validateBody(registerSchema), authCtrl.register);

router.get("/verify/:verificationToken", authCtrl.verifyEmail);
router.post("/verify", authCtrl.resendEmail);

router.post("/login", validateBody(loginSchema), authCtrl.login);
router.get("/current", authenticate, authCtrl.current);
router.patch(
  "/update",
  authenticate,
  validateBody(updateSchema),
  authCtrl.update
);

router.put(
  "/upload",
  authenticate,
  validateFormats(parser.single("image")),
  authCtrl.uploadAvatar
);

router.delete("/logout", authenticate, authCtrl.logout);

module.exports = router;
