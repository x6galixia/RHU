const express = require('express')
const app = express()
const expressLayout = require('express-ejs-layouts')

//router
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const medtechRouter = require('./routes/medtech')
const nurseRouter = require('./routes/nurse')
const doctorRouter = require('./routes/doctor')
const pharmacistRouter = require('./routes/pharmacist')

//initialize layout
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayout)
app.use(express.static('public'))

//this is all of the routes
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/medtech', medtechRouter)
app.use('/nurse', nurseRouter)
app.use('/doctor', doctorRouter)
app.use('/pharmacist', pharmacistRouter)

//port
app.listen(process.env.PORT || 3000)
