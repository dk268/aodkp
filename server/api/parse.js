const router = require("express").Router();
const { confirmAODoc, writeAODoc } = require("../../script/parse.js");
module.exports = router;

router.get(`/`, async (req, res, next) => {
  try {
    res.send("Got it");
  } catch (e) {
    next(e);
  }
});

router.post(`/confirm`, async (req, res, next) => {
  const written = await writeAODoc(req.body.document);
  res.json(written);
});

router.post(`/`, async (req, res, next) => {
  try {
    const confirmation = await confirmAODoc(req.body.document);
    res.send(confirmation);
  } catch (e) {
    next(e);
  }
});
