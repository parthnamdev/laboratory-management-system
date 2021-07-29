const path = require("path");
const multer = require("multer");

const Profile = require('../models/profileModel');

var storage = multer.memoryStorage({
    destination: function(req, file, cb) {
        cb(null, "");
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, 'logo' + ext);
    }
})

var upload = (req, res, next) => {
    const uploadFile = multer({
            storage: storage,
            fileFilter: function(req, file, callback) {
                // console.log(file);
                if(
                    file.mimetype == "image/png" ||
                    file.mimetype == "image/jpg" ||
                    file.mimetype == "image/jpeg"
                ){
                    callback(null, true)
                } else {
                    console.log("only png and jpg");
                    return callback(null, false)
                }
            },
            limits: {
                fileSize: 1024 * 1024 * 11
            }
        }).single('media');

    uploadFile(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            Profile.find({}).then(found => {
                if(found.length > 0){
                    res.render('profile', {alert: "File not supported or error uploading file", profile: found[0]});
                } else {
                    res.render('profile', {alert: "File not supported or error uploading file", profile: {}});
                }
            }).catch(err => {
                res.render('err', {error: err});
            })
            
        } else if (err) {
            res.render('err', {error: err});
        } else {
            next();
        }
        // Everything went fine. 
        
    })
}


module.exports = upload;