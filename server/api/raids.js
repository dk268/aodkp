const router = require("express").Router();
const { Character, Checkpoint, Item, Raid } = require("../db/models");

const NOUN = "raid";
const OTHER_MODELS = [Checkpoint, Raid].filter(model => model !== Raid);

router.get(`/`, async (req, res, next) => {
  try {
    res.json(await Raid.findAll({ include: [{ all: true, nested: true }] }));
  } catch (e) {
    next(e);
  }
});

router.get(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Raid.findById(req.params[`${NOUN}Id`], {
        include: [{ all: true, nested: true }],
        order: [["id", "asc"], [Checkpoint, "id", "asc"], [Character, "characterName", "asc"]],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await Raid.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.put(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Raid.update(req.body, {
        where: {
          id: req.params[`${NOUN}Id`],
        },
        returning: true,
        plain: true,
      })[1][0]
    );
  } catch (e) {
    next(e);
  }
});

router.delete(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    await Raid.destroy({ where: { id: req.params.charId } });
    const remaining = await Raid.findAll();
    res.json(remaining);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
