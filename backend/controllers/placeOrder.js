const Orders = require('../models/Orders');

const placeOrder = async (req, res) => {

    try {
        let isOrderCreated = Orders.create({ ...req.body });
        if (!isOrderCreated) {
            return res.status(500).json({ msg: "Failed to place order." })
        }
        return res.status(200).json({ order: isOrderCreated, msg: "Order placed successfully." });

    } catch (error) {
        console.log('Error in place order controller: ', error);
        return res.status(500).json({ error: 'Server Internal Error' });
    }

}

module.exports = placeOrder;