const { parseDropDoc, parseAttendanceDoc } = require("./parseHelpers");

const parseAODoc = doc => {
  const pDoc = doc
    .split(`\n`)
    .map(line => line.trim())
    .filter(line => line.length);

  const raidName = `${pDoc[0]}: ${pDoc[1]}`;
  const itemsIndex = pDoc.indexOf(`<Loot>`);
  const items2000Index = pDoc.indexOf(`<2000>`);
  const items2100Index = pDoc.indexOf(`<2100>`);
  const items2200Index = pDoc.indexOf(`<2200>`);
  const items2300Index = pDoc.indexOf(`<2300>`);
  const items2400Index = pDoc.indexOf(`<2400>`);
  const attendanceIndex = pDoc.indexOf(`<Attendance>`);
  const attendance2000Index = pDoc.indexOf(`<2000>`, attendanceIndex);
  const attendance2100Index = pDoc.indexOf(`<2100>`, attendanceIndex);
  const attendance2200Index = pDoc.indexOf(`<2200>`, attendanceIndex);
  const attendance2300Index = pDoc.indexOf(`<2300>`, attendanceIndex);
  const attendance2400Index = pDoc.indexOf(`<2400>`, attendanceIndex);
  const items2000Slice = pDoc.slice(items2000Index + 1, items2100Index);
  const items2100Slice = pDoc.slice(items2100Index + 1, items2200Index);
  const items2200Slice = pDoc.slice(items2200Index + 1, items2300Index);
  const items2300Slice = pDoc.slice(items2300Index + 1, items2400Index);
  const items2400Slice = pDoc.slice(items2400Index + 1, pDoc.indexOf(`<Boxes>`));
  const attendance2000Slice = pDoc
    .slice(attendance2000Index + 1, attendance2100Index)
    .filter(line => line.includes(`<Ashen Oath>`));
  const attendance2100Slice = pDoc
    .slice(attendance2100Index + 1, attendance2200Index)
    .filter(line => line.includes(`<Ashen Oath>`));
  const attendance2200Slice = pDoc
    .slice(attendance2200Index + 1, attendance2300Index)
    .filter(line => line.includes(`<Ashen Oath>`));
  const attendance2300Slice = pDoc
    .slice(attendance2300Index + 1, attendance2400Index)
    .filter(line => line.includes(`<Ashen Oath>`));
  const attendance2400Slice = pDoc
    .slice(attendance2400Index + 1, pDoc.length)
    .filter(line => line.includes(`<Ashen Oath>`));
  const output = { raidName };
  output[`<2000>`] = {
    items: items2000Slice.map(item => {
      return parseDropDoc(item, `<2000>`);
    }),

    attendance: attendance2000Slice.map(character => parseAttendanceDoc(character, `<2000>`)),
  };
  output[`<2100>`] = {
    items: items2100Slice.map(item => {
      return parseDropDoc(item, `<2100>`);
    }),

    attendance: attendance2100Slice.map(character => parseAttendanceDoc(character, `<2100>`)),
  };
  output[`<2200>`] = {
    items: items2200Slice.map(item => {
      return parseDropDoc(item, `<2200>`);
    }),

    attendance: attendance2200Slice.map(character => parseAttendanceDoc(character, `<2200>`)),
  };
  output[`<2300>`] = {
    items: items2300Slice.map(item => {
      return parseDropDoc(item, `<2300>`);
    }),

    attendance: attendance2300Slice.map(character => parseAttendanceDoc(character, `<2300>`)),
  };
  output[`<2400>`] = {
    items: items2400Slice.map(item => {
      return parseDropDoc(item, `<2400>`);
    }),
    attendance: attendance2400Slice.map(character => parseAttendanceDoc(character, `<2400>`)),
  };

  return output;
};

module.exports = parseAODoc;
