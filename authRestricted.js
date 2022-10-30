module.exports = async (req, res, next) =>{
 if(req.session && req.session.email){

const email = req.session.email
//console.log(email)

next()

 }else{

 	res.status(401).send({message:"sorry"})
 }









}