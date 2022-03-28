const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Plant} = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  res.render("landing", {
    loggedIn: req.session.loggedIn
  });
});

router.get("/myplants", withAuth, async (req, res) => {
  res.render("myplants" , {
    loggedIn: req.session.loggedIn
  });
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

router.get('/myplants', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Plant }],
    });
    const user = userData.get({ plain: true });
    res.render('myplants', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
    res.render('/');
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      include: [{
        model: Plant,
      },
    ],
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

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});


module.exports = router;