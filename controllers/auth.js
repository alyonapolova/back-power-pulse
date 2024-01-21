const controllerWrapper = require("../helpers/controllerWrapper");
const HttpError = require("../helpers/httpError");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BMR = require("../helpers/dailyCalories");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      message: "User was created successfully",
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  const loginUser = await User.findByIdAndUpdate(
    user._id,
    { token },
    { new: true, select: "-createdAt -updatedAt -password" }
  );

  res.status(201).json({
    user: {
      loginUser,
    },
  });
};

const current = async (req, res) => {
  res.status(201).json({ user: req.user });
};

const update = async (req, res) => {
  const { _id } = req.user;
  const { ...data } = req.body;

  const user = await User.findByIdAndUpdate(_id, data, { new: true });

  if (!user) {
    throw new HttpError(404, `User by ID: "${_id}" not found`);
  }

  user.dailyCalories = BMR(
    user.sex,
    user.currentWeight,
    user.height,
    user.birthday,
    user.levelActivity
  );

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { dailyCalories: user.dailyCalories },
    {
      new: true,
      select: "-createdAt -updatedAt -password -verify -verificationToken",
    }
  );

  res.status(200).json(updatedUser);
};

const uploadAvatar = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = req.file.path;

  await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  res.json({ avatarURL: avatarURL });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  current: controllerWrapper(current),
  update: controllerWrapper(update),
  uploadAvatar: controllerWrapper(uploadAvatar),
};
