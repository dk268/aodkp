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
  class: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
});

Character.afterUpdate = function(instance, options) {
  if (instance.dkp > 800) instance.dkp = 800;
  if (instance.dkp > 120 && instance.isAlt) instance.dkp = 120;
};

Character.prototype.spendDKP = async function(num) {
  this.dkp = this.dkp - num;
  await this.save();
};

Character.prototype.earnDKP = async function(num) {
  this.dkp = this.dkp + num;
  await this.save();
};

module.exports = Character;
