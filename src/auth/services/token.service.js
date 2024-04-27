const ApiError = require('../../exceptions/api-error.js')
const authRepository = require('../repositories/auth.repository.js')
const jwt = require('jsonwebtoken')

class TokenService { 
	generateTokenPair(payload) { 
		const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN })
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN })
		return {
			accessToken,
			refreshToken
		}
	}

	async isValidAccesToken(token) {
		try {
			const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
			const saveTokens = await authRepository.getOneTokensByUserId(id)
			if (token !== saveTokens?.accessToken) return false
			return true
		} catch (err) { 
			throw ApiError.UnathorizedException(err)
		}
	}

	async isValidRefreshToken(token) {
		try {
			const { id } = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
			const saveTokens = await authRepository.getOneTokensByUserId(id)
			if (token !== saveTokens?.refreshToken) return false
			return true
		} catch (err) { 
			throw ApiError.UnathorizedException(err)
		}
	}

	decodeToken(token) { 
		return jwt.decode(token)
	}

	async saveTokens(userId, tokens) { 
		const tokenData = await authRepository.getOneTokensByUserId(userId)
		if (tokenData) {
			return authRepository.updateTokens(userId, tokens)
		}
		return authRepository.createTokens(userId, tokens)
	}
}

module.exports = new TokenService();