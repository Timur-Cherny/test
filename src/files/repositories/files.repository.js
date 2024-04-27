const path = require('path');
const mysqlDataSource = require('../../db/config/data-source.js');
const FileInfoEntity = require('../../db/entity/file-info.entity.js');
const { rmFile } = require('../../untils/utils.js');
const { error } = require('console');

class FileRepository {
	_fileRepositpry = mysqlDataSource.getRepository(FileInfoEntity)

	async createFileInfo(data) { 
		const fileInfoModel =  this._fileRepositpry.create(data)
		return await this._fileRepositpry.save(fileInfoModel)
	}

	async getOneFileById(id) { 
		if (!id) return null
		return this._fileRepositpry.findOne({ where: { id } })
	}

	async getListFilePagination(skip, take) { 
		return this._fileRepositpry.findAndCount({ skip, take })
	}

	async updateFileInfo(id, updateData) { 
		return this._fileRepositpry.update(id, updateData)
	}

	async removeFileById(id) { 
		await this._fileRepositpry.delete(id)
	}
}

module.exports = new FileRepository()