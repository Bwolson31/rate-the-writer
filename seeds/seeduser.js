const sequelize = require('../config/connection');
const { User } = require('../models');

const userData = require('./userData.json');
//const postData = require('./postData.json');

const seedusers = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log('\n----- USERS SEEDED -----\n');
};

seedusers().catch(console.error);
