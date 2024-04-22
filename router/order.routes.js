const authMiddleware = require("../middlewares/auth.middleware.js")
const orderController = require("../controllers/order.controller.js")

module.exports = (app) => {
    //create Order
    app.post("/ecomm/api/v1/auth/createOrder",[authMiddleware.verify_Token],orderController.orderCreate)

    //show Admin orders
    app.get("/ecomm/api/v1/auth/allOrders",[authMiddleware.verify_Token,authMiddleware.isAdmin],orderController.allOrders)

    //show Indivisual order
    app.get("/ecomm/api/v1/auth/orderDetail/:uid",[authMiddleware.verify_Token],orderController.orderDetails)
}