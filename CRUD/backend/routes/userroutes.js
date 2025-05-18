const express = require('express')
const {create,alluser,searchById,updateuser,deleteuser}= require('../controller/usercontroller.js')


const route = express.Router()
route.post('/user',create)
route.get('/user',alluser)


route.get('/useruser/:id',searchById)
route.put('/userupdate/:id',updateuser)
route.delete('/userdelete/:id',deleteuser)

module.exports = route;