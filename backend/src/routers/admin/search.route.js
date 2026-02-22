import {Router} from "express";
import {search, getSearchSuggestions} from "../../controllers/admin/seach.controllers.js";

const router = Router();

router.get("/", search);
router.get("/suggestion", getSearchSuggestions);

export default router;