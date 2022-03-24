const router = require("express").Router();
const sequelize = require("../config/connection");

router.get("/", async (req, res) => {
  res.render("landing");
});

router.get("/myplants", async (req, res) => {
  res.render("myplants");
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/landing');
    return;
  }

  res.render('login');
});

module.exports = router;
