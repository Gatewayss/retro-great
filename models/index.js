const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');
const ChatRoom = require('./ChatRoom');
const ChatMessage = require('./ChatMessage');

// A user can participate in many chat rooms
User.belongsToMany(ChatRoom, { through: 'UserChatRoom' });
ChatRoom.belongsToMany(User, { through: 'UserChatRoom' });

// A chat room can have many chat messages
ChatRoom.hasMany(ChatMessage);
ChatMessage.belongsTo(ChatRoom);

// A user can send many chat messages
User.hasMany(ChatMessage);
ChatMessage.belongsTo(User);

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
    Comment,
    ChatRoom,
    ChatMessage
};