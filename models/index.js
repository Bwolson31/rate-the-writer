const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Author = require('./author')
const AuthorComment = require('./authorComment')

// User.hasMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });
Post.belongsTo(User, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// User.hasMany(Comment, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });
Comment.belongsTo(User, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});
// Comment.belongsTo(Post, {
//   foreignKey: 'post_id'
// });

Author.hasMany(AuthorComment, {
  foreignKey: 'author_id'
})

AuthorComment.belongsTo(User, {
  foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

//Above: relationships go both ways, not just one direction

module.exports = { User, Post, Comment, Author, AuthorComment };
