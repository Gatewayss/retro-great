const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js'); 
const { User, Post} = require('./index.js');

class Comment extends Model { }

Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    created_at: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Post,
            key: 'id',
        }
    }
},
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;