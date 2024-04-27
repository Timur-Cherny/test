const router = require('express').Router();
const authcontroller = require('../controllers/auth.controllers.js')
const { signUpValidators, signInValidators, refreshValidators, accessValidators } = require('../validators/auth-validator.js');

router.post('/signup', signUpValidators, authcontroller.signUp);
router.post('/signin', signInValidators, authcontroller.signIn);
router.post('/signin/new_token', refreshValidators, authcontroller.refresh);
router.get('/info', accessValidators, authcontroller.info);
router.get('/logout', refreshValidators, authcontroller.logout);

module.exports = router