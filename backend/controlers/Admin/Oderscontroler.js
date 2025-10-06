import Order from '../../models/Ordermodel.js';
import mongoose from "mongoose";
// import Product from "../../models/Productmodel.js";

// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find().populate('userid').populate('shippingAddress.address');
        const allordersDetails = [];
        allOrders.forEach((order) => {
            
            const user = order.userid || {};
            const name = user.Firstname +' '+ user.Lastname;
            const address = order.shippingAddress?.address || {};
            const Address = address.House + ' , ' + address.Street + ' , '+ address.Landmark;

            const totalQuantity = order.orderItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
        
        allordersDetails.push({
            orderid: order._id,
            userid: user._id,
            username: name,
            useremail:user.email,
            usernumber:user.number,
            totalQuantity: totalQuantity,
            totalAmount: order.totalAmount,
            isPaid: order.isPaid,
            orderstatus: order.status,
            shippingAddress: {
                address: Address,
                city: address.City,
                state: address.State,
                country: address.Country,
                zip: address.Zip
            },
            orderdate: order.createdAt,
            // order: order,
        });
        });
        res.status(200).json({ allordersDetails });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single order by ID
export const viewOrderById = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const order = await Order.find({ _id }).populate('userid').populate('shippingAddress.address');
        if (!order) {
            return res.status(404).json({ success: false, message:'Order not found' });
        };

        const OrdersDetails = order.map((order) => {

        const user = order.userid || {};
        const name = user.Firstname + " " + user.Lastname;
        const address = order.shippingAddress?.address || {};
        const Address = address.House + " , " + address.Street + " , " + address.Landmark;

        return {
        orderid: order._id,
        username: name,
        useremail: user.email,
        usernumber: user.number,
        totalAmount: order.totalAmount,
        orderItems: order.orderItems,
        isPaid: order.isPaid,
        orderstatus: order.status,
        shippingAddress: {
            address: Address,
            city: address.City,
            state: address.State,
            country: address.Country,
            zip: address.Zip,
        },
        orderdate: order.createdAt,
        };
        });

        res.status(200).json({ OrdersDetails });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User unavailable...");
    };

    try {
        const { status } = req.body;
        const order = await Order.findById({ _id });
        if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found' });
        };
        order.status = status;
        await order.save();
        res.status(200).json({ success: true, message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete order
export const deleteOrder = async (req, res) => {
    const { id: _id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User unavailable...");
    };
    
    try {
        const order = await Order.findByIdAndDelete({ _id });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};