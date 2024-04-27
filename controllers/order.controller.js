const order_model = require("../models/orders.models.js")

//order Create
exports.orderCreate = async (req,res ) => {
    const request_body = req.body;
    const orderDetail = {
        user: request_body.user,
        mobile: request_body.mobile,
        orderItems:request_body.orderItems,
        orderPrice:request_body.orderPrice,
        pinCode:request_body.pinCode,
        city:request_body.city,
        address:request_body.address,
        landmark:request_body.landmark,
        houseType:request_body.houseType
    }
    switch(true)
    {
        case !orderDetail.user:
            return res.status(500).send({ error: "User is Required" });
        case !orderDetail.mobile:
            return res.status(500).send({ error: "Mobile is Required" });
        case !orderDetail.orderItems:
            return res.status(500).send({ error: "Order Items is Required" });
        case !orderDetail.orderPrice:
            return res.status(500).send({ error: "Order Price is Required" });
        case !orderDetail.pinCode:
            return res.status(500).send({ error: "PinCode is Required" });
        case !orderDetail.city:
            return res.status(500).send({ error: "City is Required" });
        case !orderDetail.address:
            return res.status(500).send({ error: "Adress is Required" });
        case !orderDetail.landmark:
            return res.status(500).send({ error: "Landmark is Required" });
        case !orderDetail.houseType:
            return res.status(500).send({ error: "House Type is Required" });
    }
    try {
        const order = await order_model.create(orderDetail);
        //Backend Validation
        if(order)
        {
            return res.status(201).send({
                success:true,
                order,
                message:"Order Placed Sucessfully"
            })
        }
        else{
            return res.status(400).send({
                success:false,
                message:"Order CanNot Be Placed Spmething Went Wrong"
            })
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            error,
            message: "Order Creation Failed DB Error",
          });
    }
}

//View Order Admin
exports.allOrders = async (req, res) => {
    try {
        const orders = await order_model.find({});
        
        for (let order of orders) {
            await order.populate({
                path: 'orderItems.productId',
                select: '-photo' 
            });
        }

        if (orders.length > 0) { 
            return res.status(200).send({
                success: true,
                orders,
                message: "Orders Retrieved Successfully"
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "No orders found"
            });
        }
    } catch (error) {
        console.error("Error retrieving order details:", error);
        return res.status(500).send({
            success: false,
            error,
            message: "Order Details Retrieval Failed - DB Error",
        });
    }
}


//View Order Indivisual User
exports.orderDetails = async (req, res) => {
    const uid = req.params.uid;
    try {
        const orderDetail = await order_model.find({ user: uid }).populate('orderItems.productId', '-photo');
        if (orderDetail) {
            return res.status(200).send({
                success: true,
                order: orderDetail,
                message: "Order Detail Retrieved Successfully"
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "Order Not Found"
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            error,
            message: "Error retrieving order details"
        });
    }
}