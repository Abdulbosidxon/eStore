const { Router } = require("express");
const router = Router();
const Header = require("../models/header");
const Header2 = require("../models/header2");
const Category = require("../models/category");
const AwesomeT = require("../models/awesomeT");
const Awesome = require("../models/awesome");
const Menu = require("../models/menu");
const Feature = require("../models/feature");
const Recent = require("../models/recent");
const Sms = require("../models/sms");
const Product2 = require("../models/product2")
const Footer = require("../models/footer");
router.get("/" , async(req , res)=>{
    try {
        const header = await Header.find();
        const header2 = await Header2.find();
        const category = await Category.find();
        const awesomeT = await AwesomeT.find();
        const awesome = await Awesome.find();
        const menu = await Menu.find();
        const feature = await Feature.find();
        const recent = await Recent.find();
        const product2 = await Product2.find();
        const footer = await Footer.find();
        const sms = await Sms.find();
        res.render("index" , {title:  "Home" , activeHome:true, header,header2,category,awesomeT, awesome,menu,feature,recent,product2,recent,footer});
    } catch (error) {
     console.log(error);   
    };
});
router.get("/", async (req, res) => {
    const comment = await Sms.find();
    console.log(comment);
    res.render("/", { layout: "main",});
});

router.post("/", async (req, res) => {
    const comment = new Sms({
        comment: req.body.comment,
    });

    await comment.save();
    res.redirect("/");
});
router.get('/:url', async (req, res) => {
    const { url } = req.params;
    try {
        const result  =await Menu.find()
        const menu = await Menu.findOne({ url });
        if (!menu) {
            return res.status(404).send('Page not found');
        }
        res.render(menu.sahifa, { title:menu.name , menu:result }); // Assuming `sahifa` is the template name
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;