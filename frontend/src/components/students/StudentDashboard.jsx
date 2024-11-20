import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/students/courses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCourses(await res.json());
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h1>Your Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
