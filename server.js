const express = require('express');
const mongoose = require('mongoose');

// Server Start
const app = express();
const server_config = require('./configs/server.config.js');

// CONNECTION WITH MONGOOSE
const db_config = require('./configs/db.config.js');
const user_model = require('./models/user.models.js')
const bcCrypt = require('bcryptjs');
mongoose.connect(`${db_config.DB_URL}/${db_config.DB_NAME}`);

const db = mongoose.connection;

db.on("error", (error) => {
    console.error("Error connecting to database:", error);
});

db.once("open", () => {
    console.log("Connection established successfully with DB");
    //CREATE ADMIN
    init();
});

async function init()
{
    let user = await user_model.findOne({userid:"admin"})
    if(user)
    {
        console.log("Admin Already Present");
        return;
    }
    try {
        user= await user_model.create({
            name:"Subhrajit",
            userid:"admin",
            password:bcCrypt.hashSync("likundash42@",8),
            email:"likundash42@gmail.com",
            userType:"admin"
        })
        console.log(`Admin Created Sucessfull`)
        
    } catch (error) {
        console.log(error)
    }
}

app.listen(server_config.PORT, () => {
    console.log(`Server started at ${server_config.PORT}`);
});
