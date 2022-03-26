const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Plant} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  res.render("landing");
});

router.get("/myplants", withAuth, async (req, res) => {
  res.render("myplants");
});

router.get("/myplants/:id", withAuth, async (req, res) => {
  try {
    const dbPlantData = await Plant.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!dbPlantData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    res
        .status(200)
        .json({ user: dbPlantData, message: 'This is the plant!' });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/landing');
    return;
  }

  res.render('login');
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      
        req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/signup', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // TODO: Set up sessions with the 'loggedIn' variable
    req.session.save(() => {
      // TODO: Set the 'loggedIn' session variable to 'true'
     
        req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;