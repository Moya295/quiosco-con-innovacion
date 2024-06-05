require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

const Order = sequelize.define('Order', {
    items: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    }
});

User.hasMany(Order);
Order.belongsTo(User);

sequelize.sync();

module.exports = { User, Order, sequelize };
a