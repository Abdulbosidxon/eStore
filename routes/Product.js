const { Router } = require("express");
const router = Router();
const Product = require("../models/product")
const ProductImg = require("../models/ProductImg")
const Sms = require("../models/sms");
const Menu = require("../models/menu");
router.get("/", async(req, res) => {
    const product = await Product.find();
    const productImg = await ProductImg.find();
    const sms = await Sms.find();
    const menu = await Menu.find();

    res.render("product", { title: "Product", activePricing: true,product, productImg,sms,menu});
});
module.exports = router;