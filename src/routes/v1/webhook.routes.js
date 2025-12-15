const express = require("express");
const config = require("../../config/config");
const auth = require("../../middlewares/auth");
const { Transition } = require("../../models");
const router = express.Router();
const stripe = require("stripe")(config.stripe.secretKey);

router.post("/", auth("user"), async (req, res) => {
    try {
        const { productName, price, type } = req.body;

        if (!productName || !price) {
            return res.status(400).json({ error: "Missing productName or price" });
        }

        const transition = await Transition.create({
            userId: req.user._id,
            amount: price,
            status: "pending",
            type: type,
            startDate: new Date(),
            expires: type === "month" ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        });

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
                            interval: type,
                        },
                    },
                    quantity: 1,
                    metadata: {
                        id: transition._id,
                        userId: req.user._id
                    },
                },
            ],
        });

        res.status(200).json({
            sessionId: session.id,
            status: session.status,
            message: "Success",
            url: session.url
        });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

router.post('/webhook', (req, res) => {
    console.log(req.body);

    res.json({ received: true });
});




module.exports = router;
