const multer = require('multer');
const ApiError = require('../exceptions/api-error.js')
const fs = require('fs')
module.exports = function (err, req, res, next) { 
	if (err instanceof ApiError) {
		return res.
			status(err.status).
			send({
				message: err.message,
				statusCode: err.status,
				error: err.error
			})
	}
	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: [`Unexpected field in from-data: ${err.field}`], error: 'Bad Request', statusCode: 400 });
    }
  }
	console.log(err)
	return res.status(500).send({ message: 'Internal server error', staus: 500 })
}