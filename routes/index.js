var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect("./publicaciones");
});

router.get("/posts/view", function (req, res, next) {
  res.redirect("/publicaciones");
});

module.exports = router;
