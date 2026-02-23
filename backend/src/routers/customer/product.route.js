import {Router} from "express";
import {getCategory, getSubCategory, getProduct} from "../../controllers/customer/product.controllers.js";

const router = Router();

router.get("/category", getCategory);
router.get("/subcategory", getSubCategory);
router.get("/category", getProduct);

export default router;