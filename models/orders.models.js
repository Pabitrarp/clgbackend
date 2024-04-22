const mongoose = require("mongoose")

const orderItemschema=new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    },
    quantity:{
        type: Number,
        required: true
    }
})

const orderSchema=new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    mobile:{
        type: Number,
        required: true,
    },
    orderItems: {
        type: [orderItemschema]
    },
    orderPrice:{
        type: Number,
        required: true
    },
    pinCode:{
        type:Number,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type: String,
        required: true
    },
    landmark:{
        type:String,
        required:true
    },
    houseType:{
        type: String,
        required: true,
        default: "home",
        enum:["home","office"]
    },
    status:{
        type: String,
        enum: ["PENDING","CANCELED","DELIVERED"],
        default: "PENDING"
    }
},{timestamps:true,versionKey:false})


module.exports = mongoose.model("Order",orderSchema);