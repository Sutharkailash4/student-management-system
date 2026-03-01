import React, { useContext, useState } from "react";
import {toast} from "react-toastify";
import { Student_data_context } from "../studentContext/SudentContext";
import axios from 'axios';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {

    const navigate = useNavigate();

    const {data,setData,updateData,setUpdateData} = useContext(Student_data_context);

    const getData = () => {
        axios.get("https://student-management-system-1-yplg.onrender.com/api/student")
        .then((res)=>{
            setData(res.data.studentData);
        })
    }

    const [name,setName] = useState("");
    const [classs,setClasss] = useState("");
    const [roll_no,setRoll_no] = useState("");
    const [english,setEnglish] = useState("");
    const [hindi,setHindi] = useState("");
    const [math,setMath] = useState("");
    const [science,setScience] = useState("");
    const [computer,setComputer] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        if(name.trim()==="" || String(classs).trim()==="" || String(roll_no).trim()==="" || String(english).trim()==="" || String(hindi).trim()==="" || String(math).trim()==="" || String(science).trim()==="" || String(computer).trim()==="") {
            return toast.error("All Fields are Required");
        }
        else if ((english<0 || english>100) || (hindi<0 || hindi>100) || (math<0 || math>100) || (science<0 || science>100) || (computer<0 || computer>100)) {
            return toast.error("Please Enter Valid Marks");
        }
        else {
            if(!!updateData){
                axios.patch("https://student-management-system-1-yplg.onrender.com/api/student/"+updateData._id,{
                     name : name,
                class_no : classs,
                roll_no : roll_no,
                marks : [
                    {subject : "English" , score : english},
                    {subject : "Hindi" , score : hindi},
                    {subject : "Math" , score : math},
                    {subject : "Science" , score : science},
                    {subject : "Computer" , score : computer},
                ]
                })
                .then((res)=>{
                    getData();
                    toast.success("Student Updated Successfully");
                    navigate("/student_list");
                }).catch((error)=>{
                toast.error("Something Went Wrong");
            })
            setName("");
            setClasss("");
            setRoll_no("");
            setEnglish("");
            setHindi("");
            setMath("");
            setScience("");
            setComputer("");
            setUpdateData(null);
            } else {
            axios.post("https://student-management-system-1-yplg.onrender.com/api/student",{
                name : name,
                class_no : classs,
                roll_no : roll_no,
                marks : [
                    {subject : "English" , score : english},
                    {subject : "Hindi" , score : hindi},
                    {subject : "Math" , score : math},
                    {subject : "Science" , score : science},
                    {subject : "Computer" , score : computer},
                ]
            })
            .then((res)=>{
                getData();
                toast.success("Student Added Sucessfully");
                navigate("/student_list");
            }).catch((error)=>{
                toast.error("Something Went Wrong");
            })

            setName("");
            setClasss("");
            setRoll_no("");
            setEnglish("");
            setHindi("");
            setMath("");
            setScience("");
            setComputer("");
       }
        }
    }
    
    useEffect(()=>{
        getData();
        if(!!updateData){
            setName(updateData.name);
            setClasss(updateData.class_no);
            setRoll_no(updateData.roll_no);
            setEnglish(updateData.marks[0].score);
            setHindi(updateData.marks[1].score);
            setMath(updateData.marks[2].score);
            setScience(updateData.marks[3].score);
            setComputer(updateData.marks[4].score);
        }
    },[updateData]);

    return (
        <div className="form_main_box">
        <form onSubmit={(e)=>{
            submitHandler(e);
        }}>
            <div className="heading">
                <h1>Student Management System</h1>
                <hr />
            </div>
            <div className="input_box">
            <input type="text" placeholder="Enter Name" value={name} onChange={(text)=>{
                setName(text.target.value);
            }}/>
            <input type="Number" placeholder="Enter Class" value={classs} onChange={(text)=>{
                setClasss(text.target.value);
            }}/>   
            <input type="Number" placeholder="Enter Roll Number" value={roll_no} onChange={(text)=>{
                setRoll_no(text.target.value);
            }}/>
            <input type="Number" placeholder="English Marks" value={english} onChange={(text)=>{
                setEnglish(text.target.value);
            }}/>
            <input type="Number" placeholder="Hindi Marks" value={hindi} onChange={(text)=>{
                setHindi(text.target.value);
            }}/>
            <input type="Number" placeholder="Maths Marks" value={math} onChange={(text)=>{
                setMath(text.target.value);
            }}/>
            <input type="Number" placeholder="Science Marks" value={science} onChange={(text)=>{
                setScience(text.target.value);
            }}/>
            <input type="Number" placeholder="Computer Marks" value={computer} onChange={(text)=>{
                setComputer(text.target.value);
            }}/>
            </div>
            <div className="button_box">
                <button>
                    {updateData ? "Update Student" : "Add Student"}
                </button>
            </div>
        </form>
        </div>
    )
}

export default Form;