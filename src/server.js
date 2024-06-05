const express = require('express');
const bodyParser = require('body-parser');
const { User, Order, sequelize } = require('./lib/sequelize');

const app = express();

app.use(bodyParser.json());

app.post('/order', async (req, res) => {
    const { userId, items } = req.body;
    const order = await Order.create({ userId, items });
    res.status(201).send(order);
});

app.get('/recommendations/:userId', async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId, {
        include: Order
    });

    const recommendations = generateRecommendations(user);
    res.send(recommendations);
});

function generateRecommendations(user) {
    const allItems = user.Orders.flatMap(order => order.items);
    const itemCounts = allItems.reduce((counts, item) => {
        counts[item] = (counts[item] || 0) + 1;
        return counts;
    }, {});

    return Object.keys(itemCounts).sort((a, b) => itemCounts[b] - itemCounts[a]).slice(0, 5);
}

app.listen(3001, async () => {
    await sequelize.authenticate();
    console.log('Server is running on port 3001');
});
