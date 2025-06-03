// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/'); // Redirect to home or dashboard after successful login
    // res.redirect('/dashboard'); // redirect after successful login
  }
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

module.exports = router;

// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.status(401).json({ message: 'Unauthorized' });
// }

// // Example of a protected route
// app.get('/api/protected', ensureAuthenticated, (req, res) => {
//   res.json({ message: 'You are authenticated', user: req.user });
// });