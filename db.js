const config = require('private-config/config');
const mongoose = require('mongoose');
const dbURL = config.get('mongouri');

const connectDB = async () => {
    try{
        await mongoose.connect(dbURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log("Connected to DB");
    }
    catch (error){
        console.log("Failed to connect to MongoDB");
        console.log(error.message);
    }

};