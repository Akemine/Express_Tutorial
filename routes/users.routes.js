const { ensureAuthenticated } = require('../config/security.config');
const { signup, signupForm, uploadImage } = require('../controllers/users.controller');
const router = require('express').Router();

router.get('/signup/form', signupForm);
router.post('/signup', signup);
router.post('/update/image', ensureAuthenticated, uploadImage);

module.exports = router