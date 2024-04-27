module.exports = class TokenPayloadDto { 
	id;
	constructor(model) { 
		this.id = model.id
	}
}