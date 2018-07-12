const db = require("../db");
const Sequelize = require("sequelize");

const Character = db.define("character", {
  characterName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dkp: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  isAlt: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  altOf: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  class: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  totalDKPSpent: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  totalDKPEarned: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  overflowDKP: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

Character.afterUpdate = function(instance, options) {
  if (instance.dkp > 800) instance.dkp = 800;
  if (instance.dkp > 120 && instance.isAlt) instance.dkp = 120;
};

Character.prototype.spendDKP = async function(num) {
  this.dkp = this.dkp - num;
  this.totalDKPSpent = this.totalDKPSpent + num;
  await this.save();
};

Character.prototype.earnDKP = async function(num) {
  this.dkp = this.dkp + num;
  this.totalDKPEarned = this.totalDKPEarned + num;
  await this.save();
};

module.exports = Character;
