import React, { useContext } from "react";
import { Student_data_context } from "../studentContext/SudentContext";

const Ranking = () => {
  const context = useContext(Student_data_context);

  if (!context || !Array.isArray(context.data)) {
    return <h3>Loading...</h3>;
  }

  const { data } = context;

  const studentsWithTotal = data.map((student) => {
    const marks = Array.isArray(student.marks) ? student.marks : [];

    const total = marks.reduce(
      (sum, m) => sum + Number(m?.score || 0),
      0
    );

    return { ...student, total };
  });

  const sortedStudents = studentsWithTotal
    .filter(Boolean)
    .sort((a, b) => b.total - a.total);

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
          {sortedStudents.length === 0 ? (
            <tr>
              <td colSpan="5">No data found</td>
            </tr>
          ) : (
            sortedStudents.map((elem, idx) => {
              const percentage = (elem.total / 500) * 100;

              const grade =
                percentage >= 90
                  ? "A"
                  : percentage >= 85
                  ? "B"
                  : percentage >= 75
                  ? "C"
                  : percentage >= 40
                  ? "D"
                  : "Fail";

              return (
                <tr key={elem._id || idx}>
                  <td className="td">{elem.name}</td>
                  <td className="td">{elem.total}</td>
                  <td className="td">{percentage.toFixed(2)}%</td>
                  <td className="td">{grade}</td>
                  <td className="td">{idx + 1}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ranking;