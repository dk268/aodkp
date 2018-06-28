const splitThenTrimThenSlice = text => {
  return text
    .split(`\n`)
    .map(line => line.trim())
    .filter(line => line.length)
    .slice(27);
};

const findRaidStartAndEnd = processedArr => {
  return [
    processedArr.indexOf(
      processedArr.find(e => e.includes("Raidname") && e.includes("begin"))
    ),
    processedArr.indexOf(
      processedArr.find(e => e.includes("Raidname") && e.includes("end"))
    ),
    processedArr.find(e => e.includes("Raidname")).split(" ")[4],
  ];
};

const renderAttendance = (processedArr, checkpointName) => {
  const start = processedArr.indexOf(
    processedArr.find(line =>
      line.includes(`BEGIN ${checkpointName} ATTENDANCE`)
    )
  );
  const end = processedArr.indexOf(
    processedArr.find(line => line.includes(`END ${checkpointName} ATTENDANCE`))
  );
  const output = [];
  for (let i = start; i < end; i++) {
    if (processedArr[i].includes("<Ashen Oath>")) {
      let bracketIndex = processedArr[i].indexOf(`]`);
      let newLine = processedArr[i].slice(bracketIndex + 2);
      let spaceIndex = newLine.indexOf(` `);
      if (processedArr[i].includes("* RIP *")) spaceIndex -= 2;
      output.push(newLine.slice(0, spaceIndex));
    }
  }
  return output;
};

const findCheckpointNames = processedArr => {
  const output = [];
  for (let i = 0; i < processedArr.length; i++) {
    if (processedArr[i].includes("BEGIN")) {
      output.push(processedArr[i].split(" ")[4]);
    }
  }
  return output;
};

const findItemDrops = processedArr => {
  const output = [];
  const obj = {};
  for (let i = 0; i < processedArr.length; i++) {
    let currentCheckpoint = "unassigned";
    if (processedArr[i].includes("BEGIN"))
      currentCheckpoint = processedArr[i].split(" ")[4];
    if (processedArr[i].includes("itemDrop")) {
      let newLine = processedArr[i]
        .slice(processedArr[i].indexOf("itemDrop") + 9)
        .split(" ");
      output.push(newLine);
    }
  }
  return output.map(drop => parseItemDrop(drop, currentCheckpoint));
};

const parseItemDrop = (
  arr,
  currStr = "",
  parsedArr = [],
  checkpointName = "unassigned"
) => {
  if (arr.length === 0) {
    let obj = {
      itemName: parsedArr[0],
      characterName: parsedArr[1],
      itemDKPCost: parsedArr[2],
      checkpointName,
    };
    return obj;
  } else if (arr[0] !== "to" && !parsedArr.length) {
    let word = currStr + arr[0] + " ";
    return parseItemDrop(arr.slice(1), word, parsedArr);
  } else if (arr[0] == "to" && !parsedArr.length) {
    return parseItemDrop([], "", [currStr.trim(), arr[1], arr[3]]);
  }
};

module.exports = {
  splitThenTrimThenSlice,
  findRaidStartAndEnd,
  renderAttendance,
  findCheckpointNames,
  findItemDrops,
};
