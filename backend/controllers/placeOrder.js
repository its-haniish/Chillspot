const Orders = require('../models/Orders');


const placeOrder = async (req, res) => {
    const { itemsArray, email } = req.body;

    try {
        const resArr = itemsArray.map(async elem => {
            const { name, price, amount, address, time } = elem;
            let isOrderCreated = await Orders.create({ ...elem, email });
            return isOrderCreated;
        });
        return res.status(200).json({ order: resArr, msg: "Order placed successfully." });

    } catch (error) {
        console.log('Error in place order controller: ', error);
        return res.status(500).json({ msg: 'Server Internal Error' });
    }

}

module.exports = placeOrder;