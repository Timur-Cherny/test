const ApiError = require('../../exceptions/api-error.js');
const authService = require('../services/auth.service.js')
const { validationResult } = require('express-validator');
class AuthController { 
	async signUp(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const { id, password } = req.body
			const { refreshToken, accessToken } = await authService.signUp(id, password)
			res.cookie('refresh_token',
				refreshToken,
				{
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: false,
					secure: true,
					sameSite: 'None'
				}
			)
			res.send({accessToken})
		} catch (error) {
			next(error)
		}
	}	
	
	async signIn(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.BadRequestException(chekErrors.array())
			}
			const { id, password } = req.body
			const { refreshToken, accessToken } = await authService.signIn(id, password)
			res.cookie('refresh_token',
				refreshToken,
				{
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true
				}
			)
			res.send({accessToken})
		} catch (error) {
			next(error)
		}
	}	

	async refresh(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.UnathorizedException(chekErrors.array())
			}
			const { refresh_token } = req.cookies
		  const { refreshToken, accessToken } = await authService.refresh(refresh_token)
			res.cookie('refresh_token',
				refreshToken,
				{
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: false,
					secure: true,
					sameSite: 'None'
				}
			)
			res.send({accessToken})
		} catch (error) {
			next(error)
		}
	}

	async info(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.UnathorizedException(chekErrors.array())
			}
			const token = req.header('Authorization')
			const answer = await authService.info(token)
			res.send(answer)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const chekErrors = validationResult(req);
			if (!chekErrors.isEmpty()) { 
				throw ApiError.UnathorizedException(chekErrors.array())
			}
			const { refresh_token } = req.cookies
		  await authService.logout(refresh_token)
			res.cookie('refresh_token').send()
		} catch (error) {
			next(error)
		}	
	}
};

module.exports = new AuthController();