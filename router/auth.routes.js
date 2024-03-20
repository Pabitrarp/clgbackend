const authController = require("../controllers/auth.controller.js");
const authMiddleWare =  require("../middlewares/auth.middleware.js")

// CREATE ROUTE API PATH
module.exports = (app) => {
    //POST CALL FOR CREATE USER
    app.post("/ecomm/api/v1/auth/signup",[authMiddleWare.verify_Signup_Body],authController.signup);

    //POST CALL FOR SIGNIN USER
    app.post("/ecomm/api/v1/auth/signin",[authMiddleWare.verify_Signin_Body],authController.signin);
    
    //protected Router
    app.get("/ecomm/api/v1/auth/user-auth",[authMiddleWare.verify_Token],(req,res)=>{
        res.status(200).send({ ok: true});
    })
};
