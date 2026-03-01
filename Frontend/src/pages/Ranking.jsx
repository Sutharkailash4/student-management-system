import React, { useContext } from "react";
import { Student_data_context } from "../studentContext/SudentContext";

const Ranking = () => {
  const { data } = useContext(Student_data_context);

  const studentsWithTotal = data.map((student) => {
    const total = student.marks.reduce((sum, m) => sum + m.score, 0);
    return { ...student, total };
  });

  const sortedStudents = [...studentsWithTotal].sort(
    (a, b) => b.total - a.total
  );

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
          {sortedStudents.map((elem, idx) => {
            const Percentage = (elem.total / 500) * 100;

            const Grade =
              Percentage >= 90
                ? "A"
                : Percentage >= 85
                ? "B"
                : Percentage >= 75
                ? "C"
                : Percentage >= 40
                ? "D"
                : "Fail";

            return (
              <tr key={idx}>
                <td>{elem.name}</td>
                <td>{elem.total}</td>
                <td>{Percentage.toFixed(2)}%</td>
                <td>{Grade}</td>
                <td>{idx + 1}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;