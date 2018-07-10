const { Item, Raid, Drop, Character, Checkpoint } = require("../server/db/models");
const db = require("../server/db");
const {
  splitThenTrimThenSlice,
  findRaidStartAndEnd,
  renderAttendance,
  findCheckpointNames,
  findItemDrops,
  parseDropDoc,
  parseAttendanceDoc,
} = require("./parseHelpers");
const Op = db.Op;
const chalk = require("chalk");
const logToParse = require("./parseText");
const {
  createCheckpointsWithRaid,
  constructAttendanceFromCheckpoints,
  writeAttendanceToCheckpoints,
  writeItemsToCheckpointsAndCharacters,
} = require("./parseWriteHelpers");
const aoDoc = require("./aoDoc.js");
const parseAODoc = require("./aoParse.js");

const parseLog = log => {
  try {
    const processedArray = splitThenTrimThenSlice(log);
    const [startIndex, endIndex, raidName] = findRaidStartAndEnd(processedArray);
    const slicedArray = processedArray.slice(startIndex, endIndex);
    let checkpointNames = findCheckpointNames(slicedArray);
    const attendance = {};
    checkpointNames.forEach(name => (attendance[name] = renderAttendance(slicedArray, name)));
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
  // await db.sync({ force: true });
  await db.sync();
  try {
    let now = Date.now();
    console.log(chalk.bold("Starting write..."));
    console.log(chalk.red(`creating checkpoints and raid...`));
    const checkpointNames = Object.keys(raidObj).filter(key => key !== `raidName`);
    const newRaid = await Raid.create({ raidName: raidObj.raidName });
    let newCheckpoints = await createCheckpointsWithRaid(checkpointNames, newRaid);
    console.log(
      chalk.blue(`created ${newCheckpoints.length} checkpoints for raid ${newRaid.raidName}!`)
    );
    console.log(chalk.yellow(`beginning attendance-taking...`));
    const raidAttendanceArray = await constructAttendanceFromCheckpoints(checkpointNames, raidObj);
    newCheckpoints = await writeAttendanceToCheckpoints(newCheckpoints, newRaid, raidObj);
    console.log(
      chalk.blue(
        `Attendance taken for ${raidAttendanceArray.length} characters across ${
          newCheckpoints.length
        } checkpoints!`
      )
    );
    console.log(chalk.red.bold(`Beginning item writing and DKP expenditures...`));
    await writeItemsToCheckpointsAndCharacters(newCheckpoints, raidObj);
    console.log(chalk.magenta(`All done in ${Date.now() - now}ms!!`));
  } catch (e) {
    console.log(e);
  } finally {
    // db.close();
    console.log("in finaly!");
  }
};

const createString = raidObj => {
  let output = "";
  let cpNames = Object.keys(raidObj).filter(name => name !== `raidName`);
  for (let i = 0; i < cpNames.length - 1; i++) {
    let charList = "";
    for (let j = 0, k = 0; j < raidObj[cpNames[i]].attendance.sort().length; j++, k++) {
      charList += raidObj[cpNames[i]].attendance[j] + " ";
      if (k >= 9) {
        charList += "\n";
        k = 0;
      }
    }
    output += `\nFor checkpoint ${cpNames[i]}, the following ${
      raidObj[cpNames[i]].attendance.length
    } characters were present: \n`;
    output += charList;
    output += !raidObj[cpNames[i]].items.length
      ? `and no items dropped`
      : `\n...and the following ${raidObj[cpNames[i]].items.length} items dropped: ${raidObj[
          cpNames[i]
        ].items
          .map(
            item =>
              `\nitem name: ${item.itemName}; went to ${item.characterName} for ${
                item.itemDKPCost
              } DKP`
          )
          .join("; and,")}.\n\n`;
  }
  return output;
};

const findNew = async raidObj => {
  const [extantCharacters, extantItems] = await Promise.all([
    Array.map.call(Character.findAll(), character => character.characterName),
    Array.map.call(Item.findAll(), item => item.itemName),
  ]);
  let cpNames = Object.keys(raidObj).filter(name => name !== `raidName`);
  const charList = [...new Set(cpNames.reduce((acc, cpName) => acc.concat(raidObj[cpName].attendance)))];
  const charSet = new Set(extantCharacters);
  const unfoundCharacters = [];

  const unfoundItems = [];
};

// console.log(formatForConfirmation(logToParse));
// console.log(createString(formatForConfirmation(logToParse)));
// console.log(createString(parseAODoc(aoDoc)));

const confirmAODoc = doc => createString(parseAODoc(doc));
module.exports = { confirmAODoc, findNew };

// writeToDatabase(formatForConfirmation(logToParse));
// console.log(parseAODoc(aoDoc));
// writeToDatabase(parseAODoc(aoDoc));
// console.log(formatForConfirmation(logToParse));

const doTwoThings = async () => {
  await writeToDatabase(formatForConfirmation(logToParse));
  await writeToDatabase(parseAODoc(aoDoc));
  await db.close();
  console.log("done!");
};

// doTwoThings();
