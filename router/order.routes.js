const authMiddleware = require("../middlewares/auth.middleware.js")
const orderController = require("../controllers/order.controller.js")

module.exports = (app) => {
    //create Order
    app.post("/ecomm/api/v1/auth/createOrder",[authMiddleware.verify_Token],orderController.orderCreate)

    //show Admin orders
    app.get("/ecomm/api/v1/auth/allOrders",[authMiddleware.verify_Token,authMiddleware.isAdmin],orderController.allOrders)

    //show Indivisual order
    app.get("/ecomm/api/v1/auth/orderDetail/:uid",[authMiddleware.verify_Token],orderController.orderDetails)

    //order status
    app.put("/ecomm/api/v1/auth/orders/:orderId",[authMiddleware.verify_Token,authMiddleware.isAdmin],orderController.orderStatus);

    //order Confirmation
    app.post("/ecomm/api/v1/auth/orderConfirmation/:email",[authMiddleware.verify_Token],orderController.orderConfirmation)

    //For Adress
    app.post("/ecomm/api/v1/auth/orders/address",[authMiddleware.verify_Token],orderController.setAddress)

    //Cancle Order
    app.put("/ecomm/api/v1/auth/cancleOrder/:pid",[authMiddleware.verify_Token],orderController.removeOrderItem);
}