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
const { createCheckpointsWithRaid } = require("./parseWriteHelpers");

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
  const output = { raidName };
  for (key in attendance) {
    output[key] = { attendance: attendance[key] };
  }
  for (let i = 0; i < Object.keys(attendance).length; i++) {
    output[Object.keys(attendance)[i]].items = [];
  }
  for (let i = 0; i < items.length; i++) {
    output[items[i].checkpointName].items = [
      ...output[items[i].checkpointName].items,
      {
        itemName: items[i].itemName,
        characterName: items[i].characterName,
        itemDKPCost: items[i].itemDKPCost,
      },
    ];
  }
  return output;
};

const writeToDatabase = async raidObj => {
  const raidAttendanceArray = [];
  const checkpointNames = Object.keys(raidObj).filter(
    key => key !== `raidName`
  );
  const newRaid = await Raid.create({ raidName });
  let newCheckpoints = await createCheckpointsWithRaid(
    checkpointNames,
    newRaid
  );
};

const createString = raidObj => {
  let output = "";
  console.log(raidObj[Object.keys(raidObj)[0]].attendance.length);
  for (let i = 0; i < Object.keys(raidObj).length - 1; i++) {
    let charList = "";
    for (
      let j = 0, k = 0;
      j < raidObj[Object.keys(raidObj)[i]].attendance.sort().length;
      j++, k++
    ) {
      charList += raidObj[Object.keys(raidObj)[i]].attendance[j] + " ";
      if (k >= 9) {
        charList += "\n";
        k = 0;
      }
    }
    output += `\nFor checkpoint ${Object.keys(raidObj)[i]}, the following ${
      raidObj[Object.keys(raidObj)[i]].attendance.length
    } characters were present: \n`;
    output += charList;
    output += !raidObj[Object.keys(raidObj)[i]].items.length
      ? `and no items dropped`
      : `\n...and the following ${
          raidObj[Object.keys(raidObj)[i]].items.length
        } items dropped: ${raidObj[Object.keys(raidObj)[i]].items
          .map(
            item =>
              `\nitem name: ${item.itemName}; went to ${
                item.characterName
              } for ${item.itemDKPCost} DKP`
          )
          .join("; and,")}.\n\n`;
  }
  return output;
};

// console.log(formatForConfirmation(logToParse));
console.log(createString(formatForConfirmation(logToParse)));
