const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.json({
      clientSecret: paymentIntent.client_secret,
      id: paymentIntent.id,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.update(req.params.id, {
      amount: req.body.amount * 100,
      currency: "EUR",
    });
    res.json({
      clientSecret: paymentIntent,
    });
  } catch (err) {
    next(err);
  }
};
