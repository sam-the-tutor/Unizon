//improting the modules.
const express = require('express')
const router = express.Router()
const Product = require('../models/product_model.js')
const Channel= require('../models/channel_model.js')
const Shop = require('../models/shop_model.js')
const Category = require('../models/category.js')
const Subscriber = require('../models/subscription_model.js')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const password = "wrkaxoBJXyJLHiPh"


router.get('/new',(req,res) =>{
	//render a view page from the views folder


	res.render('channels/new')
})


//delete a channel

router.delete('/:id',(req,res) =>{
	//render a view page from the views folder
	res.send("we have you bro")


	res.render('channels/new')
})


//initializing a storage for the pics
//they will be saved in the products folder
var storage = multer.diskStorage({

	destination: (req,file,callback) =>{
		var dir ='./public/uploads/products';

		if(!fs.existsSync(dir)){
			console.log("file dire not available")
		fs.mkdirSync(dir)
		}
		callback(null,dir)
	},

	filename: (req, file, callback)=>{
		callback(null, file.originalname)
	}
})


		var upload = multer({storage: storage}).single('img')
		



router.post('/new', async (req,res)=>{


	


		const S = "l_"
		const generateRandomString = (length=4)=>Math.random().toString(26).substr(2, length)
		
		
		


	const location = req.body.c_location

	const Detail = location.split(',')
	const Details = Detail.map(dt=>{
		const stringid = generateRandomString()
		const stringId = S.concat(stringid)
		return {
			_id: stringId,
			name: dt
		}
	})

	console.log(Detail)



	
	
	 const channel = new Channel({
			channel_name: req.body.c_name,
			phone_number: req.body.c_number,
			owner: req.session.email,
			location: Details
		})
		 

		channel.save((err, newChannel) =>{
			if(!err){
				console.log('New Chann uploaded')
				console.log(newChannel)
				res.redirect('/channels/new')
			}else{
				console.log(err)
				res.redirect('/channels/new')
			}
		})
	})






router.get('/',async (req,res) =>{
	//render a view page from the views folder


	const email = req.session.email
	 const allchannels = await Channel.find({owner:{$ne:email}})
	.exec()
	 .then(response =>{
		return response;
	
	})


	//render a view page from the views folder
	
	const your_channels = await Channel.find({owner:email})
	.exec()
	.then(response =>{
		return response;

	
	})


	res.render('channels/index',{All_channels: allchannels,Your_channels: your_channels})
	 

})






router.get('/subscribe/:id',async (req,res) =>{
	//render a view page from the views folder
		
		const email = req.session.email
		const shops = await Shop.find({owner:email})
			.exec()
			.then(response =>{
				return response
			})


		
			const Id = req.params.id
			const chan = await Channel.findOne({_id:Id})
				.exec()
				.then(response =>{
					return response;	

				})

				console.log("Channel:",chan['location'])
		


	res.render('channels/subscribe',{Shops: shops, Chan: chan})
})





router.post('/subscribe/:id',async (req,res) =>{
	//render a view page from the views folder

		const C_id = req.params.id
		const chan = await Channel.findOne({_id:C_id},{phone_number:1})
				.exec()
				.then(response =>{
					return response;
					})	
				console.log("chann_NO",chan)



     const results = await Subscriber.findOne({channel_no:C_id, sub_shop_id: req.body.Shop_id,location: req.body.channel_location}).exec()
			     .then(response =>{
			     	if(response != null){

					console.log("you are already sub")
					res.send("you are already sub")

     	}else{
     	



	     		console.log("no user found")
	     		const subscriber = new Subscriber({

				channel_no: chan.phone_number,
				location: req.body.channel_location,
				sub_shop_id: req.body.Shop_id
			})

			subscriber.save((err, newSub) =>{
				if(!err){
					console.log('New Subscriber Added')
					console.log(newSub)

				}else{
					console.log(err)
				}
			})




     	}


     })
	
})














module.exports = router