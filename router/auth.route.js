const authController = require("../controllers/auth.controller.js");
const authMiddleWare =  require("../middlewares/auth.middleware.js")

// CREATE A POST CALL TO CREATE USER
module.exports = (app) => {
    app.post("/ecomm/api/v1/auth/signup",[authMiddleWare.verify_Signup_Body],authController.signup);
};

//CREATE A POST CALL SIGNIN USER
module.exports = (app)=>{
    app.post("/ecomm/api/v1/auth/signin",[authMiddleWare.verify_Signin_Body],authController.signin);
}
