const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
    destination(req , file , cb){
        cb(null , "images/sub")
    },
    filename(req , file , cb){
        cb(null , new Date().toISOString().replace(/:/g, "-")+"-"+file.originalname);
    }
});



const upload = multer({
    storage,
    limits:{
        fileSize: 10*1024*1024
    },
});

const uploadFile = upload.single("image2");
module.exports = uploadFile;