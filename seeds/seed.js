const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');


const seedDatabase = async () => {
    
    try {
        await sequelize.sync({ force: true });
        const users = await User.bulkCreate(userData)

        for (const post of postData) {
            await Post.create({
                ...post,
                user_id: users[Math.floor(Math.random() * users.length)].id,
            });
        }

        console.log('_________Database seeded successfully__________');
        process.exit(0);
    } catch (err) {
        console.error(err);
    }
};

seedDatabase();
