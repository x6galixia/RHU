const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const expressLayout = require('express-ejs-layouts');
const initializePassport = require('./passportConfig');
require('dotenv').config();

// Initialize Express app
const app = express();

// Initialize Passport
initializePassport(passport);

// Middleware
app.use(express.static('public'));
app.use(expressLayout);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and Flash messages
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Middleware to make flash messages available in views
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');
  next();
});

// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

// Routers
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const medOfficerRouter = require('./routes/med-officer');
const medtechRouter = require('./routes/medtech');
const nurseRouter = require('./routes/nurse');
const doctorRouter = require('./routes/doctor');
const pharmacistRouter = require('./routes/pharmacist');

// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/med-officer', medOfficerRouter);
app.use('/medtech', medtechRouter);
app.use('/nurse', nurseRouter);
app.use('/doctor', doctorRouter);
app.use('/pharmacist', pharmacistRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
