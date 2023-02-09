const Item = require("../models/item");
const mongoose = require("mongoose");
const { validateId } = require("../helpers/validateId");

// Show all items
exports.index = (req, res) => {
    Item.find({}, (err, items) => {
        if (err) return res.status(500).send({ error: err.message });
        return res.status(200).send(items);
    });
};

// Create a new item
exports.create = (req, res) => {
    const newItem = new Item(req.body);
    newItem.save((err, item) => {
        if (err) return res.status(500).send({ error: err.message });
        return res.status(201).send(item);
    });
}

// Show a single item
exports.show = (req, res) => {
    if (!validateId(req.params.id))
        return res.status(400).send({ error: "Invalid item ID" });
    
    Item.findById(req.params.id, (err, item) => {
        if (err) return res.status(500).send({ error: err.message });
        if (!item) return res.status(404).send({ error: "Item not found" });
        return res.status(200).send(item);
    });
};

// Update an item
exports.update = (req, res) => {
    if (!validateId(req.params.id))
        return res.status(400).send({ error: "Invalid item ID" });

    Item.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (err, item) => {
            if (err) return res.status(500).send({ error: err.message });
            if (!item) return res.status(404).send({ error: "Item not found" });
            return res.status(200).send(item);
        }
    );
};

// Delete an item
exports.delete = (req, res) => {
    if (!validateId(req.params.id))
        return res.status(400).send({ error: err.message });

    Item.findByIdAndRemove(req.params.id, (err, item) => {
        if (err) return res.status(500).send({ error: err.message });
        if (!item) return res.status(404).send({ error: "Item not found" });
        return res.status(200).send({ message: "Item has been deleted." });
    });
};