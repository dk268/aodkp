const db = require("../db");
const Sequelize = require("sequelize");

const Drop = db.define("drop", {
  dropName: {
    type: Sequelize.STRING,
    defaultValue: "Sword of a Million Truths",
  },
  dropDKPCost: { type: Sequelize.INTEGER, defaultValue: 0 },
});

module.exports = Drop;
