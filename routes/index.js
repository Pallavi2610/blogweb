var express = require('express');
const { indexhomepage, indexregister, indexlogin, indexprofile,indexcreateBlog,indexblogDescription ,updateBlog,deleteblog} = require('../controllers/indexController');
const { isLoggedIn } = require('../utils/middleware');
var router = express.Router();

// const userModel = require("../models/userSchema");

// const passport = require("passport");

// const LocalStrategy = require("passport-local");
// passport.use(new LocalStrategy(userModel.authenticate()))

/* GET home page. */
router.get('/', indexhomepage);

router.get("/register", indexregister);

// router.post("/register",async (req,res,next)=>{
//   const{fullname,username,email,password} = req.body
//   await userModel.register({fullname,username,email},password)
//   res.redirect("/login")
// })


router.get("/login", indexlogin);

router.get("/profile",isLoggedIn,indexprofile);

router.get("/createblog",isLoggedIn,indexcreateBlog);

router.get("/blogdescription/:id", isLoggedIn,indexblogDescription);

router.get("/update/:id", isLoggedIn, updateBlog);

router.get("/delete/:id",isLoggedIn, deleteblog)





module.exports = router;
