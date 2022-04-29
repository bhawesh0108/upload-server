const express = require("express")
const app = express()
const PORT = process.env.PORT || 5000
const mongoose = require("mongoose")
const { MONGOURI } = require("./config/keys")
const bcrypt = require('bcryptjs');

require('./models/user');

app.use(express.json());
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));

mongoose.connect(MONGOURI)

mongoose.connection.on('connected' , () => {
    console.log("connected succesfully")
})
mongoose.connection.on('error' , (err) => {
    console.log("error connecting" , err)
})
app.get('/' , (req,res) => {
    res.send("hello world")
})


if(process.env.NODE_ENV =='production'){
    app.use(express.static('../01-starting-setup/build'));
    const path = require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT, () => {
    console.log("servers is runing",PORT)
})