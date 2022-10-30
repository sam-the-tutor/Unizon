//improting the modules.
const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
//const {User,products,Shop,imgPath} = require('../models/model.js')
const Shop = require('../models/shop_model.js')
// const fetch = require('node-fetch')
const imgbbUploader = require("imgbb-uploader")
const sharp = require('sharp')
const Category = require('../models/category.js')
const Product = require('../models/product_model.js')

const fs = require('fs')





router.get('/new', (req,res) =>{
	//render a view page from the views folder
	

	res.render('shops/new_shop') //{sub:sub})
})

//delete a shop
router.delete('/:id',(req,res) =>{
	//render a view page from the views folder
	res.send("shope deleeted")


	//res.render('channels/new')
})


//delete a product

router.delete('/product/:id',(req,res) =>{
	//render a view page from the views folder
	res.send("product deleted")


	//res.render('channels/new')
})





router.get('/:id/details', async (req,res) =>{
	//render a view page from the views folder

	const Id = req.params.id
	const shop_details = await Shop.findOne({_id:Id})
	.exec()
	.then(response => {

			console.log("shop_details",response)

		return response})
	const products = await Product.find({shop:Id})
	.exec()
	.then(response => {return response})
	console.log("products:",products)

	res.render('shops/detail_shop',{details: shop_details,products:products})
})













router.get('/',async (req,res) =>{
	//render a view page from the views folder

	const email = req.session.email
	const find = await Shop.find({owner:email})
	.exec()
	.then(response =>{

		return response
		
	})
	console.log("shops:",find)
	res.render('shops/index',{shops:find})

	
})


//edit the shop details

router.get('/:id',async (req,res) =>{
	//render a view page from the views folder

	const id = req.params.id
	console.log(id)
	// .exec()
	// .then(response =>{


	// 	console.log(response.owner)
	res.render('shops/edit_shop')
	// })



	
})



//when the server gets this url, it should display something




//initializing a storage for the pics
var storage = multer.memoryStorage({

	destination: (req,file,callback) =>{
		var dir ='./public/uploads/shops';

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
	let uploader = await upload(req,res, async function(err){
		if(err){
			console.log(err)
					}
					else{

		
				const buff = req.file.buffer
				const Rimg = await sharp(buff)
					.resize(1000,450)
					.toBuffer()
				const base64 = Rimg.toString('base64')
				// const data = "data:"+req.file.mimetype+";base64,"+files
				//console.log("data:",data)

				const options = {
					apiKey: "efb53cf383008a277a0d0b3d6b108bd2",
					base64string: base64
				}

			
				try{
					const imgUrl = await imgbbUploader(options)
					.then(res=>{
						return res.url
						
					})

					console.log("img url:", imgUrl)

					const S = "S_"
				const generateRandomString = (length=4)=>Math.random().toString(26).substr(2, length)
				const stringid = generateRandomString()
				const stringId = S.concat(stringid)
				

		
		//create a new shop from the model
	
				 const shop = new Shop({
				 	_id:stringId,
					name: req.body.s_name,
					Owner: req.session.email,
					imgUrl: imgUrl
				})

				shop.save((err, newpic) =>{
					if(!err){
						console.log('picture uploaded')
						console.log(newpic)
						res.redirect('/shops')

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