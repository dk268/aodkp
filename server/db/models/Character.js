const db = require('./database.js')
const Sequelize = require('sequelize')

const Character = db.define('character', {
  characterName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dkp: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  isAlt: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  class: {
    type: Sequelize.STRING,
    defaultValue: null
  }
})

Character.prototype.spendDKP = async function(num) {
  this.dkp = this.dkp - num
  await this.save()
}

Character.prototype.earnDKP = async function(num) {
  this.dkp = this.dkp + num
  await this.save()
}

module.exports = Character
