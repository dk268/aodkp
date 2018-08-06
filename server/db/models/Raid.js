const db = require("../db");
const Sequelize = require("sequelize");

const Raid = db.define(
  "raid",
  {
    raidName: Sequelize.STRING,
    raidDate: Sequelize.DATE,
    associatedCheckpoints: {
      type: Sequelize.VIRTUAL,
      defaultValue: [],
    },
  },
  {
    hooks: {
      afterFind: raid => {
        raid.associatedCheckpoints = raid.checkpoints ? raid.checkpoints : "not found";
      },
    },
  }
);

module.exports = Raid;
