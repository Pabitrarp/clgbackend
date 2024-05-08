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

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
console.log(razorpay_payment_id);
    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

