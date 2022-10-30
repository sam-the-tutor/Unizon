//improting the modules.
const express = require('express')
const router = express.Router()
const Product = require('../models/product_model.js')
const Shop = require('../models/shop_model.js')
const mongoose = require('mongoose')
const multer = require('multer')
const Sub = require('../models/sub_category.js')
const path = require('path')
const fs = require('fs')
const sharp = require('sharp')
const imgbbUploader = require("imgbb-uploader")



// new product page
router.get('/new',async (req,res) =>{
	//render a view page from the views folder
	const email = req.session.email
	const sub = await Sub.find()
	.exec()

	const shops = await Shop.find({email: email})
	.exec()
    console.log("shops:",shops)
	

	res.render('shops/add_product', {Subc:sub, shops: shops})
})




///get the details of a specific product
router.get('/:id',async (req,res) =>{


	const id = req.params.id
	const find = await Product.find({_id:id})
	.exec()
	.then(response =>{
		console.log(response)
		res.render('shops/product_desc',{products:response})
	})
})



// edit products route
router.put('/:id',async (req,res) =>{



})









//get all products page from the owner

router.get('/',async (req,res) =>{
	//render a view page from the views folder

	//render a view page from the views folder

	const email = req.session.email
	const find = await Product.find({owner:email})
	.exec()
	.then(response =>{
		//console.log(response)
		res.render('shops/all_product',{products:response})
	})

})




//initializing a storage for the pics
//they will be saved in the products folder
var storage = multer.memoryStorage({

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
		

		//create a random five digit id number for the products.
		const generateRandomString = (length=5)=>Math.random().toString(26).substr(2, length)
			
			

//post route for the new product.
router.post('/new', async (req,res)=>{
	let uploader = await upload(req,res, async function(err){
		if(err){
			console.log(err)
					}
					else{

						try{
					const buff = req.file.buffer
					//console.log("incoming vuffer before sharp",buff)
					 const Rimg = await sharp(buff)
					.resize(1000,450)
					.toBuffer()
					
					
					//console.log("after sharp buffer:", Rimg)
				const base64 = Rimg.toString('base64')
				// const data = "data:"+req.file.mimetype+";base64,"+files
				//console.log("data:",data)

				const options = {
					apiKey: "efb53cf383008a277a0d0b3d6b108bd2",
					base64string: base64
				}
				
				
					const imgUrl = await imgbbUploader(options)
					.then(res=>{
						return res.url
						
					})

					console.log("img url:", imgUrl)
		 
					const shop_id = req.body.shop
					const S = "P_"
					const stringid = generateRandomString()
					const stringId = S.concat(stringid)
		

					 const product = new Product({
					 	_id: stringId,
						product_name: req.body.p_name,
						sub_category: req.body.sub_category,
						owner: req.session.email,
						shop: req.body.shop,
						image_url: imgUrl
					})
		 

//save the product to the database and catch any errors arising form the execution
		product.save((err, newpic) =>{
			if(!err){
				console.log('New Product picture uploaded')
				console.log(newpic)

			}else{
				console.log(err)
			}
		})
		


	}catch(err){
		console.log(err)
	}

	}
	})
})





















module.exports = router













