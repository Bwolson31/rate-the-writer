const sequelize = require('../config/connection');
const { User } = require('../models');
const userdata = require('./userdata.json');

const seedusers = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
  });

  console.log('\n----- USERS SEEDED -----\n');
};

seedusers().catch(console.error);
