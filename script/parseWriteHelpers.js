const {
  Item,
  Raid,
  Drop,
  Character,
  Checkpoint,
} = require("../server/db/models");

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

module.exports = { createCheckpointsWithRaid };
