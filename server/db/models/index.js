const User = require("./User");
const Character = require("./Character");
const Checkpoint = require("./Checkpoint");
const Item = require("./Item");
const Raid = require("./Raid");
const Drop = require("./Drop");

Character.belongsToMany(Checkpoint, { through: "character_checkpoint" });
Checkpoint.belongsToMany(Character, { through: "character_checkpoint" });
Character.belongsToMany(Item, { through: "character_item" });
Item.belongsToMany(Character, { through: "character_item" });
Checkpoint.belongsTo(Raid);
Raid.hasMany(Checkpoint);
Drop.belongsTo(Checkpoint);
Drop.belongsTo(Character);
Drop.belongsTo(Item);

module.exports = {
  User,
  Character,
  Checkpoint,
  Item,
  Raid,
  Drop,
};
