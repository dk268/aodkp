const db = require("./database.js");
const Sequelize = require("sequelize");

const Drop = db.define("drop", {
  characterId: Sequelize.STRING,
});

module.exports = Drop;
