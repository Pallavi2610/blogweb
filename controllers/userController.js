const userModel = require("../models/userSchema");
const blogModel = require("../models/blogSchema")
const passport = require("passport");
const LocalStrategy = require("passport-local");
const imagekit = require("../utils/imagekit");
const commentModel = require("../models/commentModel");
passport.use(new LocalStrategy(userModel.authenticate()));


exports.homepage = function(req,res,next){
    res.render("index")
}

exports.registerpage = async(req,res,next)=>{
    try{
        const{fullname,username,email,password} = req.body
        await userModel.register({fullname,username,email},password)
        res.redirect("/login")
    }catch(error){
        res.send(error)
    }
}


exports.loginpage = passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
})


  exports.logoutpage =("/logout",(req,res,next)=>{
    req.logout(function(error){
      if(error){
        return next(error)
      }
    })
    res.redirect("/login")
  })

  exports.createBlogs = async (req,res,next)=>{
    console.log(req.body)
    const newBlog = new blogModel({
      title:req.body.title,
      description:req.body.description,
      blogImage:req.body.blogImage,
   createBy: req.user._id
      
    })
    await newBlog.save()
   req.user.blogs.push(newBlog._id)
   await req.user.save()
   res.redirect("/profile")
  }

  exports.uploadimg = async(req,res,next)=>{
    // console.log(req.params.id);
    const user = await userModel.findById(req.params.id)
    // console.log(user)
    // // console.log(req.files);
    if(!user){
      res.send("user not found")
    }
    const{fieldId,url,thumbnailUrl} = await imagekit.upload({
      file:req.files.avatar.data,
      fileName:req.files.avatar.name,
    });
    if(!url){
      res.send("there is some error while generating url through imagekit")
    }
    user.profile =url
    await user.save()
    res.render("profile",{user})
    
  }
  

  exports.blogupdate =async(req,res,next)=>{
    const updateblog = await blogModel.findByIdAndUpdate({_id:req.params.id},{
      title:req.body.title,
      description:req.body.description,
      blogImage:req.body.blogImage
    })
    await updateblog.save()
    res.redirect("/profile")
  }

  exports.commentk = async(req,res,next)=>{
    const newComment = await new commentModel({
      commentText:req.body.comment,
      postedBy:req.user._id,
      blogId:req.params.id
    })
    await newComment.save()
    const currentblog= await blogModel.findByIdAndUpdate(req.params.id,{
      $push:{comments:newComment._id}
    })
    await currentblog.save()
   console.log(req.body)
   res.redirect(`/blogdescription/${req.params.id}`)
  }