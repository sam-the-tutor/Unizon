//improting the modules.
const express = require('express')
const router = express.Router()
const User = require('../models/model')
const bcrypt = require('bcrypt')
const session = require('express-session')
//when the server gets this url, it should display something

router.get('/',(req,res) =>{
	//render a view page from the views folder
	let auth=null
	res.render('index',{auth:auth})
})





//when the server gets this url, it should display something

router.get('/login',(req,res) =>{
	//render a view page from the views folder
	res.render('login')
})

router.post('/login',(req,res) =>{
	//render a view page from the views folder

	const pass = req.body.password

	console.log(req.body.email_address)
	User.findOne({email_address: req.body.email_address})
	.then(response =>{
		if(response && bcrypt.compareSync(pass,response.password)){
			req.session.email= response.email_address
			res.redirect('/dashboard')
			console.log(req.session)
		}else{
			console.log('waaaaaaaaaa')
			res.redirect('/login')

		}
	})
})






//when the server gets this url, it should display something

router.get('/register',(req,res) =>{
	//render a view page from the views folder
	res.render('register')
})


router.post('/register',async (req,res) =>{
	//render a view page from the views folder
	if(req.body.password !==req.body.c_password){
		res.status(403).send({message: 'two passwords dont match'})	
	} else{
	
		try{

			const hashedpassword = await bcrypt.hash(req.body.password,10)
			const user1 = new User({
	
		fname: req.body.fname,
		
		lname:req.body.lname,
		email_address:req.body.email_address,
		Whatsapp_number:req.body.whats_number,
		password:hashedpassword,
		Date_joined:Date.now(),
		profilepic: 'www'
	});
		user1.save((err,newUser) =>{
			if(!err){
				res.status(201)
				res.redirect('/login')
			}
			else{
				res.send("error")
			}
	});
	


		}catch{
			res.status(500).send({message: 'we couldnot create yuor account,please try again later'})
		}
	}
	
	
	

	
})









//export the module
module.exports = router