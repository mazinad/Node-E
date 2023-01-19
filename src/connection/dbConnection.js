import mongoose from "mongoose";
import env from "dotenv";
env.config();
const connectionURL = process.env.MongooDB;
const connectDb = async () => {
    try{
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Database connected");
    }catch(err){
        console.log(err);
    }
}
export default connectDb;