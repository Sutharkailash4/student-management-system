const express = require("express");
const app = express();
const studentModel = require("./model/studentModel");
const cors = require("cors");
app.use(express.json());
app.use(cors());
const path = require("path");
app.use(express.static("./public"));

app.post("https://student-management-system-1-yplg.onrender.com/api/student", async (req, res) => {
    const studentData = req.body;
    if (!studentData.name || studentData.name.trim() === "") return res.status(400).json({ message: "Name is Required" })
    else if (!studentData.class_no || Number.isNaN(studentData.class_no)) return res.status(400).json({ message: "Class is Required" })
    else if (!studentData.roll_no || Number.isNaN(studentData.roll_no)) return res.status(400).json({ message: "Rollnumber is Required" })
    else if (!studentData.marks || !studentData.marks.length) return res.status(400).json({ message: "Marks is Required" });
    else {
        try {
            const { name, class_no, roll_no, marks } = studentData;
            const data = await studentModel.create({
                name,
                class_no,
                roll_no,
                marks
            })
            res.status(201).json({
                message: "Student Added Successfully",
                data
            })
        } catch (error) {
            res.status(400).json({
                message: "Something Went Wrong",
                error
            })
        }
    }
})

app.get("https://student-management-system-1-yplg.onrender.com/api/student", async (req, res) => {
    try {
        const studentData = await studentModel.find();
        res.status(201).json({
            message: "Students Fetched Successfully",
            studentData
        })
    } catch (error) {
        res.status(400).json({
            message: "Something Went Wrong",
            error
        })
    }
})

app.patch("https://student-management-system-1-yplg.onrender.com/api/student/:id", async (req, res) => {
    const id = req.params.id;
    const { name, class_no, roll_no ,marks} = req.body;
    try {
        await studentModel.findByIdAndUpdate(id, {
            name: name,
            class_no: class_no,
            roll_no: roll_no ,
            marks 

        })
        res.status(200).json({
            message: "Student Updated Successfully",
        })
    } catch (error) {
        res.status(400).json({
            message : "Something Went Wrong",
            error
        })
    }
})

app.delete("https://student-management-system-1-yplg.onrender.com/api/student/:id",async (req, res) => {
    const id = req.params.id;
    try{
        await studentModel.findByIdAndDelete(id);
        res.status(200).json({
            message : "Student Deleted Successfylly"
        })
    }catch(error){
        res.status(400).json({
            message : "Somehting Went Wrong",
            error
        })
    }
})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname , ".." , "public" ,"index.html"));
})

module.exports = app;