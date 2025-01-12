const Order = require("../models/order.model");
const Product = require("../models/product.model");

// Create a new order
const createOrder = async (req, res) => {
    const { customerId, products, shippingAddress } = req.body;

    if (!customerId || !products || !shippingAddress) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let totalAmount = 0;

        // Calculate total amount and validate product stock
        for (let productItem of products) {
            const product = await Product.findById(productItem.productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found with ID: ${productItem.productId}` });
            }
            if (product.stock < productItem.quantity) {
                return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
            }
            totalAmount += productItem.price * productItem.quantity;
        }

        // Create order
        const order = await Order.create({
            customerId,
            products,
            totalAmount,
            shippingAddress
        });

        // Update stock for each product in the order
        for (let productItem of products) {
            const product = await Product.findById(productItem.productId);
            product.stock -= productItem.quantity;
            await product.save();
        }

        return res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all orders or a specific order by ID
const getOrders = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            // Get a specific order by ID
            const order = await Order.findById(id).populate('customerId', 'name email').populate('products.productId', 'name price');
            if (!order) {
                return res.status(404).json({ message: "Order not found" });
            }
            return res.status(200).json(order);
        } else {
            // Get all orders
            const orders = await Order.find().populate('customerId', 'name email').populate('products.productId', 'name price');
            res.status(200).json(orders);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an order status
const updateOrder = async (req, res) => {
    const { status } = req.body;

    if (!status || !['Pending', 'Shipped', 'Delivered'].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        return res.status(200).json({ message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an order by ID
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // Restore product stock (optional, depending on business rules)
        for (let productItem of order.products) {
            const product = await Product.findById(productItem.productId);
            product.stock += productItem.quantity;
            await product.save();
        }

        return res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createOrder, getOrders, updateOrder, deleteOrder };
