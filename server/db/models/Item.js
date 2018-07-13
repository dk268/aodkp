const db = require("../db");
const Sequelize = require("sequelize");

const Item = db.define(
  "item",
  {
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
    associatedCharacters: {
      type: Sequelize.VIRTUAL,
      defaultValue: [],
    },
    associatedDrops: {
      type: Sequelize.VIRTUAL,
      defaultValue: [],
    },
  },
  {
    hooks: {
      afterFind: item => {
        if (item) {
          item.associatedCharacters = item.characters ? item.characters : "not found";
          item.associatedDrops = item.drops ? item.drops : "not found";
        }
      },
    },
  }
);

module.exports = Item;
