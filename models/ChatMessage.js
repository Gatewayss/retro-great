const { Model, DataTypes, Sequelize } = require('sequelize');

const sequelize = require('../config/connection.js');

class ChatMessage extends Model { }

ChatMessage.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    created_time: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        get() {
            return this.getDataValue('created_at').toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        },
    },

}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chatMessage',
}
);

module.exports = ChatMessage;