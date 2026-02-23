import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})

const jwtSecretKey = process.env.jwtKey

export const jwtToken = async (user) => {
    try{
        const accessToken = await jwt.sign({user}, jwtSecretKey, {expiresIn: "1h"});
        const refreshToken = await jwt.sign({user}, jwtSecretKey, {expiresIn: "1d"});

        return {accessToken, refreshToken};
    }
    catch(err){
        console.log(err.message)
        return err.message;
    }
}