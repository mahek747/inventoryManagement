const Product = require("../models/product.model");

const createProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    if (!name || !description || !price || !stock || !category) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let product = await Product.findOne({ name });
        if (product) {
            return res.status(400).json({ error: "Product name already exists" });
        }

        product = await Product.create({
            name,
            description,
            price,
            stock,
            category
        });

        return res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            return res.status(200).json(product);
        } else {
            const products = await Product.find();
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    const { name, description, price, stock, category } = req.body;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (stock) product.stock = stock;
        if (category) product.category = category;

        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };
