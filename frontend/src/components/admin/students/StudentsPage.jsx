// src/components/admin/students/StudentsPage.js
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import StudentsPieChart from "./StudentsPieChart";

const StudentsPage = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [distribution, setDistribution] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "students"));
        const students = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudentsData(students);
        setDistribution(calculateGradeDistribution(students));
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const calculateGradeDistribution = (students) => {
    const distribution = students.reduce((acc, student) => {
      const grade = student.grade; // Assumes grade level is in student.grade
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(distribution).map(([grade, count]) => ({
      grade,
      count,
    }));
  };

  return (
    <div>
      <h1>Student Grade Distribution</h1>
      <StudentsPieChart data={distribution} />
    </div>
  );
};

export default StudentsPage;
