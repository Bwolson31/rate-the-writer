const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

const seedDataBase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Promise.all(
    postData.map(async (post) => {
      const userRandom = users[Math.floor(Math.random() * users.length)];
      return Post.create({
        ...post,
        user_id: userRandom.id,
      });
    })
  );

  for (const comment of commentData) {
    const posting = posts[Math.floor(Math.random() * posts.length)];
    await Comment.create({
      ...comment,
      post_id: posting.id, // Corrected the property name to post_id
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  console.log('\n----- DATABASE SEEDED -----\n');
};

seedDataBase().catch(console.error);
