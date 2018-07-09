const router = require("express").Router();
const { Character, Checkpoint, Drop } = require("../db/models");

const NOUN = "drop";

router.get(`/`, async (req, res, next) => {
  try {
    res.json(
      await Drop.findAll({
        include: [{ all: true, nested: true }],
        order: [
          ["dropName", "asc"],
          [Character, "characterName", "asc"],
          [Checkpoint, "id", "asc"],
        ],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Drop.findById(req.params[`${NOUN}Id`], {
        include: [{ all: true, nested: true }],
      })
    );
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.json(await Drop.create(req.body));
  } catch (e) {
    next(e);
  }
});

router.put(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    res.json(
      await Drop.update(req.body, {
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
    await Drop.destroy({ where: { id: req.params.charId } });
    const remaining = await Drop.findAll();
    res.json(remaining);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
