const express=require('express');
const cookieParser=require('cookie-parser');
const authRoutes= require('./routes/auth.routes');

// const foodroutes= require('./routes/food.routes');
const app=express();
const cors= require('cors');

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.get('/',(req,res)=>{
    res.send("hello world");
})
app.use('/api/auth',authRoutes);
//app.use('/api/food',foodroutes);
module.exports=app;
