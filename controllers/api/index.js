const router = require('express').Router();
const userRoutes = require('./userRoutes');
const plantRoutes = require ('./myPlantsRoutes');


router.use('/users', userRoutes);
router.use('/myplants', plantRoutes);

module.exports = router;