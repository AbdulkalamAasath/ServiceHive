const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RequestSchema = new Schema(
  {
    from_id:{
       type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    to_id: {
       type:mongoose.SchemaTypes.ObjectId,
       ref:'User'
      
    },
    swap_from_uid: {
      type:mongoose.SchemaTypes.ObjectId,
       ref:'Event'
 
    },
    swap_to_uid: {
      type:mongoose.SchemaTypes.ObjectId,
       ref:'Event'
  
    },
    swap:{
        type:String,
        default:"Pending"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('ReqData', RequestSchema)
