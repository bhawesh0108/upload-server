const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys');
const User = require('../models/user');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)
    {
        return res.status(422).json({
            error:"You need to sign in1"
        })
    }
    const token = authorization.replace('Bearer ','');
     jwt.verify(token,JWT_SECRET,(err,payload)=>{
         if(err)
         {
             return res.status(422).json({
                 error:"You need to sign in2"
             })

         }
         const {_id} = payload;
         User.findById(_id).then(userdata=>{
          
             req.user = userdata;
             next();

         })
        

     })

}