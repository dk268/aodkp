const db = require("../db");
const Sequelize = require("sequelize");

const Drop = db.define(
  "drop",
  {
    dropName: {
      type: Sequelize.STRING,
      defaultValue: "Sword of a Million Truths",
    },
    dropDKPCost: { type: Sequelize.INTEGER, defaultValue: 0 },
    associatedCharacters: { type: Sequelize.VIRTUAL, defaultValue: [] },
    associatedDrops: { type: Sequelize.VIRTUAL, defaultValue: [] },
    associatedCheckpoints: { type: Sequelize.VIRTUAL, defaultValue: [] },
  },
  {
    hooks: {
      afterFind: drop => {
        drop.associatedCheckpoints = drop.checkpoints ? drop.checkpoints : "not found";
        drop.associatedCharacters = drop.characters ? drop.characters : "not found";
        drop.associatedItems = drop.items ? drop.items : "not found";
      },
    },
  }
);

module.exports = Drop;
