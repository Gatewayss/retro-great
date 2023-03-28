const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js'); 

class ChatRoom extends Model {}

ChatRoom.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, 
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'chatRoom',
}
);

module.exports = ChatRoom;
