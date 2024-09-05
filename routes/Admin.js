const {Router} = require("express");
const multer = require("multer");
const fs = require("fs").promises;
const flash = require("connect-flash")
const bcrypt = require("bcryptjs");
const Header = require("../models/header");
const fileHeader = require("../middelwere/fileHeader");
const fileProduct = require("../middelwere/fileProduct");
const fileProduct2 = require("../middelwere/fileProduct2");
const Header2 = require("../models/header2");
const fileHeader2 = require("../middelwere/fileHeader2");
const Category = require("../models/category");
const Awesome = require("../models/awesome");
const About = require("../models/about")
const Product = require("../models/product");
const Product2 = require("../models/product2");
const Footer = require("../models/footer");
const AwesomeT = require("../models/awesomeT");
const ProductImg = require("../models/ProductImg");
const fileFeature = require("../middelwere/fileFeature");
const fileProductImg = require("../middelwere/fileProductImg");
const Sub = require("../middelwere/sub");
const Sub2 = require("../middelwere/sub2");
const Sub3 = require("../middelwere/sub3");
const fileRecent = require("../middelwere/fileRecent");
const FileAbout = require("../middelwere/fileAbout");
const path = require("path");
const User = require("../models/user");
const Sms = require("../models/sms");
const Verification = require("../middelwere/verification");
const Menu = require("../models/menu");
const Feature = require("../models/feature");
const Recent = require("../models/recent")
const router = Router();
const { title } = require("process");
const { error } = require("console");
const verification = require("../middelwere/verification");
router.get("/" ,Verification, (req , res)=>{
    res.render("admin" , {layout:"admin"});
});
router.get("/header",Verification, async (req, res) => {
    const header = await Header.find();
    // console.log(header);
    res.render("adminAdd/adminHeader", { layout: "admin" , header});
});
router.post("/header/add",Verification, fileHeader, async (req, res) => {
    const header = new Header({
        title: req.body.title,
        comment: req.body.comment,
        headerImg:req.file.filename
    });
    await header.save();
    // console.log(header.headerImg);
    res.redirect("/admin/header");
})
   
router.get("/header/:id",Verification,  async (req, res) => {
    try {
        const header = await Header.findById(req.params.id);
        res.render("adminAdd/adminHeaderEdit", { layout: "admin", header });
    } catch (error) {
        console.log("error")
    }
});
router.post("/header/edit",Verification, fileHeader, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/header", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.headerImg = req.file.filename
        };
        await Header.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/header");
    } catch (error) {
        console.log(error);
    }
});
router.post("/header/delete",Verification, async (req, res) => {
    try {
        await Header.findOneAndDelete(req.body.id);
        res.redirect("/admin/header");
    } catch (error) {
        console.log(error);
    }
});
// header2 start
router.get("/header2",Verification, async (req, res) => {
    const header2 = await Header2.find();
    // console.log(header);
    res.render("adminAdd/adminHeader2", { layout: "admin" , header2});
});
router.post("/header2/add",Verification, fileHeader2, async (req, res) => {
    const header2 = new Header2({
        title: req.body.title,
        comment: req.body.comment,
        price: req.body.price,
        image:req.file.filename
    });
    await header2.save();
    res.redirect("/admin/header2");
})
   
router.get("/header2/:id",Verification,  async (req, res) => {
    try {
        const header2 = await Header2.findById(req.params.id);
        res.render("adminAdd/adminHeader2Edit", { layout: "admin", header2 });
    } catch (error) {
        console.log("error")
    }
});
router.post("/header2/edit",Verification, fileHeader2, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/header2", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.image = req.file.filename
        };
        await Header2.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/header2");
    } catch (error) {
        console.log(error);
    }
});
router.post("/header2/delete",Verification, async (req, res) => {
    try {
        await Header2.findOneAndDelete(req.body.id);
        res.redirect("/admin/header2");
    } catch (error) {
        console.log(error);
    }
});


router.get("/category" ,Verification, async(req , res)=>{
    try {
        const fayl = path.join(__dirname, "../", "public", "remixicon", "remixicon.glyph.json");
        const category = await Category.find();
        const data = await fs.readFile(fayl, 'utf-8');
        const ob = JSON.parse(data);
        const icon_name = Object.keys(ob);
        res.render("adminAdd/adminCategory", { layout: "admin", ikonka_nomi: icon_name, category }); 
    } catch (error) {
        console.log(error)
    }
})
router.post("/category/add",Verification, async (req, res) => {
    try {
        //   const {ikonka , nomi , manzil} = req.body;  
        const category = new Category({
            ikonka:req.body.ikonka,
            title:req.body.title,
            manzil:req.body.manzil,
            comment:req.body.comment
        })
        await category.save();
        res.redirect("/admin/category")
    } catch (error) {
        console.log(error);
    }
})
router.get("/category/:id",Verification, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        // console.log(category)
        res.render("adminAdd/adminCategoryEdit", { layout: "admin", category });
    } catch (error) {
        console.log(error);
    }
});
router.post("/category/edit",Verification, async (req, res) => {
    try {
        await Category.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/category");
    } catch (error) {
        console.log(error)
    }
});
router.post("/category/delete",Verification, async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.body.id);
        res.redirect("/admin/category");
    } catch (error) {
        console.log(error);
    }
});
router.get('/register',Verification, async (req, res) => {

    const error = req.flash("error")
    const success = req.flash("success")
    try {
        const foy = await User.find()
        const user = foy.sort((a, b) => a.login.localeCompare(b.login));
        // const user = foy.sort((a , b) => b.login-a.login)
        console.log(user);
        // console.log(saralandi);
        res.render('adminAdd/adminRegister', { layout: "admin", error, success, user })

    } catch (error) {
        console.log(error);
    }
})

router.post('/register/add',Verification, async (req, res) => {
    try {
        const { login, parol } = req.body;
        const alreadyUser = await User.findOne({ login });
        if (alreadyUser) {
            // res.render("adminAdd/adminRegister", {layout:"admin" , error:"Foydalanuvchi mavjud"})
            // res.redirect("/admin/register?error=Foydalanuvchi mavjud")
            req.flash("error", "Bunday foydalanuvchi mavjud")
            res.redirect("/admin/register")
        } else {
            const hashPassword = await bcrypt.hash(parol, 10)
            const user = new User({
                login: login,
                parol: hashPassword
            })
            await user.save();

            // res.redirect("/admin/register?success=Foydalanuvchi qushildi")
            // res.render("adminAdd/adminRegister", {layout:"admin" , success:"Foydalanuvchi qo'shildi"})
            // res.render('/admin/register', {error:'Foydalanuvchi mavjud'} )
            req.flash("success", "Muvaffaqiyatli qo'shildi")
            res.redirect("/admin/register")
        }

    } catch (error) {

    }
})

router.get("/register/:id",Verification, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render("adminAdd/adminRegisterEdit", { layout: "admin", user })
    } catch (error) {
        console.log(error);
    }
});
router.post("/register/edit",Verification, async (req, res) => {
    try {
        const { parol, id } = req.body;
        if (parol == '') {
            req.flash("error", "Parolda o'zgarish bo'lmadi");
            res.redirect("/admin/register");
        }
        else {
            const hashPassword = await bcrypt.hash(parol, 10)
            req.body.parol = hashPassword;
            await User.findByIdAndUpdate(id, req.body)
            req.flash("success", "Parol o'zgartirildi");
            res.redirect("/admin/register");
        }
    } catch (error) {
        console.log(error);
    }
});
router.post("/register/delete",Verification, async (req, res) => {
    try {
        if (req.session.user._id == req.body.id) {
            req.flash("error", "O'chirib bo'lmaydi");
            res.redirect("/admin/register");
        }
        else {
            await User.findByIdAndDelete(req.body.id);
            req.flash("success", "Foydalanuvchi o'chirildi");
            res.redirect("/admin/register");
        }
    } catch (error) {
        console.log(error);
    }
});
// logout
router.get("/logout", verification, async (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect("/")
        })

    } catch (error) {
        console.log(error);
    }
});
router.get("/awesomeT" ,Verification, async(req, res) =>{
    try {
        const awesomeT = await AwesomeT.find();
        res.render("adminAdd/adminAwesomeT", { layout: "admin", awesomeT });
    } catch (error) {
        console.log(error);
    }
})
router.post('/awesomeT/add',Verification, async (req, res) =>{
try {
    const awesomeT = new AwesomeT({
        title:req.body.title
    })
    await awesomeT.save();
    res.redirect('/admin/awesomeT')
} catch (error) {
    console.log(error);
}
})
router.get("/awesomeT/:id",Verification, async (req, res) => {
    try {
        const awesomeT = await AwesomeT.findById(req.params.id);
        res.render("adminAdd/adminAwesomeTEdit", { layout: "admin", awesomeT});
    } catch (error) {
        console.log(error);
    }
});
router.post("/awesomeT/edit",Verification, async (req, res) => {
    try {
        await AwesomeT.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/awesomeT");
    } catch (error) {
        console.log(error)
    }
});
router.post("/awesomeT/delete",Verification, async (req, res) => {
    try {
        await AwesomeT.findByIdAndDelete(req.body.id);
        res.redirect("/admin/awesomeT");
    } catch (error) {
        console.log(error);
    }
});
// awesome start
router.get("/awesome" ,Verification, async(req , res)=>{
    try {
        const fayl = path.join(__dirname, "../", "public", "remixicon", "remixicon.glyph.json");
        const awesome = await Awesome.find();
        const data = await fs.readFile(fayl, 'utf-8');
        const ob = JSON.parse(data);
        const icon_name = Object.keys(ob);
        res.render("adminAdd/adminAwesome", { layout: "admin", ikonka_nomi: icon_name, awesome }); 
    } catch (error) {
        console.log(error)
    }
})
router.post("/awesome/add",Verification, async (req, res) => {
    try {
        //   const {ikonka , nomi , manzil} = req.body;  
        const awesome = new Awesome({
            ikonka:req.body.ikonka,
            title:req.body.title,
            manzil:req.body.manzil,
            comment:req.body.comment
        })
        await awesome.save();
        res.redirect("/admin/awesome")
    } catch (error) {
        console.log(error);
    }
})
router.get("/awesome/:id",Verification, async (req, res) => {
    try {
        const awesome = await Awesome.findById(req.params.id);
  
        res.render("adminAdd/adminAwesomeEdit", { layout: "admin", awesome });
    } catch (error) {
        console.log(error);
    }
});
router.post("/awesome/edit",Verification, async (req, res) => {
    try {
        await Awesome.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/awesome");
    } catch (error) {
        console.log(error)
    }
});
router.post("/awesome/delete",Verification, async (req, res) => {
    try {
        await Awesome.findByIdAndDelete(req.body.id);
        res.redirect("/admin/awesome");
    } catch (error) {
        console.log(error);
    }
});
// menu start
router.get('/menu', async (req, res) => {
    try {
        const directoryPath = path.join(__dirname, '../page/');
        // console.log(`Directory path: ${directoryPath}`);
        const directoryExists = await fs.access(directoryPath).then(() => true).catch(() => false);
        // console.log(directoryExists);
        if (!directoryExists) {
            throw new Error(`Directory does not exist: ${directoryPath}`);
        }
        const files = await fs.readdir(directoryPath);
        const hbsFileNames = files.filter(file => file.endsWith('.hbs')).map(file => path.parse(file).name);
        const menu = await Menu.find();
        // console.log(menu)
        res.render("adminAdd/adminMenu", { title: "Menyu sahifasi", layout: 'admin', faylname:hbsFileNames,menu })
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while reading the directory.');
    }
});

router.post("/menu/add" , async(req , res)=>{
    try {
        const menu = new Menu({
            name:req.body.name,
            url:req.body.url,
            sahifa:req.body.sahifa
        });
        await menu.save();
        res.redirect("/admin/menu")
    } catch (error) {
        console.log(error)
    }
});

router.get("/menu/:id", Verification, async (req, res) => {
    try {
      const directoryPath = path.join(__dirname, '../page/');
      console.log(`Directory path: ${directoryPath}`);
      const directoryExists = await fs.access(directoryPath).then(() => true).catch(() => false);
      console.log(directoryExists);
      if (!directoryExists) {
        throw new Error(`Directory does not exist: ${directoryPath}`);
      }
      const files = await fs.readdir(directoryPath);
      const hbsFileNames = files.filter(file => file.endsWith('.hbs')).map(file => path.parse(file).name);
      const menu = await Menu.findById(req.params.id);
      res.render("adminadd/adminMenuEdit", {layout: 'admin', menu, faylname: hbsFileNames,});
    } catch (error) {
      res.status(500).send('An error occurred while reading the directory.');
      console.log(error);
    }
  });

  router.post("/menu/edit", Verification, async (req, res) => {
    try {
      await Menu.findByIdAndUpdate(req.body.id, req.body);
      res.redirect("/admin/menu");
    } catch (error) {
      console.log(error);
    }
  });

  router.post("/menu/delete", Verification, async (req, res) => {
    try {
      await Menu.findByIdAndDelete(req.body.id);
      res.redirect("/admin/menu");
    } catch (error) {
      console.log(error);
    }
  });

// feature  start 
  router.get("/feature",Verification, async (req, res) => {
    const feature = await Feature.find();
    
    res.render("adminAdd/adminFeature", { layout: "admin" , feature});
});

router.post("/feature/add",Verification, fileFeature, async (req, res) => {
    const feature = new Feature({
        title: req.body.title,
        comment: req.body.comment,
        image:req.file.filename,
        price: req.body.price
    });
    await feature.save();
       res.redirect("/admin/feature");
});
   
router.get("/feature/:id",Verification,  async (req, res) => {
    try {
        const feature = await Feature.findById(req.params.id);
        res.render("adminAdd/adminFeatureEdit", { layout: "admin", feature });
    } catch (error) {
        console.log("error")
    }
});

router.post("/feature/edit",Verification, fileFeature, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/feature", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.image = req.file.filename
        };
        await Feature.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/Feature");
    } catch (error) {
        console.log(error);
    }
});

router.post("/feature/delete",Verification, async (req, res) => {
    try {
        await Feature.findOneAndDelete(req.body.id);
        res.redirect("/admin/feature");
    } catch (error) {
        console.log(error);
    }
});

router.get("/feature/:id/sub", Sub, async (req, res) => {
    const featureId = req.params.id;
    const feature = await Feature.findById(featureId).populate("batafsil");
    res.render("adminAdd/featureSUB", { layout: "sub", id: featureId, feature: feature, subItems: feature.batafsil });
  });
  

  router.post("/feature/:feature_id/sub/add", Sub, Verification, async (req, res) => {
    const featureId = req.body.feature_id; // req.body emas req.body.feature_id bo'lishi kerak
    const feature = await Feature.findById(featureId);
    if (!feature) {
      return res.status(404).send('Feature not found');
    }
    const image2 = req.file.filename;
  
    const nextId = feature.batafsil.length ? Math.max(...feature.batafsil.map(d => d.id)) + 1 : 1;
    const newDetail = { id: nextId, image2: image2 };
    feature.batafsil.push(newDetail);
    await feature.save();
    // console.log(feature.batafsil);
    res.redirect(`/admin/feature`);
  });


  router.post("/feature/:feature_id/sub/delete", async (req, res) => {
    try {
      const featureId = req.params.feature_id; // Correct parameter name
      const subId = req.body.feature_id;
  
      await Feature.findByIdAndUpdate(
        featureId,
        { $pull: { batafsil: { id: subId } } },
        { new: true }
      );
  
      res.redirect("/admin/feature");
    } catch (error) {
      console.log(error);
      res.status(500).send("Xatolik yuz berdi");
    }
  });
  
// recent start
router.get("/recent",Verification, async (req, res) => {
    const recent = await Recent.find();
    
    res.render("adminAdd/adminRecent", { layout: "admin" , recent});
});

router.post("/recent/add",Verification, fileRecent, async (req, res) => {
    const recent = new Recent({
        title: req.body.title,
        comment: req.body.comment,
        image:req.file.filename,
        price: req.body.price,
        description: req.body.description,
        like: req.body.like,
        btnName: req.body.btnName,
    });
    await recent.save();
       res.redirect("/admin/recent");
});
   
router.get("/recent/:id",Verification,  async (req, res) => {
    try {
        const recent = await Recent.findById(req.params.id);
        res.render("adminAdd/adminRecentEdit", { layout: "admin", recent });
    } catch (error) {
        console.log("error")
    }
});

router.post("/recent/edit",Verification, fileRecent, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/recent", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.image = req.file.filename
        };
        await Recent.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/Recent");
    } catch (error) {
        console.log(error);
    }
});

router.post("/recent/delete",Verification, async (req, res) => {
    try {
        await Recent.findOneAndDelete(req.body.id);
        res.redirect("/admin/recent");
    } catch (error) {
        console.log(error);
    }
});


router.get("/recent/:id/sub2", Sub2, async (req, res) => {
    const recentId = req.params.id;
    const recent = await Recent.findById(recentId).populate("batafsil");
    res.render("adminAdd/recentSub2", { layout: "sub", id: recentId, recent: recent, sub2Items: recent.batafsil });
  });
  

  router.post("/recent/:recent/sub2/add", Sub2, Verification, async (req, res) => {
    const recentId = req.body.recent_id; // req.body emas req.body.feature_id bo'lishi kerak
    const recent = await Recent.findById(recentId);
    if (!recent) {
      return res.status(404).send('Recent not found');
    }
    const image2 = req.file.filename;
  
    const nextId = recent.batafsil.length ? Math.max(...recent.batafsil.map(d => d.id)) + 1 : 1;
    const newDetail = { id: nextId, image2: image2 };
    recent.batafsil.push(newDetail);
    await recent.save();
    // console.log(feature.batafsil);
    res.redirect(`/admin/recent`);
  });

  router.post("/recent/:recent_id/sub/delete", async (req, res) => {
    try {
      const recentId = req.params.recent_id; // Correct parameter name
      const subId = req.body.recent_id;
  
      await recent.findByIdAndUpdate(
        recentId,
        { $pull: { batafsil: { id: sub2Id } } },
        { new: true }
      );
  
      res.redirect("/admin/recent");
    } catch (error) {
      console.log(error);
      res.status(500).send("Xatolik yuz berdi");
    }
  });

  // about
  router.get("/about",Verification, async (req, res) => {
    const about = await About.find();
    // console.log(header);
    res.render("adminAdd/adminAbout", { layout: "admin" , about});
});

router.post("/about/add",Verification, FileAbout, async (req, res) => {
    const about = new About({
        title: req.body.title,
        comment: req.body.comment,
        name: req.body.name,
        image:req.file.filename
    });
    await about.save();
    res.redirect("/admin/about");
});
   
router.get("/about/:id",Verification,  async (req, res) => {
    try {
        const about = await About.findById(req.params.id);
        res.render("adminAdd/adminAboutEdit", { layout: "admin", about });
    } catch (error) {
        console.log("error")
    }
});

router.post("/about/edit",Verification, FileAbout, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/about", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.image = req.file.filename
        };
        await About.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/about");
    } catch (error) {
        console.log(error);
    }
});

router.post("/about/delete",Verification, async (req, res) => {
    try {
        await About.findOneAndDelete(req.body.id);
        res.redirect("/admin/about");
    } catch (error) {
        console.log(error);
    }
});
router.get("/product", Verification,async (req, res) => {
    const product = await Product.find();
    // console.log(header);
    res.render("adminAdd/adminProduct", { layout: "admin" , product});
});

router.post("/product/add",Verification, fileProduct, async (req, res) => {
    const product = new Product({
        title: req.body.title,
        name: req.body.name,
        image:req.file.filename
    });
    await product.save();
    res.redirect("/admin/product");
});

router.get("/product/:id",Verification,  async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render("adminAdd/adminProductEdit", { layout: "admin", product });
    } catch (error) {
        console.log("error")
    }
});

router.post("/product/edit",Verification, fileProduct, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/product", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.image = req.file.filename
        };
        await Product.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/product");
    } catch (error) {
        console.log(error);
    }
});

router.post("/product/delete",Verification, async (req, res) => {
    try {
        await Product.findOneAndDelete(req.body.id);
        res.redirect("/admin/product");
    } catch (error) {
        console.log(error);
    }
});

router.get("/product/:id/sub3", Sub3, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("batafsil");
    res.render("adminAdd/productSub3", { layout: "sub", id: productId, product: product, sub3Items: product.batafsil });
  });
  

  router.post("/product/:product/sub3/add", Sub3, Verification, async (req, res) => {
    const productId = req.body.product_id; // req.body emas req.body.feature_id bo'lishi kerak
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('product not found');
    }
    const image2 = req.file.filename;
  
    const nextId = product.batafsil.length ? Math.max(...product.batafsil.map(d => d.id)) + 1 : 1;
    const newDetail = { id: nextId, image2: image2 };
    product.batafsil.push(newDetail);
    await product.save();
    // console.log(feature.batafsil);
    res.redirect(`/admin/product`);
  });

  router.post("/product/:product_id/sub/delete", async (req, res) => {
    try {
      const productId = req.params.product_id; // Correct parameter name
      const subId = req.body.product_id;
  
      await product.findByIdAndUpdate(
        productId,
        { $pull: { batafsil: { id: sub3Id } } },
        { new: true }
      );
  
      res.redirect("/admin/product");
    } catch (error) {
      console.log(error);
      res.status(500).send("Xatolik yuz berdi");
    }
  });

router.get("/product2", Verification,async (req, res) => {
    const product2 = await Product2.find();
    // console.log(header);
    res.render("adminAdd/adminProduct2", { layout: "admin" , product2});
})

router.post("/product2/add",Verification, fileProduct2, async (req, res) => {
    const product2 = new Product2({
       
        image:req.file.filename
    });
    await product2.save();
    res.redirect("/admin/product2");
});

router.get("/product2/:id",Verification,  async (req, res) => {
    try {
        const product2 = await Product2.findById(req.params.id);
        res.render("adminAdd/adminProduct2Edit", { layout: "admin", product2 });
    } catch (error) {
        console.log("error")
    }
});

router.post("/product2/edit",Verification, fileProduct2, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/product2", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.image = req.file.filename
        };
        await Product2.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/product2");
    } catch (error) {
        console.log(error);
    }
});

router.post("/product2/delete",Verification, async (req, res) => {
    try {
        await Product2.findOneAndDelete(req.body.id);
        res.redirect("/admin/product2");
    } catch (error) {
        console.log(error);
    }
});

router.get("/", verification, async (req, res) => {
    const comment = await Sms.find();
    res.render("admin", { layout: "admin" });
});

router.get("/comment", async (req, res) => {
    const comment = await Sms.find();
    // console.log(footer);
    res.render("adminAdd/adminSms", {
        layout: "admin", comment
    })
});

// ProductImg
router.get("/productImg", Verification,async (req, res) => {
    const productImg = await ProductImg.find();
    // console.log(header);
    res.render("adminAdd/adminProductImg", { layout: "admin" , productImg});
});

router.post("/productImg/add",Verification, fileProductImg, async (req, res) => {
    const productImg = new ProductImg({
       
        image:req.file.filename
    });
    await productImg.save();
    res.redirect("/admin/productImg");
});

router.get("/productImg/:id",Verification,  async (req, res) => {
    try {
        const productImg = await ProductImg.findById(req.params.id);

        res.render("adminAdd/adminProductImgEdit", { layout: "admin", productImg });
    } catch (error) {
        console.log("error")
    }
});


router.post("/productImg/edit",Verification, fileProductImg, async (req, res) => {
    try {
        if (req.file) {
            const oldImg = path.join(__dirname, "../images/productImg", req.body.oldImg);
            fs.unlink(`${oldImg}`, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            req.body.image = req.file.filename
        };
        await ProductImg.findByIdAndUpdate(req.body.id, req.body);
        res.redirect("/admin/productImg");
    } catch (error) {
        console.log(error);
    }
});

router.post("/productImg/delete",Verification, async (req, res) => {
    try {
        await ProductImg.findByIdAndDelete(req.body.id);
        res.redirect("/admin/productImg");
    } catch (error) {
        console.log(error);
    }
});
// footer
router.get("/footer", Verification,async (req, res) => {
    const footer = await Footer.find();
    // console.log(header);
    res.render("adminAdd/adminFooter", { layout: "admin" , footer});
})

router.post("/footer/add",Verification, async (req, res) => {
    const footer = new Footer({
        title: req.body.title,
    });
    await footer.save();
    res.redirect("/admin/footer");
})

router.get("/footer/:id",Verification,  async (req, res) => {
    try {
        const footer = await Footer.findById(req.params.id);
        res.render("adminAdd/adminFooterEdit", { layout: "admin", footer });
    } catch (error) {
        console.log("error")
    }
});

router.post("/footer/edit",Verification, async (req , res) => {
    try {
        await Footer.findByIdAndUpdate(req.body.id , req.body);
        res.redirect("/admin/footer");
    } catch (error) {
        console.log(error)
    }
});

router.post("/footer/delete",Verification, async (req, res) => {
    try {
        await Footer.findOneAndDelete(req.body.id);
        res.redirect("/admin/footer");
    } catch (error) {
        console.log(error);
    }
});

router.get("/footer/:id/sub4", async (req, res) => {
    const footerId = req.params.id;
    const footer = await Footer.findById(footerId).populate("batafsil");
    res.render("adminAdd/footerSub4", { layout: "sub", id: footerId, footer: footer, sub4Items: footer.batafsil });
  });
  

  router.post("/footer/:footer/sub4/add", Verification, async (req, res) => {
    const footerId = req.body.footer_id; // req.body emas req.body.feature_id bo'lishi kerak
    const footer = await Footer.findById(footerId);
    if (!footer) {
      return res.status(404).send('footer not found');
    }
    const text = req.body.text;
  
    const nextId = footer.batafsil.length ? Math.max(...footer.batafsil.map(d => d.id)) + 1 : 1;
    const newDetail = { id: nextId, text: text };
    footer.batafsil.push(newDetail);
    await footer.save();
    // console.log(feature.batafsil);
    res.redirect(`/admin/footer`);
  });

  router.post("/footer/:footer_id/sub/delete", async (req, res) => {
    try {
      const footerId = req.params.footer_id; // Correct parameter name
      const subId = req.body.footer_id;
  
      await Footer.findByIdAndUpdate(
        footerId,
        { $pull: { batafsil: { id: sub4Id } } },
        { new: true }
      );
  
      res.redirect("/admin/footer");
    } catch (error) {
      console.log(error);
      res.status(500).send("Xatolik yuz berdi");
    }
  });
module.exports = router;