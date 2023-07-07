const controller = {};
let Product = require("../model/Product");
let SalesProduct = require("../model/SalesProduct");
let sequelize = require("../model/db");

//Valido tablas
sequelize.sync();

controller.list = async (req, res) => {
  const sales = await SalesProduct.findAll()
    .then(function (data) {
      return data;
    })
    .catch((err) => {
      return err;
    });
  res.json({ success: true, data: sales });
};

controller.store = async (req, res) => {
  const { product_id, quantity } = req.body;
  
if (quantity && product_id) {
    const product = await Product.findOne({
        where: { id: product_id }
      })
        .then(function (data) {
          return data;
        })
        .catch((error) => {
          return error;
        });
  if (product !== null ) {
      if (quantity <= product.stock) {
        const data = await SalesProduct.create({
          product_id: product_id,
          quantity: quantity,
          value: product.price * quantity,
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
        Product.update(
          {
            stock: product.stock - quantity,
            date_of_last_sale: Date.now(),
          },
          {
            where: { id: product.id },
          }
        );
      }else{
        res.status(200).json({
            success: false,
            message: "No hay suficiente stock",
            data: [],
          });
      }
    } else {
      res.status(404).json({
        success: false,
        message: "No se encontro Producto",
        data: [],
      });
    }
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

  if ((id, name && reference && price && weight && stock && category)) {
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
