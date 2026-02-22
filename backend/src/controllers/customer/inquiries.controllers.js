import inquiriesModel from "../../models/common/inequiries.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const generateInquiries = async (req, res) => {
    try {
        const { _id } = req.user;

        const { productId, customerName, email, alternativeEmail, contact, alternativeContact, company, country, state, quantity, message } = req.body;

        const inquiryDetails = await inquiriesModel.create({
            productId,
            customerId: _id,
            customerName,
            email,
            alternativeEmail,
            contact,
            alternativeContact,
            company,
            country,
            state,
            quantity,
            message,
            inquiry_date: new Date()
        })

        if(!inquiryDetails){
            return res.status(400).json(new ApiError(400, "Inquiry is not generate."));
        }

        return res.status(200).json(new ApiResponse(200, inquiryDetails, "Successful"));
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getMyInquiries = async (req, res) => {
    try {
        const { _id } = req.user;

        const {status} = req.query;

        const query = {}

        query.customerId = _id

        if(status !== null || status){
            query.status = status
        }

        const page = (req.query.page) || 1;
        const limit = (req.query.limit) || 10;

        const skip = (page-1)*limit;

        const inquiryList = await inquiriesModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .sort({createdAt:-1});

        if(inquiryList.length === 0){
            return res.status(404).json(new ApiError(404, "No Inquiiry Found."))
        }

        const totalItems = await inquiriesModel.countDocuments({ customerId: _id });

        return res.status(200).json(
            200,
            {
                currentPage: page,
                totalItems,
                totalPage: Math.ceil(totalItems/limit),
                inquiryList
            },
            "Successfull"
        )
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export {generateInquiries, getMyInquiries};