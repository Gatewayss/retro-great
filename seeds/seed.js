const sequelize = require('../config/connection');
const { User, Post, Comment, ChatRoom, ChatMessage } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');
const chatRoomData = require('./chatRoomData.json');
const messageData = require('./messageData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create(post);
  }

  for (const comment of commentData) {
    await Comment.create(comment);
  }

  for (const chat of chatRoomData) {
    await ChatRoom.create(chat);
  }

  for (const message of messageData) {
    await ChatMessage.create(message);
  }

  console.log('_________Database seeded successfully__________');

  process.exit(0);
};

seedDatabase();

