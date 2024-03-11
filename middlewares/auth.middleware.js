const user_model = require("../models/user.models.js");
const jwt = require("jsonwebtoken")
const secretKey = require("../configs/auth.config.js")

const verify_Signup_Body = async (req, res, next) => {
    try {
        // Check For Name, Email, UserId
        if (!req.body.name) {
            return res.status(400).send({
                message: "Name is not provided in the body"
            });
        }
        if (!req.body.email) {
            return res.status(400).send({
                message: "Email is not provided in the body"
            });
        }
        if (!req.body.userid) {
            return res.status(400).send({
                message: "UserID is not provided in the body"
            });
        }

        // Check if User with the same ID already exists
        const existingUser = await user_model.findOne({ userid: req.body.userid });

        if (existingUser) {
            return res.status(400).send({
                message: "User with the same ID already registered"
            });
        }

        // If all checks pass, proceed to the next middleware/controller
        next();
    } catch (error) {
        console.log("Error in request body ", error);
        res.status(500).send({
            message: "Error while fetching data from body"
        });
    }
};

const verify_Signin_Body = (req,res,next)=>{

    if(!req.body.email)
    {
        return res.status(400).send({
            message: "Email is Not Present"
        })
    }
    if(!req.body.password)
    {
        return res.status(400).send({
            message: "Password is Not Present"
        })
    }
    next()
}

const verify_Token = (req,res,next)=>{
    //Read Header To Check Any Token Avilable Or Not
    const token = req.headers['authorization']

    if(!token)
    {
        return res.status(403).send({
            message:"No Token Found: Unauthorized"
        })
    }
    //CHECK FOR VALID TOKEN
    jwt.verify(token,secretKey.secretKey,async(err,decode)=>{
        if(err)
        {
            return res.status(500).send({
                message: "Unauthorized!"
            })
        }
        const user = await user_model.findOne({userid:decode.id})
        if(!user)
        {
            return res.status(400).send({
                message: "Unauthorized, this user for this token doesnot exist"
            })
        }
        req.user = user;
        next()
    })
}

const isAdmin = (req,res,next)=>{
    const user = req.user;
    if(user && user.userType == 'admin')
    {
        next()
    }
    else{
        return res.status(403).send({
            message: "Only ADMINS Are Allowed To Acess This End Point"
        })
    }
}
module.exports = { verify_Signup_Body, verify_Signin_Body, verify_Token,isAdmin};
