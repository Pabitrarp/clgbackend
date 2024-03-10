const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: true,
    },
    quantity:{
        type: Number,
        required: true
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        type:Boolean,
    }
    
},{timestamps: true,versionKey: false})

module.exports = mongoose.model("product",productSchema);