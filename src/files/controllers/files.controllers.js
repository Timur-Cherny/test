const { validationResult } = require('express-validator');
const fileService = require('../services/files.service.js');
const ApiError = require('../../exceptions/api-error.js');
const path = require('path');
const fs = require('fs')

class FileController { 

	async uploadFile(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const { file } = req
			if (!file) throw ApiError.BadRequestException('File is required')
			await fileService.uploadFile(file)
			res.send()
		} catch (error) {
			next(error)
		}
	}	
	
	async getList(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				console.log(chekErrors)
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const page = Number(req.query?.page) || 1
			const list_size = Number(req.query.list_size) || 10
			const asnwer = await fileService.getList(page, list_size)
			res.send(asnwer)
		} catch (error) {
			next(error)
		}
	}	

	async getOne(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const id = Number(req.params.id)
			const answer = await fileService.getOne(id)
			res.json(answer).send()
		} catch (error) {
			next(error)
		}
	}

	async updateOne(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const { file, params: { id } } = req
			if (!file) throw ApiError.BadRequestException('File is required')
			await fileService.updateOne(id, file)
			res.send()
		} catch (error) {
			next(error)
		}
	}

	async download(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const { id } = req.params;
			const { name, mimetype, originalname } = await fileService.getOne(Number(id))

			res.setHeader('Content-Disposition', `attachment; filename="${originalname}"`);
			res.setHeader('Content-Type', mimetype);
			const filePath = path.join('static', name);
      res.download(filePath, originalname);
		} catch (error) {
			next(error)
		}
	}

	async deleteOne(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const { id } = req.params;
			await fileService.deleteOne(id)
			res.send()
		} catch (error) {
			next(error)
		}
	}
};

module.exports = new FileController();