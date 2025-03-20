const razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new razorpay({
  key_id: "rzp_test_uOZqbhkzZQ9vKC",
  key_secret: "0LVEJPysvMJNluyKNN4rrDjT",
});

// exports.checkout = async (req, res) => {
//   const totalPrice = req.body.totalPrice;
  
//   try {
//     const options = {
//       amount: Number(totalPrice * 100), // amount in the smallest currency unit (e.g., paise for INR)
//       currency: "INR",
//     };

//     const order = await instance.orders.create(options);
//     // console.log(order); // Log the created order object

//     // Return the order ID or any relevant data in the response
//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.error("Error creating order:", error);
//     res.status(500).json({ success: false, error: "Failed to create order" });
//   }
// };

exports.checkout = async (req, res) => {
  const totalPrice = req.body.totalPrice;
  try {
    const options = {
      amount: Number(totalPrice * 100), // amount in the smallest currency unit (e.g., paise for INR)
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    // console.log(order); // Log the created order object

    // Return the order ID or any relevant data in the response
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Failed to create order" });
  }
};

exports.paymentVerification = async (req, res) => {
  try{
  console.log(req.body);
  const { razorpay_payment_id,razorpay_order_id, razorpay_signature } = req.body;

  console.log("Received payment verification request...");

  const sha = crypto.createHmac("sha256", "0LVEJPysvMJNluyKNN4rrDjT");
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    console.log("Transaction is not legit!");
    return res.status(400).json({ msg: "Transaction is not legit!" });
  }

  console.log("Transaction is legit!");

   res.redirect(`http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`);
}catch(err){
  console.log(err);
}
};
