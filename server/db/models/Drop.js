const db = require('./database.js')
const Sequelize = require('sequelize')

const Drop = db.define('drop', {
  itemId: Sequelize.STRING
})

module.exports = Drop
