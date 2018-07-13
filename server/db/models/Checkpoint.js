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
    associatedRaid: {
      type: Sequelize.VIRTUAL,
      defaultValue: {},
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
      afterFind: checkpoint => {
        checkpoint.associatedRaid = checkpoint.raid ? checkpoint.raid : "not found";
        checkpoint.associatedCharacters = checkpoint.characters
          ? checkpoint.characters
          : "not found";
        checkpoint.associatedDrops = checkpoint.drops ? checkpoint.drops : "not found";
      },
    },
  }
);

module.exports = Checkpoint;
