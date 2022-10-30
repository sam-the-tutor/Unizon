mongoose = require("mongoose");

//Define a schema
const Schema = mongoose.Schema;


const ChannelSchema = new Schema({

  channel_name: String,
  phone_number:String,
  owner:String,
  location: [{_id: String,
              name: String
            }],
  verified:{
        type: String,
        default: false
      },
});

const Channel = mongoose.model('channel', ChannelSchema);

module.exports = Channel
