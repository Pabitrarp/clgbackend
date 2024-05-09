const order_model = require("../models/orders.models.js")
const nodemailer = require("nodemailer")

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
        houseType:request_body.houseType,
        paymentType:request_body.paymentType
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
        case !orderDetail.paymentType:
            return res.status(500).send({error: "Payment Type Required"});
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
// orderstatus updtate
exports.orderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const { status } = req.body; // Extract status from request body
    try {
        // Find the order by user ID and update its status
        const orderDetail = await order_model.findById(orderId);

         if (orderDetail) {
            orderDetail.orderStatus=status;
            await orderDetail.save();
            return res.status(200).send({
                success: true,
                order: orderDetail,
                message:"Order Status Update Sucessfully"
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "Order Status Can not Update"
            });
        }
    } catch (error) {
        return res.status(500).send({
            success: false,
            error,
            message: "Error updating order status"
        });
    }
}

//Order Messages Email
exports.orderConfirmation = async (req, res) => {
    try{
     const email = req.params.email;
     const totalPrice = req.body.totalPrice;
     const mobile = req.body.mobile;
     const adress = req.body.adress;
     const city = req.body.city;
     const landmark = req.body.landmark;
     const transporter = nodemailer.createTransport({
       service: 'gmail', // Use your email service provider
       auth: {
         user: 'pabitramoharana5678@gmail.com', // Your email address
         pass: 'wuyk ucwc tkks ykwj', // Your email password
       },
     });
     //Order Details And Order Number

     // Prepare email message
     const mailOptions = {
       from: 'pabitramoharana5678@gmail.com', // Sender's email address
       to: email, // Recipient's email address
       subject: 'Order Confirmation', // Subject of the email
       text: `Thank you for your order! We're excited to confirm that your order has been successfully placed. Below are the details of Delivery Adress:
       
       Delivery Address:
       ${adress}
       ${city}
       
       Mobile Number: ${mobile}
       
       Landmark: ${landmark}
       
       Order Total: ${totalPrice}`,
     };
     
     // Send email
     transporter.sendMail(mailOptions, function(error, info) {
       if (error) {
         console.error('Error sending email:', error);
         res.status(400).send({
           success: false,
         })
       } else {
         console.log('Email sent:', info.response);
         res.status(200).send({
           success: true,
           message:"Order Details Send It To Your Email"
         })
       }
     });
   
    }catch(err){
     console.log(err);
     res.status(500).json({
       success: false,
       err,
   });
    }
   };