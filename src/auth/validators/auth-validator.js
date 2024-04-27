const ApiError = require('../../exceptions/api-error.js');
const tokenService = require('../services/token.service.js');

const { body, cookie, header } = require('express-validator');
const { isEmail, isLength} = require('validator');
const { PhoneNumberUtil } = require('google-libphonenumber');

const phoneUtil = PhoneNumberUtil.getInstance();

const idValidator = body('id').custom((value) => {
  if (isEmail(value)) {
    return true;
  }
  try {
    const parsedNumber = phoneUtil.parse(value);
    isValid = phoneUtil.isValidNumber(parsedNumber);
    if (isValid) {
        return true;
    } 
    throw new Error()
  } catch (e) { 
      throw ApiError.BadRequestException(`Invalid id. It must be either an email or a phone number in international format.`);
  }


});

const passwordValidator = body('password').custom((value) => {
  if (!isLength(value, {min: 6, max: 20 })) {
    throw ApiError.BadRequestException(`Invalid password. Length must be at least 6 characters.`);
  }
  return true;
});

const refreshTokenValidator = cookie('refresh_token').custom(async (value) => {
  const isValidToken = await tokenService.isValidRefreshToken(value)
  if (!isValidToken) { 
    throw ApiError.UnathorizedException()
  }
  return true;
});

const accessTokenValidator = header('Authorization').custom(async (value) => {
  const accessToken = value?.replace('Bearer ', '')
  const isValidToken = await tokenService.isValidAccesToken(accessToken)
  if (!isValidToken) { 
    throw ApiError.UnathorizedException('Invalid token')
  }
  return true;
});

// Экспортируем наш пользовательский валидатор
module.exports = {
  signUpValidators: [
    idValidator,
    passwordValidator
  ],
  signInValidators: [idValidator],
  refreshValidators: [refreshTokenValidator],
  accessValidators: [accessTokenValidator]
};
