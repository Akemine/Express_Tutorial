const tweetsRoutes = require("./tweets.routes");
const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");

const { ensureAuthenticated } = require('../config/security.config');

const router = require('express').Router();

// Système de subrouting
router.use('/tweets', tweetsRoutes);
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);


router.get('/', ensureAuthenticated, (req, res) => {
  res.redirect('/tweets');
})

module.exports = router