const router = require("express").Router();
const { Character, Checkpoint, Item, Raid } = require("../db/models");

const NOUN = "character";
const OTHER_MODELS = [Character, Checkpoint, Item, Raid].filter(
  model => model !== Character
);

router.get(`/`, async (req, res, next) => {
  try {
    res.json(
      await Character.findAll({
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
      await Character.findById(req.body[`${NOUN}Id`], { include: OTHER_MODELS })
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
