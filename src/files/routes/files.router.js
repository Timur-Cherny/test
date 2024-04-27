const router = require('express').Router()
const fileController = require('../controllers/files.controllers.js')
const upload = require('../middlewares/multer-middelware.js')
const {
	getListValidators,
	getByIdValidators,
	downloadByIdValidators,
	putValidators,
	deleteByIdValidators,
	uploadValidators
} = require('../validators/file-validator.js')

router.post('/upload', upload.single('file'), fileController.uploadFile)
router.get('/list', getListValidators, fileController.getList)
router.get('/:id', getByIdValidators, fileController.getOne)
router.get('/download/:id', downloadByIdValidators, fileController.download)
router.put('/update/:id', putValidators, upload.single('file'), fileController.updateOne)
router.delete('/delete/:id', deleteByIdValidators, fileController.deleteOne)

module.exports = router