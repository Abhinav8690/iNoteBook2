const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser  = require('../middleware/fetchUser')

//Route 1: Create a User using: POST "/api/auth/createUser". Doesn't require Authentication
router.post('/createUser', [
    body('email','Enter a valid email').isEmail(),
    body('password','password must be atleast 5 characters').isLength({min:5}),
    body('name','Enter a valid name').isLength({min:3})
], async(req, res) => {
   const errors = validationResult(req)
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
   }
// check whether the user with this email exists already
   try {
    let user=await User.findOne({email:req.body.email})
   if(user){
    Success=false
       return res.status(400).json({Success,error:'sorry a user with this email already exists'})
   }
   //hashing the password and adding salt for security with the help of bcrypt
   const salt=await bcrypt.genSalt(10)
   const secpass=await bcrypt.hash(req.body.password,salt)
   user = await User.create({
       name: req.body.name,
       email: req.body.email,
       password: secpass
   })

   // returning token to the user after creation and token is id of the user; using jsonwebtoken here.
   const data={
       user:{
           id:user.id
       }
   }
   const AuthToken=jwt.sign(data,"$@Abhinav#123");
   Success=true
   res.json({Success,AuthToken})
   } catch (error) {
    console.log(error.message)
    res.status(500).send("some error occured")
   }
   
})
//Route 2: Login a User using: POST "/api/auth/login". Doesn't require Authentication.
router.post('/login', [
    body('email','Enter a valid email').isEmail(),
    body('password','password cannot be blank').exists()
], async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email,password}=req.body
    try {
        let user=await User.findOne({email})
        if(!user){
            Success=false
            return res.status(400).json({Success,error:'Please try to login with correct credentials'})
        }
        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            Success=false
            return res.status(400).json({Success,error:'Please try to login with correct credentials'})
        }
        const data={
            user:{
                id:user.id
            }
        }
        const AuthToken=jwt.sign(data,"$@Abhinav#123");
         Success=true
        res.json({Success,AuthToken})
    }catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

//Route 3: Get logged in User Details using: POST "/api/auth/getuser". requires Authentication
router.post('/getuser',fetchUser, async(req, res) => {
try {
   userid=req.user.id
   const user=await User.findById(userid).select("-password")
   res.send(user)
    
} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
}
})


module.exports = router