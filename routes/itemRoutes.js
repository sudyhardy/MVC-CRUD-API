const express = require("express");
const itemController = require("../controllers/itemController");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Show all items
router.get("/", itemController.index);

// Create a new item
router.post(
    "/",
    [
        check("name")
            .not()
            .isEmpty()
            .withMessage("Name is required."),
        check("description")
            .not()
            .isEmpty()
            .withMessage("Description is required."),
        check("price")
            .not()
            .isEmpty()
            .withMessage("Price is required.")
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        itemController .create(req, res);
    }
);

// Show a single item
router.get("/:id", itemController.show);

// Update an item
router.put(
    ":id",
    [
        check("name")
            .not()
            .isEmpty()
            .withMessage("Name is required"),
        check("description")
            .not()
            .isEmpty()
            .withMessage("Description is required."),
        check("price")
            .not()
            .isEmpty()
            .withMessage("Price is required.")
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        itemController.update(req, res);
    }
);

// Delete an item
router.delete("/:id", itemController.delete);

module.exports = router;