var express = require('express');
const { homepage, registerpage,loginpage,logoutpage,createBlogs,uploadimg,blogupdate,commentk} = require('../controllers/userController');
const { isLoggedIn } = require('../utils/middleware');
var router = express.Router();

/* GET users listing. */
router.get('/', homepage );

router.post("/login",loginpage)

router.post("/register",registerpage)

router.get("/logout",isLoggedIn,logoutpage)

router.post("/createBlog",createBlogs)

router.post("/uploadimg/:id",isLoggedIn,uploadimg)

router.post("/updateBlog/:id",isLoggedIn,blogupdate)

router.post("/comment/:id",isLoggedIn,commentk)



module.exports = router;
