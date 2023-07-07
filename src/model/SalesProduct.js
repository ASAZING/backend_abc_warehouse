const Sequelize = require("sequelize");
const database = require("./db");

const Product = require("./Product");

const SalesProduct = database.define(
  "sales_product",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
      allowNull: false,
    },
    quantity: { type: Sequelize.INTEGER, allowNull: false },
    value: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    timestamps: true,
  }
);

SalesProduct.belongsTo(Product);

module.exports = SalesProduct;
