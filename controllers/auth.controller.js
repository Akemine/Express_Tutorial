const passport = require('passport')

// LOCAL ---------
exports.sessionNew = (req, res, next) => {
  res.render('auth/auth-connexion', {
    error: null,
    isAuthenticated: req.isAuthenticated(),
    currentUser: req.user
  })
}

exports.sessionCreate = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(e);
    } else if (!user) {
      res.render('auth/auth-connexion', {
        errors: [info.message],
        isAuthenticated: req.isAuthenticated(),
        currentUser: req.user, });
    } else {
    // login ne retourne pas de promesse, donc forcément un callback (err) et pas d'await
      req.login(user, (err) => {
        if (err) {
          next(e);
        } else {
          res.redirect('/');
        }
      });
    }
  })(req, res, next);
};


exports.sessionDelete = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/signin/form');
  });
};

// Google -------

exports.googleAuth = (req, res, next) => {
  passport.authenticate('google', {
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
  })(req, res, next);
}

exports.googleAuthCb = (req, res, next) => {
  passport.authenticate('google', {
    successRedirect: '/tweets',
    failureRedirect: '/'
})(req, res, next);
}
