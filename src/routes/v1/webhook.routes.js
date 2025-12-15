const express = require("express");
const config = require("../../config/config");
const router = express.Router();
const stripe = require("stripe")(config.stripe.secretKey);

router.post("/", async (req, res) => {
    try {
        const { productName, price, type } = req.body;

        if (!productName || !price) {
            return res.status(400).json({ error: "Missing productName or price" });
        }

        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: productName,
                        },
                        unit_amount: price * 100,
                        recurring: {
                            interval: type, // REQUIRED for subscriptions
                        },
                    },
                    quantity: 1,
                },
            ],
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
