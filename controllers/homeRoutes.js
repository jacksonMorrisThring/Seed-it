const router = require('express').Router();
const { append } = require('express/lib/response');
const sequelize = require('../config/connection');
//const { Gallery, Painting } = require('../models');
router.get('/', async (req, res) => {
    
        res.render('login');
      });

module.exports = router;
