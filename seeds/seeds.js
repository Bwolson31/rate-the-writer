const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userdata = require('./userdata.json');
const postdata = require('./postdata.json');
const commentdata = require('./commentdata.json');

const seeddatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
  });

  const posts = await Promise.all(
    postdata.map(async (post) => {
      const userRandom = users[Math.floor(Math.random() * users.length)];
      return Post.create({
        ...post,
        userid: userRandom.id,
      });
    })
  );

  for (const comment of commentdata) {
    const postings = posts[Math.floor(Math.random() * posts.length)];
    await Comment.create({
      ...comment,
      postid: postings.id,
      userid: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seeddatabase();
