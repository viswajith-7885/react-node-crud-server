const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./model/Users')


const app =express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/reactnode")

//routes
app.get('/',(req,res)=>[
    UserModel.find({})
    .then(users=>res.json(users))
    .catch(err=>console.log(err))
])

//create user route

app.post("/createuser",(req,res)=>{
    UserModel.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//get user route

app.get('/getuser/:id',(req,res)=>{
    const id = req.params.id
    UserModel.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//update route

app.put('/updateuser/:id',(req,res)=>{
    const id = req.params.id
    UserModel.findByIdAndUpdate({_id:id},{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone
    })
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

//delete route
app.delete('/deleteuser/:id',(req,res)=>{
    const id = req.params.id
    UserModel.findByIdAndDelete({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running")
})