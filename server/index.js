// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51P4lMDKMXxBxcQTlEOwYF56DEioOQg5Vm1oOQUK7EurIyUEXPOoCd4p32rVMzao6NrMwmzystnZ8aiIWn2QKrupF007v665faa"
);

// API

// - App config
const app = express();
const PORT = process.env.PORT || 5000;

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());


// - API routes
app.get("/", (req,res) => res.status(200).send("hellow World"));


app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Received for this amount >>> ", total);

  try {
      const paymentIntent = await stripe.paymentIntents.create({
          amount: total,
          currency: "usd",
      });

      response.status(201).send({
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      console.error("Error creating payment intent:", error);
      response.status(500).send({ error: error.message });
  }
});



// - Listen command
app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
  });