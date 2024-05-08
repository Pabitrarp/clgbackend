const razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new razorpay({
  key_id: "rzp_test_ucafI57JhlFURM",
  key_secret: "wIA1RgOHzNw1DwCqTedd2B6M",
});

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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  // order_id + " | " + razorpay_payment_id

  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

  const digest = sha.digest("hex");

  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: " Transaction is not legit!" });
  }
  res.redirect(
    `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
  );
  // res.json({
  //   msg: " Transaction is legit!",
  //   orderId: razorpay_order_id,
  //   paymentId: razorpay_payment_id,
  // });
};
