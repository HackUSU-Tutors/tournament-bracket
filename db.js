// const config = require('./private-config/config.json');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./private-config/config.json', 'utf8'));
const mongoose = require('mongoose'); 
const dbURL = config['mongouri'];

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

module.exports = connectDB