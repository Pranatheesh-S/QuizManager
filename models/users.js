const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/QuizManager')
.then(() => console.log(" MongoDB connected successfully"))
.catch((err)=>console.log("failed to connect"));

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true
},
  password: { 
    type:String,
    required:true
}
});

module.exports = mongoose.model('User', userSchema);