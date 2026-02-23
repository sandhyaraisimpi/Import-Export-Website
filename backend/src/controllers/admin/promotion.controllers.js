import { brevo } from "../../config/brevo.config.js";
import promotionModel from "../../models/admin/promotion.models.js";
import { createPromotionEmail } from "../../utils/promotionEmail.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const sendPromotion = async (req, res) => {
    try {
        const { subject, offerTitle, offerDescription } = req.body;

        if (!subject || !offerTitle || !offerDescription) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const subscribers = await promotionModel.find({}).select("email");

        if (subscribers.length === 0) {
            return res.status(404).json({
                message: "No Subscribers Found"
            });
        }

        const htmlContent = createPromotionEmail(
            offerTitle,
            offerDescription
        );

        const batchSize = 50;

        for (let i = 0; i < subscribers.length; i += batchSize) {
            const batch = subscribers.slice(i, i + batchSize);

            await Promise.all(
                batch.map(subscriber => {
                    return brevo({
                        sender: {
                            name: process.env.companyName,
                            email: process.env.companyEmail,
                        },
                        to: subscriber.email,
                        subject,
                        htmlContent
                    });
                })
            );
        }

        return res.status(200).json(new ApiResponse(200, null, "Promotion sent successfully"));

    } catch (error) {
        return res.status(500).json(new ApiError(500, error.message, [{message: err.message, name: err.name}]));
    }
};

export {sendPromotion};