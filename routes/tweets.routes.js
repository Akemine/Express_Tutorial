const router = require('express').Router();
const { ensureAuthenticated } = require('../config/security.config');
const { tweetList, tweetNew, tweetCreate, tweetDelete, tweetEdit, tweetUpdate } = require('../controllers/tweets.controller');

router.get('/', tweetList);
router.get('/new', ensureAuthenticated, tweetNew);
router.post('/', ensureAuthenticated, tweetCreate);
router.get('/edit/:tweetId', ensureAuthenticated, tweetEdit);
router.post('/update/:tweetId', ensureAuthenticated, tweetUpdate);
router.delete('/:tweetId', ensureAuthenticated, tweetDelete);

module.exports = router