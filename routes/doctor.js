const express = require('express')
const router = express.Router()

router.get('/', checkAuthenticated, (req, res) => {
  res.render('doctor')
})

function checkAuthenticated(req, res, next) {
  console.log("checkAuthenticated called");
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router