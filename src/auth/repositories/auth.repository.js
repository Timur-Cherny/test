const mysqlDataSource = require('../../db/config/data-source.js');
const UserEntity = require('../../db/entity/user.entity.js');
const TokenEntity = require('../../db/entity/token.entity.js')
class AuthRepository { 
	_userRepositpry = mysqlDataSource.getRepository(UserEntity)
	_tokenRepository = mysqlDataSource.getRepository(TokenEntity)

	async getOneUserById(id) { 
		if (!id) return null
		return await this._userRepositpry.findOne({ where: { id } })
	}

	async createUser(id, hashPassword) { 
		const userModel = this._userRepositpry.create({ id, hashPassword })
		return this._userRepositpry.save(userModel)
	}

	async getOneTokensByUserId(userId) { 
		if (!userId) return null
		return this._tokenRepository.findOne({ where: { user: { id: userId } }  })
	}
	
	async createTokens(userId, data) { 
		const user = await this.getOneUserById(userId)
		const tokenModel = this._tokenRepository.create({ user, ...data })
		return this._tokenRepository.save(tokenModel)
	}
	
	async updateTokens(userId, data) { 
		await this._tokenRepository.update({ user: { id: userId } }, data)
		return this.getOneTokensByUserId(userId)
	}

	async removeTokensByUserId(userid) { 
		await this._tokenRepository.delete({ user: { id: userid } })
	}
}

module.exports = new AuthRepository();
