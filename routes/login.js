const express = require('express');
const router = express.Router();
const passport = require('passport');

// GET login page
router.get('/', checkNotAuthenticated, (req, res) => {
  res.render('login', { error_msg: req.flash('error') });
});

// POST login page
router.post('/', checkNotAuthenticated, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      const selectedUserType = req.body['user-type'];
      if (!['medofficer', 'medtech', 'nurse', 'doctor', 'pharmacist'].includes(selectedUserType)) {
        req.flash('error', 'Invalid user type.');
        return res.redirect('/login');
      }
      // Redirect based on user type
      switch (selectedUserType) {
        case 'medofficer':
          return res.redirect('/med-officer');
        case 'medtech':
          return res.redirect('/medtech');
        case 'nurse':
          return res.redirect('/nurse');
        case 'doctor':
          return res.redirect('/doctor');
        case 'pharmacist':
          return res.redirect('/pharmacist');
        default:
          return res.redirect('/');
      }
    });
  })(req, res, next);
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    const user = req.user;
    switch (user.user_type) {
      case 'medofficer':
        return res.redirect('/med-officer');
      case 'medtech':
        return res.redirect('/medtech');
      case 'nurse':
        return res.redirect('/nurse');
      case 'doctor':
        return res.redirect('/doctor');
      case 'pharmacist':
        return res.redirect('/pharmacist');
      default:
        return res.redirect('/');
    }
  }
  // If not authenticated, continue to next middleware (which renders login page)
  next();
}

module.exports = router;
