const { Item, Raid, Drop, Character, Checkpoint } = require("../server/db/models");
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
  for (let i = 0; i < checkpointArray.length; i++) {
    let checkpointAttendance = await Promise.all(
      raidObj[checkpointArray[i]].attendance.map(characterName =>
        Character.findOrCreate({ where: { characterName } })
      )
    );
    await Promise.all(checkpointAttendance.map(character => character[0].earnDKP(10)));
    output.push(...checkpointAttendance);
  }
  output = [...new Set(output.map(character => character[0].characterName))];
  return output;
};

const writeAttendanceToCheckpoints = async (checkpoints, raid, raidObj) => {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

const writeItemsToCheckpointsAndCharacters = async (checkpoints, raidObj) => {
  let counter = 0;
  try {
    for (let i = 0; i < checkpoints.length; i++) {
      let currItems = raidObj[checkpoints[i].checkpointName].items;
      let newItems = Array.prototype.map.call(
        await Promise.all(
          currItems.map(item => Item.findOrCreate({ where: { itemName: item.itemName } }))
        ),
        arr => arr[0]
      );
      for (let j = 0; j < newItems.length; j++) {
        let character = await Character.findOrCreate({
          where: { characterName: currItems[j].characterName },
        });
        if (character[1])
          console.log(`Typo found: ${character[0].characterName} spelled incorrectly`);
        await character[0].spendDKP(currItems[j].itemDKPCost);
        await character[0].addItem(newItems[j]);
        let [[newDrop]] = await checkpoints[i].addItem(newItems[j]);
        await newDrop.update({ characterId: character[0].id });
      }
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createCheckpointsWithRaid,
  constructAttendanceFromCheckpoints,
  writeAttendanceToCheckpoints,
  writeItemsToCheckpointsAndCharacters,
};
