import {Router} from "express";
import {getCategory,getCategoryById,getSubCategoryByCategoryId, getSubCategory, getProductByParentId, getProduct} from "../../controllers/customer/product.controllers.js";

const router = Router();

router.get("/category", getCategory);
router.get("/category/:categoryId", getCategoryById);
router.get("/subcategorybycategoryId", getSubCategoryByCategoryId);
router.get("/subcategory", getSubCategory);
router.get("/productbyparentId", getProductByParentId);
router.get("/product", getProduct);

export default router;