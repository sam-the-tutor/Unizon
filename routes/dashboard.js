
//improting the modules.
const express = require('express')
const router = express.Router()
//when the server gets this url, it should display something




router.get('/',async (req,res) =>{
	//render a view page from the views folder


	res.render('dashboard', {auth :"sam"})
})


module.exports = router