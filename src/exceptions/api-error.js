const { errorMessageStackGenerator } = require('../untils/utils');

module.exports = class ApiError extends Error { 
	status;
	errrors;
	message;

	constructor(status, message, error) { 
		super()
		this.message = message
		this.status = status
		this.error = error
	}

	static UnathorizedException(errors) { 
		const message = errorMessageStackGenerator(errors)
		return new ApiError(401, message, 'Unathorized')
	}

	static BadRequestException(errors) {
		const message = errorMessageStackGenerator(errors)
		return new ApiError(400, message, 'Bad Request')
	}

	static ConflictException(errors) {
		const message = errorMessageStackGenerator(errors)
		return new ApiError(409, message, 'Conflict')
	}
}