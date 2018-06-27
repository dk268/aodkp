const db = require("./database.js");
const Sequelize = require("sequelize");

const Item = db.define("item", {
  itemName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  itemDKPCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
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
