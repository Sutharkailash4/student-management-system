import React, { createContext,  useState } from "react";

export const Student_data_context = createContext([]);

const StudentContext = (props) => {
    const [data,setData] = useState([]);
    const [updateData,setUpdateData] = useState(null);
    return (
        <Student_data_context.Provider value={{data,setData,updateData,setUpdateData}}>
            {props.children}
        </Student_data_context.Provider>
    )
}

export default StudentContext;