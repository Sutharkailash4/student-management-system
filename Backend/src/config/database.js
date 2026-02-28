const mongoose = require("mongoose");

const connectToDatabase = () => {
    mongoose.connect(process.env.STUDENT_URI)
        .then((res) => {
            console.log("Connected to database successfully");
        }).catch((error) => {
            console.log("Failed to coonect", error);
        })
}

module.exports = connectToDatabase;