const express = require("express");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { error : req.flash("error"), greet : req.flash("greet") });
});

router.get('/shop', isLoggedIn, (req, res) => {
  res.render('shop');
})

module.exports = router;