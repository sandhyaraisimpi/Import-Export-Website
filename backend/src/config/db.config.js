import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})

const databaseConfig = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connect Successful");
        
        // Drop conflicting index if it exists
        try {
            await db.connection.collection('admins').dropIndex('contact_1');
            console.log("✅ Dropped old contact_1 index");
        } catch (err) {
            // Index doesn't exist, which is fine
        }
        
        return db
    }
    catch(err){
        console.error(err.message)
    }
}

export default databaseConfig;