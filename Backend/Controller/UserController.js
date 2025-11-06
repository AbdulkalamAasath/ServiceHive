const User = require('../Models/User')
const jwt = require('jsonwebtoken')
const Event = require('../Models/Data')
const ReqData = require('../Models/ReqData')


const userLogin =async(req,res) =>
{
    const {Email,password} = req.body
    try{
    const user= await User.login(Email,password)
    const token = createToken(user._id)
    const Name = user.Name
    const email = user.email
    const user_id = user._id
    res.status(200).json({Name,email,token})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}
const createToken = (_id) =>
{
return jwt.sign({_id},"serve123",{expiresIn:'20d'})
}



const userSignup = async(req,res) =>
{
    const {Name,Email,password} = req.body
    try{
    const user=await User.signup(Name,Email,password)
    const user_id = user._id
    const token = createToken(user._id)
    res.status(200).json({Name,Email,token})
     }
     catch(err){
        res.status(400).json(err.message)
     }
}

const createrec = async (req, res) => {
  const { title, st_time, end_time, status } = req.body
  const uid = req.User._id
  try {
    const event = await Event.create({
      uid,
      title,
      st_time,
      end_time,
      status
    })
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


const getuserdata = async (req, res) => {
  const uid = req.User._id
  try {
    const event = await Event.find({uid:uid })
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updateuserdata = async (req, res) => {
  const {obj_id,swap_req} = req.body
  console.log(obj_id)
  try {
    const event = await Event.findByIdAndUpdate({_id:obj_id},{status:"Swapable"},{ new: true })
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const getslotsdata = async (req, res) => {
  const uid = req.User._id;
  try {
    const events = await Event.find({
      uid: { $ne: uid },
      status: "Swapable"
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getswapslotsdata = async (req, res) => {
  const uid = req.User._id;
  try {
    const events = await Event.find({
      uid: uid,
      status: "Swapable"
    });
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


const reqdatacreate =  async (req, res) => {
  const {  from_id , to_id , swap_from_uid , swap_to_uid  } = req.body
  const uid = req.User._id
  try {
    const event = await ReqData.create({
     from_id , to_id , swap_from_uid , swap_to_uid
    })
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updatestatus =  async (req, res) => {
  const {eid} = req.body
  try {
    const event = await Event.findByIdAndUpdate({_id:eid},{status:"Pending"},{ new: true })
    res.status(200).json(event)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}


const getreqswapslotsdata = async (req, res) => {
  const uid = req.User._id
  try {
    const event = await ReqData.find({to_id:uid}).populate('to_id','Name').populate('from_id','Name _id').populate('swap_from_uid').populate('swap_to_uid')
    const flatData = event.map(ev => ({
      id:ev._id,
      from_name: ev.from_id?.Name || 'Unknown',
      from_id: ev.from_id?._id,
      to_name: ev.to_id?.Name || 'Unknown',
      swap:ev.swap,
      from_eid:ev.swap_from_uid._id,
      fevn:ev.swap_from_uid.title,
      tevn:ev.swap_to_uid.title,
      to_eid:ev.swap_to_uid._id,
      st_time:ev.swap_from_uid.st_time,
      end_time:ev.swap_from_uid.end_time
    }));
    res.status(200).json(flatData)  
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
} 




const updateswap = async (req, res) => {
  const { id,from_id, from_eid, to_eid, status, fevn, tevn } = req.body;
  const to_id = req.User._id;

  try {
    if (status === "Accepted") {
  
      const [eventFrom, eventTo] = await Promise.all([
        Event.findByIdAndUpdate(
          from_eid,
          { title: tevn, uid: to_id, status: "Accepted" },
          { new: true }
        ),
        Event.findByIdAndUpdate(
          to_eid,
          { title: fevn, uid: from_id, status: "Accepted" },
          { new: true }
        )
      ]);

      const upreq = await ReqData.findByIdAndUpdate({_id:id},{swap:"Accepted"},{ new: true })

      return res.status(200).json({ message: "Swap accepted", eventFrom, eventTo });
    }

    if (status === "Declined") {

      const [eventFrom, eventTo] = await Promise.all([
        Event.findByIdAndUpdate(
          from_eid,
          { status: "Swapable" },
          { new: true }
        ),
        Event.findByIdAndUpdate(
          to_eid,
          {status: "Swapable" },
          { new: true }
        )
      ])
      const upreq1 = await ReqData.findByIdAndUpdate({_id:id},{swap:"Declined"},{ new: true })
      return res.status(200).json({ message: "Swap declined" });
    }

    res.status(400).json({ message: "Invalid status provided" });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



module.exports = {userSignup,userLogin,createrec,getuserdata,updateuserdata,getslotsdata,getswapslotsdata,reqdatacreate,updatestatus,getreqswapslotsdata,updateswap}