const path = require('path');
const fileRepository = require('../repositories/files.repository.js')
const { rmFile } = require('../../untils/utils.js');
const ApiError = require('../../exceptions/api-error.js');

class FileService { 

	async uploadFile(file) {
		try {
			const { originalname, mimetype, size, filename: name } = file;
			const extension = name.split('.').pop();
			const uploadDate = new Date();
			const fileData = {
				name,
				originalname,
				mimetype,
				size,
				extension,
				uploadDate
			}
			await fileRepository.createFileInfo(fileData)
		} catch (e) { 
			await rmFile(path.join('static', file.name))
			throw e
		}
	}	
	
	async getList(page, listSize) {
		const skip = (page - 1) * listSize;

		const [files, totalCount] = await fileRepository.getListFilePagination(skip, listSize);
		
		const totalPages = Math.ceil(totalCount / listSize);

		return {
			files, 
			totalPages,
			currentPage: page,
		}	
	}	

	async getOne(id) {
		const fileInfo = await fileRepository.getOneFileById(id)
		if (!fileInfo) { 
			throw ApiError.BadRequestException(`File with id: ${id} not found`)
		}
		return fileInfo
	}

	async updateOne(id, updatedFile) {
		try {
			const file = await this.getOne(id)

			const { originalname , mimetype, size, filename: name } = updatedFile;
			const extension = name.split('.').pop();
			const uploadDate = new Date();
			const fileData = {
				name,
				originalname,
				mimetype,
				size,
				extension,
				uploadDate
			}

			await fileRepository.updateFileInfo(id, fileData)
			await rmFile(path.join('static', file.name));
		
		} catch (error) { 
			await rmFile(updatedFile.path)
			throw error;
		}
	}

	async download(id) {
		const file = await this.getOne(id)
		return path.join('static', file.name)
	}

	async deleteOne(id) {
		const file = await this.getOne(id)
		await rmFile(path.join('static', file.name))
		await fileRepository.removeFileById(file.id)
	}
}

module.exports = new FileService()