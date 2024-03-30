const Orders = require("../models/Orders.js");

const trackOrderById = async (req, res) => {
    const { orderId } = req.body;
    try {
        const savedOrder = await Orders.findOne({ _id: orderId });
        if (!savedOrder) {
            return res.status(500).json({ msg: "Failed to get order details." })
        }
        return res.status(200).json({ order: savedOrder })
    } catch (error) {
        console.log("Error while tracking order by id.");
        return res.status(500).json({ msg: "Server Internal Error" })
    }
}

const trackOrdersByEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const savedOrders = await Orders.find({ email });
        if (!savedOrders) {
            return res.status(500).json({ msg: "Failed to get orders." })
        }
        return res.status(200).json({ orders: savedOrders })
    } catch (error) {
        console.log("Error while tracking order by email.");
        return res.status(500).json({ msg: "Server Internal Error" })
    }
}


module.exports = { trackOrderById, trackOrdersByEmail }