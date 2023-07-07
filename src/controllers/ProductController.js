const controller = {};
let Product = require("../model/Product");
let SalesProduct = require("../model/SalesProduct");
let sequelize = require("../model/db");

//Valido tablas
sequelize.sync();

controller.list = async (req, res) => {
  const products = await Product.findAll()
    .then(function (data) {
      return data;
    })
    .catch((err) => {
      return err;
    });
  res.json({ success: true, data: products });
};

controller.store = async (req, res) => {
  const { name, reference, price, weight, stock, category } = req.body;
  const currentTime = Date.now();
  const date = new Date(currentTime);
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;

  if (name && reference && price && weight && stock && category) {
    const data = await Product.create({
      name: name,
      reference: reference,
      price: price,
      weight: weight,
      stock: stock,
      category: category,
      created_at: formattedDate,
    })
      .then(function (data) {
        return data;
      })
      .catch((error) => {
        return error;
      });
    res.status(201).json({
      success: true,
      message: "Guardo exitosamente",
      data: data,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Todos los campos son requeridos",
      data: [],
    });
  }
};

controller.view = async (req, res) => {
  const { id } = req.params;
  const data = await Product.findAll({
    where: { id: id },
  })
    .then(function (data) {
      return data;
    })
    .catch((error) => {
      return error;
    });
  res.json({ success: true, data: data });
};

controller.update = async (req, res) => {
  const { id, name, reference, price, weight, stock, category } = req.body;

  if (id, name && reference && price && weight && stock && category) {
    const data = await Product.update(
      {
        name: name,
        reference: reference,
        price: price,
        weight: weight,
        stock: stock,
        category: category,
      },
      {
        where: { id: id },
      }
    )
      .then(function (data) {
        return data;
      })
      .catch((error) => {
        return error;
      });
    res.status(200).json({
      success: true,
      message: "Se actualizo exitosamente",
      data: data,
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Todos los campos son requeridos",
      data: [],
    });
  }
};

controller.delete = async (req, res) => {
  const { id } = req.params;
  const del = await Product.destroy({
    where: { id: id },
  });
  res.json({
    success: true,
    deleted: del,
    message: "Se elimino correctamente",
  });
};

module.exports = controller;
