const { ProductColor } = require("../models/productColor"); // productColor کا ماڈل import کریں
const express = require('express');
const router = express.Router();

// Get all product colors
router.get(`/`, async (req, res) => {
    try {
        const productColorList = await ProductColor.find();
        if (!productColorList) {
            res.status(500).json({ success: false });
        }
        return res.status(200).json(productColorList);
    } catch (error) {
        res.status(500).json({ success: false });
    }
});

// Get product color by ID
router.get('/:id', async (req, res) => {
    const item = await ProductColor.findById(req.params.id);
    if (!item) {
        res.status(500).json({ message: 'The item with the given ID was not found.' });
    }
    return res.status(200).send(item);
});

// Create a new product color
router.post('/create', async (req, res) => {
    let productColor = new ProductColor({
        color: req.body.color
    });

    if (!productColor) {
        res.status(500).json({
            error: err,
            success: false
        });
    }

    productColor = await productColor.save();
    res.status(201).json(productColor);
});

// Delete a product color by ID
router.delete('/:id', async (req, res) => {
    const deletedItem = await ProductColor.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
        res.status(404).json({
            message: 'Item not found!',
            success: false
        });
    }

    res.status(200).json({
        success: true,
        message: 'Item Deleted!'
    });
});

// Update a product color by ID
router.put('/:id', async (req, res) => {
    const item = await ProductColor.findByIdAndUpdate(
        req.params.id,
        {
            color: req.body.color,
        },
        { new: true }
    );

    if (!item) {
        return res.status(500).json({
            message: 'Item cannot be updated!',
            success: false
        });
    }

    res.send(item);
});

module.exports = router;
