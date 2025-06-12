const express=require('express');
const bcrypt=require('bcrypt');
const user=require("./models/users");
const app=express();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: 'pranatheesh@gmail.com',
        pass: 'oobykufzdpixolen', 
    },
});
const cors=require('cors');

app.use(express.json());
app.use(cors());
app.post('/login',async (req,res)=>{
    const {username ,pass}=req.body;
    const exist= await user.findOne({username});
    if(!exist)
    {
        return res.json({ message:"user not exist"});
    }
    const cpassword= await bcrypt.compare(pass, exist.password);
    if(!cpassword)
    {
       return  res.json({message : "password not match"});
    }
    //res.render("home");
    return res.json({message:"successful"});
});

app.post("/sending_email",(req,res)=>{
    const {email}=req.body;
    const code = Math.floor(1000 + Math.random() * 9000);
    const msg = `Your Code for the Verification is: <b>${code}</b>`;
    transporter.sendMail({
        from: 'pranatheesh@gmail.com',
        to: email,
        subject: 'QuizManager verification code',
        html: msg,
        });
    console.log("sent code");
    return res.json({message : code});
});

app.listen(3000,()=>
{
    console.log("server running");
})