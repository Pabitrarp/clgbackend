const paymentController = require("../controllers/payment.controller")
module.exports = (app) => {
    //checkout
    app.post("/ecomm/api/v1/auth/payment-checkout",paymentController.checkout)
    //verification
    app.post("/ecomm/api/paymentVerification",paymentController.paymentVerification)

}