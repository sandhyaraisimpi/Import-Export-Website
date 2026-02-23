import jwt from "jsonwebtoken";
import {cookiesForUser} from "../utils/cookiesForUser.js";
import { ApiError } from "../utils/api-error.js";

export const requiredLogin = async (req, res, next) => {
    try {

        const jwtKey = process.env.jwtKey;

        const accessToken = req.cookies?.AccessToken;
        const refreshToken = req.cookies?.RefreshToken;

        if (accessToken) {
            const jwtVerification = await jwt.verify(accessToken, jwtKey);

            req.user = jwtVerification.user;

            return next();
        }
        else if (refreshToken) {
            const jwtVerification = await jwt.verify(refreshToken, jwtKey);

            req.user = jwtVerification.user;

            await cookiesForUser(res, req.user);

            return next();
        }
        else {
            return res.status(401).json(new ApiError(401, "Please Login"));
        }
    }
    catch (err) {
        return res.status(500).json(new ApiError(500, err.message, [{ message: err.message, name: err.name }]));
    }
}