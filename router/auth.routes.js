

const authController = require("../controllers/auth.controller.js");
const authMiddleWare =  require("../middlewares/auth.middleware.js")

// CREATE ROUTE API PATH
module.exports = (app) => {
    //POST CALL FOR CREATE USER
    app.post("/ecomm/api/v1/auth/signup",[authMiddleWare.verify_Signup_Body],authController.signup);

    //POST CALL FOR SIGNIN USER
    app.post("/ecomm/api/v1/auth/signin",[authMiddleWare.verify_Signin_Body],authController.signin);
    
    //protected Router

    //User Route
    app.get("/ecomm/api/v1/auth/user-auth",[authMiddleWare.verify_Token],(req,res)=>{
        res.status(200).send({ ok: true});
    })
    //Admin Route
    app.get("/ecomm/api/v1/auth/admin-auth",[authMiddleWare.verify_Token,authMiddleWare.isAdmin],(req,res)=>{
        res.status(200).send({ ok: true});
    })

    //get All User
    app.get("/ecomm/api/v1/auth/all-users",[authMiddleWare.verify_Token,authMiddleWare.isAdmin],authController.allUsers)

    //delete User
    app.delete("/ecomm/api/v1/auth/delete-user/:uid",[authMiddleWare.verify_Token,authMiddleWare.isAdmin],authController.deleteUser)

    //count User
    app.get("/ecomm/api/v1/auth/countUsers",[authMiddleWare.verify_Token,authMiddleWare.isAdmin],authController.countUsers)

    //foget password otp generate
    app.post("/ecomm/api/v1/auth/forgotPassword",authController.otpGenerate);

    //reset Password
    app.put("/ecomm/api/v1/auth/resetPassword/:email",authController.resetPassword)
};
