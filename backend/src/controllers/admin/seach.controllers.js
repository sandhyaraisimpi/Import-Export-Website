import categoryModel from '../../models/common/category.model.js';
import subcategoryModel from "../../models/common/sub_category.model.js";
import productModel from "../../models/common/product.model.js";
import { ApiError } from '../../utils/api-error.js';
import { ApiResponse } from '../../utils/api-response.js';

const search = async (req, res) => {
    try {
        const { keyword } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        if (!keyword) {
            return res.status(400).json(
                new ApiError(400, "Search keyword is required")
            );
        }

        const regex = new RegExp(keyword, "i");

        // Categories & Subcategories (no heavy pagination)
        const [categories, subcategories] = await Promise.all([
            categoryModel.find({ name: regex }).limit(5),
            subcategoryModel.find({ name: regex }).limit(5)
        ]);

        const productQuery = {
            $or: [
                { name: regex },
                { description: regex }
            ]
        };

        const [products, totalProducts] = await Promise.all([
            productModel
                .find(productQuery)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),

            productModel.countDocuments(productQuery)
        ]);

        if (
            categories.length === 0 &&
            subcategories.length === 0 &&
            products.length === 0
        ) {
            return res.status(404).json(
                new ApiError(404, "No Results Found")
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    categories,
                    subcategories,
                    products,
                    pagination: {
                        currentPage: page,
                        totalProducts,
                        totalPages: Math.ceil(totalProducts / limit)
                    }
                },
                "Search Successful"
            )
        );

    } catch (err) {
        return res.status(500).json(
            new ApiError(500, err.message, [
                { message: err.message, name: err.name }
            ])
        );
    }
};


const getSearchSuggestions = async (req, res) => {
    try {
        const { keyword } = req.query;

        if (!keyword) {
            return res.status(400).json(
                new ApiError(400, "Keyword is required")
            );
        }

        const regex = new RegExp("^" + keyword, "i"); // starts with

        const [categories, subcategories, products] = await Promise.all([
            categoryModel
                .find({ name: regex })
                .select("name")
                .limit(5),

            subcategoryModel
                .find({ name: regex })
                .select("name")
                .limit(5),

            productModel
                .find({ name: regex })
                .select("name")
                .limit(5)
        ]);

        const suggestions = [
            ...categories.map(item => item.name),
            ...subcategories.map(item => item.name),
            ...products.map(item => item.name)
        ];

        if (suggestions.length === 0) {
            return res.status(404).json(
                new ApiError(404, "No Suggestions Found")
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                suggestions,
                "Suggestions fetched successfully"
            )
        );

    } catch (err) {
        return res.status(500).json(
            new ApiError(500, err.message, [
                { message: err.message, name: err.name }
            ])
        );
    }
};

export {search, getSearchSuggestions}