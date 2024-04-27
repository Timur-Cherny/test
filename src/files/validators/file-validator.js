const { query, param,dy } = require('express-validator');
const ApiError = require('../../exceptions/api-error.js');
const { isNumeric } = require('validator');
const upload = require('../middlewares/multer-middelware.js');
const multer = require('multer');

const limitValidator = query('list_size').custom((value) => {
  if (value && !isNumeric(value)) {
    throw ApiError.BadRequestException(`Invalid list_size. It must be a number.`);
  }
  return true;
});

const pageValidator = query('page').custom((value) => {
  if (value && !isNumeric(value)) {
    throw ApiError.BadRequestException(`Invalid page. It must be a number.`);
  }
  return true;
});

const idValidator = param('id').custom((value) => {
  if (!isNumeric(value)) {
    throw ApiError.BadRequestException(`Invalid id. It must be a number.`);
  }
    return true;
});


module.exports = {
  putValidators: [idValidator],
  getByIdValidators: [idValidator],
  downloadByIdValidators: [idValidator],
  getListValidators: [pageValidator, limitValidator],
  deleteByIdValidators: [idValidator]
};
