const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const route = require('./routes/userroutes.js')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyparser.json())

dotenv.config()

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

app.use('/',route)
mongoose
.connect(MONGOURL)
.then(()=>{
    console.log('DB is Connected')
    
})
.catch((error)=>{
    console.log(error)
})
app.listen(PORT,()=>{
        console.log(`Server is running on the port at: ${PORT}`)
    })

