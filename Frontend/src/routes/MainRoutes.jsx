import React from "react";
import Home from "../pages/Home";
import Student_list from "../pages/Student_List";
import Ranking from "../pages/Ranking";
import { Route, Routes } from "react-router-dom";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/student_list" element={<Student_list />}/>
            <Route path="/ranking" element={<Ranking />}/>
        </Routes>
    )
}

export default MainRoutes;