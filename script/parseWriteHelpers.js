const {
  Item,
  Raid,
  Drop,
  Character,
  Checkpoint,
} = require("../server/db/models");
const db = require("../server/db");
const Op = db.Op;

const createCheckpointsWithRaid = async (names, raid) => {
  const createdCheckpoints = await Promise.all(
    names.map(checkpointName => Checkpoint.create({ checkpointName }))
  );
  await Promise.all(createdCheckpoints.map(cp => cp.setRaid(raid)));
  return await Checkpoint.findAll({
    where: {
      raidId: raid.id,
    },
  });
};

const constructAttendanceFromCheckpoints = async (checkpointArray, raidObj) => {
  let output = [];
  checkpointArray.forEach(cp => output.push(...raidObj[cp].attendance));
  output = await Promise.all(
    output.map(characterName =>
      Character.findOrCreate({ where: { characterName } })
    )
  );
  await Promise.all(output.map(character => character[0].earnDKP(10)));
  output = [...new Set(output.map(character => character[0].characterName))];
  return output;
};

const writeAttendanceToCheckpoints = async (checkpoints, raid, raidObj) => {
  for (let i = 0; i < checkpoints.length; i++) {
    let currAttendance = await Character.findAll({
      where: {
        characterName: {
          [Op.in]: raidObj[checkpoints[i].checkpointName].attendance,
        },
      },
    });
    await checkpoints[i].addCharacters(currAttendance);
  }
  return await Checkpoint.findAll({
    where: {
      raidId: raid.id,
    },
  });
};

const writeItemsToCheckpointsAndCharacters = async (checkpoints, raidObj) => {
  for (let i = 0; i < checkpoints.length; i++) {
    let currItems = raidObj[checkpoints[i].checkpointName].items;
    let newItems = Array.prototype.map.call(
      await Promise.all(
        currItems.map(item =>
          Item.findOrCreate({ where: { itemName: item.itemName } })
        )
      ),
      arr => arr[0]
    );
    for (let j = 0; j < newItems.length; j++) {
      let character = await Character.findOne({
        where: { characterName: currItems[j].characterName },
      });
      await character.spendDKP(currItems[j].itemDKPCost);
      let [[newDrop]] = await checkpoints[i].addItem(newItems[j]);
      console.log(newDrop);
      await newDrop.update({ characterId: character.id });
    }
  }
};

module.exports = {
  createCheckpointsWithRaid,
  constructAttendanceFromCheckpoints,
  writeAttendanceToCheckpoints,
  writeItemsToCheckpointsAndCharacters,
};
