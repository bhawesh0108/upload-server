const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const requireLogin = require('../middleware/requireLogin');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');



router.get('/protected',requireLogin,(req,res)=>{
    
    return res.send("hello");
})
router.get('/',(req,res)=>{
    return res.send('hello');
});

router.post('/signup',(req,res)=>{
    
    const {name,email,password,pic} = req.body;
    if(!name||!email||!password)
    {
        return res.status(422).json({
            error:"Provide all input fields!!"
        })
    }

    

    User.findOne({email:email}).then((savedUser)=>{
    if(savedUser)
    {
        return res.status(422).json({
            error:"User already exist with this email"
        })
    }

    bcrypt.hash(password,12)
    .then(hashedpassword=>{
        const user = new User({
            email,
            password:hashedpassword,
            name,
            pic
        })
        user.save()
        .then(user=>{
            res.json({
                message:"User saved successfully"
            })
        }).catch(err=>{
            console.log(err);
        })
    })

}).catch(err=>{
    console.log(err);
})

})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email||!password)
    {
        return res.status(422).json({
            error:"Email or Password is missing!!"
        })
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser)
        {
            return res.status(422).json({
                error:"Invalid Email or Password!!"
            })
        }
        bcrypt.compare(password,savedUser.password)
        .then(userMatch=>{
            if(userMatch)
            {
               const token = jwt.sign({_id:savedUser._id},JWT_SECRET);
               const {_id,name,email,followers,following,pic} = savedUser;
               return res.json({
                   token:token,
                   user:{_id,name,email,followers,following,pic}

               });

  
            }
            else{
                return res.status(422).json({
                    error:"Invalid email or Password"
                })
            }
        })
    }).catch(err=>{
        console.log(err);
    })
})



module.exports = router;