const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

Comment.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Comment.belongsTo(Post, {
    foreignKey: 'post_id', 
    onDelete: 'CASCADE',
  });

  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

  User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });

  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });

module.exports = {
    User,
    Post,
    Comment
};