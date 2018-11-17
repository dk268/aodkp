const router = require("express").Router();
const { Character, Checkpoint, Item, Drop, Raid } = require("../db/models");
const NOUN = "character";

router.get(`/`, async (req, res, next) => {
  try {
    res.json(
      await Character.findAll({
        include: [
          { model: Drop, include: [Item, Checkpoint] },
          { model: Checkpoint, include: [Raid] },
          { model: Item, include: [Drop] },
        ],
        order: [["characterName", "asc"], [Drop, "dropName", "ASC"]],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Character.findById(req.params[`${NOUN}Id`], {
        include: [
          { model: Drop, include: [Item, Checkpoint] },
          { model: Checkpoint, include: [Raid] },
          { model: Item, include: [Drop] },
        ],
        order: [["characterName", "asc"], [Drop, "dropName", "ASC"]],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await Character.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.put(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Character.update(req.body, {
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
    await Character.destroy({ where: { id: req.params.charId } });
    const remaining = await Character.findAll();
    res.json(remaining);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
