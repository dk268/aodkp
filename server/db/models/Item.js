const db = require("../db");
const Sequelize = require("sequelize");

const Item = db.define("item", {
  itemName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  itemLinkUrl: {
    type: Sequelize.STRING,
    defaultValue: `www.rickroll.com`,
  },
  itemSmallImageUrl: {
    type: Sequelize.STRING,
    defaultValue: `www.rickroll.com`,
  },
  itemStatBlockUrl: {
    type: Sequelize.STRING,
    defaultValue: `www.rickroll.com`,
  },
});

module.exports = Item;
