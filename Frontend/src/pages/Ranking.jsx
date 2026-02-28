import React, { useContext} from "react";
import { Student_data_context } from "../studentContext/SudentContext";

const Ranking = () => {

    const {data,setData} = useContext(Student_data_context);

    return (
    <div className="ranking_main_box">
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Total</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Rank</th>
                </tr>
            </thead>
            <tbody>
                {data.map((elem,idx)=>{
                    const Total = elem.marks.reduce((sum,num)=>{
                        return sum+num.score;
                    },0)

                    const Percentage = Total/500*100;

                    const Grade = Percentage>90 && Percentage<101 ? "A" : Percentage>85 && Percentage<91 ? "B" : Percentage>75 && Percentage<85 ? "C" : Percentage>40 && Percentage<75 ? "D" : "Fail" 

                    return (
                        <tr key={idx}>
                            <td className="td">{elem.name}</td>
                            <td className="td">{Total}</td>
                            <td className="td">{Percentage}%</td>
                            <td className="td">{Grade}</td>
                            <td className="td">Rank</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}

export default Ranking; 