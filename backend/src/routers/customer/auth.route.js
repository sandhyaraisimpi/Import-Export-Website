import {Router} from "express";
import { Signup, Login, forgetPassword, updateProfile, getMyProfile, signupOtp, forgetPasswordOtp } from "../../controllers/customer/auth.controllers.js";
import { duplicateEmail } from "../../middlewares/duplicateEmail.middleware.js";
import { customerPresent } from "../../middlewares/emailIsPresent.middleware.js";
import { requiredToLogin } from "../../middlewares/requiredToLogin.midddleware.js";

const router = Router();

router.post("/signup", duplicateEmail, Signup);
router.post("/login", customerPresent, Login);
router.patch('/forgetpassword', customerPresent, forgetPassword);
router.put('/updateProfile', requiredToLogin, updateProfile);
router.get("/myprofile", requiredToLogin, getMyProfile);
router.post('/signupOtp', duplicateEmail, signupOtp);
router.post("/forgetpasswordOtp", customerPresent, forgetPasswordOtp);

export default router