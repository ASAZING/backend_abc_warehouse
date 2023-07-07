const Sequelize = require("sequelize");
const database = require("./db");

const Product = database.define(
  "products",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    reference: { type: Sequelize.STRING, allowNull: false },
    price: { type: Sequelize.INTEGER, allowNull: false },
    weight: { type: Sequelize.INTEGER, allowNull: false },
    stock: { type: Sequelize.INTEGER, allowNull: false },
    category: { type: Sequelize.STRING, allowNull: false },
    date_of_last_sale: Sequelize.DATE,
    created_at: { type: Sequelize.DATEONLY, allowNull: false },
  },
  {
    timestamps: false,
  }
);

module.exports = Product;
