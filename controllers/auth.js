const controllerWrapper = require("../helpers/controllerWrapper");
const HttpError = require("../helpers/httpError");
const { registerSchema, User } = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    const [{ path }] = error.details;
    throw HttpError(400, `Missing required ${path} field`);
  }

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

module.exports = {
  register: controllerWrapper(register),
};
