
const userModel = require("../models/userSchema")
const blogModel = require("../models/blogSchema")
exports.indexhomepage =  async function(req, res, next) {

  const allBlogs = await blogModel.find()
  // console.log(allBlogs);
    res.render('index',{allBlogs});
  }

  exports.indexlogin = (req,res,next)=>{
    res.render("login");
  }

  exports.indexregister = (req,res,next)=>{
    res.render("register");
  }

  exports.indexprofile = async (req,res,next)=>{
    const user = await userModel.findById(req.user._id).populate("blogs") 
    res.render("profile",{user})
  }

  exports.indexcreateBlog = async (req,res,next)=>{
    res.render("createBlog")
  }

  exports.indexblogDescription = async (req,res,next)=>{
    const blogdescription = await blogModel.findById(req.params.id).populate({
      path:"comments",
      populate:{path:"postedBy",model:"user"}
    })
    // console.log(blogdescription)
    res.render("blogdescription",{blogdescription})
  }

  exports.updateBlog =async(req,res,next)=>{
    const currentblog =await blogModel.findById(req.params.id)
    res.render("update",{currentblog})
  }

  exports.deleteblog =async(req,res,next)=>{
   await blogModel.findByIdAndDelete(req.params.id)
   res.redirect("/profile")
  
  }