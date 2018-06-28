const router = require("express").Router();
const { Character, Checkpoint, Item, Raid } = require("../db/models");

const NOUN = "item";
const OTHER_MODELS = [Character, Checkpoint, Item, Raid].filter(
  model => model !== Item
);

router.get(`/`, async (req, res, next) => {
  try {
    res.json(
      await Item.findAll({
        include: OTHER_MODELS,
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Item.findById(req.body[`${NOUN}Id`], { include: OTHER_MODELS })
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
