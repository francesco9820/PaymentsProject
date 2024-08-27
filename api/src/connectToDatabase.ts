import mongoose from "mongoose";

const connectToDatabase = async () => {
    await mongoose.connect(process.env.LOCAL_DATABASE || "mongodb://localhost:27017/payments");
    mongoose.set('runValidators', true);

    require('./models');
}

export default connectToDatabase;
