const router = require("express").Router();
module.exports = router;

router.use("/users", require("./users"));
router.use("/characters", require("./characters"));
router.use("/checkpoints", require("./checkpoints"));
router.use("/drops", require("./drops"));
router.use("/items", require("./items"));
router.use("/raids", require("./raids"));
router.use("/parse", require("./parse"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
