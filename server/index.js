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

const PostModel = require("./models/Post.js")

app.use(cors({credentials : true , origin : 'http://localhost:3000'}))
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
// const uploadMiddleware = multer({dest : 'uploads/'})

const secretSalt = "sdath321dadiojida924"; // tbh any random letters.


// Mongoose Connectivity:
mongoose.connect('mongodb+srv://yashhu:7ujyEzmsJb8Mns1e@blogcluster0.vl5nosy.mongodb.net/')
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
            // loggedIn
            jwt.sign({username , id:userDoc._id}, secretSalt,{},(err,token)=>{
                if(err){
                    throw err;
                }
                else{
                    res.cookie('token',token).json({
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

    jwt.verify(token,secretSalt,{},(err,info)=>{
        if(err) throw err;
        res.json(info);
    })
})

// logout endpoint

app.post('/logout',async(req,res)=>{
    res.cookie('token' , "").json("ok")
})


app.post('/post',uploadMiddleware.single('file'),async(req,res)=>{//note,this 'file' is the data.set('file',file) as we putted into CreatePost.js
    res.json({files : req.file})
    console.log("file", req.file)
    console.log("filename", req.file?.filename)
    const {token} = req.cookies

    jwt.verify(token,secretSalt,{},async (err,info)=>{
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
    const allPost = await PostModel.find().populate('author',['username']);
    res.json(allPost)
})

app.listen(4000 , ()=>{
    console.log("server started")
})