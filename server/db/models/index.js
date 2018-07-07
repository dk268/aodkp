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
Checkpoint.hasMany(Drop);
Drop.belongsTo(Character);
Character.hasMany(Drop);
Drop.belongsTo(Item);
Item.hasMany(Drop);

module.exports = {
  User,
  Character,
  Checkpoint,
  Item,
  Raid,
  Drop,
};
