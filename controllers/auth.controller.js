const bcrypt = require("bcryptjs");
const user_model = require("../models/user.models.js");
const jwt = require('jsonwebtoken')
const secret = require("../configs/auth.config.js")

// WRITE LOGIC TO REGISTER USER
exports.signup = async (req, res) => {
    // READ REQUEST BODY
    const request_body = await req.body;
    // INSERT USER DATA INTO MANGO
    const user_obj = {
        name: request_body.name,
        userid: request_body.userid,
        email: request_body.email,
        password: bcrypt.hashSync(`${request_body.password}`, 8),
    };
    try {
        const user_created = await user_model.create(user_obj);
        const res_obj={
            name:user_created.name,
            userid:user_created.userid,
            email:user_created.email,
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updatedAt:user_created.updatedAt
        }
        res.status(201).send(res_obj);
    } catch (error) {
        console.error("Error Registering User", error);
            // Other types of errors
            res.status(500).send({
                message: "Some error occurred while registering the user.",
                error: error.message,
            });
    }
};

exports.signin = async(req,res)=>{
    //FETCH ALL BODY DATA
    const signIn_body = req.body;
    //FIND USER EXIST OR NOT 
    const get_User = await user_model.findOne({userid:req.body.userid})
    if(get_User == null)
    {
        return res.status(400).send({
            message:"User is Not Registered"
        })
    }

    const isPasswordValid = bcrypt.compareSync(req.body.password,get_User.password);

    if(!isPasswordValid)
    {
        return res.status(401).send({
            message : "Password Did Not Matched"
        })
    }
    else{
        const token = jwt.sign({id: get_User.userid},secret.secretKey,{
            expiresIn: 120/* in sec */
        })

        res.status(200).send({
            name: get_User.name,
            userid: get_User.userid,
            email: get_User.email,
            userType: get_User.userType,
            accessToken: token
        })
    }

}
