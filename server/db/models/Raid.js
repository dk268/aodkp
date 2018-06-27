const db = require('./database.js')
const Sequelize = require('sequelize')

const Raid = db.define('raid', {
  raidName: Sequelize.STRING,
  raidDate: Sequelize.DATE
})

module.exports = Raid
