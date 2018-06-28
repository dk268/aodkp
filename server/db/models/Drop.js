const db = require("../db");
const Sequelize = require("sequelize");

const Drop = db.define("drop", {
  characterId: Sequelize.STRING,
});

module.exports = Drop;
