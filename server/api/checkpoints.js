const router = require("express").Router();
const { Character, Checkpoint, Item, Raid, Drop } = require("../db/models");
const Sequelize = require("../db/db");

const NOUN = "checkpoint";

router.get(`/`, async (req, res, next) => {
  try {
    res.json(
      await Checkpoint.findAll({
        include: [
          { model: Drop, include: [Character, Item] },
          { model: Character },
          { model: Raid },
        ],
        order: [["id", "asc"], [Character, "characterName", "asc"], [Drop, "dropName", "asc"]],
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
        include: [
          { model: Drop, include: [Character, Item] },
          { model: Character },
          { model: Raid },
        ],
        order: [["id", "asc"], [Character, "characterName", "asc"], [Drop, "dropName", "asc"]],
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
