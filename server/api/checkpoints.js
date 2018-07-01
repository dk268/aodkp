const router = require("express").Router();
const { Character, Checkpoint, Item, Raid } = require("../db/models");

const NOUN = "checkpoint";
const OTHER_MODELS = [Character, Checkpoint, Item, Raid].filter(model => model !== Checkpoint);

router.get(`/`, async (req, res, next) => {
  try {
    res.json(
      await Checkpoint.findAll({
        include: [{ all: true, nested: true }],
        order: [["id", "asc"], [Character, "characterName", "asc"], [Item, "itemName", "asc"]],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Checkpoint.findById(req.params[`${NOUN}Id`], {
        include: [{ all: true, nested: true }],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await Checkpoint.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.put(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Checkpoint.update(req.body, {
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
    await Checkpoint.destroy({ where: { id: req.params.charId } });
    const remaining = await Checkpoint.findAll();
    res.json(remaining);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
