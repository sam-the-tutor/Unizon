mongoose = require("mongoose");


const Schema = mongoose.Schema;

subscriber = new Schema({
  channel_no: {type:String, required:true},
  location: {type: String,required: true},
  sub_shop_id: {type: String, required: true},
  verified:{
    type: Boolean,
    default: true
  }
});

const Subscriber =  mongoose.model('subscribers',subscriber);
module.exports =  Subscriber;