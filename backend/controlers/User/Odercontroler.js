import Order from '../../models/Ordermodel.js';
import Product from "../../models/Productmodel.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userid, orderItems, address, PaymentMethod, isPaid, status } = req.body;

    // Basic validation
    if (!userid || !Array.isArray(orderItems) || orderItems.length === 0 || !address || !PaymentMethod ) {
      return res.status(400).json({ message: "Missing required fields" });
    };

    let itemsWithPrice = [];
    let totalItemsPrice = 0;
    let ispaid = false;

        // ✅ Fetch prices from DB and calculate total
    for (const item of orderItems) {
          if (!item.product || !item.quantity) { return res.status(400).json({ message: "Order item must include product and quantity", }); };
          const productData = await Product.findById(item.product);
          if (!productData) { return res.status(404).json({ message: `Product not found: ${item.product}` }); };

          const price = productData.price; // Assuming price is the price of the product
          const Title = productData.Title; // Assuming Title is the name of the product
          const Image = productData.Image; // Assuming Image is the image of the product
          const quantity = item.quantity;
          const itemTotal = price * quantity;

          totalItemsPrice += itemTotal;

          itemsWithPrice.push({
            product: item.product, quantity, price, Title, Image, // pulled from DB, not client
          }); };

        // ✅ Calculate tax & shipping
        const taxPrice = +(totalItemsPrice * 0.1).toFixed(2); // 10% tax
        const shippingCharges = totalItemsPrice > 900 ? 0 : 10; // Free shipping over $900
        const totalAmount = +( totalItemsPrice + taxPrice + shippingCharges ).toFixed(2);
        
    if (PaymentMethod !== "CashOnDelivery") {
      ispaid = true;
    }else{
      ispaid = false;
    };
    
  
    const order = new Order({
      userid: userid,
      orderItems: itemsWithPrice,
      shippingAddress: { address },
      PaymentMethod,
      // paymentResult,
      isPaid: ispaid,
      taxprice: taxPrice,
      shippingcharges: shippingCharges,
      totalAmount,
      status,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// Get all orders for a user
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate('shippingAddress.address');
          res.status(200).json(orders);
        } catch (error) {
          res.status(500).json({ message: "Failed to fetch orders", error });
        }
}

// Get a single order by ID
// export const getOrderById = async (req, res) => { 
//         try {
//         const order = await Order.findById(req.params.orderId).populate('user', 'name email');
//             if (!order) {
//             res.status(200).json(order);
//             } else {
//             res.status(404).json({ message: "Order not found" });
//         }
//         } catch (error) {
//         res.status(500).json({ message: "Failed to fetch order", error });
//         }
// }

 // Update order status
// export const updateOrderStatus = async (req, res) => { 
//         try {
//         const { status } = req.body;
//         const order = await Order.findByIdAndUpdate(
//             req.params.orderId,
//             { status },
//             { new: true }
//         );
//         if (!order)
//             return res.status(404).json({ message: "Order not found" });
//         res.json(order);
//         } catch (error) {
//         res.status(500).json({ message: "Failed to update order", error });
//         }
// }