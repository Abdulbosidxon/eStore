const { Router } = require("express");
const router = Router();
const About = require("../models/about");
const AwesomeT = require("../models/awesomeT");
const Awesome = require("../models/awesome");
const Menu = require("../models/menu");

router.get("/", async(req, res) => {
    const about = await About.find();
    const awesomeT = await AwesomeT.find();
    const awesome = await Awesome.find();
    const menu = await Menu.find();

    res.render("about", { title: "About", activePricing: true,about,awesomeT,awesome,menu});
});

module.exports = router;