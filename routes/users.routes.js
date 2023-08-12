const { signup, signupForm } = require('../controllers/users.controller');
const router = require('express').Router();

router.get('/signup/form', signupForm);
router.post('/signup', signup);

module.exports = router