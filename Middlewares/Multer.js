const multer = require('multer')
exports.storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads')
      },
      filename: function (req, file, cb) {
        return cb(null, `${Date.now()}_${file.originalname}`)
      }
})