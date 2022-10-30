//improting the modules.
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
//const {User,products,Shop,imgPath} = require('../models/model.js')
const Product = require('../models/model.js')
const mongoose = require('mongoose')






//when the server gets this url, it should display something

router.get('/',(req,res) =>{
	//render a view page from the views folder

	const reqq = req.session.email
	console.log("sessionnnn:",reqq)




	res.render('profile/profile')
})



module.exports = router