const User = require('../model/usermodel.js')
const bodyparser = require('body-parser')
const express = require('express')
const app  = express()
app.use(bodyparser.json())



 const create = async (req,res)=>{
    try {
        const Wholeuser = new User(req.body)
    
       const {title, description} = Wholeuser;
        const userexit = await User.findOne({title})
        if(userexit){
            return res.status(500).json("user already exist")
        }
       const saveddata =  await Wholeuser.save();
        res.status(200).json("messagesuccess");

    } catch (error) {
        res.status(500).json(error)
    }
}

const alluser = async(req,res)=>{
    try {
        const alldata = await User.find()
        if(!alldata){
            res.status(404).json("no data")
        }
        res.status(200).json(alldata)
    } catch (error) {
     res.status(500).json("er");

    }
}
const searchById = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const isuser = await User.findById(id);
        if(!isuser){
            console.log('no user found by id')
            res.status(404).json("no user found")
        }
        console.log(isuser)
        res.status(202).json(isuser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateuser = async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id)
        const isuser = await User.findById(id);
        if(!isuser){
            console.log('no user found by id')
            res.status(404).json("no user found")
        }
        const updated = await User.findByIdAndUpdate(id, req.body,{new:true})
        res.status(202).json(updated)
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const deleteuser = async(req,res)=>{
    try {
        const id = req.params.id
        console.log(id)
        const isuser = await User.findById(id);
        if(!isuser){
            console.log('no user found by id')
            res.status(404).json("no user found")
        }
        const deleted = await User.findByIdAndDelete(id)
        res.status(202).json("user is deleted")
        
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}



module.exports = {create,alluser,searchById,updateuser,deleteuser}
