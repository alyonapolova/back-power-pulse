const controllerWrapper = require("../helpers/controllerWrapper");
const HttpError = require("../helpers/httpError");
const { Product } = require("../models/product");

const getAllProducts = async (req, res) => {
  const data = await Product.find();
  res.status(200).json({ data });
};

module.exports = { getAllProducts: controllerWrapper(getAllProducts) };
