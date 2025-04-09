const express = require('express');

// Server Start
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const user_model = require('./models/user.models.js');
const server_config = require('./configs/server.config.js');
const db_config = require('./configs/db.config.js');
const cors = require('cors')

app.use(express.json());
app.use(express.urlencoded( {extended: false} ))
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(async(req,res)=>{
  console.log(req.url,req.method)
})
const con =async()=>{
    try {
        mongoose.connect("mongodb+srv://deepjalaj:oAJxC4IPFaJnlLqE@cluster0.pixj20w.mongodb.net/<dbname>?retryWrites=true&w=majority");

       init();
       console.log("connection done ")  
    } catch (error) {
        console.log("error",error)
    }
}
con();

async function init() {
    try {
        let user = await user_model.findOne({ userid: "admin" });
    
        if (user) {
            console.log("Admin already present");
            return;
        }
    } catch (error) {
        console.log(error)
    }

    try {
        user = await user_model.create({
            name: "Pabitra1",
            userid: "admin",
            password: bcrypt.hashSync("Pabitra@123", 8),
            email: "pabitra42@gmail.com",
            userType: "admin"
        });

        console.log("Admin created successfully");
    } catch (error) {
        console.log(error);
    }
}

// Stitch the route to the server
require("./router/auth.routes.js")(app);//for authentication for user
require("./router/category.routes.js")(app);//For Category Product
require("./router/product.routes.js")(app);//For Product
require("./router/order.routes.js")(app);//For Orders
require("./router/payment.routes.js")(app);//Payment Gateway

//Get Key
app.use("/ecomm/api/v1/auth/getKey",(req,res) => {
    res.status(200).json({key:"rzp_test_uOZqbhkzZQ9vKC"})
})

app.listen(server_config.PORT , "0.0.0.0", () => {
    console.log(`Server started at ${server_config.PORT}`);
});

app.get("/", (req, res) => {
    res.send("🎉 E-Commerce API is running!");
  });
