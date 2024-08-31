const { Router } = require("express");
const router = Router();
const Menu = require("../models/menu")
const Cart = require("../models/cart");
const Feature = require("../models/feature");
const mongoose = require("mongoose");
router.get("/", async (req, res) => {
    try {
        const menu = await Menu.find();
        const cart = await Cart.find().populate('items.feature');
        console.log(cart);

        res.render("cart", { title: "Cart", menu, cart });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});
router.post('/add', async (req, res) => {
    try {
        const { featureId } = req.body;
        let cart = await Cart.findOne(); // foydalanuvchiga bog'lab olish zarur

        if (!cart) {
            cart = new Cart();
        }

        const itemIndex = cart.items.findIndex(item => item.feature.toString() === featureId);

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += 1;
        } else {
            cart.items.push({ feature: new mongoose.Types.ObjectId(featureId), quantity: 1 });
        }

        // Umumiy summani hisoblash
        let total = 0;
        for (let item of cart.items) {
            const feature = await Feature.findById(item.feature); // To'g'ri ishlatish
            if (feature) {
                total += feature.price * item.quantity;
            }
        }
        cart.totalPrice = total;

        await cart.save();
        res.redirect("/cart");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});
router.post('/update', async (req, res) => {
    const { featureId, action } = req.body;

    try {
        let cart = await Cart.findOne();

        const featureIndex = cart.items.findIndex(p => p.feature.toString() === featureId);

        if (featureIndex > -1) {
            if (action === 'increment') {
                cart.items[featureIndex].quantity += 1;
            } else if (action === 'decrement' && cart.items[featureIndex].quantity > 1) {
                cart.items[featureIndex].quantity -= 1;
            }

            // Umumiy summani qayta hisoblash
            let newTotal = 0;
            for (let item of cart.items) {
                const feature = await Feature.findById(item.feature); // To'g'ri ishlatish
                if (feature) {
                    newTotal += feature.price * item.quantity;
                }
            }
            cart.totalPrice = newTotal;

            await cart.save();
        }
        res.redirect("/cart");
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
router.post("/delete", async (req, res) => {
    try {
        const { featureId } = req.body;
        let cart = await Cart.findOne();
        // console.log(featureId);
        if (cart) {
            // Savatdan elementni o'chirish
            cart.items = cart.items.filter(item => item.feature.toString() !== featureId);

            // Umumiy summani qayta hisoblash
            let newTotal = 0;
            for (let item of cart.items) {
                const feature = await Feature.findById(item.feature);
                if (feature) {
                    newTotal += feature.price * item.quantity;
                }
            }
            cart.totalPrice = newTotal;

            await cart.save();
        }
        res.redirect("/cart");
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
    }
});

module.exports = router;