const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const UserRoute = require('./Routes/UserRoutes')
const UserAccess = require('./Routes/UserAccess')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())

app.use('/user',UserRoute)
app.use('/user/action',UserAccess)

app.use((req, res, next) => {
    console.log(req.path, req.method,req.body)
    next()
  })
  PORT = 4000
mongoose.connect("mongodb://localhost:27017/serviceHive")
  .then(() => {
    console.log('connected to database');
    app.listen(PORT, () => {
      console.log('listening for requests on port', PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
