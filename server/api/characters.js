const router = require("express").Router();
const { Character } = require("../db/models");

const NOUN = "character";

router.get(`/`, async (req, res, next) => {
  try {
    const all = await Character.findAll();
    res.json(all.data);
  } catch (e) {
    next(e);
  }
});

router.get(`/:${NOUN}Id`, async (req, res, next) => {
  try {
    console.log("passit");
  } catch (e) {
    next(e);
  }
});
