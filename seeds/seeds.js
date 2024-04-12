const sequelize = require('../config/connection');
const {Author } = require('../models');

// const userData = require('./userData.json');
// const postData = require('./postData.json');
// const commentData = require('./commentData.json');
const authorData =  require('./authorData.json')

const seedDataBase = async () => {
  await sequelize.sync({ force: true });

  const authors = await Author.bulkCreate(authorData, {
    individualHooks: true,
    returning: true,
  });

  console.log(authors);

  // const posts = await Promise.all(
  //   postData.map(async (post) => {
  //     const userRandom = users[Math.floor(Math.random() * users.length)];
  //     return Post.create({
  //       ...post,
  //       user_id: userRandom.id,
  //     });
  //   })
  // );

  // for (const comment of commentData) {
  //   const postings = posts[Math.floor(Math.random() * posts.length)];
  //   await Comment.create({
  //     ...comment,
  //     postid: postings.id,
  //     user_id: users[Math.floor(Math.random() * users.length)].id,
  //   });
  // }

  process.exit(0);
};

// seedDataBase();

module.exports = seedDataBase;