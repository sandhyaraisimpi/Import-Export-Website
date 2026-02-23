import express from "express";
import cookieParser from "cookie-parser";
import customerAuthRouter from "./routers/customer/auth.route.js";
import customerInquiryRouter from "./routers/customer/inquiries.route.js";
import customerProductRouter from "./routers/customer/product.route.js";
import customerSearchRouter from "./routers/customer/search.route.js";
import customerSubscribeRouter from "./routers/customer/subscribe.route.js";
import customerBlogRouter from "./routers/customer/blog.route.js";

import adminInquiryRouter from "./routers/admin/inquiry.route.js";
import adminProductRouter from "./routers/admin/product.route.js";
import adminCategoryRouter from "./routers/admin/category.route.js";
import adminSubCategoryRouter from "./routers/admin/subCategory.route.js";
import adminSearchRouter from "./routers/admin/search.route.js";
import adminPromotionRouter from "./routers/admin/promotion.route.js";
import adminBlogRouter from "./routers/admin/blogs.route.js";

import dotenv from "dotenv"


dotenv.config({
    path:"./.env"
});

const app = express();

app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/customer/auth", customerAuthRouter)
app.use("/api/v1/customer/inquiry", customerInquiryRouter);
app.use("/api/v1/customer/product", customerProductRouter);
app.use("/api/v1/customer/seach", customerSearchRouter);
app.use("/api/v1/customer/subscribe", customerSubscribeRouter);
app.use("/api/v1/customer/blog", customerBlogRouter)

app.use("/api/v1/admin/inquiry", adminInquiryRouter)
app.use("/api/v1/admin/product", adminProductRouter)
app.use("/api/v1/admin/category", adminCategoryRouter)
app.use("/api/v1/admin/subcategory", adminSubCategoryRouter)
app.use("/api/v1/admin/search", adminSearchRouter)
app.use("/api/v1/admin/promotion", adminPromotionRouter);
app.use("/api/v1/admin/blog", adminBlogRouter);


export default app;