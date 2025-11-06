const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema(
  {
    uid:{
      type:String
    },
    title: {
      type: String,
      
    },
    st_time: {
      type: Date,
 
    },
    end_time: {
      type: Date,
  
    },
    status: {
      type: String,
   
      
    },
    swap: {
      type: Boolean,
      default:false
    },
     swap_req: {
      type: Boolean,
      default:false
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', EventSchema)
