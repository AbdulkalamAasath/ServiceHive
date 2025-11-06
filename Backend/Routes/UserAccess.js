const express = require('express')
const route = express.Router()
const UserAuth = require('../Middleware/UserAuth')
const {createrec,getuserdata,updateuserdata,getslotsdata,getswapslotsdata,reqdatacreate,updatestatus,getreqswapslotsdata,updateswap} = require('../Controller/UserController')
route.use(UserAuth)
route.post('/create-event',createrec)
route.get('/api/get-data',getuserdata)
route.get('/api/swappable-slots',getslotsdata)
route.get('/api/my-slots',getswapslotsdata)
route.post('/api/update-data',updateuserdata)
route.post('/api/req-data',reqdatacreate)
route.post('/api/processdata',updatestatus)
route.get('/api/swap-request',getreqswapslotsdata)
route.post('/api/swap-response',updateswap)

//route.get('/api/swappable-slots',) api/req-data api/processdata   /api/swap-request  

module.exports = route


