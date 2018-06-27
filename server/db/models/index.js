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

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Character,
  Checkpoint,
  Item,
  Raid,
  Drop,
};
