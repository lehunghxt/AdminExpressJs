var multer = require('multer');
const path =require('path')
const fs = require('fs')
var randomstring = require("randomstring");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = `./public/uploads/${req.session.CurrentUser._id}`;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null , `${randomstring.generate()}.${ext}`);     
    }
})
const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(null, false);
    }
    cb(null, true);
};
var upload = multer({storage:storage, fileFilter: imageFilter});
module.exports = upload;