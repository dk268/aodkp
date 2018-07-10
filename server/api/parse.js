const router = require("express").Router();
const { confirmAODoc } = require("../../script/parse.js");
module.exports = router;

router.get(`/`, async (req, res, next) => {
  try {
    console.log(req.body);
    res.send("Got it");
  } catch (e) {
    next(e);
  }
});

router.post(`/`, async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(confirmAODoc(req.body.document));
    res.send("Got it via post");
  } catch (e) {
    next(e);
  }
});
