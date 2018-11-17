const db = require("../db");
const Sequelize = require("sequelize");

const Checkpoint = db.define(
  "checkpoint",
  {
    checkpointName: Sequelize.STRING,
    checkpointDKP: {
      type: Sequelize.INTEGER,
      defaultValue: 10,
    },
    raidName: {
      type: Sequelize.VIRTUAL,
    },
  },
  {
    hooks: {
      afterFind: checkpoint =>
        (checkpoint.raidName = checkpoint.raid ? checkpoint.raid.raidName : "not found"),
    },
  }
);

module.exports = Checkpoint;
