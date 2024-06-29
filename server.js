// Load environment variables
require('dotenv').config()

// Imports
const express = require('express')
const expressLayout = require('express-ejs-layouts')
const { pool } = require("./models/databases/rhu-database")

// Initialize Express app
const app = express()

// Routers
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const medOfficerRouter = require('./routes/med-officer')
const medtechRouter = require('./routes/medtech')
const nurseRouter = require('./routes/nurse')
const doctorRouter = require('./routes/doctor')
const pharmacistRouter = require('./routes/pharmacist')

// Initialize layout
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

const PORT = process.env.PORT || 5000

// Routes
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/med-officer', medOfficerRouter)
app.use('/medtech', medtechRouter)
app.use('/nurse', nurseRouter)
app.use('/doctor', doctorRouter)
app.use('/pharmacist', pharmacistRouter)

// Error handling for routes
app.use((req, res, next) => {
  res.status(404).render('404', { layout: 'layouts/layout', title: '404 - Not Found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).render('500', { layout: 'layouts/layout', title: '500 - Server Error' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
