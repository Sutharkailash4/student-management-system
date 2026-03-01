import React, { useContext, useEffect } from "react";
import { Student_data_context } from "../studentContext/SudentContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Student_list = () => {

    const navigate = useNavigate();

    const {data,setData,updateData,setUpdateData} = useContext(Student_data_context); 

    const getData = () => {
        axios.get("https://student-management-system-5-1z9q.onrender.com/api/student")
        .then((res)=>{
            setData(res.data.studentData);
        })
    }

    const remove = (id) => {
        axios.delete("https://student-management-system-5-1z9q.onrender.com/api/student/"+id)
        .then((res)=>{
            getData();
            toast.success("Student Deleted Successfully");
        }).catch((error)=>{
            toast.error("Something Went Wrong");
        })
    }

    const update = (element) => {
        setUpdateData(element);
        navigate("/");
    }

    useEffect(()=>{
        getData();
    },[]);

    return (
        <div className="student_list_box">
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Roll_no</th>
                        <th>English</th>
                        <th>Hindi</th>
                        <th>Math</th>
                        <th>Science</th>
                        <th>Computer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((elem,idx)=>{
                        return (
                             <tr key={idx}>
                        <td>{elem.name}</td>
                        <td>{elem.class_no}</td>
                        <td>{elem.roll_no}</td>
                        {elem.marks.map((item,idx)=>{   
                            return ( 
                            <td key={idx}>{item.score}</td>
                            )
                        })}
                        <td>
                            <button onClick={()=>{
                                remove(elem._id);
                    }} className="delete">Delete</button>
                            <br />
                            <button onClick={()=>{
                                update(elem);
                            }} className="update">Update</button>
                        </td>
                    </tr>
                         )
                    })}
                </tbody>
            </table>
        </div>
    )
}


export default Student_list;