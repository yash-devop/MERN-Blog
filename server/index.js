const express = require('express');
const app = express();
const path = require('path')
const mongoose = require("mongoose")
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('./models/User')
const CookieParser = require('cookie-parser')
const multer = require('multer') 
const dotenv = require('dotenv')
const PostModel = require("./models/Post.js")

dotenv.config({
    path : './config.env'
})
// app.use(cors({credentials : true , origin : 'http://localhost:3000'}))
app.use(cors({credentials : true , origin : 'https://blogifyv1.vercel.app'}))
app.use(express.json())
app.use(CookieParser())
app.use('/uploads',express.static(__dirname + '/uploads')) // for the image to be display on the website from uploads folder.

app.use(express.urlencoded({
    extended : false
}))
// uploading file using Multer
const storage = multer.diskStorage({
    destination : (req , file , cb)=>{
        return cb(null, "./uploads")
    },
    filename: (req,file , cb)=>{
        return cb(null , `${Date.now()}-${file.originalname}`)
    }
})
const uploadMiddleware = multer({storage : storage})

const secretSalt = process.env.SECRET_SALT; // tbh any random letters.


// Mongoose Connectivity:
mongoose.connect(process.env.MONGODB_KEY)
.then((res)=>console.log("Database Connected"))
.catch((err)=>console.log(err))

app.post('/register',async(req,res)=>{
    const {username , password} = req.body;
    const hashedPassword = await bcrypt.hash(password , 10);
    try {
        const newUser = await new UserModel({username : username , password : hashedPassword}).save()
        res.json(newUser)
        
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})


 
app.post('/login',async(req,res)=>{
    const {username , password} = req.body;
    try {
        const userDoc = await UserModel.findOne({username : username})
        const passwordMatched = await bcrypt.compareSync(password , userDoc.password)
        console.log("isValid",passwordMatched)

        // now token...

        if(passwordMatched){
            // loggedIn code
            jwt.sign({username , id:userDoc._id}, secretSalt,{},(err,token)=>{
                if(err){
                    throw err;
                }
                else{
                    res.cookie('token',token,{sameSite:'none',secure: true}).json({
                        id : userDoc._id,
                        username
                    })
                }
            })
        }
        else{
            res.status(400).json("Wrong Credentials")
        }
        // res.json(userDoc)
    } catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

// this endpoint is called in reactjs to Auto loggin session.
app.get('/profile',(req,res)=>{
    const {token} = req.cookies

    jwt.verify(token,secretSalt,{sameSite:'none',secure: true},(err,info)=>{
        if(err) throw err;
        res.json(info);
    })
})

// logout endpoint

app.post('/logout',async(req,res)=>{
    res.cookie('token', '', { expires: new Date(0), sameSite: 'none', secure: true }).json("ok");
})


app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{//note,this 'file' is the data.set('file',file) as we putted into CreatePost.js
    res.json({files : req.file})
    console.log("file", req.file)
    console.log("filename", req.file?.filename)
    const {token} = req.cookies

    jwt.verify(token,secretSalt,{sameSite:'none',secure: true},async (err,info)=>{
        if(err) throw err;

        const  {title , summary,content} = req.body;
        const postDoc = await PostModel.create({
            title,
            summary,
            content,
            cover : req.file.filename,
            author : info.id,
        })
        res.json(postDoc)
    })
})

app.get('/post',async(req,res)=>{
    const allPost = await PostModel.find().populate('author',['username']).sort({createdAt : -1}).limit(1);
    res.json(allPost)
})
app.get('/post/:id',async(req,res)=>{
    const {id} = req.params;
    const postDoc = await PostModel.findById({_id : id }).populate('author',['username']);
    res.json(postDoc);
})

app.get('/recentpost',async(req,res)=>{
    const allPost = await PostModel.find().populate('author',['username']).sort({createdAt : -1}).limit(30);
    res.json(allPost)
})




app.listen(process.env.PORT || 5000 , ()=>{
    console.log(`server started at port ${process.env.PORT || 5000}`)
})