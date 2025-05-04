const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { error : req.flash("error"), greet : req.flash("greet") });
});


module.exports = router;