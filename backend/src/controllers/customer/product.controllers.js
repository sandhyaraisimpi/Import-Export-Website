import categoryModel from '../../models/common/category.model.js';
import subcategoryModel from "../../models/common/sub_category.model.js";
import productModel from "../../models/common/product.model.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";

const getCategory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const categoryList = await categoryModel
            .find({ status: "Available" })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (categoryList.length === 0) {
            return res.status(404).json(new ApiError(404, "No Category Found."));
        }

        const totalItems = await categoryModel.countDocuments();

        return res.status(200).json(new ApiResponse(
            200,
            {
                totalItems,
                currentPage: page,
                totalPage: Math.ceil(totalItems / limit),
                categoryList
            },
            "Successful"
        ))


    } catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getSubCategory = async (req, res) => {
    try {
        let { categoryId } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const subcategoryList = await subcategoryModel
            .find({
                categoryId: categoryId, 
                status: "Available"
            })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (subcategoryList.length === 0) {
            return res.status(404).json(new ApiError(404, "No SubCategory Found"));
        }

        const totalItems = await subcategoryList.countDocuments({ categoryId: categoryId });

        return res.status(200).json(
            200, {
            totalItems,
            currentPage: page,
            totalPage: Math.ceil(totalItems / limit),
            subcategoryList
        },
            "Successfull"
        )
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

const getProduct = async (req, res) => {
    try {
        const { categoryId, subCategoryId } = req.query;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const productList = await productModel.find(
            {
                categoryId: categoryId,
                subCategoryId: subCategoryId,
                status: "Available"
            }
        )
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (productList.length === 0) {
            return res.status(404).json(new ApiError(404, "No Product Found."));
        }

        const totalItems = await productModel.countDocuments({
            categoryId: categoryId,
            subCategoryId: subCategoryId,
            status: "Available"
        });

        return res.status(200).json(
            200, {
            totalItems,
            currentPage: page,
            totalPage: Math.ceil(totalItems / limit),
            productList
        },
            "Successful"
        )
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}

export { getCategory, getSubCategory, getProduct };