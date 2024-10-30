const OrderSchema = require('../model/OrderSchema');
const placeOrder = async (req,resp)=>{
    try {
        const { date, cost, customer, products, paymentData, status } = req.body;
        const newOrder =
            new OrderSchema({ date, cost, customer, products, paymentData, status });
        const savedOrder = await newOrder.save();
        resp.status(201).json({ message: 'Order placed successfully', order: savedOrder });
    } catch (error) {
        resp.status(500).json({ message: 'Failed to place order', error: error.message });
    }
}
const loadAllOrders =async (req,resp)=>{
    try {
        const orders = await OrderSchema.find();
        resp.status(200).json(orders);
    } catch (error) {
        resp.status(500).json({ message: 'Failed to load orders', error: error.message });
    }
}
const updateOrderState =async (req,resp)=>{

    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await OrderSchema.findByIdAndUpdate(id, { status },
            { new: true });
        if (!updatedOrder) {
            return resp.status(404).json({ message: 'Order not found' });
        }
        resp.status(200).json({ message: 'Order status updated', order: updatedOrder });
    } catch (error) {
        resp.status(500).json({ message: 'Failed to update order status', error: error.message });
    }

}
const deleteOrderByAdmin =async (req,resp)=>{
    try {
        const { id } = req.params;
        const deletedOrder = await OrderSchema.findByIdAndDelete(id);
        if (!deletedOrder) {
            return resp.status(404).json({ message: 'Order not found' });
        }
        resp.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        resp.status(500).json({ message: 'Failed to delete order', error: error.message });
    }
}

module.exports={
    placeOrder,loadAllOrders,updateOrderState,deleteOrderByAdmin
}