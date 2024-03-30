const mongoose = require('mongoose');


// function to connect to Oolkar database
const connectDB = async (database) => {
    try {
        console.log("Connecting to Chillspot...");
        await mongoose.connect(database)
        console.log("Connected to Chillspot")
    } catch (error) {
        console.log("Connection failed to Chillspot")
        process.exit(0);
    }
}


module.exports = connectDB;