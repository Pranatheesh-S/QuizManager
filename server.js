const express=require('express');
const bcrypt=require('bcrypt');
const user=require("./models/users");
const app=express();
const=require('cors');

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

app.listen(3000,()=>
{
    console.log("server running");
})