import { jwtToken } from "./jwt.js";

export const cookiesForUser = async (res, user) => {
    try{
        const {accessToken, refreshToken} = await jwtToken(user);

        res.cookie("AccessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge: 60*60*1000
        })

        res.cookie("RefreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Lax",
            maxAge:24*60*60*1000
        })

        return
    }
    catch(err){
        return err.message
    }
}