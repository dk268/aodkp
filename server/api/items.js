const router = require("express").Router();
const { Character, Item, Drop } = require("../db/models");

const NOUN = "item";

router.get(`/`, async (req, res, next) => {
  try {
    res.json(
      await Item.findAll({
        include: [{ model: Drop, include: [{ all: true }] }, { model: Character }],
        order: [["itemName", "asc"], [Character, "characterName", "asc"]],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Item.findById(req.params[`${NOUN}Id`], {
        include: [{ model: Drop, include: [{ all: true }] }, { model: Character }],
        order: [["itemName", "asc"], [Character, "characterName", "asc"]],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await Item.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.put(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Item.update(req.body, {
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
    await Item.destroy({ where: { id: req.params.charId } });
    const remaining = await Item.findAll();
    res.json(remaining);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
