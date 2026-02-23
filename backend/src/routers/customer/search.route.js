import {Router} from "express";
import {search, getSearchSuggestions} from "../../controllers/customer/search.controllers.js";

const router = Router();

router.get("/", search);
router.get("/suggestion", getSearchSuggestions);

export default router;