const User = require("./User");
const Character = require("./Character");
const Checkpoint = require("./Checkpoint");
const Item = require("./Item");
const Raid = require("./Raid");
const Drop = require("./Drop"); //join table; characterId is added column

Character.belongsToMany(Checkpoint, { through: "character_checkpoint" });
Checkpoint.belongsToMany(Character, { through: "character_checkpoint" });
Character.belongsToMany(Item, { through: "character_item" });
Item.belongsToMany(Character, { through: "character_item" });
Checkpoint.belongsTo(Raid);
Raid.hasMany(Checkpoint);
Item.belongsToMany(Checkpoint, { through: "drops" });
Checkpoint.belongsToMany(Item, { through: "drops" });

module.exports = {
  User,
  Character,
  Checkpoint,
  Item,
  Raid,
  Drop,
};
