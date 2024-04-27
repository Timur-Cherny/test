const bcrypt = require('bcrypt')
const fs = require('fs/promises');
async function hash(data, salt = 10) { 
	return bcrypt.hash(data, salt)
}

async function compareHash(data, hash) { 
	return bcrypt.compare(data, hash)
}

function errorMessageStackGenerator(errors = []) { 
	const stack = []
	if (Array.isArray(errors)) {
    errors.forEach(error => {
      if (error?.message) stack.push(error.message);
      if (error?.msg) stack.push(error.msg);
    });
		return stack.flat()
	} else if (errors?.message) {
		stack.push(errors.message)
		return stack
	} 
	stack.push(errors)
	return stack
}

async function rmFile(path) { 
	await fs.rm(path)
}

module.exports = { hash, compareHash, errorMessageStackGenerator, rmFile }