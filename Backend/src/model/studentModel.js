const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    class_no: { type: Number, required: true },
    roll_no: { type: Number, required: true },
    marks: {
        type: [
            { subject: String, score: Number }
        ], required: true
    }
})

const studentModel = mongoose.model("student-data", studentSchema);

module.exports = studentModel;