const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const dotEnv = require("dotenv");
dotEnv.config();
const { allowInsecurePrototypeAccess } = require("@handlebars/allow-prototype-access")
const Handlebars = require("handlebars")
const URL = process.env.URL;
const app = express();
const flash = require("connect-flash")
const path = require("path")
const session = require("express-session");
const mbSession = require("connect-mongodb-session")(session);
const bodyParser = require("body-parser");
const Menu = require("./models/menu")
const PORT = process.env.PORT;
const exphbs = require("express-handlebars");
async function start() {
    try {
        await mongoose.connect(URL);
        app.listen(PORT, () => {
            console.log(`Server ${PORT} portda ishladi`);
        });
    } catch (error) {
        console.log(error)
    }
}
start();
const menu = require("./models/menu")
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        incr: function (index) { return index + 1 },
        katta: function (index) { return index >= 1 },
        kopaytirish:function(a,b){
            return a * b;
        },
        narx:function formatPrice(price) {
            return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        },
    },
    
});
const store = new mbSession({
    collection: 'sessions',
    uri: URL
});
app.use(session({
    secret: 'maxfiy kalit',
    resave: false,
    saveUninitialized: false,
    store
}));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "page");
app.use(express.static("public"));
app.use("/images" , express.static(path.join(__dirname, "images")));
app.use('/admin/header', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/header2', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/category', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/register', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/awesomeT', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/awesome', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/menu', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/feature', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/recent', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/about', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/product', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/product2', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/productImg', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/cart', express.static(path.join(__dirname,"public","admin")));
app.use('/admin/footer', express.static(path.join(__dirname,"public","admin")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())
app.use("/admin", require("./routes/Admin"));
app.use("/login", require("./routes/Login"));

app.use("/cart", require("./routes/Cart"));

app.use("/about", require("./routes/About"));
app.use("/product", require("./routes/Product"));
app.use("/", require("./routes/Home"));



app.use(async(req , res)=>{
    const menu = await Menu.find();
    res.status(404).render("notfound" , {title:"Sahifa topilmadi" , menu});
});
