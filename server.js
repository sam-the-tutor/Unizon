
// import the route
const indexRouter = require('./routes/index')
const shopRouter = require('./routes/shops')
const dashRouter = require('./routes/dashboard')
const path = require("path")
const methodOverride = require("method-override")

const session = require('express-session')
const restricted = require('./authRestricted')
const {User,products,shops} = require('./models/model.js')
const productRouter = require('./routes/product')
const profileRouter = require("./routes/profile")
const ChannelRouter = require("./routes/channel")


const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')


var server = app.listen('5001', function() {
    console.log('server listening at', server.address())
})











sessionConfig={
	name: 'Session_cookie',
	secret: 'samuel',//push this to env for production
	cookie:{
		maxAge: 1000*60*60, //time for expiry
		secure: false, //set it to true for production
		httpOnly: true, // means no access from javascript
		SameSite:"None"
	},
	resave: false,
	saveUninitialized: true, // set it to false for production
	
}






app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')





app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb',extended: true}))
app.use(session(sessionConfig))
app.use(express.json())
app.use(
    express.urlencoded({ extended: true })
);







const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://whatsapp:wrkaxoBJXyJLHiPh@cluster0.ugwf8vf.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser : true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.on('open', () =>console.log('connected to the database'))

// tell the server to use this route
app.use('/',  indexRouter)
app.use('/dashboard', restricted, dashRouter)
app.use('/shops', restricted, shopRouter)
app.use('/shops/products',restricted, productRouter)
app.use('/profile', restricted, profileRouter)
app.use('/channels', restricted, ChannelRouter)






