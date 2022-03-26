const sequelize = require('../config/connection');
const { User, Plant } = require('../models');

const userData = require('./userData.json');
const plantData = require('./plantData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Plant.bulkCreate(plantData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
