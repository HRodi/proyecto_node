const {DataTypes} = require('sequelize');
const {sequelize} = require("../connection");

const TopicModel = sequelize.define('Topic',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false, primaryKey:true, autoIncrement:  true
    },
    create_date: {
        type: DataTypes.TIME, allowNull: false
    },
    name: {
        type: DataTypes.STRING, allowNull: true
    },
    theme_id: {
        type: DataTypes.INTEGER, allowNull: true
    },
    order: {
        type: DataTypes.INTEGER, allowNull: true
    },
    priority: {
        type: DataTypes.INTEGER, allowNull: true
    },
    color: {
        type: DataTypes.STRING, allowNull: true
    },
    deleted: {
        type: DataTypes.BOOLEAN, allowNull: false
    }
},{
    tableName: 'topics',
    timestamps: false
});

module.exports = {
    TopicModel,
};