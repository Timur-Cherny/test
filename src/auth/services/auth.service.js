const authRepository = require('../repositories/auth.repository.js')
const tokenService = require('./token.service.js')
const TokenPayloadDto = require('../dtos/token.dto.js')
const { hash, compareHash } = require('../../untils/utils.js')
const ApiError = require('../../exceptions/api-error.js')
const { error } = require('console')

class AuthService { 
	async signUp(id, password) {
		const candidate = await authRepository.getOneUserById(id)
		if (candidate) throw ApiError.ConflictException('Email or phone exists')
	
		const hashPassword = await hash(password)
		const user = await authRepository.createUser(id, hashPassword)

		const tokenPayloadDto = new TokenPayloadDto(user)
		const tokens = tokenService.generateTokenPair({ ...tokenPayloadDto })
		await tokenService.saveTokens(user.id, tokens)

		return {
			...tokens,
		}
		
	}	
	
	async signIn(userId, password) {
		const user = await authRepository.getOneUserById(userId)
		if (!user) { 
			throw ApiError.BadRequestException('Incorrect id or password')
		}
		const isCorrectPass = await compareHash(password, user.hashPassword)
		if (!isCorrectPass) { 
			throw ApiError.BadRequestException('Incorrect id or password')
		}

		const tokenPayloadDto = new TokenPayloadDto(user)
		const tokens = tokenService.generateTokenPair({ ...tokenPayloadDto })
		await tokenService.saveTokens(user.id, tokens)

		return tokens
	}	

	async refresh(refreshToken) {
		const { id } = tokenService.decodeToken(refreshToken)
		const user = await authRepository.getOneUserById(id)

		const tokenPayloadDto = new TokenPayloadDto(user)
		const tokens = tokenService.generateTokenPair({ ...tokenPayloadDto })
		await tokenService.saveTokens(user.id, tokens)

		return tokens
	}

	async info(bearerToken) {
		const accessToken = bearerToken.replace('Bearer ', '')
		const { id } = tokenService.decodeToken(accessToken)

		const user = await authRepository.getOneUserById(id)
		return { id: user.id }
	}

	async logout(refreshToken) {
		const { id } = tokenService.decodeToken(refreshToken)
		await authRepository.removeTokensByUserId(id)
		return;
	}
}

module.exports = new AuthService();