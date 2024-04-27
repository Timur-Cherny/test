const multer = require('multer');
const ApiError = require('../../exceptions/api-error');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
  Field: {
        name: 'file',
        maxCount: 1
    }
});


module.exports = multer({ storage: storage });