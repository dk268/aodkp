const {
  Item,
  Raid,
  Drop,
  Character,
  Checkpoint,
} = require("../server/db/models");
const db = require("../server/db");
const {
  splitThenTrimThenSlice,
  findRaidStartAndEnd,
  renderAttendance,
  findCheckpointNames,
  findItemDrops,
} = require("./parseHelpers");
const Op = db.Op;
const chalk = require("chalk");
const logToParse = require("./parseText");

const parseLog = log => {
  try {
    const processedArray = splitThenTrimThenSlice(log);
    const [startIndex, endIndex, raidName] = findRaidStartAndEnd(
      processedArray
    );
    const slicedArray = processedArray.slice(startIndex, endIndex);
    let checkpointNames = findCheckpointNames(slicedArray);
    const attendance = {};
    checkpointNames.forEach(
      name => (attendance[name] = renderAttendance(slicedArray, name))
    );
    let items = findItemDrops(slicedArray);
    return [raidName, attendance, items];
  } catch (e) {
    console.log(e);
  }
};

const formatForConfirmation = log => {
  const [raidName, attendance, items] = parseLog(log);
  const output = { raidName, attendance };
  for (let i = 0; i < Object.keys(attendance).length; i++) {
    output["item" + Object.keys(attendance)[i]] = [];
  }
  for (let i = 0; i < items.length; i++) {
    // console.log("item" + items[i].checkpointName);
    output["item" + items[i].checkpointName] = [
      ...output["item" + items[i].checkpointName],
      {
        itemName: items[i].itemName,
        characterName: items[i].characterName,
        itemDKPCost: items[1].itemDKPcost,
      },
    ];
  }
  return output;
};

const createString = parsedLog => {};

console.log(formatForConfirmation(logToParse));
