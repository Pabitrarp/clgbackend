const bcrypt = require("bcryptjs");
const user_model = require("../models/user.models.js");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config.js");
const nodemailer = require("nodemailer")

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
    const res_obj = {
      name: user_created.name,
      userid: user_created.userid,
      email: user_created.email,
      userType: user_created.userType,
      createdAt: user_created.createdAt,
      updatedAt: user_created.updatedAt,
    };
    res.status(201).send({
      sucess: true,
      res_obj,
      message: "User Register SucessFull",
    });
  } catch (error) {
    console.error("Error Registering User", error);
    // Other types of errors
    res.status(500).send({
      sucess: false,
      message: "Some error occurred while registering the user.",
      error: error.message,
    });
  }
};

exports.signin = async (req, res) => {
  //FETCH ALL BODY DATA
  const signIn_body = req.body;
  //FIND USER EXIST OR NOT
  const get_User = await user_model.findOne({
    email: signIn_body.email,
    userType: signIn_body.userType,
  });
  if (get_User == null) {
    return res.status(400).send({
      sucess: false,
      message: `${signIn_body.userType} is Not Registered`,
    });
  } else {
    const isPasswordValid = bcrypt.compareSync(
      req.body.password,
      get_User.password
    );

    if (!isPasswordValid) {
      return res.status(401).send({
        sucess: false,
        message: "Password Did Not Matched",
      });
    } else {
      const token = jwt.sign({ id: get_User.userid }, secret.secretKey, {
        expiresIn: 3600 /* in sec */,
      });

      res.status(200).send({
        sucess: true,
        message: `${signIn_body.userType} Login Sucessful`,
        user:{
          name:get_User.name,
          email:get_User.email,
          userType: get_User.userType
        },
        token
      });
    }
  }
};

exports.allUsers = async (req,res) => {
  try {
    const users = await user_model.find({userType:"customer"})
    if(users.length > 0)
    {
      res.status(200).send({
        success: true,
        message:"User Retrive Sucessfull",
        users
      })
    }
    else{
      res.status(400).send({
        success: true,
        message:"No User Registered"
      })
    }

  } catch (error) {
    console.error(error);
        res.status(500).json({
            success: false,
            error,
            message: 'Error while Getting Users',
        });
  }
}

exports.deleteUser = async (req,res) => {
  const uid = req.params.uid;
  try {
    const deleteResponse = await user_model.findByIdAndDelete(uid);
    if(deleteResponse)
    {
      res.status(200).send({
        success: true,
        message:"User Deleted Sucessfully"
      })
    }
    else{
      res.status(400).send({
        success: true,
        message:"Failed to Delete the User Server Issue"
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: 'Error while Deleting Users Server Issue',
  });
  }
}

//Count User
exports.countUsers = async (req,res) => {
  try {
    const result = await user_model.countDocuments();
    if(result > 0)
    {
      res.status(200).send({
        success: true,
        message:"Users Count Retrived",
        result
      })
    }
    else{
      res.status(400).send({
        success: false,
        message:"Users Count Retrived Failed"
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
      message: 'Error while fetching user from DB',
  });
  }
}

//Forgot Password
exports.otpGenerate = async (req, res) => {
 try{
  const email = req.body.email;
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service provider
    auth: {
      user: 'pabitramoharana5678@gmail.com', // Your email address
      pass: 'wuyk ucwc tkks ykwj', // Your email password
    },
  });
  var otp = Math.floor(Math.random() * 1000000);
  // Prepare email message
  const mailOptions = {
    from: 'pabitramoharana5678@gmail.com', // Sender's email address
    to: email, // Recipient's email address
    subject: 'Recover Account', // Subject of the email
    text: `Otp For Recover Account ${otp}`,
  };
  
  // Send email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error('Error sending email:', error);
      res.status(400).send({
        success: false,
        message:"Error in Sending Email"
      })
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send({
        success: true,
        message:"Users Count Retrived",
        otp: otp
      })
    }
  });

 }catch(err){
  console.log(err);
  res.status(500).json({
    success: false,
    err,
    message: 'Error while Sending Otp',
});
 }
};

exports.resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const newPassword = req.body.password; 

    // Find the user by email
    const user = await user_model.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Password Reset Failed: User Not Found" });
    }

    // Hash the new password
    const hashedPassword = bcrypt.hashSync(newPassword, 8);

    // Update user's password
    user.password = hashedPassword;

    // Save the updated user
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    console.error("Error while resetting user password:", error);
    return res.status(500).json({
      success: false,
      error,
      message: 'Error while resetting user password',
    });
  }
};