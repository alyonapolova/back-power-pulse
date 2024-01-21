const controllerWrapper = require("../helpers/controllerWrapper");
const HttpError = require("../helpers/httpError");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

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
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
};
